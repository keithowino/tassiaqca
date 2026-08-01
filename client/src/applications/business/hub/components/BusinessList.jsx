import BusinessCard from "./BusinessCard";
import EmptyState from "./EmptyState";

export default function BusinessList({
	loading,
	businesses,
	onOpen,
	onCreateBusiness,
}) {
	if (loading) {
		return <p>Loading businesses...</p>;
	}

	if (businesses.length === 0) {
		return <EmptyState onCreateBusiness={onCreateBusiness} />;
	}

	return (
		<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
			{businesses.map((business) => (
				<BusinessCard
					key={business.id}
					business={business}
					onOpen={onOpen}
				/>
			))}
		</div>
	);
}
