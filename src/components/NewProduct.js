import React from "react";
import { usePostProduct } from "../hooks/usePostProduct";
import { useGetProductOptions } from "../hooks/useGetProductOptions";
import { BackButton } from "../icons/BackButton";
import { useGetTokenStatus } from "../hooks/useGetTokenStatus";
import { Loading } from "./Loading";
import { Error } from "./Error";

useGetTokenStatus();

function NewProduct({ products, setProducts, status, setStatus, loading, error }) { 
    const {
        formOptions
    } = useGetProductOptions();

    const productStatus = formOptions.length > 0 ? formOptions[0].map((row) => 
    <option key={row[0]} value={row[0]}>{row[1]}</option>) : null;
    const category = formOptions.length > 0 ? formOptions[1].map((row) => 
    <option key={row[0]} value={row[0]}>{row[1]}</option>) : null;

    const [imgData, setImgData] = React.useState(null);

    const onChangePicture = (e) => {
        if (e.target.files[0]) {
            if(!e.target.files[0].type.startsWith('image/')){
                setImgData(" ");
                e.target.value = null;
                return;
            }
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setImgData(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);
        }
      };

    const onSubmit = async (e) => {
        e.preventDefault();
        const tokenStatus = await useGetTokenStatus();
        if(tokenStatus === false){
            return false
        }else{
            try {
                const data = new FormData();
                data.append("ID_ESTADO_PRODUCTO", Number(e.target.ID_ESTADO_PRODUCTO.value));
                data.append("ID_CATEGORIA", Number(e.target.ID_CATEGORIA.value));
                data.append("NOMBRE_PRODUCTO", e.target.NOMBRE_PRODUCTO.value);
                data.append("STOCK", Number(e.target.STOCK.value));
                data.append("PRECIO", Number(e.target.PRECIO.value));
                if(e.target.IMAGEN.files[0] && e.target.IMAGEN.files[0].type.startsWith('image/')){
                    data.append("file", e.target.IMAGEN.files[0]);
                }
                usePostProduct(data, setStatus, products, setProducts);
                e.target.reset();
                setImgData(" ");
                setTimeout(() => {
                    setStatus(null)
                }, 2000)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const characterLimit = (e) => {
        if (e.target.value.length > 150) {
            e.target.value = e.target.value.slice(0, 150);
          }
    }

    const deleteNegativeNumbersOne = (e) => {
        //99999999999999999n
        e.target.value = !!e.target.value && Math.abs(e.target.value) >= 1 && Math.abs(e.target.value) <= 99999999999999n ? Math.abs(e.target.value) : "";
        if (e.target.value.length > 13) {
          e.target.value = e.target.value.slice(0, 13);
        }
    }

    return(
        <>
        {loading && <Loading/>}
        {error && <Error/>}
        {loading === false && error === false && (
            <section className="FormContainer">
            <div className="FormHeader">
            <BackButton/>
            <h2>Añadir producto al inventario</h2>
            </div>
            <form method="POST" encType="multipart/form-data" onSubmit={onSubmit}>
                <label>ESTADO DEL PRODUCTO</label>
                <select name="ID_ESTADO_PRODUCTO">
                    {productStatus}
                </select>
                <label>CATEGORIA</label>
                <select name="ID_CATEGORIA">
                    {category}
                </select>
                <label>NOMBRE DEL PRODUCTO
                    <input type="text" name="NOMBRE_PRODUCTO" onChange={characterLimit} required/>
                </label>
                <label>STOCK
                    <input type="number" name="STOCK" min="1" onChange={deleteNegativeNumbersOne} required/>
                </label>
                <label>PRECIO
                    <input type="number" step="any" name="PRECIO" min="1" onChange={deleteNegativeNumbersOne} required/>
                </label>
                <label>IMAGEN</label>
                <img className="Image-Preview" alt="" src={imgData}/>
                <label className="ImageInput-label">
                    <input name="IMAGEN" className="ImageInput" type="file" accept="image/jpeg, image/png, image/jpg" onChange={onChangePicture}/>
                </label>
                <button type="submit" className="Submit">Guardar</button>
            </form>
            {status === 200 && (
                <div className="postSuccess">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z" fill="rgba(122,194,113,1)"></path></svg>
                    <h1>Registro creado exitosamente</h1>
                </div>
            )}
            {status === 400 && (
                <div className="postSuccess">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z" fill="rgba(243,95,95,1)"></path></svg>
                    <h1>Registro erroneo</h1>
                </div>
            )}
            {status === 409 && (
                <div className="postSuccess">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z" fill="rgba(243,95,95,1)"></path></svg>
                    <h1>Valor ya existente</h1>
                </div>
            )}
        </section>
        )}  
        </>
    )
}

export { NewProduct };

