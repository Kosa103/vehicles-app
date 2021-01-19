import React from "react";
import { useParams } from "react-router-dom";

import OptionsBarPageUnauth from "./OptionsBarPageUnauth";
import DetailsFormField from "./DetailsFormField";
import RightBoxUnauth from "./RightBoxUnauth";


export default function ContentDetailsPageUnauth({ changeAuth }) {
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
    for (const entry of cachedSearchResults) {
        if (entry.id === Number(id)) {
            values = entry;
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
                <OptionsBarPageUnauth />
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
            <RightBoxUnauth changeAuth={changeAuth}/>
        </>
    );
}
