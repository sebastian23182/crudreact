import React from "react";

function useGetProducts(){
    const [products, setProducts] = React.useState([]);
    const API = "http://localhost:3001/products";
    const options = {
        method: "GET"
    }
    React.useEffect(() => {
            (async ()=> {
                const response = await fetch(API, options);
                setProducts(await response.json());
            })();
    }, []);
    return { products }
}

export { useGetProducts};