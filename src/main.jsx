import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import StreamProvider from "./context/StreamProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<StreamProvider>
				<App />
			</StreamProvider>
		</BrowserRouter>
	</React.StrictMode>
);
