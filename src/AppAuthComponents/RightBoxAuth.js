import React from "react";

import RightBoxContent from "../CommonComponents/RightBoxContent";
import LoginBoxAuth from "./LoginBoxAuth";


export default function RightBoxAuth({ changeAuth }) {
    return (
        <div className="right-box">
            <LoginBoxAuth changeAuth={changeAuth} />
            <RightBoxContent />
        </div>
    );
}
