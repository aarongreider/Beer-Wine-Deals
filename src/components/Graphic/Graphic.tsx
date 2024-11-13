import "./graphic.css"
import "../../App.css"
import { Deal, categories } from "../../utils"
import { getColor } from "../../utils"
//import convert from 'convert-units';

interface GraphicProps {
    deal: Deal
}

/* type Volume = {
    amount: number
    unit: string
} */
export function Graphic({ deal }: GraphicProps) {
    /* const [volume, setVolume] = useState<Volume>()
    useEffect(() => {
        setVolume(parseVolume(deal.size))
    }, [deal.size]) */

    /* const parseVolume = (size: string): { amount: number, unit: string } => {
        // Regular expression to capture the number and unit separately
        const regex = /^([\d.]+)\s*(\w+)$/;

        const match = size.match(regex);
        console.log(`match: `, match);


        try {
            if (match) {
                const amount = parseFloat(match[1]); // Convert the numeric part to a float
                let unit = match[2].toLowerCase(); // Convert unit to lowercase for consistency
                if (unit === "liter") {
                    unit = "L"
                }

                return { amount, unit };
            } else {
                throw new Error("Invalid size format. Please use format like '12oz' or '1.5 Liter'.");
            }
        } catch (e) {
            return { amount: 0, unit: '' }
        }
    } */
    const getVesselPath = (quantity: string): string => {

        const query = quantity.toLowerCase();
        const linkify = (path: string) => `https://junglejims.com/wp-content/uploads/${path}.svg`

        if (query.includes("can")) {
            return linkify("beer_can_small")
        } else if (query.includes("bottle")) {
            switch (deal.category) {
                case categories.Beer: return linkify("beer_bottle")
                case categories.Wine: return linkify("wine_big")
                case categories.Spirits: return linkify("spirit_bottle")
                default: return linkify("beer_bottle")
            }
        }
        return linkify("box")
    }

    return (
        <>
            <div className="containerContainer" style={{ background: `${getColor(deal.category)}` }}>

                <img src={`${getVesselPath(deal.quantity)}`}></img>
                <p style={{margin: 0}}>{deal.size}</p>

            </div>
        </>
    )
}