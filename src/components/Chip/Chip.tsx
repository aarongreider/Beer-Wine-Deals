import { useEffect, useState } from "react"
import "./chip.css"

interface ChipProps {
    title: string
    isActive: boolean
    loaded: boolean
    handleActivateChip: (chip: string) => void
}

export function Chip({ title, isActive, loaded, handleActivateChip }: ChipProps) {
    useEffect(() => {
        const processURL = () => {
            const pathname = `${window.location}`;
            //const pathname = "/beerwinedeals/#beer";

            if (pathname) {
                // Split the last segment by hyphens
                const words = pathname.split('#');
                const cat = words[words.length - 1];
                const cappedCat = cat.charAt(0).toUpperCase() + cat.slice(1);
                if (cappedCat === title) {
                    handleClick()
                }
            } else {
                console.log("No valid segment found.");
            }
        }
        loaded ? processURL() : undefined

    }, [loaded])


    const [active, setActive] = useState<boolean>(isActive)
    const handleClick = () => {
        setActive(!active)
        handleActivateChip(title)
    }
    return (
        <div className={`chip ${active ? 'active' : ''}`} onClick={handleClick}>
            <h4>{title}</h4>
        </div>
    )
}