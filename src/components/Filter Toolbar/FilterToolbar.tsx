import { useRef, useState } from "react"
import "./filterToolbar.css"

interface ToolbarProps {
    navHeight: number
    searchQuery: string
    setSortQuery: (query: string) => void
    setSearchQuery: (query: string) => void
}

export function FilterToolbar({ navHeight, searchQuery, setSortQuery, setSearchQuery }: ToolbarProps) {
    const sortRef = useRef(null)
    const [query, setQuery] = useState<string>(searchQuery)

    const onSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortQuery(event.currentTarget.value)
    }

    return <>
        <div id='toolbarWrapper' style={{ top: `${navHeight + 10}px`}}>
            <div id="filterToolbar">
                {/*  */}
                <div style={{ position: 'relative' }}>
                    <select id="sortWidget" className="noAppearance" ref={sortRef} onChange={onSort}
                        style={{ textAlign: "left", zIndex: 1, width: '63px', fontWeight: 900 }}>
                        <option value={''}>Sort</option>
                        <option value={'percent off'}>% Off</option>
                        <option value={'price descending'}>Price ↓</option>
                        <option value={'price ascending'}>Price ↑</option>
                        <option value={'alphabetically'}>A-Z</option>
                    </select>

                    <span className="material-symbols-outlined selectChevron" style={{
                        position: 'absolute',
                        right: '3px',
                        zIndex: 0,
                    }}>keyboard_arrow_down</span>
                </div>

                <div className='inputWrapper'>
                    <input type="text"
                        placeholder="Search..."
                        value={query ?? undefined}
                        onChange={(e) => { setQuery(e.target.value); setSearchQuery(e.target.value) }} />
                    <span className="material-symbols-outlined">search</span>
                </div>
            </div>
        </div>
    </>
}