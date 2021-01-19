import React from "react";

import LoginBoxUnauth from "./LoginBoxUnauth";
import RightBoxContent from "../CommonComponents/RightBoxContent";


export default function RightBoxUnauth({ changeAuth }) {
    return (
        <div className="right-box">
            <LoginBoxUnauth changeAuth={changeAuth} />
            <RightBoxContent />
        </div>
    );
}
