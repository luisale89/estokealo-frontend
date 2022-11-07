import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContex";
import { show_modal } from "./modal";

export const AppHeader = () => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);
    const modal_content = {
        title: "Finalizar sesión",
        body: "¿Desea finalizar la sesión?",
        callback: () => {actions.logout_user()}
    }
    
    return (
        <nav className="navbar navbar-expand-lg bg-light fixed-top">
            <div className="container">
                <button 
                    className="navbar-toggler" 
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvas-navbar"
                    aria-controls="offcanvas-navbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" to="/home">Estokealo</Link>
                <div className="dropdown dropstart">
                    <button className="btn btn-link link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                    </button>
                    <ul className="dropdown-menu text-small shadow" style={{margin: "0px"}}>
                        <li><Link className="dropdown-item" to="/home">Nuevo proyecto...</Link></li>
                        <li><Link className="dropdown-item" to="/settings">Configuración</Link></li>
                        <li><Link className="dropdown-item" to="/profile">Perfil</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/settings">Cambiar de empresa...</Link></li>
                        <li><button type="button" className="dropdown-item btn btn-link text-danger" onClick={() => show_modal(modal_content)}>Cerrar Sesión</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}