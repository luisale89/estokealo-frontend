import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";

const modal_id = "main-app-modal"

export const show_modal = ({ title, body, callback }) => {
    document.getElementById("appModalLabel").innerText = title;
    document.getElementById("appModalBody").innerHTML = body;
    document.getElementById("appModalCallback").removeEventListener("click", callback); //remove prev callback
    document.getElementById("appModalCallback").addEventListener("click", callback); //add new callback
    
    const app_modal = document.getElementById(modal_id);
    Modal.getInstance(app_modal)?.show(); //show modal with bootstrap
}

export const AppModal = () => {

    const [modal, setModal] = useState(null);
    const appModal = useRef();

    useEffect(() => {
        setModal(
            new Modal(appModal.current)
        )
    }, []);

    return (
        <>  
            {/* insert modal opener as first sibling*/}
            {/* <span className="d-none" onClick={() => modal.show()}></span>
            {props.children}  */}
            <div
            id={modal_id}
            className="modal fade" 
            ref={appModal}
            tabIndex="-1" aria-labelledby="appModalLabel"
            aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="appModalLabel">default_modal_title</h5>
                            <button type="button" className="btn-close" onClick={() => modal.hide()} aria-label="Close"></button>
                        </div>
                        <div className="modal-body" id="appModalBody">default_modal_body</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" onClick={() => modal.hide()}>Cancelar</button>
                            <button id="appModalCallback" type="button" className="btn btn-primary" onClick={() => modal.hide()}>Continuar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}