import "./dealCard.css"
import { Deal } from "../../utils"

interface DealCardProps {
    deal: Deal
}

export function DealCard({ deal }: DealCardProps) {
    return (
        <>
            <div className="dealCard">
                <div>
                    <h2>{deal.description}</h2>
                    <p>{deal.category}</p>
                </div>
                <div>
                    <h3 style={{color: '#c50a0a', fontWeight: 900}}>{deal.salePrice}</h3>
                    <s>{deal.retailPrice}</s>
                </div>
            </div>
        </>
    )
}