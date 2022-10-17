import { useState, useEffect, useRef } from "react";
import { Modal } from "bootstrap";

export const AppModal = ({title, body, submitText, passedFunction}) => {

    const [modal, setModal] = useState(null);
    const appModal = useRef();

    useEffect(() => {
        setModal(
            new Modal(appModal.current)
        )
    }, []);

    const executePassedFunction = () => {
        // passedFunction;
        passedFunction();
        modal.hide();
        return null;
    }

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={() => modal.show()}>
                Lauch demo modal
            </button>

            <div className="modal fade" ref={appModal} tabIndex="-1" aria-labelledby="appModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="appModalLabel">{title}</h5>
                            <button type="button" className="btn-close" onClick={() => modal.hide()} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">{body}</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => modal.hide()}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={executePassedFunction}>{submitText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
