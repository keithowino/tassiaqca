import { Badge, HeadBack, Heading, Hero, Text } from "../../shared/index.js";

export default function SeedHeader({
	badgeText,
	children,
	description,
	subDescription,
	headBack = false,
	to = "/",
	title,
}) {
	return (
		<Hero>
			<div className="max-w-3xl mb-5">
				{headBack && (
					<div className="absolute top-4 left-4">
						<HeadBack to={to}>{children}</HeadBack>
					</div>
				)}
				<Badge>{badgeText}</Badge>

				<Heading level={1} className="mt-6">
					{title}
				</Heading>

				<Text className="mt-3 text-lg">
					{description}{" "}
					{subDescription && (
						<span className="font-bold">{subDescription}</span>
					)}
				</Text>
			</div>
		</Hero>
	);
}
