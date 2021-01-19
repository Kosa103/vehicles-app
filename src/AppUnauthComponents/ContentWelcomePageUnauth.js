import React from "react";

import OptionsBarUnauth from "./OptionsBarUnauth";
import RightBoxUnauth from "./RightBoxUnauth";


export default function ContentWelcomePageUnauth({ changeAuth }) {
    return (
        <>
            <div className="center-box">
                <OptionsBarUnauth />
                <div className="content-box">
                    <div className="content-box welcome-page">
                        <h3>Welcome to Online Vehicle Database!</h3>
                        <p>Dear visitor! You can search for vehicles by fields in the vehicle's registration book. Please log in to add, modify or delete existing vehicles! Signing up is restricted for security reasons. Contact us for more information.</p>
                    </div>
                </div>
            </div>
            <RightBoxUnauth changeAuth={changeAuth}/>
        </>
    );
}
