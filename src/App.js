import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';

import { Backdrop } from "./CommonComponents";
import { ContentWelcomePageAuth, ContentDetailsPageAuth, LoginBoxAuth, ContentSearchPageAuth, ContentAddVehicles } from "./AppAuthComponents";
import { ContentWelcomePageUnauth, ContentDetailsPageUnauth, LoginBoxUnauth, ContentSearchPageUnauth } from "./AppUnauthComponents";


function AppAuth({ changeAuth, changeBackdrop }) {
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
    setSearchResults(data);
  }

  function renderSearchPageAuth() {
    return <ContentSearchPageAuth searchResults={searchResults} updateResults={updateResults} />;
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
          <div className="center-box">
            <Switch>
              <Route path="/" exact strict component={ContentWelcomePageAuth} />
              <Route path="/vehicles/search" exact strict render={() => renderSearchPageAuth()} />
              <Route path="/vehicles/add" exact strict component={ContentAddVehicles} />
              <Route path="/vehicles/:id/details" exact strict component={ContentDetailsPageAuth} />
            </Switch>
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
  );
}


function AppUnauth({ changeAuth, changeBackdrop }) {
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

  function renderSearchPageUnauth() {
    return <ContentSearchPageUnauth searchResults={searchResults} updateResults={updateResults} />;
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
          <div className="center-box">
            <Switch>
              <Route path="/" exact strict component={ContentWelcomePageUnauth} />
              <Route path="/vehicles/search" exact strict render={() => renderSearchPageUnauth()} />
              <Route path="/vehicles/:id/details" exact strict component={ContentDetailsPageUnauth} />
            </Switch>
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
  );
}


function App() {
  const [loaded, setLoaded] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [backdropProperties, setBackdropProperties] = React.useState({ visibility: "hidden", type: "loading" });

  function changeBackdrop(backdropData) {
    const { visibility, type } = { ...backdropData };
    setBackdropProperties({ visibility: visibility, type: type });
  }

  function renderApp() {
    if (authenticated) {
      return (
        <AppAuth 
          changeAuth={bool => setAuthenticated(bool)}
          changeBackdrop={changeBackdrop}
        />
      );
    } else {
      return (
        <AppUnauth 
          changeAuth={bool => setAuthenticated(bool)}
          changeBackdrop={changeBackdrop}
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

  if (!loaded) {
    return <Backdrop backdropProperties={backdropProperties}/>
  }

  return (
    <Router>
      <Backdrop
        backdropProperties={backdropProperties}
      />
      {renderApp()}
    </Router>
  );
}


export default App;
