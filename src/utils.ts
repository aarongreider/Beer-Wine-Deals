export type Deal = {
    category: string,
    description: string,
    quantity: string,
    size: string,
    retailPrice: number | string,
    salePrice: string,
    restrictions?: string,
}

export const categories = {
    Beer: "Beer",
    Wine: "Wine",
    Spirits: "Spirits",
    Other: "Other"
}

export const colors = {
    Beer: '#f7941d',
    Wine: '#9e1f63',
    Spirits: '#ed1c24',
    Other: '#39b54a'
}

const endpoints = {
    prod: 'https://mobile-api-dev.junglejims.com/beer-wine-deals.json',
    local: 'src/assets/beer-wine-deals.json',
}

/* const imagePaths = {
    can_single
    can_4pk
    can_6pk
    can_8pk
    can_12pk
    can_18pk
    can_24pk
    bottle_single
    bottle_4pk
    bottle_6pk
    bottle_10pk
    bottle_12pk
    bottle_24pk
    
} */



export const fetchDealsData = async (): Promise<Deal[]> => {
    try {
        const response = await fetch(import.meta.env.PROD ? endpoints.prod : endpoints.local); // if vite is in production mode run from the cors compatible endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const dealData = await response.json();
        return dealData.beerWineDeals as Deal[];
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Ensure the error is propagated if necessary
    }
}

export const filterDeals = (deals: Deal[], searchQuery: string): Deal[] => {
    // filter bottle list based on query match, runs more frequently
    console.log(searchQuery);

    const cleanQuery = `${searchQuery}`.toLowerCase()
    if (cleanQuery) {
        return deals.filter((deal) => {
            return (
                `${deal.category}`?.toLowerCase().includes(cleanQuery) ||
                `${deal.description}`?.toLowerCase().includes(cleanQuery) ||
                `${deal.size}`?.toLowerCase().includes(cleanQuery) ||
                `${deal.salePrice}`?.toLowerCase().includes(cleanQuery) ||
                `${deal.restrictions}`?.toLowerCase().includes(cleanQuery)
            );
        })
    } else {
        return deals
    }
}
export const filterWithChips = (deals: Deal[], activeChips: string[]): Deal[] => {
    // filter bottle list based on query match, runs more frequently
    if (activeChips.length > 0) {
        return deals.filter((deal) => { // filter deals matching condition
            return activeChips.some((query) => { // if any active chip matches condition against deal
                return `${deal.category}`.toLowerCase().includes(query.toLowerCase()) ? // if category and tab match
                    true : query.toLowerCase() === categories.Other.toLowerCase() && // else if other tab is active
                    ![
                        categories.Beer.toLowerCase(),
                        categories.Wine.toLowerCase(),
                        categories.Spirits.toLowerCase()
                    ].includes(`${deal.category}`.toLowerCase())  // return true if it does not match any other tab name
            })
        })
    } else {
        return deals
    }
}


