import { PageSection } from "../layout/index.js";
import { Heading, Text } from "../ui";
import HeadBack from "./HeadBack";

export default function LoadError({
	error = null,
	message = "Unable to load the requested content.",
	action = { action: null, label: "Take action" },
	headBack = false,
	to = "/",
	children,
}) {
	return (
		<PageSection className="border border-red-200 bg-red-50">
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
						className="text-lg font-semibold text-red-800"
					>
						{message}
					</Heading>
					<Text className="mt-2 text-sm text-red-700">{error}</Text>
				</div>
				{action.action && (
					<button
						type="button"
						onClick={action.action}
						className="mt-4 rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
					>
						{action.label}
					</button>
				)}
			</div>
		</PageSection>
	);
}
