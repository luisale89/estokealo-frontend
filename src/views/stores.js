import { Link } from "react-router-dom"


export const Stores = () => {
    return (
        <nav aria-label="breadcrumb" className="container">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/stores">Almacenes</Link></li>
                <li className="breadcrumb-item"><Link to="/stores/principal">Principal</Link></li>
                <li className="breadcrumb-item active" aria-current="page"><i className="bi bi-bookshelf"></i>01.04</li>
            </ol>
        </nav>
    )
}