import React from "react";

import { Link } from "react-router-dom";


export default function OptionsBarUnauth() {
    return (
        <div className="options-bar-box">
            <Link to="/home" className="button options-button">Home</Link>
            <Link to="/vehicles/search" className="button options-button">Search Vehicles</Link>
            <button className="button options-button inactive-button" disabled>Add Vehicles</button>
        </div>
    );
}
