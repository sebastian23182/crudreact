import React from "react";
import { useAPI } from "./useAPI";

function useData() {
    const { item, loading, error, onError, onSuccess, onSave, onLoading, products, setProducts } = useAPI({});
    const [deleteValues, setDeleteValues] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState("");
    const [searchedValues, setSearchedValues] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [modal, setModal] = React.useState(0); 
    const [productID, setProductID] = React.useState(-1)
    const [pageNumbers, setPageNumbers] = React.useState([])
    const [status, setStatus] = React.useState(null)
    
    React.useEffect(() => {
        if(searchValue.length >= 1){
             setSearchedValues(products.filter((row) => 
             row.toString().toLowerCase().includes(searchValue.toLowerCase())))

        }else{
             setSearchedValues(products);
        }
     }, [searchValue, products])

    const states = {
        searchValue,
        searchedValues,
        deleteValues,
        openModal,
        modal,
        productID,
        products,
        pageNumbers,
        status,
        item, 
        loading, 
        error,
    }

    const stateUpdaters = {
        setSearchValue,
        setDeleteValues,
        setSearchedValues,
        setOpenModal,
        setModal,
        setProductID,
        setProducts,
        setPageNumbers,
        setStatus,
        onError, 
        onSuccess, 
        onSave, 
        onLoading,
    }

    return { states, stateUpdaters };
}

export { useData };