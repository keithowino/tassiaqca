import clsx from "clsx";
import { buttonVariants, buttonSizes } from "./button.styles";

export default function Button({
	as: Component = "button",
	variant = "primary",
	size = "md",
	className = "",
	children,
	...props
}) {
	return (
		<Component
			className={clsx(
				"rounded-2xl font-semibold transition-colors",
				buttonVariants[variant],
				buttonSizes[size],
				className,
			)}
			{...props}
		>
			{children}
		</Component>
	);
}
