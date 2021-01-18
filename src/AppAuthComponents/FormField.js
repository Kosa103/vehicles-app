import React from "react";


export default function FormField({ title, properties, reference }) {
    const { type, size, maxLength, className } = { ...properties };

    return (
        <div className="form-field">
            <p>{title}</p>
            <input type={type} size={size} maxLength={maxLength} className={className} ref={reference} />
        </div>
    );
}
