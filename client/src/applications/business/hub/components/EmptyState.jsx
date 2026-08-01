import { Button, Heading, Text } from "../../../../shared/ui";

export default function EmptyState({ onCreateBusiness }) {
	return (
		<div className="rounded-xl border bg-white p-12 text-center">
			<Heading level={2}>Welcome to the Business OS</Heading>

			<Text className="mt-4">
				You haven't created any businesses yet.
			</Text>

			<div className="mt-8">
				<Button onClick={onCreateBusiness}>
					Create Your First Business
				</Button>
			</div>
		</div>
	);
}
