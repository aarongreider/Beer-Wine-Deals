import "./filterToolbar.css"

interface ToolbarProps {
    navHeight: number
    onSort: () => void
    setSearchQuery: (query: string) => void
}

export function FilterToolbar({ navHeight }: ToolbarProps) {
    return <>
        <div id='toolbarWrapper' style={{ top: `${navHeight + 10}px` }}>
            <div id="filterToolbar">
                <div style={{ position: 'relative' }}>

                    <select id="sortWidget" className="noAppearance" /* ref={sortRef} onChange={onSort} */
                        style={{ textAlign: "left", zIndex: 1, width: '63px', }}>
                        <option value={''}>Sort</option>
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
                /* value={searchQuery ?? undefined}
                onChange={(e) => setSearchQuery(e.target.value)} */ />
                    <span className="material-symbols-outlined">search</span>
                </div>
            </div>
        </div>
    </>
}