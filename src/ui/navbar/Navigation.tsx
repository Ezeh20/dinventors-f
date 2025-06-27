import styles from "./Navigation.module.scss";
import Container from "../layout/container/Container";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
	const nav = useNavigate();

	const navigate = () => {
		nav("/");
	};

	return (
		<div>
			<header className={`${styles.nav} ${styles.nav_bg}`}>
				<Container>
					<nav className={`${styles.nav_nav}`}>
						<p className={styles.nav_text} onClick={navigate}>
							Where in the world ?
						</p>
					</nav>
				</Container>
			</header>
		</div>
	);
};
export default Navigation;
