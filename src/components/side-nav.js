import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppModal, openModalFromSibling } from "./modal";
import { Context } from "../store/appContex";

export const SideNav = () => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);
    
    return (
        <div className="d-flex flex-column p-3 bg-white h-100" style={{width: "100%"}}>
            <Link to="/home" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg className="bi pe-none me-2" width="40" height="32"></svg>
                <span className="fs-4">Estokealo</span>
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto" style={{overflow:"auto", flexWrap:"nowrap"}}>
                <li className="nav-item">
                    <NavLink to="/home" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"} aria-current="page">
                        <i className="bi bi-house-fill pe-none me-2"></i>
                        <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>
                        <i className="bi bi-speedometer pe-none me-2"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/orders" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>
                        <i className="bi bi-card-checklist pe-none me-2"></i>
                        <span>Pedidos</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>
                        <i className="bi bi-boxes pe-none me-2"></i>
                        <span>Productos</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/stores" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>
                        <i className="bi bi-shop pe-none me-2"></i>
                        <span>Almacenes</span>
                    </NavLink>
                </li>
                <li style={{position:"relative"}}>
                    <NavLink to="/thirds" className={({isActive}) => isActive ? "nav-link active btn-toggle" : "nav-link link-dark"} data-bs-toggle="collapse" data-bs-target="#thirds-collapse" aria-expanded="true">
                        <i className="bi bi-people-fill pe-none me-2"></i>
                        <span>Terceros</span>
                        <i className="bi bi-arrows-collapse" style={{position:"absolute", right:10}}></i>
                    </NavLink>
                    <div className="collapse my-2" id="thirds-collapse">
                        <ul className="nav flex-column ps-4">
                            <li><NavLink to="/thirds/clients" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>Clientes</NavLink></li>
                            <li><NavLink to="/thirds/providers" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>Proveedores</NavLink></li>
                            <li><NavLink to="/thirds/users" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>Usuarios</NavLink></li>
                        </ul>
                    </div>
                </li>
                <li>
                    <NavLink to="/settings" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>
                        <i className="bi bi-toggles2 pe-none me-2"></i>
                        <span>Configuración</span>
                    </NavLink>
                </li>
            </ul>
            <hr />
            <ul className="nav nav-pills flex-column">
                <li>
                    <NavLink to="/profile" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>
                        {/* <svg className="bi pe-none me-2" width="16" height="16"></svg> */}
                        <i className="bi bi-person-circle pe-none me-2"></i>
                        <span>Perfil</span>
                    </NavLink>
                </li>
                <li style={{cursor:"pointer"}}>
                    <AppModal 
                        title="Finalizar sesión"
                        body="¿Desea finalizar la sesión?"
                        submitText="Cerrar Sesión"
                        callback={actions.logout_user}
                        >
                        <span id="close-session-modal" className="nav-link link-danger" onClick={event => openModalFromSibling(event)}>
                            <i className="bi bi-box-arrow-left pe-none me-2" style={{pointerEvents: "none"}}></i>
                            <span style={{pointerEvents: "none"}}>Cerrar Sesión</span>
                        </span>
                    </AppModal>
                </li>
            </ul>

            {/* <a className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                <strong>mdo</strong>
            </a>
            <div className="dropdown">
                <ul className="dropdown-menu text-small shadow">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><Link className="dropdown-item" to="/">Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div> */}
        </div>
    )
}