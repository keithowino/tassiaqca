import { Hero } from "../../../../shared/layout";
import { Badge, Heading, Text } from "../../../../shared/ui";

export default function HubHeader() {
	return (
		<Hero>
			<div className="max-w-3xl mb-5">
				<Badge>Business Operating System</Badge>

				<Heading level={1} className="mt-6">
					Welcome to your Business Hub.
				</Heading>

				<Text className="mt-3 text-lg">
					The Business OS helps you manage your business from one
					unified platform. Whether you sell products, provide
					services, manage bookings, operate a restaurant, or run an
					entire organization, your workspace adapts to your business.{" "}
					<span className="font-bold">
						Select a business workspace or create a new one.
					</span>
				</Text>
			</div>
		</Hero>
	);
}
