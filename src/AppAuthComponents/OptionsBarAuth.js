import React from "react";
import { Link } from "react-router-dom";


export default function OptionsBarAuth() {
    return (
        <div className="options-bar-box">
            <Link to="/home" className="button options-button">Home</Link>
            <Link to="/vehicles/search" className="button options-button">Search Vehicles</Link>
            <Link to="/vehicles/add" className="button options-button">Add Vehicles</Link>
        </div>
    );
}
