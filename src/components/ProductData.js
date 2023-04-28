import React from "react";
import { TrashIcon } from "../icons/TrashIcon";
import { UpdateIcon } from "../icons/UpdateIcon";

function ProductData(props) {
    const addDeleteValues = (e) => {
        if (!props.deleteValues.includes(e.target.value) && e.target.checked) {
            const newDeleteValues = [...props.deleteValues, e.target.value];
            props.setDeleteValues(newDeleteValues);
          } else {
            const index = props.deleteValues.indexOf(e.target.value);
            const newDeleteValues = [...props.deleteValues];
            newDeleteValues.splice(index, 1);
            props.setDeleteValues(newDeleteValues);
          }
    }

    return(
        <>
            <tr className="TableRow">
                {props.deleteValues.includes(props.ID.toString()) && <td><input type="checkbox" value={props.ID} onChange={addDeleteValues} checked/></td>}
                {!props.deleteValues.includes(props.ID.toString()) && <td><input type="checkbox" value={props.ID} onChange={addDeleteValues}/></td>}
                <td>{props.ID}</td>
                <td className="TableCell">{props.productName}</td>
                <td className="TableCell">{props.category}</td>
                <td className="TableCell">{props.stock}</td>
                <td className="TableCell">{props.status}</td>
                <td className="TableCell">{props.price}</td>
                <td className="TableButtons">
                    <UpdateIcon ID={props.ID}/>
                    <TrashIcon
                    ID={props.ID}
                    productName={props.productName}
                    setOpenModal={props.setOpenModal}
                    setProductName={props.setProductName}
                    searchedValues={props.searchedValues}
                    setSearchedValues={props.setSearchedValues}
                    setProductID={props.setProductID}
                    setModal={props.setModal}/>
                </td>
            </tr>
        </>           
    )
}

export { ProductData };