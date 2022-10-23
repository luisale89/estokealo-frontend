import React from "react";
import { Outlet } from "react-router-dom";

export const Auth = () => {
    return (
        <div id="auth-view" className="container-fluid">
            <div className="row h-100 justify-content-center">
                <div className="custom-form-container col-lg-5">
                    <div className="custom-app-logo">
                        <h1>Estokealo</h1>
                    </div>
                    {/* Login o Signup, dependiendo del endpoint */}
                    <Outlet/> 
                    <div className="custom-login-footer">
                        <h4>Footer</h4>
                    </div>
                </div>
                <div className="custom-side-container d-none d-lg-block col-7">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://http.cat/400" className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img src="https://http.cat/200" className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                            <img src="https://http.cat/500" className="d-block w-100" alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}