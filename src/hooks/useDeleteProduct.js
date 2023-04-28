const useDeleteProduct = async (product) => {
    try {
        const API = `http://localhost:3001/products/`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        }
        const res = await fetch(API, options);
        if(!res.ok){
            const data = await res.json();
            console.log(data.description);
            return
        }
    } catch(error){
        console.log(error)
    }
}

export { useDeleteProduct };
