import "./actions";
import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { AppConnect } from "@containers/app/app";

ReactDOM.render(<AppConnect/>, document.getElementById("app"));