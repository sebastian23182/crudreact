import React from "react";
import "./global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRoutes } from "../hooks/useRoutes";
import { Home } from "../components/Home";
import { NewProduct } from "../components/NewProduct";
import { Update } from "../components/Update";
import { Login } from "../components/Login";
import { useData } from "../hooks/useData";

function App(){
    const {
        routes
    } = useRoutes();
    const {
        states, stateUpdaters
    } = useData();

    const {
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
    } = states;

    const {
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
    } = stateUpdaters;

    return(
        <BrowserRouter>
            <Routes>
                <Route path={routes.login} element={<Login
                status={status}
                setStatus={setStatus}
                />}/>
                <Route path={routes.home} element={<Home 
                searchedValues={searchedValues}
                setSearchedValues={setSearchedValues}
                searchValue={searchValue}
                deleteValues={deleteValues}
                setSearchValue={setSearchValue}
                setDeleteValues={setDeleteValues}
                openModal={openModal}
                setOpenModal={setOpenModal}
                modal={modal}
                setModal={setModal}
                productID={productID}
                setProductID={setProductID}
                products={products}
                setProducts={setProducts}
                pageNumbers={pageNumbers}
                setPageNumbers={setPageNumbers}
                loading={loading}
                error={error}
                />} />
                <Route path={routes.newProduct} element={<NewProduct 
                products={products}
                setProducts={setProducts}
                status={status}
                setStatus={setStatus}
                loading={loading}
                error={error}
                />} />
                <Route path={routes.update} element={<Update
                products={products}
                setProducts={setProducts}
                status={status}
                setStatus={setStatus}
                loading={loading}
                error={error}
                onLoading={onLoading}
                onSuccess={onSuccess}
                />} />
                <Route path="*" element={<h3>Not found</h3>} />
            </Routes>
        </BrowserRouter>
    ) 
}

export default App;