import React from "react";


export function OptionsBarAuth(props) {
    const changeContent = props.changeContent;

    return (
        <div className="options-bar-box">
            <button className="button options-button" onClick={() => changeContent("ContentSearchVehicles")}>Search Vehicles</button>
            <button className="button options-button inactive">Add Vehicles</button>
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

