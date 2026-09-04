import { Heading, Text } from "../ui";
import HeadBack from "./HeadBack";

export default function LoadError({
	error = null,
	message = "Unable to load the requested content.",
	headBack = false,
	to = "/",
	children,
}) {
	return (
		<section className="min-h-screen flex flex-col justify-center bg-gray-50 px-4 py-2">
			{headBack && (
				<div className="absolute top-4 left-4">
					<HeadBack to={to}>{children}</HeadBack>
				</div>
			)}
			<div className="flex flex-col h-full w-full items-center justify-center">
				<div className="text-center">
					<Heading level={3} className="mt-6">
						TassiaQCA
					</Heading>
					<Heading
						level={4}
						className="text-lg font-semibold text-red-900"
					>
						{message}
					</Heading>
					<Text className="mt-2 text-sm text-red-700">{error}</Text>
				</div>
			</div>
		</section>
	);
}
