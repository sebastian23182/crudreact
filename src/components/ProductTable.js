import React from "react";

function ProductTable(props) {
    const renderFunc = props.children || props.render;

    React.useEffect(() => {
        if(!props.currentPage.length && props.page != 1){
            props.setPage(props.page-1)
        }
    },[props.currentPage])

    return(
        <table>
            <thead>
                    <tr className="TableHead">
                        <th></th>
                        <th>ID</th>
                        <th>Nombre producto</th>
                        <th>Categoria</th>
                        <th>Stock</th>
                        <th>Estado</th>
                        <th>Precio</th>
                        <th></th>
                    </tr>
            </thead>
            <tbody>
                {props.error}
                {props.loading}
                {(!props.loading && !props.error) && props.currentPage.map(renderFunc)}
            </tbody>
        </table>
    )
}

export { ProductTable };