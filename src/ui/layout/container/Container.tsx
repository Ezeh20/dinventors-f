import type React from "react";
import styles from "./Container.module.scss";

interface PROPS {
	children: React.ReactNode;
}

const Container: React.FC<PROPS> = ({ children }) => {
	return <div className={styles.container_layout}>{children}</div>;
};

export default Container;
