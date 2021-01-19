import React from "react";

import { Link } from "react-router-dom";


export default function OptionsBarPageUnauth() {
    return (
        <div className="options-bar-box">
            <Link to="/home" className="button options-button" >Home</Link>
            <button className="button options-button inactive-button" disabled>Modify Vehicle</button>
            <button className="button options-button inactive-button" disabled>Delete Vehicle</button>
        </div>
    );
}
