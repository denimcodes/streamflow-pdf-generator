import { Route, Routes } from "react-router-dom";
import GenerateDocumentPage from "./pages/GenerateDocumentPage";
import HomePage from "./pages/HomePage";
import StreamPage from "./pages/StreamPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/wallet/:address" element={<StreamPage />} />
			<Route
				path="/generate/stream/:streamId"
				element={<GenerateDocumentPage />}
			/>
		</Routes>
	);
}

export default App;
