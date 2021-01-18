import React from "react";


export default function LoginBoxAuth({ changeAuth }) {
    function attemptLogout() {
        sessionStorage.removeItem("res");
        changeAuth(false);
        window.location.assign("/home");
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
