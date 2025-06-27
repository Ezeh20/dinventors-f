import { createContext } from "react";

export interface Country {
	name: {
		common: string;
	};
	cca2: string;
	flags: {
		png: string;
	};
	population: number;
	region: string;
	capital?: string[];
}

export interface CountriesContextType {
	countries: Country[];
	filteredCountries: Country[];
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	selectedRegion: string;
	setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
	isLoading: boolean;
	error: string | null;
	filterValue: string;
	setFilterValue: React.Dispatch<React.SetStateAction<string>>;
	isActive: boolean;
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const CountriesContext = createContext<CountriesContextType>({
	countries: [],
	filteredCountries: [],
	searchQuery: "",
	setSearchQuery: () => {},
	selectedRegion: "",
	setSelectedRegion: () => {},
	isLoading: false,
	error: null,
	filterValue: "",
	setFilterValue: () => {},
	isActive: false,
	setIsActive: () => {},
	searchValue: "",
	setSearchValue: () => {},
	search: "",
	setSearch: () => {},
});
