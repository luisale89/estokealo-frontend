import { useContext } from "react";
// import { Link } from "react-router-dom";
import { Context } from "../store/appContex";

export const Snackbar = () => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);

    return (
        <div 
        id="snackbar" 
        className={`${store.snackbar_type} ${store.show_snackbar ? "show" : "hide"}`}
        >
            <button 
                onClick={actions.hide_snackbar}
                className="btn btn-link"
                >&times;
            </button>
            <span>{store.snackbar_text}</span>
        </div>
    )
}