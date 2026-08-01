import { Container } from "../../ui";

export default function Hero({ children, className = "" }) {
	return (
		<section
			className={`relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 ${className}`}
		>
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-6 right-6 w-36 h-36 rounded-full bg-white" />

				<div className="absolute bottom-6 left-10 w-24 h-24 rounded-full bg-white" />
			</div>

			<Container className="relative py-20">{children}</Container>
		</section>
	);
}