export const sortDeals = (filteredDeals: Deal[], sortQuery: string): Deal[] => {
    // Sort the filtered array by Vintage year, with undated bottles at the bottom
    const cleanPrice = (price: number | string): number => {
        let priceString = `${price}`
        //console.log(priceString);

        if (priceString.includes("for")) {
            // separate the last number of the string
            const arr = priceString.split(' ')
            priceString = arr[arr.length - 1];
        }
        // Remove non-numeric characters except periods (.) using a regex
        const cleanedPrice = `${priceString}`.replace(/[^0-9.]/g, '');
        //console.log(parseFloat(cleanedPrice));

        return cleanedPrice === "" ? 0.0 : parseFloat(cleanedPrice); // Convert cleaned string to a float
    }

    const perUnitPrice = (price: number | string): number => {

        if (`${price}`.includes("for")) {
            // separate the first and last number of the string, then divide for the per unit price
            const totalPrice = cleanPrice(`${price}`)
            const arr = `${price}`.split(' ')
            const saleQuantity = parseFloat(arr[0]);
            //console.log("sale, total, sale / total ", saleQuantity, totalPrice, totalPrice / saleQuantity);

            return totalPrice / saleQuantity
        }
        return cleanPrice(price)
    }

    if (sortQuery === '') {
        return filteredDeals
    } else {
        let sortedDeals: Deal[] = filteredDeals;
        console.log('sortQuery', sortQuery);

        switch (sortQuery) {
            case "price ascending":
                {
                    filteredDeals.sort((a, b) => {
                        const aPrice = cleanPrice(a.salePrice ? a.salePrice : 0); // Convert price to a sortable number
                        const bPrice = cleanPrice(b.salePrice ? b.salePrice : 0);

                        return aPrice - bPrice; // Ascending order by Price
                    })
                    break;
                }
            case "price descending":
                {
                    filteredDeals.sort((a, b) => {
                        const aPrice = cleanPrice(a.salePrice ? a.salePrice : 0); // Convert price to number
                        const bPrice = cleanPrice(b.salePrice ? b.salePrice : 0);

                        return bPrice - aPrice; // Ascending order by Price
                    })
                    break;
                }
            case "alphabetically":
                {
                    filteredDeals.sort((a, b) => {
                        return a.description?.localeCompare(b.description);
                    })
                    break;
                }
            case "percent off":
                {
                    // TODO: calculate % off
                    filteredDeals.sort((a, b) => {
                        const aDiscount = a.salePrice && a.retailPrice ? cleanPrice(a.retailPrice) - perUnitPrice(a.salePrice) : 0; // Convert price to number
                        const bDiscount = b.salePrice && b.retailPrice ? cleanPrice(b.retailPrice) - perUnitPrice(b.salePrice) : 0;
                        //console.log("A: ", a.description, aDiscount, "B: ", b.description, bDiscount);
                        return bDiscount - aDiscount; // Ascending order by Price
                    })
                    break;
                }
        }
        console.log(sortedDeals);

        return sortedDeals
    }
}

export const assignStyles = () => {
    // get scrollbar width
    const scrollbarWidth = document.documentElement.clientWidth - window.innerWidth

    // brute force the correct widths and overflow properties
    const wrapper: HTMLDivElement | null = document.getElementById('wrapper') as HTMLDivElement
    const root: HTMLDivElement | null = document.getElementById("root") as HTMLDivElement
    const btn: HTMLLinkElement | null = document.querySelector("#header > div > div.header-holder > div.sub-nav > a")
    const header: HTMLLinkElement | null = document.querySelector("#header")

    const wrapperStyle = {
        overflow: 'visible',
        width: `calc(100svw + ${scrollbarWidth}px)`
    }
    const rootStyle = {
        width: `calc(100svw + ${scrollbarWidth}px)`
    }

    const btnStyle = {
        width: 'auto',
        whiteSpace: 'normal', // Equivalent to text wrapping
        overflow: 'visible'
    };

    const navStyle = {
        position: 'relative',
        zIndex: 101,
    };

    // Apply each style from the object to the element
    wrapper && Object.assign(wrapper.style, wrapperStyle);
    root && Object.assign(root.style, rootStyle);
    btn && Object.assign(btn.style, btnStyle);
    header && Object.assign(header.style, navStyle);
}

export const assignDevStyles = () => {
    // Array of stylesheet URLs
    const stylesheets = [
        "./src/Default CSS/907ce8a0_ai1ec_parsed_css.css",
        "./src/Default CSS/ajax-load-more.min.css",
        "./src/Default CSS/all.css",
        "./src/Default CSS/bootstrap.min.css",
        "./src/Default CSS/calendar.css",
        "./src/Default CSS/czo1ptk.css",
        "./src/Default CSS/item-search-frontend.css",
        "./src/Default CSS/jquery.fancybox.css",
        "./src/Default CSS/jquery.fancybox.min.css",
        "./src/Default CSS/js_composer.min.css",
        "./src/Default CSS/perfect-columns.css",
        "./src/Default CSS/print.min.css",
        "./src/Default CSS/style-wp.css",
        "./src/Default CSS/style.css",
        "./src/Default CSS/styles__ltr.css",
        "./src/Default CSS/styles.css",
        "./src/Default CSS/v4-shims.css"
    ];

    // Function to dynamically add stylesheets

    const addStylesheets = (stylesheets: string[]) => {
        const head = document.head || document.getElementsByTagName('head')[0];
        stylesheets.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            head.appendChild(link);
        });
    }

    // Add the stylesheets to the head
    import.meta.env.PROD ? undefined : addStylesheets(stylesheets)
}