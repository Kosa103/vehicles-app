import './App.css';
import React from "react";

function FormField(props) {
  const title = props.title;
  const id = title.split("] ")[1].toLowerCase().replace(" ", "-").replace(":", "");

  return (
    <div className="form-field">
      <p>{title}</p>
      <input type="text" size="40" maxLength="40" className="input form-field" id={`input-${id}`} />
    </div>
  );
}

function VehicleForm() {
  return (
    <div className="form-box">
      <div className="form-page">
        <div className="form-subpage">
          <FormField title="[A] Registration number:" />
          <FormField title="[B] Date of first registration:" />
          <FormField title="[D.1] Brand:" />
          <FormField title="[D.2] Type:" />
          <FormField title="[D.3] Model:" />
          <FormField title="[P.1] Displacement:" />
          <FormField title="[P.5] Engine code:" />
        </div>
        <div className="form-subpage">
          <FormField title="[0] Eurotax code:" />
          <FormField title="[P.2] Engine power:" />
          <FormField title="[E] Chassis number:" />
          <FormField title="[P.3] Fuel type:" />
          <FormField title="[J] Vehicle category:" />
        </div>
      </div>
      <div className="form-page">
        <div className="form-subpage">
          <FormField title="[G] Empty Weight:" />
          <FormField title="[F.1] Maximum Weight:" />
          <FormField title="[K] Type acknowledgement number:" />
          <FormField title="[I] Date of first registration in hungary:" />
          <FormField title="[00] Year of manufacturing:" />
        </div>
        <div className="form-subpage">
          <FormField title="[R] Color:" />
          <FormField title="[V.9] Environmental class:" />
          <FormField title="[S.1] Number of seats:" />
        </div>
      </div>
      <div className="form-page">
        <div className="form-subpage">
          <FormField title="[C.1.1] Last name or company name:" />
          <FormField title="[C.1.2] First name:" />
          <FormField title="[C.1.3] Address:" />
          <FormField title="[C.1.4] Ownership type:" />
        </div>
        <div className="form-subpage">
          <FormField title="[000] Comments:" />
        </div>
      </div>
    </div>
  );
}

function OptionsBar() {
  return (
    <div className="options-bar-box">
      <ul className="options-bar-list">
        <li className="button options">Search Vehicle</li>
        <li className="button options inactive">Add Vehicle</li>
      </ul>
    </div>
  );
}

function SearchBox() {
  return (
    <div>
      <button className="button search-by" id="search-by-button-vehicle">Search by: </button>
      <div className="search-field-box">
        <input type="text" size="40" maxLength="40" className="input search-field" id="search-field-vehicle" />
        <button className="button search" id="search-button-vehicle"></button>
      </div>
    </div>
  );
}

function LoginBox(props) {
  const loggedIn = props.loggedIn;
  const userName = props.userName;
  const loginError = props.loginError;
  const loginName = props.loginFields.loginName;
  const loginPassword = props.loginFields.loginPassword;
  const attemptLogin = props.attemptLogin;
  const attemptLogout = props.attemptLogout;

  function renderLoginBox() {
    if (loggedIn) {
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
    } else {
      return (
        <>
          <h3>Login</h3>
          <p>Email:</p>
          <input type="email" size="30" maxLength="30" autoComplete="off" className="input login-name" id="login-name" ref={loginName}/>
          <p>Password:</p>
          <input type="password" size="30" maxLength="30" autoComplete="off" className="input login-password" id="login-password" ref={loginPassword}/>
          <p id="login-failed-message">Login failed!</p>
          <button
            className="button login-button"
            id="login-submit-button"
            onClick={() => attemptLogin()}>
              Login
          </button>
        </>
      );
    }
  }

  React.useEffect(() => {
    if (loginError) {
      document.getElementById("login-failed-message").style.visibility = "visible";
    } else {
      document.getElementById("login-failed-message").style.visibility = "hidden";
    }
  }, [loginError]);

  return (
    <div className="login-box">
      {renderLoginBox()}
    </div>
  );
}

function App() {
  const searchParameters = ["[A] Registration number", "[B] Date of first registration", "[D.1] Brand", "[D.2] Type", "[D.3] Model", "[P.1] Displacement",
  "[P.5] Engine code", "[0] Eurotax code", "[P.2] Engine power", "[E] Chassis number", "[P.3] Fuel type", "[J] Vehicle category", "[G] Empty Weight",
  "[F.1] Maximum Weight", "[K] Type acknowledgement number", "[I] Date of first registration in hungary", "[00] Year of manufacturing", "[R] Color",
  "[V.9] Environmental class", "[S.1] Number of seats", "[C.1.1] Last name or company name", "[C.1.2] First name", "[C.1.3] Address", "[C.1.4] Ownership type"];

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  
  const loginName = React.useRef(null);
  const loginPassword = React.useRef(null);

  async function attemptLogin() {
    const loginNameValue = loginName.current.value;
    const loginPasswordValue = loginPassword.current.value;


    if (loginNameValue.length < 1 || loginPasswordValue.length < 1) {
      attemptLogout();
    } else {

      const loginData = {
        identifier: loginNameValue,
        password: loginPasswordValue
      };
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
          sessionStorage.setItem("tkn", response.jwt);
          sessionStorage.setItem("uname", response.user.userName);
          setUserName(response.user.username);
          setLoggedIn(true);
          setLoginError(false);
        } catch(err) {
          console.log(err);
          attemptLogout();
        }
      } else {
        attemptLogout();
      }
    }
  }

  function attemptLogout() {
    sessionStorage.removeItem("tkn");
    sessionStorage.removeItem("uname");
    setUserName("");
    setLoggedIn(false);
    setLoginError(false);
  }

  React.useEffect(() => {
    if (sessionStorage.getItem("tkn") !== null && sessionStorage.getItem("uname") !== null) {
      setUserName(sessionStorage.getItem("uname"));
      setLoggedIn(true);
      setLoginError(false);
    } else {
      attemptLogout();
    }
  });


  return (
    <div className=".container-fluid">
      <div className="app-main-box">
        <div className="title-box">
          <h1 className="main-title">Vehicle Database</h1>
        </div>
        <div className="main-box">
          <div className="left-box">
            <div className="left-content-box">
              <h3>Left Box Content 1</h3>
              <p>placeholder content</p>
            </div>
            <div className="left-content-box">
              <h3>Left Box Content 2</h3>
              <p>placeholder content</p>
            </div>
          </div>
          <div className="center-box">
            <OptionsBar />
            <div className="content-box">
              <h2>CONTENT</h2>
            </div>
          </div>
          <div className="right-box">
            <LoginBox 
              loggedIn={loggedIn}
              userName={userName}
              loginError={loginError} 
              attemptLogin={attemptLogin}
              attemptLogout={attemptLogout}
              loginFields={{loginName: loginName, loginPassword: loginPassword}}
            />
            <div className="right-content-box">
              <h3>Right Box Content 1</h3>
              <p>placeholder content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
