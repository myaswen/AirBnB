import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import HeaderContent from "./components/HeaderContent";
import BodyContent from "./components/BodyContent";
import FooterContent from "./components/FooterContent";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <HeaderContent isLoaded={isLoaded} />
      <BodyContent />
      <FooterContent />
      {isLoaded && (
        <Switch>
        </Switch>
      )}
    </>
  );

}

export default App;
