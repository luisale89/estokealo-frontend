import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";

export const openModalFromSibling = (event) => {
    document.getElementById(event.target.id).nextElementSibling.click(); //click modal opener
    return null;
}

export const AppModal = (props) => {

    const {title, body, submitText, callback} = props;
    const [modal, setModal] = useState(null);
    const appModal = useRef();

    useEffect(() => {
        setModal(
            new Modal(appModal.current)
        )
    }, []);

    const executeCallback = () => {
        // callback;
        callback();
        modal.hide();
        return null;
    }

    return (
        <>  
            {/* insert modal opener as first sibling*/}
            {props.children} 
            <span className="d-none" onClick={() => modal.show()}></span>
            <div 
            className="modal fade" 
            ref={appModal}
            tabIndex="-1" aria-labelledby="appModalLabel"
            aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="appModalLabel">{title}</h5>
                            <button type="button" className="btn-close" onClick={() => modal.hide()} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">{body}</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => modal.hide()}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={executeCallback}>{submitText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}