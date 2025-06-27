import styles from './Search.module.scss';
import { useContext, useEffect, useState } from 'react';
import { CountriesContext } from '../../context/CountriesContext';
import { RxMagnifyingGlass } from "react-icons/rx";
import { VscClose } from "react-icons/vsc";
import { TbChevronDown } from "react-icons/tb";
import type { ChangeEvent } from 'react';


const Search = () => {
	const {
		filterValue,
		setFilterValue,
		setSearchValue,
		isActive,
		setIsActive,
		searchValue,
		setSearch,
		search,
	} = useContext(CountriesContext);

	const [clear, setClear] = useState<string>("");
	const active = (): void => {
		setIsActive((current: boolean) => !current);
	};

	const options: string[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
	const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
		const value = event.target.value;
		setSearchValue(value);
		setClear(value);
	};

	const searchCountries = (): void => {
		setSearch(searchValue);
	};
	useEffect(() => {
		searchCountries();
	}, [search]);

	const clearInput = (): void => {
		setSearchValue("");
		setSearch('');
		setClear("");
	};

	const filterRegion = (option: string): void => {
		setFilterValue(option);
	};

	const clearRegion = (): void => {
		setFilterValue('');
		setIsActive(true);
	};

	return (
		<div className={styles.searchContainer}>
			<div className={`${styles.searchArea} alt-bg`}>
				<RxMagnifyingGlass className={styles.serchIcon} onClick={searchCountries} />
				<input
					type="text"
					placeholder="Search for a country..."
					value={clear}
					className={`${styles.homeInput} alt-bg text`}
					onChange={onChange}
				/>
				{searchValue.length > 0 && <VscClose className={styles.serchIcon} onClick={clearInput} />}
			</div>
			<div className={styles.drop_down_container}>
				<div className={`${styles.drop_down_current} alt-bg`} onClick={active}>
					{filterValue.length > 0 ? (
						<span>{filterValue}</span>
					) : (
						<span>Filter by region</span>
					)}
					{filterValue.length > 0 ? (
						<VscClose className={styles.drop_down_icon} onClick={clearRegion} />
					) : (
						<TbChevronDown className={styles.drop_down_icon} />
					)}
				</div>
				<div className={`${styles.options} alt-bg`}>
					{isActive &&
						options.map((option) => (
							<div key={option} className={styles.region} onClick={() => setIsActive((curr) => !curr)}>
								<p className={styles.option} onClick={() => filterRegion(option)}>
									{option}
								</p>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Search;
