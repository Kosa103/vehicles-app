import './App.css';
import React from "react";
import { OptionsBarAuth, LoginBoxAuth, ContentAddVehicles } from "./AppAuthComponents";
import { OptionsBarUnauth, LoginBoxUnauth } from "./AppUnauthComponents";


function Backdrop(props) {
  const { visibility, type } = props.backdropProperties;

  function renderBackdropTextbox() {
    if (type === "loading") {
      return (
        <div className="backdrop-text-container">
          <p className="loading-indicator" ></p>
          <h2 className="backdrop-text">
            Loading...
            </h2>
        </div>
      );
    }
  }

  return (
    <div className={`backdrop-background-${visibility}`}>
      <div className="backdrop-textbox">
        {renderBackdropTextbox()}
      </div>
    </div>
  );
}


function ContentWelcomePage() {
  return (
    <div className="content-box welcome-page">
      <h3>Welcome to Online Vehicle Database!</h3>
      <p>Dear visitor! You can search for vehicles by fields in the vehicle's registration book. Please log in to add, modify or delete existing vehicles! Signing up is restricted for security reasons. Contact us for more information.</p>
    </div>
  );
}


function ContentSearchVehicles(props) {
  const updateResults = props.updateResults;

  const searchParameterOptions = ["[A] Registration number", "[B] Date of first registration", "[D.1] Brand", "[D.2] Type", "[D.3] Model", "[P.1] Displacement",
    "[P.5] Engine code", "[0] Eurotax code", "[P.2] Engine power", "[E] Chassis number", "[P.3] Fuel type", "[J] Vehicle category", "[G] Empty Weight",
    "[F.1] Maximum Weight", "[K] Type acknowledgement number", "[I] Date of first registration in hungary", "[00] Year of manufacturing", "[R] Color",
    "[V.9] Environmental class", "[S.1] Number of seats", "[C.1.1] Last name or company name", "[C.1.2] First name", "[C.1.3] Address", "[C.1.4] Ownership type"];

  const searchMethodsMap = {
    "contains": "contains",
    "does not contain": "ncontains",
    "contains - case sensitive": "containss",
    "does not contain - case sensitive": "ncontainss",
    "equal": "eq",
    "not equal": "ne",
    "less than": "lt",
    "greater than": "gt",
    "less than or equal to": "lte",
    "greater than or equal to": "gte",
    "included in an array": "in",
    "not included in an array": "nin",
    "is null or not null": "null"
  };
  const searchMethodKeys = Object.keys(searchMethodsMap);

  const [searchErrorUser, setSearchErrorUser] = React.useState(false);
  const [searchError, setSearchError] = React.useState(false);

  const searchSelectorInput = React.useRef(null);
  const searchMethodInput = React.useRef(null);
  const searchValueInput = React.useRef(null);

  function transformStringForQuerying(string) {
    const splitString = string.split("] ")[1].split(" ");
    const splitResult = [];
    splitResult.push(splitString[0].charAt(0).toLowerCase() + splitString[0].slice(1));

    for (let i = 1; i < splitString.length; i++) {
      splitResult.push(splitString[i].charAt(0).toUpperCase() + splitString[i].slice(1));
    }
    return splitResult.join("");
  }

  async function fetchSearchResults() {
    const queryField = transformStringForQuerying(searchSelectorInput.current.value);
    const searchMethod = searchMethodsMap[searchMethodInput.current.value.toLowerCase()];
    const searchValue = searchValueInput.current.value;
    let responseStatus = 0;

    const url = `http://borzalom.ddns.net:1000/vehicles?${queryField}_${searchMethod}=${searchValue}`;
    const options = {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      },
    };

    if (searchValue.length > 0) {
      const data = await fetch(url, options)
        .then(res => {
          responseStatus = res.status;
          return res.json();
        })
        .catch(err => console.log(err));

      if (responseStatus >= 200 && responseStatus < 300) {
        updateResults(data);
        setSearchError(false);
        setSearchErrorUser(false);
      } else {
        setSearchError(true);
        setSearchErrorUser(false);
      }
    } else {
      setSearchError(false);
      setSearchErrorUser(true);
    }
  }

  function renderSearchOptions(options) {
    const optionFields = options.map((option) => {
      return (
        <option key={`key-${option}`}>{option}</option>
      );
    });
    return optionFields;
  }

  function renderSearchMethods(methods) {
    const methodFields = methods.map((method) => {
      return (
        <option key={`key-${method.replace("", "-")}`}>{(method.charAt(0).toUpperCase() + method.slice(1))}</option>
      );
    });
    return methodFields;
  }

  return (
    <div>
      <div className="search-field-box">
        <p>Search by: </p>
        <select ref={searchSelectorInput}>
          {renderSearchOptions(searchParameterOptions)}
        </select>
        <p>Search method: </p>
        <select ref={searchMethodInput}>
          {renderSearchMethods(searchMethodKeys)}
        </select>
      </div>
      <div className="search-field-box">
        <input type="text" size="40" maxLength="40" className="input search-field" id="search-field-vehicle" ref={searchValueInput} />
        <button className="button search" id="search-button-vehicle" onClick={() => fetchSearchResults()}>SEARCH</button>
      </div>
    </div>
  );
}


