import React from "react";
import { Link } from "react-router-dom";

function CrudButtons(props) {
    const onClickButton = () => {
        if(!!props.deleteValuesSize) {
            props.setProductName(`${props.deleteValuesSize}`);
            props.setOpenModal((prevState) => !prevState);
            props.setModal(1);
        }
    };

    return(
        <section className="CrudButtons">
            <Link to="/newProduct">Crear</Link>
            <a onPointerUp={onClickButton}>Borrar</a>
        </section>
    )
}

export { CrudButtons };