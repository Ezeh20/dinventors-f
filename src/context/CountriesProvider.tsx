import React, { useEffect, useMemo, useState } from "react";
import { CountriesContext } from "./CountriesContext";
import type { Country, CountriesContextType } from "./CountriesContext";

interface Props {
	children: React.ReactNode;
}

export const CountriesProvider: React.FC<Props> = ({ children }) => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedRegion, setSelectedRegion] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [filterValue, setFilterValue] = useState<string>("");
	const [isActive, setIsActive] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>("");
	const [search, setSearch] = useState<string>("");

	useEffect(() => {
		const fetchCountries = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(
					"https://restcountries.com/v3.1/all?fields=name,cca2,flags,population,region,capital"
				);

				if (!response.ok) {
					throw new Error(`Failed to fetch countries: ${response.status}`);
				}

				const data: Country[] = await response.json();
				setCountries(data);
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
				setError(errorMessage);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCountries();
	}, []);

	const filteredCountries = useMemo(() => {
		let result = countries;
		if (selectedRegion) {
			result = result.filter((country) =>
				country.region.toLowerCase().includes(selectedRegion.toLowerCase())
			);
		}
		if (searchQuery) {
			result = result.filter((country) =>
				country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		return result;
	}, [countries, selectedRegion, searchQuery]);

	const value: CountriesContextType = {
		countries,
		filteredCountries,
		searchQuery,
		setSearchQuery,
		selectedRegion,
		setSelectedRegion,
		isLoading,
		error,
		filterValue,
		setFilterValue,
		isActive,
		setIsActive,
		searchValue,
		setSearchValue,
		search,
		setSearch,
	};

	return <CountriesContext.Provider value={value}>{children}</CountriesContext.Provider>;
};
