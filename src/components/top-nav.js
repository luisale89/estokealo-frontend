import { useContext } from "react";
// import { Link } from "react-router-dom";
import { Context } from "../store/appContex";
import { AppModal, openModalFromSibling } from "./modal";

export const TopNav = () => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);

    return (
        <div id="top-nav">
            <div>TopNav component</div>
            <span>search field</span>
            <AppModal 
                title={"Cierre de Sesión"} 
                body="¿Deseas finalizar la sesión?"
                submitText="Finalizar sesión"
                callBack={actions.logout_user}
            >
                {/* modal opener as prop.children */}
                <button 
                id="closeSession-modal"
                className="btn btn-outline-primary"
                onClick={event => openModalFromSibling(event)}>
                    modal opener
                </button>
            </AppModal>
        </div>
    )
}