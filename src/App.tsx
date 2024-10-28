import { useEffect, useState } from 'react'
import './App.css'
import { assignStyles, Deal, fetchDealsData } from './utils'
import { FilterToolbar } from './components/FilterToolbar'

function App() {
  // original and display deals
  const [deals, setDeals] = useState<Deal[]>()
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>()

  // layout variables
  const [viewportRes, setViewportRes] = useState({ x: window.innerWidth, y: window.innerHeight })
  const [isMobile, setIsMobile] = useState(viewportRes.x < 650)
  const [navHeight, setNavHeight] = useState<number>(50)


  useEffect(() => {  // fetch data and apply sticky compatible styles onload
    console.log("v 0.1");

    const fetchData = async () => {
      try {
        const data = await fetchDealsData();
        setDeals(data);
        setFilteredDeals(data);
        console.log("Fetching data", data);
      } catch {
        console.log("Error fetching data in useEffect");
      }
    };

    setTimeout(assignStyles, 500);
    fetchData();
  }, [])

  useEffect(() => { // window size listener
    const handleResize = () => {
      setViewportRes({ x: window.innerWidth, y: window.innerHeight })
      setIsMobile(window.innerWidth < 650)
      setNavHeight(document.getElementById('nav')?.offsetHeight ?? 50)
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize); // Check on resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup
    };
  }, [window.innerWidth, window.innerHeight]);

  return (
    <>
      <div id="appContainer">
        <h1>Beer and Wine One Time Deals</h1>
        <FilterToolbar navHeight={navHeight} />
      </div>
    </>
  )
}

export default App
