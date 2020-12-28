import './App.css';
import React from "react";


function ContentWelcomePage() {
  return (
    <div className="content-box welcome-page">
      <h3>Welcome to Online Vehicle Database!</h3>
      <p>Dear visitor! You can search for vehicles by fields in the vehicle's registration book. Please log in to add, modify or delete existing vehicles! Signing up is restricted for security reasons. Contact us for more information.</p>
    </div>
  );
}


function ContentSearchVehicles(props) {
  const searchParameterOptions = ["[A] Registration number", "[B] Date of first registration", "[D.1] Brand", "[D.2] Type", "[D.3] Model", "[P.1] Displacement",
  "[P.5] Engine code", "[0] Eurotax code", "[P.2] Engine power", "[E] Chassis number", "[P.3] Fuel type", "[J] Vehicle category", "[G] Empty Weight",
  "[F.1] Maximum Weight", "[K] Type acknowledgement number", "[I] Date of first registration in hungary", "[00] Year of manufacturing", "[R] Color",
  "[V.9] Environmental class", "[S.1] Number of seats", "[C.1.1] Last name or company name", "[C.1.2] First name", "[C.1.3] Address", "[C.1.4] Ownership type"];

  function renderSearchOptions(options) {
    const optionFields = options.map((option, idx) => {
      return (
        <option key={`key-${option}`}>{option}</option>
      );
    });
    return optionFields;
  }

  return (
    <div>
      <div className="search-field-box">
        <p>Search by: </p>
        <select>
          {renderSearchOptions(searchParameterOptions)}
        </select>
      </div>
      <div className="search-field-box">
        <input type="text" size="40" maxLength="40" className="input search-field" id="search-field-vehicle" />
        <button className="button search" id="search-button-vehicle">SEARCH</button>
      </div>
    </div>
  );
}


function ContentAddVehicles() {
  return (
    <div className="content-box form-box">
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


function OptionsBar(props) {
  const changeContent = props.changeContent;

  return (
    <div className="options-bar-box">
      <button className="button options-button" onClick={() => changeContent("ContentSearchVehicles")}>Search Vehicles</button>
      <button className="button options-button inactive">Add Vehicles</button>
    </div>
  );
}


function LoginBoxAuth(props) {
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


function LoginBoxUnauth(props) {
  const changeAuth = props.changeAuth;
  
  const [loginError, setLoginError] = React.useState(false);
  
  const loginEmail = React.useRef(null);
  const loginPassword = React.useRef(null);

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
        } catch(err) {
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
      <input type="email" size="30" maxLength="30" autoComplete="off" className="input login-email" id="login-email" ref={loginEmail}/>
      <p>Password:</p>
      <input type="password" size="30" maxLength="30" autoComplete="off" className="input login-password" id="login-password" ref={loginPassword}/>
      <p id="login-failed-message">Login failed!</p>
      <button
        className="button login-button"
        id="login-submit-button"
        onClick={() => attemptLogin()}>
        Login
      </button>
    </div>
  );
}


function AppAuth(props) {
  const changeAuth = props.changeAuth;

  const [displayedContent, setDisplayedContent] = React.useState("ContentWelcomePage");

  const authenticated = true;

  function changeContent(currentContent) {
    setDisplayedContent(currentContent);
  }

  function renderContent() {
    if (displayedContent === "ContentWelcomePage") {
      return <ContentWelcomePage />;
    } else if (displayedContent === "ContentSearchVehicles") {
      return <ContentSearchVehicles />;
    }
  }

  return (
    <div className=".container-fluid">
      <div className="app-main-box">
        <div className="title-box">
          <h1 className="main-title">Online Vehicle Database</h1>
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
            <OptionsBar changeContent={changeContent} />
            <div className="content-box">
              {renderContent()}
            </div>
          </div>
          <div className="right-box">
            <LoginBoxAuth 
              authenticated={authenticated}
              changeAuth={changeAuth}
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


function AppUnauth(props) {
  const changeAuth = props.changeAuth;

  const [displayedContent, setDisplayedContent] = React.useState("ContentWelcomePage");

  const authenticated = false;

  function changeContent(currentContent) {
    setDisplayedContent(currentContent);
  }

  function renderContent() {
    if (displayedContent === "ContentWelcomePage") {
      return <ContentWelcomePage />;
    } else if (displayedContent === "ContentSearchVehicles") {
      return <ContentSearchVehicles />;
    }
  }

  return (
    <div className=".container-fluid">
      <div className="app-main-box">
        <div className="title-box">
          <h1 className="main-title">Online Vehicle Database</h1>
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
            <OptionsBar changeContent={changeContent} />
            <div className="content-box">
              {renderContent()}
            </div>
          </div>
          <div className="right-box">
            <LoginBoxUnauth 
              authenticated={authenticated}
              changeAuth={changeAuth}
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


function App() {
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    if (sessionStorage.getItem("res") !== null) {
      const userData = JSON.parse(sessionStorage.getItem("res"));
      if (userData.jwt !== null) {
        setAuthenticated(true);
      }
    }
  }, []);

  return (authenticated ? 
  <AppAuth changeAuth={bool => setAuthenticated(bool)}/> : 
  <AppUnauth changeAuth={bool => setAuthenticated(bool)}/>);
}


export default App;
