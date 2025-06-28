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


export type SortOption = 'name-asc' | 'name-desc' | 'population-asc' | 'population-desc' | '';

export interface CountriesContextType {
    countries: Country[];
    filteredCountries: Country[];
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    selectedRegion: string;
    setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
    sortOption: SortOption;
    setSortOption: any;
    isLoading: boolean;
    error: string | null;
    searchCountryByName: (name: string) => Promise<void>;
    filterByRegion: (region: string) => Promise<void>;
    clearFilters: () => void;
    currentPage: number;
    itemsPerPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    paginatedCountries: Country[];
}

export const CountriesContext = createContext<CountriesContextType>({
    countries: [],
    filteredCountries: [],
    searchQuery: "",
    setSearchQuery: () => {},
    selectedRegion: "",
    setSelectedRegion: () => {},
    sortOption: '',
    setSortOption: () => {},
    isLoading: false,
    error: null,
    searchCountryByName: async () => {},
    filterByRegion: async () => {},
    clearFilters: () => {},
    currentPage: 1,
    itemsPerPage: 10,
    setCurrentPage: () => {},
    paginatedCountries: [],
});