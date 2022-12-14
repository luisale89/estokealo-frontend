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
                <Link className="navbar-brand btn btn-outline-muted rounded-pill" to="/home">Estokealo</Link>
                <div className="dropdown dropstart">
                    <button 
                        className="btn btn-outline-primary ms-2 rounded-pill shadow-sm dropdown-toggle d-flex align-items-center" 
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                        <strong className="ms-2 d-none d-md-inline-block text-truncate" style={{maxWidth: "100px"}}>
                            {store.sessionUserData.firstName}
                        </strong>
                    </button>
                    <ul className="dropdown-menu text-small shadow" style={{margin: "0px"}}>
                        <li className="dropdown-header">
                            <div style={{maxWidth:"200px"}}>
                                <strong className="d-block text-primary text-truncate"><i className="bi bi-person-check-fill pe-none me-2"></i>
                                    {store.sessionUserData.firstName  + " " + store.sessionUserData.lastName}
                                </strong>
                                <span className="d-block text-truncate"><i className="bi bi-person-badge pe-none me-2"></i>
                                    {store.sessionRoleData ? store.sessionRoleData.roleFunction.name: "-"}
                                </span>
                                <span className="d-block text-truncate"><i className="bi bi-building pe-none me-2"></i>
                                    {store.sessionRoleData ? store.sessionRoleData.company.name : "-"}
                                </span>
                            </div>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        {/* <li><hr className="dropdown-divider" /></li> */}
                        <li><Link className="dropdown-item" to="/settings">Configuración</Link></li>
                        <li><Link className="dropdown-item" to="/profile">Perfil</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/settings">Cambiar de empresa...</Link></li>
                        <li>
                            <button type="button" className="dropdown-item btn btn-link text-danger" onClick={() => show_modal(modal_content)}>
                                <i className="bi bi-box-arrow-right pe-none me-2"></i>
                                <span>Cerrar Sesión</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}