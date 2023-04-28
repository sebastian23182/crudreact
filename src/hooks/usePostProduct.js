const usePostProduct = async (product, setStatus, products, setProducts) => {
    try {
        const API = "http://localhost:3001/products";
        const options = {
            method: "POST",
            body: product
        }
        const res = await fetch(API, options);
        setStatus(res.status)
        if(res.status === 200){
            const data = await res.json();
            const newList = [...products];
            newList.push([ data.ID_PRODUCTO, data.NOMBRE_PRODUCTO, data.ID_CATEGORIA, data.STOCK, data.ID_ESTADO_PRODUCTO, data.PRECIO ])
            setProducts(newList)
        }
    } catch(error){
        console.log(error)
    }
}

export { usePostProduct };