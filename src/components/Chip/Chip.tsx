import { useState } from "react"
import "./chip.css"

interface ChipProps {
    title: string
    isActive: boolean
    handleActivateChip: (chip: string) => void
}

export function Chip({ title, isActive, handleActivateChip }: ChipProps) {
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