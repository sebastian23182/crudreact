const useUpdateProduct = async (product, ID_PRODUCTO, setStatus, products, setProducts, imgData, setProductData) => {
    try {
        const API = `http://localhost:3001/update/${ID_PRODUCTO}`;
        const options = {
            method: "PUT",
            body: product
        }
        const res = await fetch(API, options);
        setStatus(res.status)
        if(res.status === 200){
            const data = await res.json();
            setProductData([ data.ID_PRODUCTO, data.ID_ESTADO_PRODUCTO, data.ID_CATEGORIA, data.NOMBRE_PRODUCTO, data.STOCK, data.PRECIO, imgData])
            setProducts(products.map((item) => {
                if(item[0] === ID_PRODUCTO){
                    return [ data.ID_PRODUCTO, data.NOMBRE_PRODUCTO, data.CATEGORIA, data.STOCK, data.ESTADO_PRODUCTO, data.PRECIO ]
                }
                return item
            }))
        }
    } catch(error){
        console.log(error)
    }
}

export { useUpdateProduct };