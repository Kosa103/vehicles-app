import React from "react";
import { Link } from 'react-router-dom';
import { useParams, Redirect } from "react-router-dom";

import { SearchVehicles, DisplaySearchResults, Modal } from "./CommonComponents";


export function ContentWelcomePageAuth({ changeAuth }) {
    return (
        <>
            <div className="center-box">
                <OptionsBarAuth />
                <div className="content-box">
                    <div className="content-box welcome-page">
                        <h3>Welcome to Online Vehicle Database!</h3>
                        <p>Dear visitor! You can search for vehicles by fields in the vehicle's registration book. Please log in to add, modify or delete existing vehicles! Signing up is restricted for security reasons. Contact us for more information.</p>
                    </div>
                </div>
            </div>
            <div className="right-box">
              <LoginBoxAuth changeAuth={changeAuth} />
              <div className="right-content-box">
                <h3>Right Box Content 1</h3>
                <p>placeholder content</p>
              </div>
            </div>
        </>
    );
}


export function ContentAddVehicles({ changeAuth }) {
    const { id } = useParams();

    const defaultFormField = {
        type: "text",
        size: "30",
        maxLength: "30",
        className: "input input-text form-field",
    };
    const longFormField = {
        type: "text",
        size: "120",
        maxLength: "120",
        className: "input input-long-text form-field",
    };
    const dateFormField = {
        type: "date",
        size: "10",
        maxLength: "10",
        className: "input input-date form-field",
    };
    const numberFormField = {
        type: "number",
        size: "30",
        maxLength: "30",
        className: "input input-number form-field",
    };
    const commentsFormField = {
        type: "text",
        size: "100000",
        maxLength: "100000",
        className: "input input-comments form-field",
    };
    const form = {
        registrationNumber: React.useRef(null),
        dateOfFirstRegistration: React.useRef(null),
        brand: React.useRef(null),
        type: React.useRef(null),
        model: React.useRef(null),
        displacement: React.useRef(null),
        engineCode: React.useRef(null),
        eurotaxCode: React.useRef(null),
        enginePower: React.useRef(null),
        chassisNumber: React.useRef(null),
        fuelType: React.useRef(null),
        vehicleCategory: React.useRef(null),
        emptyWeight: React.useRef(null),
        maximumWeight: React.useRef(null),
        typeAcknowledgementNumber: React.useRef(null),
        dateOfFirstRegistrationInHungary: React.useRef(null),
        yearOfManufacturing: React.useRef(null),
        color: React.useRef(null),
        environmentalClass: React.useRef(null),
        numberOfSeats: React.useRef(null),
        lastNameOrCompanyName: React.useRef(null),
        firstName: React.useRef(null),
        address: React.useRef(null),
        ownershipType: React.useRef(null),
        examValidUntil: React.useRef(null),
        comments: React.useRef(null),
    };
    const postAlert = React.useRef(null);

    function sanitizeInput(input) {
        const stringInput = input.toString();
        return (stringInput
                .replace("(", "")
                .replace(")", "")
                .replace("{", "")
                .replace("}", "")
                .replace("*", "")
                .replace(";", "")
                .replace("%", "")
                .replace("?", "")
                .replace("!", "")
                .toUpperCase());
    }

    function removeDash(input) {
        return input.replace("-", "");
    }

    async function attemptPostForm() {
        const values = {
            registrationNumber: sanitizeInput(removeDash(form.registrationNumber.current.value)),
            dateOfFirstRegistration: sanitizeInput(form.dateOfFirstRegistration.current.value),
            brand: sanitizeInput(form.brand.current.value),
            type: sanitizeInput(form.type.current.value),
            model: sanitizeInput(form.model.current.value),
            displacement: sanitizeInput(form.displacement.current.value),
            engineCode: sanitizeInput(form.engineCode.current.value),
            eurotaxCode: sanitizeInput(form.eurotaxCode.current.value),
            enginePower: sanitizeInput(form.enginePower.current.value),
            chassisNumber: sanitizeInput(form.chassisNumber.current.value),
            fuelType: sanitizeInput(form.fuelType.current.value),
            vehicleCategory: sanitizeInput(form.vehicleCategory.current.value),
            emptyWeight: sanitizeInput(form.emptyWeight.current.value),
            maximumWeight: sanitizeInput(form.maximumWeight.current.value),
            typeAcknowledgementNumber: sanitizeInput(form.typeAcknowledgementNumber.current.value),
            dateOfFirstRegistrationInHungary: sanitizeInput(form.dateOfFirstRegistrationInHungary.current.value),
            yearOfManufacturing: sanitizeInput(form.yearOfManufacturing.current.value),
            color: sanitizeInput(form.color.current.value),
            environmentalClass: sanitizeInput(form.environmentalClass.current.value),
            numberOfSeats: sanitizeInput(form.numberOfSeats.current.value),
            lastNameOrCompanyName: sanitizeInput(form.lastNameOrCompanyName.current.value),
            firstName: sanitizeInput(form.firstName.current.value),
            address: sanitizeInput(form.address.current.value),
            ownershipType: sanitizeInput(form.ownershipType.current.value),
            examValidUntil: sanitizeInput(form.examValidUntil.current.value),
            comments: sanitizeInput(form.comments.current.value),
        };
        const requestBody = {};
        for (const [key, value] of Object.entries(values)) {
            if (value) {
                requestBody[key] = value;
            }
        }
        const token = JSON.parse(sessionStorage.getItem("res")).jwt;
        const url = (!!id) ? 
        `http://borzalom.ddns.net:1000/vehicles/${id}` :
        "http://borzalom.ddns.net:1000/vehicles";
        const options = {
            method: (!!id) ? "PUT" : "POST",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        };
        let responseStatus = 0;

        await fetch(url, options)
            .then(res => {
                responseStatus = res.status;
                return res.json();
            })
            .catch(err => console.log(err));

        if (responseStatus >= 200 && responseStatus < 300) {
            postAlert.current.textContent = (!!id) ? "Successfully modified vehicle" : "Successfully added vehicle";
        } else {
            postAlert.current.textContent = (!!id) ? "Error modifying vehicle" : "Error adding vehicle!"
            console.log("Error code:");
            console.log(responseStatus);
        }
    }

    React.useEffect(() => {
        if (sessionStorage.getItem("cachedSearchResults") !== null && (!!id)) {
            let vehicle;
            for (const entry of JSON.parse(sessionStorage.getItem("cachedSearchResults"))) {
                if (entry.id === Number(id)) {
                    vehicle = entry;
                }
            }
            for (const field of Object.keys(vehicle)) {
                if (field !== "id" && field !== "published_at" && field !== "created_at" && field !== "updated_at") {
                    if (vehicle[field] === null) {
                        form[field].current.value = "";
                    } else {
                      form[field].current.value = vehicle[field];
                    }
                }
            }
        }
    });

    return (
        <>
            <div className="center-box">
                <OptionsBarAuth />
                <div className="content-box">
                    <div className="content-box form-box">
                        <h2>Add new vehicle:</h2>
                        <p>Fields marked with an asterisk (*) are mandatory to fill!</p>
                        <p ref={postAlert}></p>
                        <div className="form-page">
                            <div className="form-subpage">
                                <FormField title="[A] Registration number*:" properties={defaultFormField} reference={form.registrationNumber} />
                                <FormField title="[B] Date of first registration*:" properties={dateFormField} reference={form.dateOfFirstRegistration} />
                                <FormField title="[D.1] Brand*:" properties={defaultFormField} reference={form.brand} />
                                <FormField title="[D.2] Type:" properties={defaultFormField} reference={form.type} />
                                <FormField title="[D.3] Model*:" properties={defaultFormField} reference={form.model} />
                                <FormField title="[P.1] Displacement*:" properties={numberFormField} reference={form.displacement} />
                                <FormField title="[P.5] Engine code*:" properties={defaultFormField} reference={form.engineCode} />
                            </div>
                            <div className="form-subpage">
                                <FormField title="[0] Eurotax code:" properties={defaultFormField} reference={form.eurotaxCode} />
                                <FormField title="[P.2] Engine power*:" properties={numberFormField} reference={form.enginePower} />
                                <FormField title="[E] Chassis number*:" properties={defaultFormField} reference={form.chassisNumber} />
                                <FormField title="[P.3] Fuel type*:" properties={defaultFormField} reference={form.fuelType} />
                                <FormField title="[J] Vehicle category*:" properties={defaultFormField} reference={form.vehicleCategory} />
                            </div>
                        </div>
                        <div className="form-page">
                            <div className="form-subpage">
                                <FormField title="[G] Empty Weight:" properties={numberFormField} reference={form.emptyWeight} />
                                <FormField title="[F.1] Maximum Weight:" properties={numberFormField} reference={form.maximumWeight} />
                                <FormField title="[K] Type acknowledgement number:" properties={defaultFormField} reference={form.typeAcknowledgementNumber} />
                                <FormField title="[I] Date of first registration in hungary:" properties={dateFormField} reference={form.dateOfFirstRegistrationInHungary} />
                                <FormField title="[00] Year of manufacturing:" properties={numberFormField} reference={form.yearOfManufacturing} />
                            </div>
                            <div className="form-subpage">
                                <FormField title="[R] Color:" properties={defaultFormField} reference={form.color} />
                                <FormField title="[V.9] Environmental class:" properties={defaultFormField} reference={form.environmentalClass} />
                                <FormField title="[S.1] Number of seats:" properties={numberFormField} reference={form.numberOfSeats} />
                            </div>
                        </div>
                        <div className="form-page">
                            <div className="form-subpage">
                                <FormField title="[C.1.1] Last name or company name:" properties={longFormField} reference={form.lastNameOrCompanyName} />
                                <FormField title="[C.1.2] First name:" properties={defaultFormField} reference={form.firstName} />
                                <FormField title="[C.1.3] Address:" properties={longFormField} reference={form.address} />
                                <FormField title="[C.1.4] Ownership type:" properties={defaultFormField} reference={form.ownershipType} />
                                <FormField title="[000] Exam valid until:" properties={dateFormField} reference={form.examValidUntil} />
                            </div>
                            <div className="form-subpage">
                                <FormField title="[0000] Comments:" properties={commentsFormField} reference={form.comments} />
                            </div>
                        </div>
                        <button className="button form-submit-button" onClick={() => attemptPostForm()}>{(!!id) ? "Modify vehicle" : "Add vehicle"}</button>
                    </div>
                </div>
            </div>
            <div className="right-box">
              <LoginBoxAuth changeAuth={changeAuth} />
              <div className="right-content-box">
                <h3>Right Box Content 1</h3>
                <p>placeholder content</p>
              </div>
            </div>
        </>
    );
}


