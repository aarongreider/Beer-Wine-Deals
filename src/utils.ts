export type Deal = {
    Category: string,
    Description: string,
    Quantity: string,
    Size: string,
    RetailPrice: number | string,
    SalePrice: string,
    Restrictions?: string,
}

const endpoints = {
    dev: 'https://mobile-api.junglejims.com/fairfield-wine-cellar.json',
    local: 'src/assets/beer-wine-deals.json',
}

export const fetchDealsData = async (): Promise<Deal[]> => {
    try {
        const response = await fetch(import.meta.env.PROD ? endpoints.dev : endpoints.local); // if vite is in production mode run from the cors compatible endpoint
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
    const cleanQuery = `${searchQuery}`.toLowerCase()
    if (cleanQuery) {
        return deals.filter((deal) => {
            return (
                `${deal.Category}`?.toLowerCase().includes(cleanQuery) ||
                `${deal.Description}`?.toLowerCase().includes(cleanQuery) ||
                `${deal.Size}`?.toLowerCase().includes(cleanQuery) ||
                `$${deal.SalePrice}`?.toLowerCase().includes(cleanQuery) ||
                `${deal.Restrictions}`?.toLowerCase().includes(cleanQuery)
            );
        })
    } else {
        return deals
    }
}


export const sortDeals = (filteredDeals: Deal[], sortQuery: string): Deal[] => {
    // Sort the filtered array by Vintage year, with undated bottles at the bottom
    const cleanPrice = (price: number | string): number => {
        const priceString = `${price}`
        if (priceString.includes("for")) {
            // separate the last number of the string
            const arr = priceString.split(' ')
            console.log(arr[arr.length-1]);
            // leaving it like this for now
            //TODO: finish this method
        }
        // Remove non-numeric characters except periods (.) using a regex
        const cleanedPrice = `${price}`.replace(/[^0-9.]/g, '');
        return cleanedPrice === "" ? 0.0 : parseFloat(cleanedPrice); // Convert cleaned string to a float
    };

    if (sortQuery === '') {
        return filteredDeals
    } else {
        let sortedDeals: Deal[] = filteredDeals;
        switch (sortQuery) {
            case "price ascending":
                {
                    filteredDeals.sort((a, b) => {
                        const aPrice = cleanPrice(a.SalePrice ? a.SalePrice : 0); // Convert price to a sortable number
                        const bPrice = cleanPrice(b.SalePrice ? b.SalePrice : 0);

                        return aPrice - bPrice; // Ascending order by Price
                    })
                    break;
                }
            case "price descending":
                {
                    filteredDeals.sort((a, b) => {
                        const aPrice = cleanPrice(a.SalePrice ? a.SalePrice : 0); // Convert price to number
                        const bPrice = cleanPrice(b.SalePrice ? b.SalePrice : 0);

                        return bPrice - aPrice; // Ascending order by Price
                    })
                    break;
                }
            case "alphabetically":
                {
                    filteredDeals.sort((a, b) => {
                        return a.Description?.localeCompare(b.Description);
                    })
                    break;
                }


        }


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
