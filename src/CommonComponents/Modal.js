import React from "react";


export default function Modal({ modalProperties, modalEffect }) {
    const { visibility, type } = { ...modalProperties };

    function renderModalTextbox() {
        if (type === "loading") {
            return (
                <div className="modal-text-container">
                    <div className="spinner-border text-dark"></div>
                    <h2 className="modal-text-loading">
                        Loading...
                    </h2>
                </div>
            );
        } else if (type === "deleteWarning") {
            return (
                <div className="modal-text-container">
                    <h2 className="modal-text">
                        Are you sure you want to delete this vehicle?
                    </h2>
                    <br />
                    <div className="modal-buttons-container">
                        <button className="button modal-button" onClick={() => modalEffect({ delete: true })}>Yes</button>
                        <button className="button modal-button" onClick={() => modalEffect({ delete: false })}>No</button>
                    </div>
                </div>
            );
        } else if (type === "deleteSuccess") {
            return (
                <div className="modal-text-container">
                    <h2 className="modal-text">
                        Successfully deleted vehicle!
                    </h2>
                    <br />
                    <div className="modal-buttons-container">
                        <button className="button modal-button" onClick={() => modalEffect({ confirm: true })}>OK</button>
                    </div>
                </div>
            );
        } else if (type === "deleteError") {
            return (
                <div className="modal-text-container">
                    <h2 className="modal-text">
                        Error deleting vehicle!
                    </h2>
                    <br />
                    <div className="modal-buttons-container">
                        <button className="button modal-button" onClick={() => modalEffect({ confirm: true })}>OK</button>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className={`modal-background-${visibility}`}>
            <div className="modal-textbox">
                {renderModalTextbox()}
            </div>
        </div>
    );
}
