import styles from "./Search.module.scss";
import { useContext, useState, useCallback, useRef, useLayoutEffect } from "react";
import { CountriesContext } from "../../context/CountriesContext";
import { RxMagnifyingGlass } from "react-icons/rx";
import { VscClose } from "react-icons/vsc";
import { TbChevronDown } from "react-icons/tb";
import type { ChangeEvent } from "react";

const Search = () => {
	const {
		searchQuery,
		selectedRegion,
		sortOption,
		setSortOption,
		searchCountryByName,
		filterByRegion,
		clearFilters,
		isLoading,
	} = useContext(CountriesContext);

	const [searchInput, setSearchInput] = useState<string>(searchQuery);
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
	const DropdownRef = useRef<HTMLDivElement>(null);

	const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
	const sortOptions = [
		{ value: "name-asc", label: "Name (A-Z)" },
		{ value: "name-desc", label: "Name (Z-A)" },
		{ value: "population-asc", label: "Population (Low-High)" },
		{ value: "population-desc", label: "Population (High-Low)" },
	];
	useLayoutEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (DropdownRef.current && !DropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setSearchInput(event.target.value);
	};

	const handleSearchSubmit = useCallback(async () => {
		if (isLoading) return;
		await searchCountryByName(searchInput);
	}, [searchInput, searchCountryByName, isLoading]);

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			handleSearchSubmit();
		}
	};

	const clearSearch = useCallback(async () => {
		setSearchInput("");
		await searchCountryByName("");
	}, [searchCountryByName]);

	const handleRegionSelect = useCallback(
		async (region: string) => {
			await filterByRegion(region);
		},
		[filterByRegion]
	);

	const handleSortSelect = useCallback(
		(sortValue: any) => {
			setSortOption(sortValue);
		},
		[setSortOption]
	);

	const clearRegionFilter = useCallback(async () => {
		await filterByRegion("");
	}, [filterByRegion]);

	const clearSortOption = useCallback(() => {
		setSortOption("");
	}, [setSortOption]);

	const handleClearAll = useCallback(async () => {
		setSearchInput("");
		clearFilters();
		setIsDropdownOpen(false);
	}, [clearFilters]);

	const areFiltersActive = searchQuery || selectedRegion || sortOption;

	return (
		<div className={styles.searchContainer}>
			<div className={`${styles.searchArea} alt-bg`}>
				<RxMagnifyingGlass
					className={`${styles.serchIcon} ${isLoading ? styles.loading : ""}`}
					onClick={handleSearchSubmit}
				/>
				<input
					type="text"
					placeholder="Search for a country..."
					value={searchInput}
					className={`${styles.homeInput} alt-bg text`}
					onChange={handleSearchChange}
					onKeyUp={handleKeyPress}
					disabled={isLoading}
				/>
				{searchInput.length > 0 && (
					<VscClose className={styles.clearSearchIcon} onClick={clearSearch} />
				)}
			</div>

			<div className={styles.filterSortActions}>
				<div className={styles.dropDownContainer} ref={DropdownRef}>
					<button
						role="button"
						className={`${styles.dropDownCurrent}`}
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					>
						{selectedRegion && sortOption ? (
							<span className={styles.selectedSummary}>
								{selectedRegion},{" "}
								{sortOptions.find((opt) => opt.value === sortOption)?.label}
							</span>
						) : selectedRegion ? (
							<span className={styles.selectedSummary}>{selectedRegion}</span>
						) : sortOption ? (
							<span className={styles.selectedSummary}>
								{sortOptions.find((opt) => opt.value === sortOption)?.label}
							</span>
						) : (
							<span className={styles.placeholderText}>Filter & Sort</span>
						)}
						<TbChevronDown
							className={`${styles.dropdownToggleIcon} ${
								isDropdownOpen ? styles.rotate : ""
							}`}
						/>
					</button>
					{isDropdownOpen && (
						<div className={`${styles.options} alt-bg`}>
							<div className={styles.optionGroup}>
								<div className={styles.groupHeader}>
									<h4 className={styles.groupTitle}>Filter by Region</h4>
									{selectedRegion && (
										<VscClose
											className={styles.clearGroupIcon}
											onClick={clearRegionFilter}
										/>
									)}
								</div>
								<div className={styles.optionsList}>
									{regions.map((region) => (
										<div
											key={region}
											className={`${styles.optionItem} ${
												selectedRegion === region ? styles.selected : ""
											}`}
											onClick={() => handleRegionSelect(region)}
										>
											<p className={styles.optionText}>{region}</p>
										</div>
									))}
								</div>
							</div>

							<hr className={styles.optionGroupDivider} />
							<div className={styles.optionGroup}>
								<div className={styles.groupHeader}>
									<h4 className={styles.groupTitle}>Sort by</h4>
									{sortOption && (
										<VscClose
											className={styles.clearGroupIcon}
											onClick={clearSortOption}
										/>
									)}
								</div>
								<div className={styles.optionsList}>
									{sortOptions.map((option) => (
										<div
											key={option.value}
											className={`${styles.optionItem} ${
												sortOption === option.value ? styles.selected : ""
											}`}
											onClick={() => handleSortSelect(option.value)}
										>
											<p className={styles.optionText}>{option.label}</p>
										</div>
									))}
								</div>
							</div>

							{areFiltersActive && (
								<button
									className={`${styles.clearAllBtn} alt-bg`}
									onClick={handleClearAll}
									disabled={isLoading}
								>
									Clear All Filters
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Search;
