import { useContext } from "react";
import CountryCards from "../../ui/reusable/countryCard/CountryCard";
import Search from "../../ui/search/Search";
import { CountriesContext } from "../../context/CountriesContext";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Container from "../../ui/layout/container/Container";
import styles from "./Home.module.scss";
import Skeleton from "../../ui/skeleton/Skeleton";

const Home = () => {
	const {
		filteredCountries,
		paginatedCountries,
		isLoading,
		currentPage,
		setCurrentPage,
		itemsPerPage,
	} = useContext(CountriesContext);

	const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
	const handlePrevious = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
	};

	const handleNext = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
	};

	return (
		<Container>
			<div className={`${styles.home}`}>
				<Search />
				{isLoading ? (
					<div className={styles.contain9}>
						{Array.from({ length: 12 }).map((_, idx) => {
							return (
								<div key={idx}>
									<div>
										<Skeleton />
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<>
						{filteredCountries.length === 0 && (
							<p className={styles.not_found}>No country found</p>
						)}
						<div className={styles.contain}>
							{paginatedCountries.map((country, idx) => (
								<CountryCards key={idx} country={country} />
							))}
						</div>

						{filteredCountries.length > 0 && (
							<div className={styles.controlContainer}>
								<div className={styles.paginationControls}>
									<button
										onClick={handlePrevious}
										disabled={currentPage === 1}
										className={styles.paginationButton}
									>
										<IoIosArrowBack size={18}/>
									</button>
									<span className={styles.pageInfo}>
										Page {currentPage} of {totalPages}
									</span>

									<button
										onClick={handleNext}
										disabled={currentPage === totalPages}
										className={styles.paginationButton}
									>
										<IoIosArrowForward size={18}/>
									</button>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</Container>
	);
};

export default Home;
