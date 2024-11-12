import "./dealCard.css"
import "../../App.css"
import { colors, Deal, categories } from "../../utils"
/* import convert from 'convert-units'; */

interface DealCardProps {
    deal: Deal
}

export function DealCard({ deal }: DealCardProps) {
    console.log(deal.quantity, deal.size);

    const getColor = (category: string): string => {
        switch (category) {
            case categories.Beer: return colors.Beer;
            case categories.Wine: return colors.Wine;
            case categories.Spirits: return colors.Spirits;
            default: return colors.Other;
        }
    }
    const parseVolume = (size: string): { amount: number, unit: string } => {
        console.log("parseVolume(size)", size)
        // Regular expression to capture the number and unit separately
        const regex = /^([\d.]+)\s*(\w+)$/;
        const match = size.match(regex);

        if (match) {
            const amount = parseFloat(match[1]); // Convert the numeric part to a float
            const unit = match[2].toLowerCase(); // Convert unit to lowercase for consistency

            return { amount, unit };
        } else {
            throw new Error("Invalid size format. Please use format like '12oz' or '1.5 Liter'.");
        }

    }
    const getVesselPath = (quantity: string, size: string): string => {

        const query = quantity.toLowerCase();
        //const volume = parseVolume(size)

        const linkify = (path: string) => `https://junglejims.com/wp-content/uploads/${path}.svg`

        if (query.includes("can")) {
            return linkify("beer_can_small")
        } else if (query.includes("bottle")) {
            return linkify("wine_big")
        } else {
            return linkify("box")
        }

        return "https://junglejims.com/wp-content/uploads/beer_bottle.svg"
    }

    return (
        <>
            <div className="dealCard">
                <div className="flexRow">
                    <div style={{ height: '80px', display: "flex", alignItems: "flex-end", background: `${getColor(deal.category)}` }}>
                        <img style={{ height: '90%' }} src={`${getVesselPath(deal.quantity, deal.size)}`}></img>
                    </div>
                    <div className="flexCol">
                        <div className="flexRow">
                            <h2 style={{ fontSize: '28px', margin: 0, lineHeight: 1 }}>{deal.description}</h2>
                            <p className="tag">{deal.category?.toUpperCase()}</p>
                        </div>
                        <div className="flexRow" style={{ margin: '0 1px 2px' }}>
                            <p style={{ fontSize: '18px', fontWeight: 900 }}>{deal.quantity}, {deal.size}</p>
                            <p style={{ fontSize: '16px', fontWeight: 900 }}>{deal.restrictions?.toUpperCase()}</p>

                        </div>
                    </div>
                </div>
                <div>
                    <h3 style={{ color: '#c50a0a', fontWeight: 900 }}>{deal.salePrice}</h3>
                    <s>{deal.retailPrice}</s>
                </div>
            </div>
        </>
    )
}