function ContentDisplaySearchResults(props) {
  const searchResults = props.searchResults;

  function renderRows() {
    const row = searchResults.map(vehicle => {
      return (
        <tr key={vehicle.id}>
          <th>{vehicle.registrationNumber}</th>
          <th>{vehicle.brand}</th>
          <th>{vehicle.model}</th>
          <th>{vehicle.dateOfFirstRegistration}</th>
        </tr>
      );
    });
    return row;
  }

  function renderTable() {
    if (searchResults.length !== 0) {
      return (
        <div class="container">
          <div class="search-results-box">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Reg. number</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Date of first reg.</th>
                </tr>
              </thead>
              <tbody>
                {renderRows()}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }

  return (
    <>
      {renderTable()}
    </>
  );
}


function AppAuth(props) {
  const changeAuth = props.changeAuth;

  const [backdropProperties, setBackdropProperties] = React.useState({ visibility: "hidden", type: "loading" });
  const [displayedContent, setDisplayedContent] = React.useState("ContentWelcomePage");
  const [searchResults, setSearchResults] = React.useState([]);

  function changeBackdrop(backdropData) {
    const { visibility, type } = { ...backdropData };
    setBackdropProperties({ visibility: visibility, type: type });
  }

  function renderContent() {
    if (displayedContent === "ContentWelcomePage") {
      return <ContentWelcomePage />;
    } else if (displayedContent === "ContentSearchVehicles") {
      return (
        <>
          <ContentSearchVehicles updateResults={data => setSearchResults(data)} />
          <ContentDisplaySearchResults searchResults={searchResults} />
        </>
      );
    } else if (displayedContent === "ContentAddVehicles") {
      return <ContentAddVehicles />;
    }
  }

  return (
    <>
      <Backdrop backdropProperties={backdropProperties} />
      <div className=".container">
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
              <OptionsBarAuth changeContent={content => setDisplayedContent(content)} />
              <div className="content-box">
                {renderContent()}
              </div>
            </div>
            <div className="right-box">
              <LoginBoxAuth
                changeAuth={changeAuth}
                changeBackdrop={changeBackdrop}
              />
              <div className="right-content-box">
                <h3>Right Box Content 1</h3>
                <p>placeholder content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


function AppUnauth(props) {
  const changeAuth = props.changeAuth;

  const [backdropProperties, setBackdropProperties] = React.useState({ visibility: "hidden", type: "loading" });
  const [displayedContent, setDisplayedContent] = React.useState("ContentWelcomePage");
  const [searchResults, setSearchResults] = React.useState([]);

  function changeBackdrop(backdropData) {
    const { visibility, type } = { ...backdropData };
    setBackdropProperties({ visibility: visibility, type: type });
  }

  function renderContent() {
    if (displayedContent === "ContentWelcomePage") {
      return <ContentWelcomePage />;
    } else if (displayedContent === "ContentSearchVehicles") {
      return (
        <>
          <ContentSearchVehicles updateResults={data => setSearchResults(data)} />
          <ContentDisplaySearchResults searchResults={searchResults} />
        </>
      );
    }
  }

  return (
    <>
      <Backdrop
        backdropProperties={backdropProperties}
      />
      <div className=".container">
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
              <OptionsBarUnauth changeContent={content => setDisplayedContent(content)} />
              <div className="content-box">
                {renderContent()}
              </div>
            </div>
            <div className="right-box">
              <LoginBoxUnauth
                changeAuth={changeAuth}
                changeBackdrop={changeBackdrop}
              />
              <div className="right-content-box">
                <h3>Right Box Content 1</h3>
                <p>placeholder content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
    <AppAuth changeAuth={bool => setAuthenticated(bool)} /> :
    <AppUnauth changeAuth={bool => setAuthenticated(bool)} />);
}


export default App;
