import React from "react";


export default function DetailsFormField({ title, reference, value }) {
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
