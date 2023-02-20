import React from "react";
import { Router } from "@reach/router";
import Menu from "./Menu.js";
import "./App.css";
import { Route, Switch } from "react-router";
import { Redirect } from "@reach/router";

const App = () => (
	<div className="appContainer">
		<Router>
			<Route path="/" component={Menu} />
			<Route path="/:category?" component={Menu} />
		</Router>
	</div>
);

export default App;
