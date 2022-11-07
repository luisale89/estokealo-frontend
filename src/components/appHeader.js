import { useContext } from "react";
import { Link } from "react-router-dom";
// import { AppModal, openModalFromSibling } from "./modal";
import { Context } from "../store/appContex";

export const AppHeader = () => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);

    const toggleNavbar = () => {
        let navbar = document.getElementById("main-navbar");
        const toggle_style = "show-navbar"
        if (!navbar) {
            return null;
        }

        if (navbar.classList.contains(toggle_style)) {
            navbar.classList.remove(toggle_style);
            return null;
        } else {
            navbar.classList.add(toggle_style);
            return null;
        }
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
                    <a className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                    </a>
                    <ul className="dropdown-menu text-small shadow" style={{margin: "0px"}}>
                        <li><Link className="dropdown-item" to="/home">Nuevo proyecto...</Link></li>
                        <li><Link className="dropdown-item" to="/settings">Configuración</Link></li>
                        <li><Link className="dropdown-item" to="/profile">Perfil</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/settings">Cambiar de empresa...</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}