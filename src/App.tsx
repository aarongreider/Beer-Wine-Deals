import { useEffect, useState } from 'react'
import './App.css'
import { assignDevStyles, assignStyles, Deal, fetchDealsData, filterDeals, filterWithChips, sortDeals, categories } from './utils'
import { FilterToolbar } from './components/Filter Toolbar/FilterToolbar'
import { DealCard } from './components/Deal Card/DealCard'
import { Chip } from './components/Chip/Chip'

function App() {
  // original and display deals
  const [deals, setDeals] = useState<Deal[]>([])
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([])
  const [appLoaded, setAppLoaded] = useState<boolean>(false)


  // filtering variables
  const [activeChips, setActiveChips] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortQuery, setSortQuery] = useState<string>('')

  // layout variables
  //const [viewportRes, setViewportRes] = useState({ x: window.innerWidth, y: window.innerHeight })
  //const [isMobile, setIsMobile] = useState(viewportRes.x < 650)
  const [navHeight, setNavHeight] = useState<number>(50)

  useEffect(() => {  // fetch data and apply sticky compatible styles onload
    console.log("v 1.0");

    const fetchData = async () => {
      try {
        const data = await fetchDealsData();
        setDeals([...data]);
        setFilteredDeals([...data]);
        //console.log("Fetching data", data);
      } catch {
        console.log("Error fetching data");
      }
    };
    
    setTimeout(assignStyles, 500);
    assignDevStyles();
    fetchData();

  }, [])

  useEffect(() => { // set the loading state of the app when filtered bottles is set successfully
    if (!appLoaded && (filteredDeals.length > 0)) {
      setAppLoaded(true)
    }
  }, [filteredDeals])

  useEffect(() => { // window size listener
    const handleResize = () => {
      //setViewportRes({ x: window.innerWidth, y: window.innerHeight })
      //setIsMobile(window.innerWidth < 650)
      let offsetHeight = document.getElementById('nav')?.offsetHeight ?? 48
      offsetHeight += 5
      setNavHeight(offsetHeight);
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize); // Check on resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup
    };
  }, [window.innerWidth, window.innerHeight]);

  useEffect(() => {
    console.log("active chips:", activeChips);
    
    setFilteredDeals(getSortedAndFilteredDeals())
  }, [searchQuery, sortQuery, activeChips])

  const handleToggleChip = (chip: string) => {
    if (activeChips.includes(chip)) {
      const arr = [...activeChips];
      arr.splice(arr.indexOf(chip), 1);  // Remove the chip by index

      setActiveChips(arr); // remove the chip to toggle it off
    } else {
      setActiveChips([...activeChips, chip]) // add the chip to toggle it on
    }
  }

  const getSortedAndFilteredDeals = (): Deal[] => {
    return [...sortDeals(filterDeals(filterWithChips(deals, activeChips), searchQuery), sortQuery)]
  }

  return (
    <>
      <div id="appContainer">

        <h1 style={{
          textAlign: 'left',
          color: '#e9e5d4',
          margin: 0,
        }}>Beer and Wine One Time Deals</h1>

        <div style={{ zIndex: 100, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: "flex-end", alignItems: 'center', position: 'sticky', top: navHeight, gap: '10px' }}>
          <div id='chipWrapper' style={{ flexGrow: 1 }}>
            <Chip loaded={appLoaded} handleActivateChip={handleToggleChip} isActive={activeChips.includes(categories.Beer)} title={categories.Beer}></Chip>
            <Chip loaded={appLoaded} handleActivateChip={handleToggleChip} isActive={activeChips.includes(categories.Wine)} title={categories.Wine}></Chip>
            <Chip loaded={appLoaded} handleActivateChip={handleToggleChip} isActive={activeChips.includes(categories.Spirits)} title={categories.Spirits}></Chip>
            <Chip loaded={appLoaded} handleActivateChip={handleToggleChip} isActive={activeChips.includes(categories.Other)} title={categories.Other}></Chip>
          </div>
          <FilterToolbar navHeight={navHeight} searchQuery={''} setSortQuery={setSortQuery} setSearchQuery={setSearchQuery} />
        </div>
        <p style={{ color: "#e9e5d4", fontWeight: 500, fontStyle: 'italic', width: '100%', textAlign: 'right', paddingRight: '6px', margin: 0 }}>
          {filteredDeals.length} Results
          {activeChips.length > 0 && ` >`}
          {activeChips.map((filter, index) => {
            return <span key={index}>{` ${filter}${index == activeChips.length - 1 ? `` : `,`}`}</span>
          })}
        </p>

        <div id='listWrapper'>
          {/* map filtered deals */}
          {filteredDeals.map((deal, index) => {
            return <DealCard key={`deal-card-${index}`} deal={deal}></DealCard>
          })}
        </div>
      </div>
    </>
  )
}

export default App
