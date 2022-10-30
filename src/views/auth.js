import React from "react";
import { Outlet } from "react-router-dom";

export const Auth = () => {
    return (
        <div id="auth-view" className="container-fluid">
            <div className="row h-100 justify-content-center">
                <div className="custom-auth-container col-lg-5 p-0">
                    <div className="custom-auth-header">
                        <h1>Estokealo</h1>
                    </div>
                    {/* Login o Signup, dependiendo del endpoint */}
                    <div className="custom-auth-content px-3">
                        <Outlet/>
                    </div>
                    <div className="custom-auth-footer w-100 text-center bg-light pt-2 pb-2 border-top">
                    <small>
                        Made with <i className="bi bi-heart-fill" style={{color: "red"}}></i>
                    </small>
                    </div>
                </div>
                <div className="custom-side-container d-none d-lg-block col-7">
                    <p>- side content here -</p>
                </div>
            </div>
        </div>
    )
}