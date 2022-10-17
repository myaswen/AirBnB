import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import HeaderContent from "./components/HeaderContent";
import HomeBodyContent from "./components/HomeBodyContent";
import FooterContent from "./components/FooterContent";
import SpotBodyContent from "./components/SpotBodyContent";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <HeaderContent isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={HomeBodyContent} />
          <Route path="/spots/:spotId" component={SpotBodyContent} />
          <Route>
            <h1>Page Not Found</h1>
          </Route>
        </Switch>
      )}
      <FooterContent />
    </>
  );

}

export default App;
