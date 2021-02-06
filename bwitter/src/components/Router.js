import React, { useState } from "react";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Auth from "../routers/Auth";
import Home from "../routers/Home";
import Naviagation from "components/Navigation";
import Profile from "routers/Profile";


const AppRouter  = ({isLoggedIn, userObj}) => {
return (
<Router>
    {isLoggedIn && <Naviagation />}
    <Switch>
        {isLoggedIn ? (
        <>
        <Route exact path="/">
            <Home userObj={userObj}/>
        </Route>
        <Route exact path="/profile">
            <Profile />
        </Route>
        <Redirect from="*" to="/" />
        </>
        ) : (
        <>
        <Route exact path="/">
            <Auth />
        </Route>
        <Redirect from="*" to="/" />
        </>
        )}
    </Switch>
</Router>
);
};

export default AppRouter;