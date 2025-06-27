import styles from "./Button.module.scss";
import React from "react";

const ButtonTypes = {
	back: "back",
	border: "border",
};

interface PROPS {
	onClick: () => void;
	children: React.ReactNode;
	buttonType: "back" | "border";
}

const Button: React.FC<PROPS> = ({ onClick, children, buttonType }) => {
	return (
		<button
			className={`${ButtonTypes[buttonType]} ${styles.buttons}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
export default Button;
