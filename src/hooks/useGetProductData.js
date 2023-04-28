import React from "react";

function useGetProductData(ID_PRODUCTO, onLoading, onSuccess){
    const API = `http://localhost:3001/update/${ID_PRODUCTO}`;
    const [productData, setProductData] = React.useState([]);
    const options = {
        method: "GET"
    }
    React.useEffect(() => {
        onLoading();
            (async ()=> {
                const response = await fetch(API, options);
                if(response.status === 404){
                    window.location.replace("../*")
                    return
                }
                onSuccess();
                const data = await response.json();
                setProductData(await data[0]);
            })();
    }, []);
    
    return { productData, setProductData };
}

export { useGetProductData };