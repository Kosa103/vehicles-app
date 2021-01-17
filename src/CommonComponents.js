import React from "react";
import { Link } from 'react-router-dom';


export function Modal({ modalProperties, modalEffect }) {
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


export function SearchVehicles({ updateResults }) {

    const searchParameterOptions = ["[A] Registration number", "[B] Date of first registration", "[D.1] Brand", "[D.2] Type", "[D.3] Model", "[P.1] Displacement",
        "[P.5] Engine code", "[0] Eurotax code", "[P.2] Engine power", "[E] Chassis number", "[P.3] Fuel type", "[J] Vehicle category", "[G] Empty Weight",
        "[F.1] Maximum Weight", "[K] Type acknowledgement number", "[I] Date of first registration in hungary", "[00] Year of manufacturing", "[R] Color",
        "[V.9] Environmental class", "[S.1] Number of seats", "[C.1.1] Last name or company name", "[C.1.2] First name", "[C.1.3] Address", "[C.1.4] Ownership type"];

    const searchMethodsMap = {
        "contains": "contains",
        "does not contain": "ncontains",
        "contains - case sensitive": "containss",
        "does not contain - case sensitive": "ncontainss",
        "equal": "eq",
        "not equal": "ne",
        "less than": "lt",
        "greater than": "gt",
        "less than or equal to": "lte",
        "greater than or equal to": "gte",
        "included in an array": "in",
        "not included in an array": "nin",
        "is null or not null": "null"
    };
    const searchMethodKeys = Object.keys(searchMethodsMap);

    const [searchErrorUser, setSearchErrorUser] = React.useState(false);
    const [searchError, setSearchError] = React.useState(false);

    const searchSelectorInput = React.useRef(null);
    const searchMethodInput = React.useRef(null);
    const searchValueInput = React.useRef(null);

    function stringToCamelCase(string) {
        const splitString = string.split("] ")[1].split(" ");
        const splitResult = [];
        splitResult.push(splitString[0].charAt(0).toLowerCase() + splitString[0].slice(1));

        for (let i = 1; i < splitString.length; i++) {
            splitResult.push(splitString[i].charAt(0).toUpperCase() + splitString[i].slice(1));
        }
        return splitResult.join("").replace("*", "").replace("*", "");
    }

    async function fetchSearchResults() {
        const queryField = stringToCamelCase(searchSelectorInput.current.value);
        const searchMethod = searchMethodsMap[searchMethodInput.current.value.toLowerCase()];
        const searchValue = searchValueInput.current.value;
        let responseStatus = 0;

        const url = `http://borzalom.ddns.net:1000/vehicles?${queryField}_${searchMethod}=${searchValue}`;
        const options = {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            },
        };

        if (searchValue.length > 0) {
            const data = await fetch(url, options)
                .then(res => {
                    responseStatus = res.status;
                    return res.json();
                })
                .catch(err => console.log(err));

            if (responseStatus >= 200 && responseStatus < 300) {
                updateResults(data);
                setSearchError(false);
                setSearchErrorUser(false);
            } else {
                setSearchError(true);
                setSearchErrorUser(false);
            }
        } else {
            setSearchError(false);
            setSearchErrorUser(true);
        }
    }

    function renderSearchOptions(options) {
        const optionFields = options.map((option) => {
            return (
                <option key={`key-${option}`}>{option}</option>
            );
        });
        return optionFields;
    }

    function renderSearchMethods(methods) {
        const methodFields = methods.map((method) => {
            return (
                <option key={`key-${method.replace("", "-")}`}>{(method.charAt(0).toUpperCase() + method.slice(1))}</option>
            );
        });
        return methodFields;
    }

    function renderErrorMessage() {
        if (!searchError && !searchError) {
            return <></>;
        }

        let message = "";
        if (searchError) {
            message = " An error occured while executing the search request! Please try again";
        } else if (searchErrorUser) {
            message = " Incorrect input!";
        }
        return (
            <div className="alert alert-danger">
                <strong>Error!</strong>{message}
            </div>
        );
    }

    return (
        <div>
            <div className="search-field-box">
                <p>Search by: </p>
                <select ref={searchSelectorInput}>
                    {renderSearchOptions(searchParameterOptions)}
                </select>
                <p>Search method: </p>
                <select ref={searchMethodInput}>
                    {renderSearchMethods(searchMethodKeys)}
                </select>
            </div>
            <div className="search-field-box">
                <input type="text" size="40" maxLength="40" className="input search-field" id="search-field-vehicle" ref={searchValueInput} />
                <button className="button search" id="search-button-vehicle" onClick={() => fetchSearchResults()}>SEARCH</button>
            </div>
            {renderErrorMessage()}
        </div>
    );
}


export function DisplaySearchResults({ searchResults }) {

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


export function RightBoxContent() {
    return (
        <div className="right-content-box">
            <h3>Right Box Content 1</h3>
            <p>placeholder content</p>
        </div>
    );
}