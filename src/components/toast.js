import { useContext, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Context } from "../store/appContex";
import { Toast } from "bootstrap";

export const Toast = (props) => {

    //eslint-disable-next-line
    const {store, actions} = useContext(Context);
    const toastRef = useRef();

    useEffect(() => {
        var myToast = toastRef.current;
        var toast = new Toast(myToast, {autohide: false});
        store.toast_shown ? toast.show() : toast.hide();

    }, [store.toast_shown]);

    return (
        <div className="toast" style={{position: "absolute", bottom:"20px", right:"10px"}} ref={toastRef}>
            <div className="toast-header">
                <button className={`btn btn-${store.toast_type}`}></button>
                <strong className="px-2">Notificación</strong>
            </div>
            <div className="toast-body">
            {store.toast_text}
            </div>
        </div>
    )
}