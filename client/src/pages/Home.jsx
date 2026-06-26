import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Search,
	ArrowRight,
	Star,
	MapPin,
	Zap,
	Pin,
	Users,
	Award,
} from "lucide-react";
import { businessAPI, categoryAPI, communityAPI } from "../lib/api";
import BusinessCard from "../components/business/BusinessCard";
import CategoryFilter from "../components/business/CategoryFilter";
import LoadingSpinner from "../components/common/LoadingSpinner";
import MetaDataInsert from "../lib/MetaDataInsert";
import data from "../lib/data";
import { useCommon } from "../lib/context/CommonContext";

export default function Home() {
	const {
		typeColors,
		getDefaultIconForCategory,
		getDefaultColorForCategory,
	} = useCommon();
	const { metadata } = data;
	const [businesses, setBusinesses] = useState([]);
	const [categories, setCategories] = useState([]);
	const [posts, setPosts] = useState([]);
	const [featuredBusinesses, setFeaturedBusinesses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [stats, setStats] = useState({
		totalBusinesses: 0,
		totalReviews: 0,
		todayOrders: 0,
		activeUsers: 0,
	});

	const navigate = useNavigate();

	useEffect(() => {
		const fetchHomeData = async () => {
			setLoading(true);
			try {
				// Fetch all data in parallel for better performance
				const [businessesRes, categoriesRes, postsRes] =
					await Promise.all([
						businessAPI.getAll(),
						categoryAPI.getAll().catch((err) => {
							console.log(
								"Categories not yet implemented, using dynamic extraction",
							);
							return { data: [] };
						}),
						communityAPI.getAll(1, 3).catch((err) => {
							console.log(
								"Could not fetch community posts:",
								err,
							);
							return { data: { posts: [] } };
						}),
					]);

				const allBusinesses = businessesRes.data || [];
				const activeBusinesses = allBusinesses.filter(
					(biz) => biz.isActive === true,
				);

				// Update stats
				setStats({
					totalBusinesses: activeBusinesses.length,
					totalReviews: activeBusinesses.reduce(
						(sum, biz) => sum + (biz.reviewCount || 0),
						0,
					),
					todayOrders: Math.floor(Math.random() * 50) + 20, // Placeholder - replace with actual API call
					activeUsers: 1240, // TODO: fetch real
				});

				// Set featured businesses (verified + high rating)
				const featured = activeBusinesses
					.filter((biz) => biz.isVerified === true)
					.sort(
						(a, b) =>
							(b.averageRating || 0) - (a.averageRating || 0),
					)
					.slice(0, 6);

				setFeaturedBusinesses(featured);

				// // Trending (most viewed or recent orders)
				// const trendingItems = [...activeBusinesses]
				// 	.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
				// 	.slice(0, 4);
				// setTrending(trendingItems);

				setBusinesses(activeBusinesses);

				// Process categories
				let categoryData = categoriesRes.data || [];

				// If no categories from API, extract dynamically from businesses
				if (!categoryData.length) {
					categoryData =
						extractCategoriesFromBusinesses(activeBusinesses);
				}

				setCategories(categoryData);

				// Process community posts
				const postsData = postsRes.data?.posts || postsRes.data || [];
				setPosts(postsData.slice(0, 3)); // Limit to 3 posts for preview
			} catch (error) {
				console.error("Home data fetch error:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchHomeData();
	}, []);

	// Filter businesses by selected category
	const getFilteredBusinesses = () => {
		if (!selectedCategory) return featuredBusinesses;

		const category = categories.find(
			(cat) => cat.slug === selectedCategory,
		);
		if (!category) return featuredBusinesses;

		return businesses
			.filter((biz) => biz.category === category.name)
			.sort((a, b) => (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0))
			.slice(0, 6);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (search.trim()) {
			const params = new URLSearchParams();
			params.append("q", search.trim());
			if (selectedCategory) {
				params.append("category", selectedCategory);
			}
			navigate(`/discover?${params.toString()}`);
		}
	};

	const handleCategorySelect = (slug) => {
		setSelectedCategory(slug);
	};

	// Helper function to extract categories from businesses
	const extractCategoriesFromBusinesses = (businessesList) => {
		const categoryMap = new Map();

		businessesList.forEach((business) => {
			if (business.category && !categoryMap.has(business.category)) {
				categoryMap.set(business.category, {
					id: business.category
						.toLowerCase()
						.replace(/[^a-z0-9]+/g, "-"),
					name: business.category,
					slug: getCategorySlug(business.category),
					icon: getDefaultIconForCategory(business.category),
					color: getDefaultColorForCategory(business.category),
					businessCount: 1,
				});
			} else if (business.category) {
				const existing = categoryMap.get(business.category);
				if (existing) {
					existing.businessCount++;
				}
			}
		});

		return Array.from(categoryMap.values()).sort((a, b) =>
			a.name.localeCompare(b.name),
		);
	};

	const getCategorySlug = (name) => {
		return name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "");
	};

	const displayedBusinesses = getFilteredBusinesses();

	return (
		<>
			<MetaDataInsert
				title={metadata.name}
				description="Discover local businesses, order food, book services, and connect with your neighbors in Tassia Complex, Embakasi East, Nairobi."
			/>
			<div className="max-w-5xl mx-auto">
				{/* Hero Section */}
				<section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-amber-400 px-4 pt-8 pb-16">
					<div className="absolute inset-0 opacity-10">
						<div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full" />
						<div className="absolute bottom-4 left-8 w-20 h-20 bg-white rounded-full" />
					</div>
					<div className="relative max-w-xl mx-auto text-center">
						<div className="inline-flex items-center gap-1.5 bg-white/20 text-white text-sm px-3 py-1 rounded-full mb-4">
							<MapPin size={13} />
							<span>Tassia Complex, Embakasi East, Nairobi</span>
						</div>
						<h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-2">
							Your Neighborhood,
							<br />
							<span className="text-amber-200">One Tap Away</span>
						</h1>
						<p className="text-lg text-orange-100 mb-8 max-w-md mx-auto">
							Support local businesses. Get what you need today.
							Build connections that matter in Tassia.
						</p>
						<form
							onSubmit={handleSearch}
							className="relative max-w-md mx-auto"
						>
							<Search
								size={18}
								className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
							/>
							<input
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search restaurants, salons, hardware..."
								className="w-full bg-white rounded-2xl pl-11 pr-28 py-3.5 text-sm text-gray-900 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
							/>
							<button
								type="submit"
								className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors"
							>
								Search
							</button>
						</form>
					</div>
				</section>

				{/* STATS Banner */}
				<div className="bg-white border-b sticky top-0 z-40 shadow-sm">
					<div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap justify-around gap-6 text-center">
						{[
							{
								icon: (
									<Users
										size={20}
										className="text-orange-500"
									/>
								),
								label: "Residents",
								value: `${stats.activeUsers}+`,
							},
							{
								icon: (
									<Award
										size={20}
										className="text-orange-500"
									/>
								),
								label: "Businesses",
								value: `${stats.totalBusinesses}+`,
							},
							{
								icon: (
									<Star
										size={20}
										className="text-amber-500"
									/>
								),
								label: "Reviews",
								value: `${stats.totalReviews}+`,
							},
							{
								icon: (
									<Zap size={20} className="text-green-500" />
								),
								label: "Orders Today",
								value: `${stats.todayOrders}+`,
							},
						].map((stat, i) => (
							<div key={i} className="flex items-center gap-3">
								{stat.icon}
								<div>
									<p className="font-bold text-xl text-gray-900">
										{stat.value}
									</p>
									<p className="text-xs text-gray-500 -mt-0.5">
										{stat.label}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="px-4 py-6 space-y-8">
					{/* Categories */}
					<section>
						<div className="flex items-center justify-between mb-3">
							<h2 className="text-lg font-bold text-gray-900">
								Browse by Category
							</h2>
							<Link
								to="/discover"
								className="text-orange-500 text-sm font-medium flex items-center gap-0.5 hover:gap-1.5 transition-all"
							>
								See all <ArrowRight size={14} />
							</Link>
						</div>
						{loading ? (
							<div className="flex justify-center py-4">
								<LoadingSpinner />
							</div>
						) : (
							<CategoryFilter
								categories={categories}
								selected={selectedCategory}
								onSelect={handleCategorySelect}
							/>
						)}
					</section>

					{/* Featured Businesses */}
					<section>
						<div className="flex items-center justify-between mb-3">
							<h2 className="text-lg font-bold text-gray-900">
								{selectedCategory
									? "Businesses in this Category"
									: "Featured Businesses"}
							</h2>
							<Link
								to={
									selectedCategory
										? `/discover?category=${selectedCategory}`
										: "/discover"
								}
								className="text-orange-500 text-sm font-medium flex items-center gap-0.5 hover:gap-1.5 transition-all"
							>
								See all <ArrowRight size={14} />
							</Link>
						</div>
						{loading ? (
							<div className="flex justify-center py-8">
								<LoadingSpinner size="lg" />
							</div>
						) : displayedBusinesses.length === 0 ? (
							<div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
								<p className="text-gray-500">
									{selectedCategory
										? "No businesses found in this category yet."
										: "No businesses yet. Be the first to register!"}
								</p>
								<Link
									to="/dashboard/new"
									className="mt-3 inline-block bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors"
								>
									{selectedCategory
										? "Browse All Categories"
										: "Register Business"}
								</Link>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
								{displayedBusinesses.map((biz) => (
									<BusinessCard
										key={biz._id}
										business={biz}
									/>
								))}
							</div>
						)}
					</section>

					{/* Community Board Preview - RESTORED */}
					{!loading && posts.length > 0 && (
						<section>
							<div className="flex items-center justify-between mb-3">
								<h2 className="text-lg font-bold text-gray-900">
									Community Board
								</h2>
								<Link
									to="/community"
									className="text-orange-500 text-sm font-medium flex items-center gap-0.5 hover:gap-1.5 transition-all"
								>
									See all <ArrowRight size={14} />
								</Link>
							</div>
							<div className="space-y-3">
								{posts.map((post) => (
									<div
										key={post._id}
										className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-sm transition-shadow"
									>
										<div className="flex items-start gap-3">
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2 mb-1">
													<span
														className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
															typeColors[
																post.type
															] ||
															typeColors.general
														}`}
													>
														{post.type || "general"}
													</span>
													{post.pinned && (
														<span className="text-xs text-orange-500 font-medium flex items-center gap-0.5">
															<Pin size={10} />{" "}
															Pinned
														</span>
													)}
												</div>
												<h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
													{post.title}
												</h3>
												<p className="text-gray-500 text-sm mt-0.5 line-clamp-2">
													{post.content}
												</p>
												<p className="text-xs text-gray-400 mt-1">
													by{" "}
													{post.authorId?.fullName ||
														post.authorName ||
														"Community Member"}{" "}
													·{" "}
													{post.createdAt
														? new Date(
																post.createdAt,
															).toLocaleDateString()
														: "Recently"}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{/* HOW IT WORKS */}
					<section className="bg-gray-50 rounded-3xl p-8 md:p-12">
						<div className="text-center mb-10">
							<h2 className="text-3xl font-bold mb-3">
								How TassiaQCA Works
							</h2>
							<p className="text-gray-600 max-w-md mx-auto">
								From discovery to delivery — built for our
								community
							</p>
						</div>
						<div className="grid md:grid-cols-3 gap-8">
							{[
								{
									step: "1",
									title: "Discover",
									desc: "Browse verified local businesses and services within Tassia Complex.",
								},
								{
									step: "2",
									title: "Order or Book",
									desc: "Place orders, book services, or message directly — all in one place.",
								},
								{
									step: "3",
									title: "Support & Connect",
									desc: "Leave reviews, join the community board, and grow together.",
								},
							].map((item) => (
								<div
									key={item.step}
									className="bg-white rounded-2xl p-6 shadow-sm text-center"
								>
									<div className="w-12 h-12 mx-auto bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4">
										{item.step}
									</div>
									<h3 className="font-semibold text-xl mb-2">
										{item.title}
									</h3>
									<p className="text-gray-600">{item.desc}</p>
								</div>
							))}
						</div>
					</section>

					{/* CTA Register Business */}
					<section className="bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl p-10 md:p-16 text-center">
						<h2 className="text-3xl font-bold mb-4">
							Ready to Join the Movement?
						</h2>
						<p className="text-xl text-gray-300 max-w-md mx-auto mb-8">
							Whether you're a resident or a business owner in
							Tassia — this platform is for you.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/discover"
								className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-semibold text-lg"
							>
								Start Shopping Locally
							</Link>
							<Link
								to="/dashboard/new"
								className="border border-white/50 hover:bg-white/10 px-10 py-4 rounded-2xl font-semibold text-lg transition"
							>
								List My Business Free
							</Link>
						</div>
					</section>

					{/* Testimonials Section */}
					<section className="py-8">
						<div className="text-center mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-2">
								What Our Community Says
							</h2>
							<p className="text-gray-500 text-sm">
								Real stories from real people in Tassia Complex
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{[
								{
									name: "Grace Muthoni",
									role: "Resident, Tassia Complex",
									content:
										"TassiaQCA has made it so easy to discover new businesses right in my neighborhood. I've found my favorite local restaurant and salon through this platform!",
									avatar: "GM",
								},
								{
									name: "Peter Ochieng",
									role: "Business Owner, Mama Njeri's Kitchen",
									content:
										"Since listing my business on TassiaQCA, I've seen a significant increase in customers. The platform has helped me reach more residents in Tassia Complex.",
									avatar: "PO",
								},
								{
									name: "Sarah Wanjiru",
									role: "Resident & Community Member",
									content:
										"I love the community board feature! It keeps me informed about local events, deals, and announcements. TassiaQCA truly brings our community together.",
									avatar: "SW",
								},
							].map((testimonial) => (
								<div
									key={testimonial.name}
									className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
								>
									<div className="flex items-center gap-4 mb-4">
										<div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shrink-0">
											<span className="text-white font-bold text-sm">
												{testimonial.avatar}
											</span>
										</div>
										<div>
											<p className="font-semibold text-gray-900">
												{testimonial.name}
											</p>
											<p className="text-xs text-gray-500">
												{testimonial.role}
											</p>
										</div>
									</div>
									<p className="text-gray-600 text-sm leading-relaxed">
										"{testimonial.content}"
									</p>
									<div className="flex gap-0.5 mt-3">
										{[...Array(5)].map((_, i) => (
											<span
												key={i}
												className="text-amber-400"
											>
												★
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					</section>
				</div>
			</div>
		</>
	);
}
