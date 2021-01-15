import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';

import { Modal } from "./CommonComponents";
import { ContentWelcomePageAuth, ContentDetailsPageAuth, ContentSearchPageAuth, ContentAddVehicles } from "./AppAuthComponents";
import { ContentWelcomePageUnauth, ContentDetailsPageUnauth, ContentSearchPageUnauth } from "./AppUnauthComponents";


function AppAuth({ changeAuth }) {
  const [searchResults, setSearchResults] = React.useState([]);
  const cachedResults = React.useRef([]);

  function updateResults(data) {
    const newCachedResults = [...cachedResults.current];
    const cachedItemsIds = [];
    for (const item of newCachedResults) {
      cachedItemsIds.push(item.id);
    }
    for (const item of data) {
      if (!(cachedItemsIds.includes(item.id))) {
        newCachedResults.push(item);
      }
    }
    cachedResults.current = newCachedResults;
    sessionStorage.setItem("cachedSearchResults", JSON.stringify(newCachedResults));
    setSearchResults(data);
  }

  return (
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
            <Switch>
              <Route path="/" exact strict render={() => <ContentWelcomePageAuth changeAuth={changeAuth} />} />
              <Route path="/vehicles/search" exact strict render={() => <ContentSearchPageAuth searchResults={searchResults} updateResults={updateResults} changeAuth={changeAuth}/>} />
              <Route path="/vehicles/add" exact strict render={() => <ContentAddVehicles changeAuth={changeAuth}/>} />
              <Route path="/vehicles/:id/modify" exact strict render={() => <ContentAddVehicles changeAuth={changeAuth}/>} />
              <Route path="/vehicles/:id/details" exact strict render={() => <ContentDetailsPageAuth changeAuth={changeAuth} />} />
            </Switch>
          </div>
        </div>
      </div>
  );
}


function AppUnauth({ changeAuth }) {
  const [searchResults, setSearchResults] = React.useState([]);
  const cachedResults = React.useRef([]);

  function updateResults(data) {
    const newCachedResults = [...cachedResults.current];
    const cachedItemsIds = [];
    for (const item of newCachedResults) {
      cachedItemsIds.push(item.id);
    }
    for (const item of data) {
      if (!(cachedItemsIds.includes(item.id))) {
        newCachedResults.push(item);
      }
    }
    cachedResults.current = newCachedResults;
    sessionStorage.setItem("cachedSearchResults", JSON.stringify(newCachedResults));
    setSearchResults(data);
  }

  return (
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
          <Switch>
            <Route path="/" exact strict render={() => <ContentWelcomePageUnauth changeAuth={changeAuth} />} />
            <Route path="/vehicles/search" exact strict render={() => <ContentSearchPageUnauth searchResults={searchResults} updateResults={updateResults} changeAuth={changeAuth}/>} />
            <Route path="/vehicles/:id/details" exact strict render={() => <ContentDetailsPageUnauth changeAuth={changeAuth} />} />
          </Switch>
        </div>
      </div>
    </div>
  );
}


function App() {
  const [loaded, setLoaded] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [modalProperties, setModalProperties] = React.useState({ visibility: "hidden", type: "loading" });

  function renderApp() {
    if (authenticated) {
      return (
        <AppAuth 
          changeAuth={bool => setAuthenticated(bool)}
        />
      );
    } else {
      return (
        <AppUnauth 
          changeAuth={bool => setAuthenticated(bool)}
        />
      );
    }
  }

  React.useEffect(() => {
    async function checkLoginValidity() {
      if (sessionStorage.getItem("res") !== null) {
          const userData = JSON.parse(sessionStorage.getItem("res"));
          if (userData.jwt !== null) {
              const token = JSON.parse(sessionStorage.getItem("res")).jwt;
              const url = "http://borzalom.ddns.net:1000/users/me";
              const options = {
                  method: "GET",
                  headers: {
                      'Content-type': 'application/json',
                      Authorization: `Bearer ${token}`
                  },
              };
              let responseStatus = 0;

              await fetch(url, options)
                  .then(res => {
                      responseStatus = res.status;
                      return res.json();
                  })
                  .catch(err => console.log(err));

              if (responseStatus >= 200 && responseStatus < 300) {
                  return true;
              } else {
                  console.log("Error code:");
                  console.log(responseStatus);
                  return false;
              }
          } else {
              return false;
          }
      } else {
          return false;
      }
  }

  async function init() {
      const result = await checkLoginValidity();
      setLoaded(true);
      setAuthenticated(result || false);
  }

  init();
  }, []);

/*   if (!loaded) {
    setModalProperties({ visibility: "visible", type: "loading" });
  } else {
    setModalProperties({ visibility: "hidden", type: "loading" });
  } */

  return (
    <Router>
      <Modal modalProperties={modalProperties} modalEffect={null}/>
      {renderApp()}
    </Router>
  );
}


export default App;
