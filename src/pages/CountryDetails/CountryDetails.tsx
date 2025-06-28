import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../../ui/layout/container/Container";
import Button from "../../ui/reusable/button/Button";
import styles from "./CountryDetails.module.scss";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { getRequest } from "../../utils/apiClient";

interface CountryData {
	capital: string[];
	name: {
		common: string;
		nativeName: {
			[key: string]: {
				common: string;
				official: string;
			};
		};
	};
	region: string;
	population: number;
	flags: {
		svg: string;
		png: string;
	};
	subregion: string;
	tld: string[];
	currencies: {
		[key: string]: {
			name: string;
			symbol: string;
		};
	};
	languages: {
		[key: string]: string;
	};
	borders?: string[];
}

const CountryDetails = () => {
	const nav = useNavigate();
	const borderNav = useNavigate();
	const { country } = useParams<{ country: string }>();
	const [countryData, setCountryData] = useState<CountryData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCountryData = async () => {
			if (!country) return;

			try {
				setLoading(true);
				setError(null);

				const response = await getRequest(`alpha/${country}`);

				if (response.data && response.data.length > 0) {
					setCountryData(response.data[0]);
				} else {
					setError("Country not found");
				}
			} catch (err: any) {
				setError(err.error || "Failed to fetch country data");
			} finally {
				setLoading(false);
			}
		};

		fetchCountryData();
	}, [country]);

	const back = () => {
		nav(-1);
	};

	if (loading) {
		return (
			<div>
				<Container>
					<div className={`${styles.discription} text`}>
						<div className={styles.loading}>Loading country details...</div>
					</div>
				</Container>
			</div>
		);
	}

	if (error || !countryData) {
		return (
			<Container>
				<div className={`${styles.discription}`}>
					<Button buttonType="back" onClick={back}>
						<HiArrowNarrowLeft />
						Back
					</Button>
					<div className={styles.error}>{error || "Country not found"}</div>
				</div>
			</Container>
		);
	}

	const {
		capital,
		name,
		region,
		population,
		flags,
		subregion,
		tld,
		currencies,
		languages,
		borders,
	} = countryData;

	const { common, nativeName } = name;
	const { svg } = flags;

	const objectKeys = nativeName && Object.keys(nativeName);
	const lang = objectKeys[objectKeys.length - 1];
	const Native_name = nativeName[lang].common;
	const currenciesKeys = currencies && Object.keys(currencies);
	const Language = languages && Object.keys(languages);
	const Lang = Language.filter((_, idx) => idx < 5).map((lang, idx) => {
		return (
			<span key={idx}>
				{languages[lang]}
				{idx === Language.length - 1 ? "" : " , "}
			</span>
		);
	});

	const Currency =
		currenciesKeys &&
		currenciesKeys.map((curr, idx) => {
			return (
				<span className={styles.country_capital} key={idx}>
					{currencies[curr].name}
					{idx === currenciesKeys.length - 1 ? "" : " , "}
				</span>
			);
		});

	const Capital =
		capital &&
		capital.map((cap, idx) => {
			return (
				<span className={styles.country_capital} key={idx}>
					{cap}
					{idx === capital.length - 1 ? "" : " , "}
				</span>
			);
		});

	const Border =
		borders &&
		borders.map((border, idx) => {
			const handleBorderClick = (borderCode: string) => {
				borderNav(`/${borderCode}`);
			};

			return (
				<Button buttonType={`border`} onClick={() => handleBorderClick(border)} key={idx}>
					{border}
				</Button>
			);
		});
	const formatted = new Intl.NumberFormat().format(population);

	return (
		<Container>
			<div className={`${styles.discription}`}>
				<Button buttonType="back" onClick={back}>
					<HiArrowNarrowLeft />
					Back
				</Button>
				<div className={`${styles.country_detail}`}>
					<img src={svg} alt="country-flag" className={styles.details_img} />
					<div className={`${styles.second}`}>
						<div className={`${styles.details_content}`}>
							<span className={`${styles.common}`}>{common}</span>
							<div className={`${styles.country_info}`}>
								<div className={`${styles.info_details}`}>
									<span>
										Native Name: <span>{Native_name}</span>
									</span>
									<span>
										Population: <span>{formatted}</span>
									</span>
									<span>
										Region: <span>{region}</span>
									</span>
									<span>
										Sub Region: <span>{subregion}</span>
									</span>
									<span>
										Capital: <span>{Capital}</span>
									</span>
								</div>
								<div className={`${styles.info_details} `}>
									<span>
										Top Level Domain: <span>{tld}</span>
									</span>
									<span className={styles.crown}>
										Currency: <span>{Currency}</span>
									</span>
									<span>Language(s): {Lang}</span>
								</div>
							</div>
						</div>
						<div className={`${styles.country_border}`}>
							<span>Border Countries:</span>
							<div className={`${styles.borders}`}>{Border ? Border : "No data"}</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default CountryDetails;
