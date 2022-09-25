import { useState } from "react";
import { Link } from "react-router-dom";

export const SideNav = () => {

    return (
        <nav id="side-nav">
            <Link to="/dashboard">dashboard</Link>
            <Link to="about">about</Link>
        </nav>
    )
}