function FormField({ title, properties, reference }) {
    const { type, size, maxLength, className } = { ...properties };

    return (
        <div className="form-field">
            <p>{title}</p>
            <input type={type} size={size} maxLength={maxLength} className={className} ref={reference} />
        </div>
    );
}


export function ContentSearchPageAuth({ updateResults, searchResults, changeAuth }) {
    return (
        <>
            <div className="center-box">
                <OptionsBarAuth />
                <div className="content-box">
                    <SearchVehicles updateResults={updateResults} />
                    <DisplaySearchResults searchResults={searchResults} />
                </div>
            </div>
            <div className="right-box">
                <LoginBoxAuth changeAuth={changeAuth} />
                <div className="right-content-box">
                <h3>Right Box Content 1</h3>
                <p>placeholder content</p>
                </div>
            </div>
        </>
    );
}


export function ContentDetailsPageAuth({ changeAuth }) {
    const { id } = useParams();

    const permissionAlert = React.useRef(null);
    const form = {
        registrationNumber: React.useRef(null),
        dateOfFirstRegistration: React.useRef(null),
        brand: React.useRef(null),
        type: React.useRef(null),
        model: React.useRef(null),
        displacement: React.useRef(null),
        engineCode: React.useRef(null),
        eurotaxCode: React.useRef(null),
        enginePower: React.useRef(null),
        chassisNumber: React.useRef(null),
        fuelType: React.useRef(null),
        vehicleCategory: React.useRef(null),
        emptyWeight: React.useRef(null),
        maximumWeight: React.useRef(null),
        typeAcknowledgementNumber: React.useRef(null),
        dateOfFirstRegistrationInHungary: React.useRef(null),
        yearOfManufacturing: React.useRef(null),
        color: React.useRef(null),
        environmentalClass: React.useRef(null),
        numberOfSeats: React.useRef(null),
        lastNameOrCompanyName: React.useRef(null),
        firstName: React.useRef(null),
        address: React.useRef(null),
        ownershipType: React.useRef(null),
        examValidUntil: React.useRef(null),
        comments: React.useRef(null),
    };

    const cachedSearchResults = sessionStorage.getItem("cachedSearchResults") ? JSON.parse(sessionStorage.getItem("cachedSearchResults")) : [];

    let values = {};
    let displayedValues = {};
    let vehicleId;

    for (const entry of cachedSearchResults) {
        if (entry.id === Number(id)) {
            values = entry;
            vehicleId = entry.id;
        }
    }
    for (const property of Object.keys(values)) {
        if (values[property] === null) {
            displayedValues[property] = "";
        } else {
            displayedValues[property] = values[property];
        }
    }

    return (
        <>
            <div className="center-box">
                <OptionsBarPageAuth vehicleId={vehicleId}/>
                <div className="content-box">
                    <div className="content-box form-box">
                        <h2>Vehicle details</h2>
                        <p ref={permissionAlert}></p>
                        <div className="form-page">
                            <div className="form-subpage">
                                <DetailsFormField title="[A] Registration number*:" value={displayedValues.registrationNumber} reference={form.registrationNumber} />
                                <DetailsFormField title="[B] Date of first registration*:" value={displayedValues.dateOfFirstRegistration} reference={form.dateOfFirstRegistration} />
                                <DetailsFormField title="[D.1] Brand*:" value={displayedValues.brand} reference={form.brand} />
                                <DetailsFormField title="[D.2] Type:" value={displayedValues.type} reference={form.type} />
                                <DetailsFormField title="[D.3] Model*:" value={displayedValues.model} reference={form.model} />
                                <DetailsFormField title="[P.1] Displacement*:" value={displayedValues.displacement} reference={form.displacement} />
                                <DetailsFormField title="[P.5] Engine code*:" value={displayedValues.engineCode} reference={form.engineCode} />
                            </div>
                            <div className="form-subpage">
                                <DetailsFormField title="[0] Eurotax code:" value={displayedValues.eurotaxCode} reference={form.eurotaxCode} />
                                <DetailsFormField title="[P.2] Engine power*:" value={displayedValues.enginePower} reference={form.enginePower} />
                                <DetailsFormField title="[E] Chassis number*:" value={displayedValues.chassisNumber} reference={form.chassisNumber} />
                                <DetailsFormField title="[P.3] Fuel type*:" value={displayedValues.fuelType} reference={form.fuelType} />
                                <DetailsFormField title="[J] Vehicle category*:" value={displayedValues.vehicleCategory} reference={form.vehicleCategory} />
                            </div>
                        </div>
                        <div className="form-page">
                            <div className="form-subpage">
                                <DetailsFormField title="[G] Empty Weight:" value={displayedValues.emptyWeight} reference={form.emptyWeight} />
                                <DetailsFormField title="[F.1] Maximum Weight:" value={displayedValues.maximumWeight} reference={form.maximumWeight} />
                                <DetailsFormField title="[K] Type acknowledgement number:" value={displayedValues.typeAcknowledgementNumber} reference={form.typeAcknowledgementNumber} />
                                <DetailsFormField title="[I] Date of first registration in hungary:" value={displayedValues.dateOfFirstRegistrationInHungary} reference={form.dateOfFirstRegistrationInHungary} />
                                <DetailsFormField title="[00] Year of manufacturing:" value={displayedValues.yearOfManufacturing} reference={form.yearOfManufacturing} />
                            </div>
                            <div className="form-subpage">
                                <DetailsFormField title="[R] Color:" value={displayedValues.color} reference={form.color} />
                                <DetailsFormField title="[V.9] Environmental class:" value={displayedValues.environmentalClass} reference={form.environmentalClass} />
                                <DetailsFormField title="[S.1] Number of seats:" value={displayedValues.numberOfSeats} reference={form.numberOfSeats} />
                            </div>
                        </div>
                        <div className="form-page">
                            <div className="form-subpage">
                                <DetailsFormField title="[C.1.1] Last name or company name:" value={displayedValues.lastNameOrCompanyName} reference={form.lastNameOrCompanyName} />
                                <DetailsFormField title="[C.1.2] First name:" value={displayedValues.firstName} reference={form.firstName} />
                                <DetailsFormField title="[C.1.3] Address:" value={displayedValues.address} reference={form.address} />
                                <DetailsFormField title="[C.1.4] Ownership type:" value={displayedValues.ownershipType} reference={form.ownershipType} />
                                <DetailsFormField title="[000] Exam valid until:" value={displayedValues.examValidUntil} reference={form.examValidUntil} />
                            </div>
                            <div className="form-subpage">
                                <DetailsFormField title="[0000] Comments:" value={displayedValues.comments} reference={form.comments} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-box">
              <LoginBoxAuth changeAuth={changeAuth} />
              <div className="right-content-box">
                <h3>Right Box Content 1</h3>
                <p>placeholder content</p>
              </div>
            </div>
        </>
    );
}


