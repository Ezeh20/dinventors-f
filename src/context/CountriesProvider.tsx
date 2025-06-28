import React, { useLayoutEffect, useMemo, useState } from "react";
import { CountriesContext } from "./CountriesContext";
import type { Country, CountriesContextType, SortOption } from "./CountriesContext";
import { getRequest } from "../utils/apiClient";

interface Props {
    children: React.ReactNode;
}

export const CountriesProvider: React.FC<Props> = ({ children }) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const [sortOption, setSortOption] = useState<SortOption>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 12;

    useLayoutEffect(() => {
        const fetchAllCountries = async () => {
            setIsLoading(true);
            setError(null);
            setCurrentPage(1); 
            try {
                const response = await getRequest(
                    "all?fields=name,cca2,flags,population,region,capital"
                );
                setCountries(response.data);
            } catch (err: any) {
                const errorMessage = err?.error || err?.message || "Failed to fetch countries";
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllCountries();
    }, []);

    const searchCountryByName = async (name: string) => {
        setIsLoading(true);
        setError(null);
        setCurrentPage(1);

        if (!name.trim()) {
            try {
                const response = await getRequest(
                    "all?fields=name,cca2,flags,population,region,capital"
                );
                setCountries(response.data);
                setSearchQuery("");
            } catch (err: any) {
                const errorMessage = err?.error || err?.message || "Failed to fetch countries";
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
            return;
        }

        try {
            const response = await getRequest(
                `name/${name}?fields=name,cca2,flags,population,region,capital`
            );
            setCountries(response.data);
            setSearchQuery(name);
            setSelectedRegion("");
        } catch (err: any) {
            const errorMessage = err?.error || err?.message || "No countries found";
            setError(errorMessage);
            setCountries([]);
        } finally {
            setIsLoading(false);
        }
    };

    const filterByRegion = async (region: string) => {
        setIsLoading(true);
        setError(null);
        setCurrentPage(1);

        if (!region) {
            try {
                const response = await getRequest(
                    "all?fields=name,cca2,flags,population,region,capital"
                );
                setCountries(response.data);
                setSelectedRegion("");
            } catch (err: any) {
                const errorMessage = err?.error || err?.message || "Failed to fetch countries";
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
            return;
        }

        try {
            const response = await getRequest(
                `region/${region}?fields=name,cca2,flags,population,region,capital`
            );
            setCountries(response.data);
            setSelectedRegion(region);
            setSearchQuery("");
        } catch (err: any) {
            const errorMessage = err?.error || err?.message || "No countries found in this region";
            setError(errorMessage);
            setCountries([]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearFilters = async () => {
        setIsLoading(true);
        setError(null);
        setCurrentPage(1);

        try {
            const response = await getRequest(
                "all?fields=name,cca2,flags,population,region,capital"
            );
            setCountries(response.data);
            setSearchQuery("");
            setSelectedRegion("");
            setSortOption("");
        } catch (err: any) {
            const errorMessage = err?.error || err?.message || "Failed to fetch countries";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };


    const handleSetSortOption = (option: SortOption) => {
        setSortOption(option);
        setCurrentPage(1);
    };

    const filteredCountries = useMemo(() => {
        const result = [...countries];

        if (sortOption) {
            result.sort((a, b) => {
                switch (sortOption) {
                    case "name-asc":
                        return a.name.common.localeCompare(b.name.common);
                    case "name-desc":
                        return b.name.common.localeCompare(a.name.common);
                    case "population-asc":
                        return a.population - b.population;
                    case "population-desc":
                        return b.population - a.population;
                    default:
                        return 0;
                }
            });
        }
        return result;
    }, [countries, sortOption]);

    const paginatedCountries = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredCountries.slice(startIndex, endIndex);
    }, [filteredCountries, currentPage, itemsPerPage]);

    const value: CountriesContextType = {
        countries,
        filteredCountries,
        searchQuery,
        setSearchQuery,
        selectedRegion,
        setSelectedRegion,
        sortOption,
        setSortOption: handleSetSortOption, 
        isLoading,
        error,
        searchCountryByName,
        filterByRegion,
        clearFilters,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        paginatedCountries,
    };

    return <CountriesContext.Provider value={value}>{children}</CountriesContext.Provider>;
};