import { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Context } from "../store/appContex";
import { Offcanvas } from "bootstrap";

export const Navbar = () => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);
    let location = useLocation();
    //hide offcanvas when url changes
    useEffect(() => {
        const offcanvas_navbar = document.getElementById("offcanvas-navbar");
        Offcanvas.getInstance(offcanvas_navbar)?.hide();
    }, [location])

    return (
        <div 
            id="offcanvas-navbar"
            className="col-3 offcanvas-lg offcanvas-start p-3 d-flex flex-column shadow-sm"
            tabIndex="-1"
            aria-labelledby="offcanvasLabel"
            >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasLabel">Estokealo</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvas-navbar" aria-label="Close"></button>
            </div>
            <ul 
                className="nav nav-pills flex-column mb-auto" 
                style={{overflowY:"auto", flexWrap:"nowrap"}}
                >
                <li className="nav-item">
                    <NavLink to="/home" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>
                        <i className="bi bi-house-door-fill pe-none me-2"></i>
                        <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>
                        <i className="bi bi-graph-up-arrow pe-none me-2"></i>
                        <span>Estadísticas</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/orders" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>
                        <i className="bi bi-card-checklist pe-none me-2"></i>
                        <span>Órdenes</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/stores" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>
                        <i className="bi bi-shop-window pe-none me-2"></i>
                        <span>Almacenes</span>
                    </NavLink>
                </li>
                <li style={{position:"relative"}}>
                    <NavLink to="/catalogs" className={({isActive}) => isActive ? "nav-link active btn-toggle" : "nav-link link-dark"} data-bs-toggle="collapse" data-bs-target="#catalogs-collapse" aria-expanded="true">
                        <i className="bi bi-book pe-none me-2"></i>
                        <span>Catálogos</span>
                        <i className="bi bi-caret-down-fill" style={{position:"absolute", right:10}}></i>
                    </NavLink>
                    <div className="collapse my-2" id="catalogs-collapse">
                        <ul className="nav flex-column ps-4">
                            <li><NavLink to="/catalogs/items" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}><i className="bi bi-boxes pe-none me-2"></i><span>Items</span></NavLink></li>
                            <li><NavLink to="/catalogs/qrcodes" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}><i className="bi bi-qr-code-scan pe-none me-2"></i><span>Códigos QR</span></NavLink></li>
                        </ul>
                    </div>
                </li>
                <li style={{position:"relative"}}>
                    <NavLink to="/resources" className={({isActive}) => isActive ? "nav-link active btn-toggle" : "nav-link link-dark"} data-bs-toggle="collapse" data-bs-target="#resources-collapse" aria-expanded="true">
                        <i className="bi bi-briefcase pe-none me-2"></i>
                        <span>Recursos</span>
                        <i className="bi bi-caret-down-fill" style={{position:"absolute", right:10}}></i>
                    </NavLink>
                    <div className="collapse my-2" id="resources-collapse">
                        <ul className="nav flex-column ps-4">
                            <li><NavLink to="/resources/users" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}><i className="bi bi-people pe-none me-2"></i><span>Usuarios</span></NavLink></li>
                            <li><NavLink to="/resources/clients" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}><i className="bi bi-person-check pe-none me-2"></i><span>Clientes</span></NavLink></li>
                            <li><NavLink to="/resources/providers" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}><i className="bi bi-globe pe-none me-2"></i><span>Proveedores</span></NavLink></li>
                        </ul>
                    </div>
                </li>
                <hr />
                <li>
                    <NavLink to="/profile" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>
                        {/* <svg className="bi pe-none me-2" width="16" height="16"></svg> */}
                        <i className="bi bi-person-circle pe-none me-2"></i>
                        <span>Perfil</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/settings" className={({isActive}) => isActive ? "nav-link active" : "nav-link link-dark"}>
                        <i className="bi bi-gear pe-none me-2"></i>
                        <span>Configuración</span>
                    </NavLink>
                </li>
            </ul>
            <div className="w-100 text-center pt-2 border-top">
                <small>
                    Made with <i className="bi bi-heart-fill" style={{color: "red"}}></i>
                </small>
            </div>
        </div>
    )
}