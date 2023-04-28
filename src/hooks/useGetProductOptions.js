import React from "react";

function useGetProductOptions(){
    const API = "http://localhost:3001/newProduct";
    const [formOptions, setFormOptions] = React.useState([]);
    const options = {
        method: "GET"
    }
    React.useEffect(() => {
        (async ()=> {
            const response = await fetch(API, options);
            setFormOptions(await response.json());
        })();
    }, [formOptions]);
    
    return { formOptions };
}

export { useGetProductOptions };