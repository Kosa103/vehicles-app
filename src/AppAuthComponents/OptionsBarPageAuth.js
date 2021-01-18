import React from "react";

import Modal from "../CommonComponents/Modal";
import { Link } from "react-router-dom";


export default function OptionsBarPageAuth({ vehicleId }) {
    const [modalProperties, setModalProperties] = React.useState({ visibility: "hidden", type: "deleteWarning" });

    function modalEffect(feedback) {
        if (feedback.delete === true) {
            attemptDeleteVehicle();
        }
        setModalProperties({ visibility: "hidden", type: "warning" });
    }

    async function attemptDeleteVehicle() {
        const token = JSON.parse(sessionStorage.getItem("res")).jwt;
        const url = `http://borzalom.ddns.net:1000/vehicles/${vehicleId}`;
        console.log(url);
        const options = {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        };
        let responseStatus = 0;

        await fetch(url, options)
            .then(res => {
                responseStatus = res.status;
                return res.json();
            })
            .catch(err => console.log(err));

        if (responseStatus >= 200 && responseStatus < 300) {
            setModalProperties({ visibility: "visible", type: "deleteSuccess" });
        } else {
            setModalProperties({ visibility: "visible", type: "deleteError" })
            console.log("Error code:");
            console.log(responseStatus);
        }
    }

    return (
        <>
            <Modal modalProperties={modalProperties} modalEffect={modalEffect} />
            <div className="options-bar-box">
                <Link to="/home" className="button options-button" >Home</Link>
                <Link to={`/vehicles/${vehicleId}/modify`} className="button options-button" >Modify Vehicle</Link>
                <button className="button options-button" onClick={() => setModalProperties({ visibility: "visible", type: "deleteWarning" })}>Delete Vehicle</button>
            </div>
        </>
    );
}
