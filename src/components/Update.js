import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetProductData } from "../hooks/useGetProductData";
import { useGetProductOptions } from "../hooks/useGetProductOptions";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { BackButton } from "../icons/BackButton";
import { useGetTokenStatus } from "../hooks/useGetTokenStatus";
import { Loading } from "./Loading";
import { Error } from "./Error";

useGetTokenStatus();

function Update({ products, setProducts, status, setStatus, loading, error, onLoading, onSuccess }) {
    const params = useParams();
    const fileInputRef = useRef(null);
    const {
        productData,
        setProductData
    } = useGetProductData(params.ID, onLoading, onSuccess);

    const {
        formOptions
    } = useGetProductOptions();

    const characterLimit = (e) => {
        if (e.target.value.length > 150) {
            e.target.value = e.target.value.slice(0, 150);
          }
    }

    const deleteNegativeNumbersOne = (e) => {
        e.target.value = !!e.target.value && Math.abs(e.target.value) >= 1 && Math.abs(e.target.value) < 99999999999999n ? Math.abs(e.target.value) : "";
        if (e.target.value.length > 13) {
          e.target.value = e.target.value.slice(0, 13);
        }
    }

    const productStatus = formOptions.length > 0 ? formOptions[0].map((row) => 
    <option key={row[0]} value={row[0]}>{row[1]}</option>) : null;
    const category = formOptions.length > 0 ? formOptions[1].map((row) => 
    <option key={row[0]} value={row[0]}>{row[1]}</option>) : null;
    const [selectedProductStatus, setSelectedProductStatus] = React.useState(productData[1]);
    const [selectedCategory, setSelectedCategory] = React.useState(productData[2]);
    const [imgData, setImgData] = React.useState(null);
    const [fileSelected, setFileSelected] = React.useState(false);

    const onChangePicture = (e) => {
        if (e.target.files[0]) {
          setFileSelected(true)
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = () => {
            setImgData(reader.result);
          }
        }
    };

    const onStatusSelectChange = (e) => {
        setSelectedProductStatus(e.target.value)
    }

    const onCategorySelectChange = (e) => {
        setSelectedCategory(e.target.value)
    }
    
    React.useEffect(() => {
        setImgData(productData[6])
        setSelectedProductStatus(productData[1])
        setSelectedCategory(productData[2])
    }, [productData])

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus(null)
        const tokenStatus = await useGetTokenStatus();
        if(tokenStatus === false){
            return false
        }else{
            try {
                if(Number(e.target.ID_ESTADO_PRODUCTO.value) === productData[1] && Number(e.target.ID_CATEGORIA.value) === productData[2] && e.target.NOMBRE_PRODUCTO.value === productData[3] && Number(e.target.STOCK.value) === Number(productData[4]) && Number(e.target.PRECIO.value) === Number(productData[5]) && !!fileSelected === false){
                    setStatus(304)
                    setTimeout(() => {
                        setStatus(null)
                        return false
                    }, 2000)
                }else{
                    setFileSelected(false)
                    const data = new FormData();
                    data.append("ID_PRODUCTO", Number(productData[0]))
                    data.append("ID_ESTADO_PRODUCTO", Number(e.target.ID_ESTADO_PRODUCTO.value));
                    data.append("ID_CATEGORIA", Number(e.target.ID_CATEGORIA.value));
                    data.append("NOMBRE_PRODUCTO", e.target.NOMBRE_PRODUCTO.value);
                    data.append("STOCK", Number(e.target.STOCK.value));
                    data.append("PRECIO", Number(e.target.PRECIO.value));
                    if(e.target.IMAGEN.files[0]){
                        data.append("file", e.target.IMAGEN.files[0]);
                    }
                    useUpdateProduct(data, productData[0], setStatus, products, setProducts, imgData, setProductData);
                    setTimeout(() => {
                        setStatus(null)
                    }, 2000)
                }
            } catch (error) {
                console.log(error)
            }
        }  
    }

    return(
        <>
        <div className="Home">
        {loading && <Loading/>}
        {error && <Error/>}
        {loading === false && error === false && !!productData.length && (
            <section className="FormContainer">
            <div className="FormHeader">
                <BackButton/>
                <h2>Actualizar producto</h2>
            </div>
            <form method="POST" encType="multipart/form-data" onSubmit={onSubmit}>
                <label>ID PRODUCTO</label>
                <input type="number" placeholder={productData[0]} readOnly required/>
                <label>ESTADO DEL PRODUCTO</label>
                <select name="ID_ESTADO_PRODUCTO" value={selectedProductStatus} onChange={onStatusSelectChange}>
                        {productStatus}
                </select>  
                <label>CATEGORIA</label>
                <select name="ID_CATEGORIA" value={selectedCategory} onChange={onCategorySelectChange}>
                    {category}
                </select>
                <label>NOMBRE DEL PRODUCTO
                    <input type="text" name="NOMBRE_PRODUCTO" defaultValue={productData[3]} onChange={characterLimit} required/>
                </label>
                <label>STOCK
                    <input type="number" name="STOCK" min="0" defaultValue={productData[4]} onChange={deleteNegativeNumbersOne} required/>
                </label>
                <label>PRECIO
                    <input type="number" step="any" name="PRECIO" min="0" defaultValue={productData[5]} onChange={deleteNegativeNumbersOne} required/>
                </label>
                <label>IMAGEN</label>
                <img className="Image-Preview" src={imgData} />
                <label className="ImageInput-label">
                    <input name="IMAGEN" className="ImageInput" ref={fileInputRef} type="file" accept="image/jpeg, image/png, image/jpg" onChange={onChangePicture}/>
                </label>
                <button type="submit" className="Submit">Guardar</button>
        </form>
        {status === 200 && (
            <div className="postSuccess">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z" fill="rgba(122,194,113,1)"></path></svg>
                <h1>Registro actualizado</h1>
            </div>
        )}
        {status === 400 && (
            <div className="postSuccess">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z" fill="rgba(243,95,95,1)"></path></svg>
                <h1>Registro erroneo</h1>
            </div>
        )}
        {status === 304 && (
            <div className="postSuccess">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z" fill="rgba(243,95,95,1)"></path></svg>
                <h1>Datos ya existentes</h1>
            </div>
        )}
        </section>
        ) 
        }
        </div>
        </>
        )
}

export { Update };