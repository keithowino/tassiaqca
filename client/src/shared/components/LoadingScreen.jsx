import { Heading, Text } from "../ui";

export default function LoadingScreen({ message = "Loading..." }) {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center">
				<div className="w-12 h-12 mx-auto rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />

				<Heading level={3} className="mt-6">
					TassiaQCA
				</Heading>

				<Text className="mt-2">{message}</Text>
			</div>
		</div>
	);
}
