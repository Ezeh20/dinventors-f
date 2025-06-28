import React from "react";
import styles from "./Skeleton.module.scss";

const Skeleton: React.FC = () => {
	return (
		<div className={`${styles.skeleton_card} alt-bg`}>
			<div className={styles.skeleton_flag}></div>
			<div className={styles.skeleton_card_content}>
				<div
					className={styles.skeleton_line}
					style={{ width: "55%", height: "2rem", marginBottom: "0rem" }}
				></div>
                	<div
					className={styles.skeleton_line}
					style={{ width: "80%", height: "1.2rem", marginBottom: "0rem" }}
				></div>	<div
					className={styles.skeleton_line}
					style={{ width: "80%", height: "1.2rem", marginBottom: "0rem" }}
				></div>	<div
                className={styles.skeleton_line}
                style={{ width: "80%", height: "1.2rem", marginBottom: "0rem" }}
            ></div>
			</div>
		</div>
	);
};

export default Skeleton;
