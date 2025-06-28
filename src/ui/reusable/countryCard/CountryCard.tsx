import { useNavigate } from "react-router-dom";
import styles from "./CountryCard.module.scss";

interface Country {
	capital?: string[];
	name: {
		common: string;
	};
	region: string;
	population: number;
	flags: {
		png: string;
	};
	cca2: string;
}

interface CountryCardsProps {
	country: Country;
}

const CountryCards: React.FC<CountryCardsProps> = ({ country }) => {
	const { capital, name, region, population, flags, cca2 } = country;
	const { common } = name;
	const { png } = flags;
	const formatted = new Intl.NumberFormat().format(population);
	const nav = useNavigate();
	const dynamic = cca2.replaceAll(" ", "");

	const handleNavigate = () => {
		nav(dynamic, {
			state: country,
		});
	};

	const Capital = capital?.slice(0, 2).map((cap, idx) => (
		<span key={idx} className={styles.country_details}>
			{cap}
			{idx === capital.length - 1 ? "" : " , "}
		</span>
	));

	return (
		<div className={`${styles.country_card}`} onClick={handleNavigate}>
			<img src={png} alt="flag" className={styles.country_flag} />
			<div className={styles.card_content}>
				<span className={`${styles.country_name}`}>{common}</span>
				<div className={styles.country_info}>
					<span>
						Population: <span className={styles.country_details}>{formatted}</span>
					</span>
					<span>
						Region: <span className={styles.country_details}>{region}</span>
					</span>
					<span className={styles.capital}>Capital: {Capital}</span>
				</div>
			</div>
			<div className={styles.info}>
				<p>i</p>
			</div>
		</div>
	);
};

export default CountryCards;