function DetailsFormField({ title, reference, value }) {
    let className;

    if (title === "[0000] Comments:") {
        className = "input input-comments form-field";
    } else {
        className = "input input-text form-field";
    }

    return (
        <div className="form-field">
            <p>{title}</p>
            <input type="text" className={className} ref={reference} value={value} disabled />
        </div>
    );
}


function OptionsBarAuth() {
    return (
        <div className="options-bar-box">
            <Link to="/home" className="button options-button">Home</Link>
            <Link to="/vehicles/search" className="button options-button">Search Vehicles</Link>
            <Link to="/vehicles/add" className="button options-button">Add Vehicles</Link>
        </div>
    );
}


function OptionsBarPageAuth({ vehicleId }) {
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
            <Modal modalProperties={modalProperties} modalEffect={modalEffect}/>
            <div className="options-bar-box">
                <Link to="/home" className="button options-button" >Home</Link>
                <Link to={`/vehicles/${vehicleId}/modify`} className="button options-button" >Modify Vehicle</Link>
                <button className="button options-button" onClick={() => setModalProperties({ visibility: "visible", type: "deleteWarning" })}>Delete Vehicle</button>
            </div>
        </>
    );
}


export function LoginBoxAuth({ changeAuth }) {
    const [shouldRedirect, setShouldRedirect] = React.useState(false);

    function attemptLogout() {
        sessionStorage.removeItem("res");
        setShouldRedirect(true);
        changeAuth(false);
    }

    function renderLoginBox() {
        const userData = sessionStorage.getItem("res");
        let userName = "";

        if (userData !== null) {
            userName = JSON.parse(userData).user.username;
        }
        return (
            <>
                <p>Logged in as:</p>
                <p>{userName}</p>
                <button
                    className="button logout-button"
                    id="logout-button"
                    onClick={() => attemptLogout()}>
                    Logout
                </button>
            </>
        );
    }

    if (shouldRedirect) {
        console.log("redirecting triggered!");
        return <Redirect to="/" />;
    } else {
        return (
            <div className="login-box">
                {renderLoginBox()}
            </div>
        );
    }
}

