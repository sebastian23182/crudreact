import React from "react";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useDeleteMultipleProducts } from "../hooks/useDeleteMultipleProducts";

function ConfirmDelete({setOpenModal, productName, deleteValues, setDeleteValues, productID, searchedValues, setSearchedValues, modal, products, setProducts}) {
    const onCancel = (event) => {
        setOpenModal(false);
    }

    const onSubmitSingle = (e) => {
        e.preventDefault();
        useDeleteProduct({ID_PRODUCTO: productID});
        const removeIndex = products.findIndex((product) => product[0] === productID);
        const newList = [...products]
        newList.splice(removeIndex, 1)
        setProducts(newList)
        if(deleteValues.includes(String(productID))){
            const deleteIndex = deleteValues.indexOf(String(productID));
            const newDeleteValues = [...deleteValues];
            newDeleteValues.splice(deleteIndex, 1)
            setDeleteValues(newDeleteValues)
        }
        setOpenModal(false)
    }

    const onSubmitMultiple = (e) => {
        e.preventDefault();
        const newProducts = [...products].filter((product) => !deleteValues.includes(String(product[0])));
        setProducts(newProducts)
        useDeleteMultipleProducts({PRODUCTOS: deleteValues})
        setOpenModal(false);
        setDeleteValues([]);
    }
    
    return (
        <>
        {modal === 0 && (
            <form className="FormTodo" method="POST" onSubmit={onSubmitSingle}>
                <label className="FormTitle">¿Está seguro de eliminar el producto {productName}?</label>
                <div className="Form-ButtonContainer">
                <button className="FormButton FormButton--cancel" onPointerUp={onCancel} type="button" >
                    Cancelar
                </button>
                <button className="FormButton FormButton--add" type="submit">
                    Confirmar
                </button>
                </div>
            </form>
        )}
        {modal === 1 && (
            <form className="FormTodo" method="POST" onSubmit={onSubmitMultiple}>
                <label className="FormTitle">¿Está seguro de eliminar {deleteValues.length} productos?</label>
                <div className="Form-ButtonContainer">
                <button className="FormButton FormButton--cancel" onPointerUp={onCancel} type="button" >
                    Cancelar
                </button>
                <button className="FormButton FormButton--add" type="submit">
                    Confirmar
                </button>
                </div>
            </form>
        )}
        </>
    );
}

export { ConfirmDelete };