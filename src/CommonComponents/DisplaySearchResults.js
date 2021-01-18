import React from "react";
import { Link } from "react-router-dom";


export default function DisplaySearchResults({ searchResults }) {
    function renderRows() {
        const row = searchResults.map(vehicle => {
            return (
                <tr key={vehicle.id}>
                    <td><Link to={`/vehicles/${vehicle.id}/details`}>{vehicle.registrationNumber}</Link></td>
                    <td>{vehicle.brand}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.dateOfFirstRegistration}</td>
                </tr>
            );
        });
        return row;
    }

    function renderTable() {
        if (searchResults.length !== 0) {

            return (
                <div className="container">
                    <div className="alert alert-info">
                        <strong>Click an entry</strong> to display all data
                    </div>
                    <div className="search-results-box">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Reg. number</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Date of first reg.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="alert alert-info">
                        No vehicles to display
                    </div>
                </div>
            );
        }
    }

    return (
        <>
            {renderTable()}
        </>
    );
}
