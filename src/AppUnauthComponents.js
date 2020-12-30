import React from "react";


export function OptionsBarUnauth(props) {
    const changeContent = props.changeContent;

    return (
        <div className="options-bar-box">
            <button className="button options-button" onClick={() => changeContent("ContentSearchVehicles")}>Search Vehicles</button>
            <button className="button options-button inactive">Add Vehicles</button>
        </div>
    );
}


export function LoginBoxUnauth(props) {
    const changeAuth = props.changeAuth;
    const changeBackdrop = props.changeBackdrop;

    const [loginError, setLoginError] = React.useState(false);

    const loginEmail = React.useRef(null);
    const loginPassword = React.useRef(null);

    async function initLogin() {
        changeBackdrop({ visibility: "visible", type: "loading" });
        await attemptLogin();
        changeBackdrop({ visibility: "hidden", type: "loading" });
    }

    async function attemptLogin() {
        const loginEmailValue = loginEmail.current.value;
        const loginPasswordValue = loginPassword.current.value;

        if (loginEmailValue.length < 1 || loginPasswordValue.length < 1) {
            attemptLogout();
        } else {

            const loginData = { identifier: loginEmailValue, password: loginPasswordValue };
            const url = "http://borzalom.ddns.net:1000/auth/local";
            const options = {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(loginData)
            };
            let responseStatus = 0;

            const response = await fetch(url, options)
                .then(res => {
                    responseStatus = res.status;
                    return res.json();
                })
                .catch(err => console.log(err));

            if (responseStatus >= 200 && responseStatus < 300) {
                try {
                    sessionStorage.setItem("res", JSON.stringify(response));
                    changeAuth(true);
                    setLoginError(false);
                } catch (err) {
                    attemptLogout();
                    console.log(err);
                }
            } else {
                sessionStorage.removeItem("res");
                changeAuth(false);
                setLoginError(true);
            }
        }
    }

    function attemptLogout() {
        sessionStorage.removeItem("res");
        changeAuth(false);
        setLoginError(false);
    }

    React.useEffect(() => {
        if (document.getElementById("login-failed-message") !== null) {
            if (loginError) {
                document.getElementById("login-failed-message").style.visibility = "visible";
            } else {
                document.getElementById("login-failed-message").style.visibility = "hidden";
            }
        }
    }, [loginError]);

    return (
        <div className="login-box">
            <h3>Login</h3>
            <p>Email:</p>
            <input type="email" size="30" maxLength="30" autoComplete="off" className="input login-email" id="login-email" ref={loginEmail} />
            <p>Password:</p>
            <input type="password" size="30" maxLength="30" autoComplete="off" className="input login-password" id="login-password" ref={loginPassword} />
            <p id="login-failed-message">Login failed!</p>
            <button
                className="button login-button"
                id="login-submit-button"
                onClick={() => initLogin()}>
                Login
        </button>
        </div>
    );
}


