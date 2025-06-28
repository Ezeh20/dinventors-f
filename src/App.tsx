import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./ui/navbar/Navigation";
import CountryDetails from "./pages/CountryDetails/CountryDetails";

const App = () => {
	return (
		<>
			<Navigation />
			<Routes>
				<Route index element={<Home />} />
				<Route path=":country" element={<CountryDetails />} />
			</Routes>
		</>
	);
};

export default App;
