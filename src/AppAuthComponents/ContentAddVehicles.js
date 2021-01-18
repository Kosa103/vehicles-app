import React from "react";
import { useParams } from "react-router-dom";

import OptionsBarAuth from "./OptionsBarAuth";
import FormField from "./FormField";
import RightBoxAuth from "./RightBoxAuth";


export default function ContentAddVehicles({ changeAuth }) {
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
            <RightBoxAuth changeAuth={changeAuth} />
        </>
    );
}
