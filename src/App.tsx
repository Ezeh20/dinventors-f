import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./ui/navbar/Navigation";

const App = () => {
	return (
		<div>
			<Navigation />
			<Routes>
				<Route index element={<Home />} />
			</Routes>
		</div>
	);
};

export default App;
