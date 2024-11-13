import "./dealCard.css"
import "../../App.css"
import { Deal } from "../../utils"
import { Graphic } from "../Graphic/Graphic"
import { getColor } from "../../utils"

interface DealCardProps {
    deal: Deal
}

export function DealCard({ deal }: DealCardProps) {


    return (
        <>
            <div className="dealCard">
                <div className="flexRow" style={{ alignItems: "stretch", flexWrap: "nowrap", gap: '12px' }}>
                    <Graphic deal={deal}></Graphic>
                    <div className="flexCol">
                        <div className="flexRow" style={{ flexWrap: "wrap", WebkitFlexWrap: 'wrap-reverse' }}>
                            <h2 style={{ fontSize: '28px', margin: 0, lineHeight: 1 }}>{deal.description}</h2>
                            <p style={{ backgroundColor: `${getColor(deal.category)}` }} className="tag">{deal.category?.toUpperCase()}</p>
                        </div>
                        <div className="flexRow" style={{ margin: '0 1px 2px' }}>
                            <p style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>{deal.quantity}{/* , {deal.size} */}</p>
                            <p style={{ fontSize: '16px', fontWeight: 800, margin: 0, textAlign: "center" }}>{deal.restrictions?.toUpperCase()}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 style={{ color: '#c50a0a', fontWeight: 800 }}>{deal.salePrice}</h3>
                    <s style={{fontWeight: 600}}>{deal.retailPrice}</s>
                </div>
            </div>
        </>
    )
}