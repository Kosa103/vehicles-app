import React from "react";


export function ContentAddVehicles() {
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
        comments: React.useRef(null),
    };

    function attemptPostForm() {
        const values = {
            registrationNumber: form.registrationNumber.current.value,
            dateOfFirstRegistration: form.dateOfFirstRegistration.current.value,
            brand: form.brand.current.value,
            type: form.type.current.value,
            model: form.model.current.value,
            displacement: form.displacement.current.value,
            engineCode: form.engineCode.current.value,
            eurotaxCode: form.eurotaxCode.current.value,
            enginePower: form.enginePower.current.value,
            chassisNumber: form.chassisNumber.current.value,
            fuelType: form.fuelType.current.value,
            vehicleCategory: form.vehicleCategory.current.value,
            emptyWeight: form.emptyWeight.current.value,
            maximumWeight: form.maximumWeight.current.value,
            typeAcknowledgementNumber: form.typeAcknowledgementNumber.current.value,
            dateOfFirstRegistrationInHungary: form.dateOfFirstRegistrationInHungary.current.value,
            yearOfManufacturing: form.yearOfManufacturing.current.value,
            color: form.color.current.value,
            environmentalClass: form.environmentalClass.current.value,
            numberOfSeats: form.numberOfSeats.current.value,
            lastNameOrCompanyName: form.lastNameOrCompanyName.current.value,
            firstName: form.firstName.current.value,
            address: form.address.current.value,
            ownershipType: form.ownershipType.current.value,
            comments: form.comments.current.value,
        };

        console.log(values);
    }

    return (
        <div className="content-box form-box">
            <h2>Add new vehicle:</h2>
            <p>Fields marked with an asterisk (*) are mandatory to fill!</p>
            <div className="form-page">
                <div className="form-subpage">
                    <FormField title="[A] Registration number*:" reference={form.registrationNumber}/>
                    <FormField title="[B] Date of first registration*:" reference={form.dateOfFirstRegistration}/>
                    <FormField title="[D.1] Brand*:" reference={form.brand}/>
                    <FormField title="[D.2] Type:" reference={form.type}/>
                    <FormField title="[D.3] Model*:" reference={form.model}/>
                    <FormField title="[P.1] Displacement*:" reference={form.displacement}/>
                    <FormField title="[P.5] Engine code*:" reference={form.engineCode}/>
                </div>
                <div className="form-subpage">
                    <FormField title="[0] Eurotax code:" reference={form.eurotaxCode}/>
                    <FormField title="[P.2] Engine power*:" reference={form.enginePower}/>
                    <FormField title="[E] Chassis number*:" reference={form.chassisNumber}/>
                    <FormField title="[P.3] Fuel type*:" reference={form.fuelType}/>
                    <FormField title="[J] Vehicle category:" reference={form.vehicleCategory}/>
                </div>
            </div>
            <div className="form-page">
                <div className="form-subpage">
                    <FormField title="[G] Empty Weight:" reference={form.emptyWeight}/>
                    <FormField title="[F.1] Maximum Weight:" reference={form.maximumWeight}/>
                    <FormField title="[K] Type acknowledgement number:" reference={form.typeAcknowledgementNumber}/>
                    <FormField title="[I] Date of first registration in hungary:" reference={form.dateOfFirstRegistrationInHungary}/>
                    <FormField title="[00] Year of manufacturing:" reference={form.yearOfManufacturing}/>
                </div>
                <div className="form-subpage">
                    <FormField title="[R] Color:" reference={form.color}/>
                    <FormField title="[V.9] Environmental class:" reference={form.environmentalClass}/>
                    <FormField title="[S.1] Number of seats:" reference={form.numberOfSeats}/>
                </div>
            </div>
            <div className="form-page">
                <div className="form-subpage">
                    <FormField title="[C.1.1] Last name or company name:" reference={form.lastNameOrCompanyName}/>
                    <FormField title="[C.1.2] First name:" reference={form.firstName}/>
                    <FormField title="[C.1.3] Address:" reference={form.address}/>
                    <FormField title="[C.1.4] Ownership type:" reference={form.ownershipType}/>
                </div>
                <div className="form-subpage">
                    <FormField title="[000] Comments:" reference={form.comments}/>
                </div>
            </div>
            <button className="button form-submit-button" onClick={() => attemptPostForm()}>Add vehicle</button>
        </div>
    );
}


function FormField(props) {
    const title = props.title;
    const reference = props.reference;
    const id = title.split("] ")[1].toLowerCase().replace(" ", "-").replace(":", "").replace("*", "");

    return (
        <div className="form-field">
            <p>{title}</p>
            <input type="text" size="40" maxLength="40" className="input form-field" id={`input-${id}`} ref={reference}/>
        </div>
    );
}


export function OptionsBarAuth(props) {
    const changeContent = props.changeContent;

    return (
        <div className="options-bar-box">
            <button className="button options-button" onClick={() => changeContent("ContentSearchVehicles")}>Search Vehicles</button>
            <button className="button options-button inactive" onClick={() => changeContent("ContentAddVehicles")}>Add Vehicles</button>
        </div>
    );
}


export function LoginBoxAuth(props) {
    const changeAuth = props.changeAuth;

    function attemptLogout() {
        sessionStorage.removeItem("res");
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

    return (
        <div className="login-box">
            {renderLoginBox()}
        </div>
    );
}

