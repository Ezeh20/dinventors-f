import { useContext } from "react";
import CountryCards from "../../ui/reusable/countryCard/CountryCard";
import Search from "../../ui/search/Search";
import { CountriesContext } from "../../context/CountriesContext";
import Container from "../../ui/layout/container/Container";
import styles from "./Home.module.scss";

const Home = () => {
	const { filteredCountries } = useContext(CountriesContext);

	return (
		<Container>
			<div className={`${styles.home} bg text`}>
				<Search />
				<p className={styles.total}>({filteredCountries.length})</p>
				{filteredCountries.length < 1 && (
					<p className={styles.not_found}> No country found</p>
				)}
				<div className={styles.contain}>
					{filteredCountries &&
						filteredCountries.map((country, idx) => {
							return <CountryCards key={idx} country={country} />;
						})}
				</div>
			</div>
		</Container>
	);
};

export default Home;
