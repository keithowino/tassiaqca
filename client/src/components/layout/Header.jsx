import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	ShoppingCart,
	Bell,
	Menu,
	X,
	MapPin,
	ChevronDown,
	Home,
	Compass,
	Users,
	ShoppingBag,
	BookOpen,
} from "lucide-react";
import { useAuth } from "../../lib/context/AuthContext";
import { useCart } from "../../lib/context/CartContext";

export default function Header() {
	const { user, profile, signOut } = useAuth();
	const { itemCount, setIsOpen: setCartOpen } = useCart();

	const [menuOpen, setMenuOpen] = useState(false);
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const userMenuRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				userMenuRef.current &&
				!userMenuRef.current.contains(event.target)
			) {
				setUserMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSignOut = async () => {
		await signOut();
		setUserMenuOpen(false);
		setMenuOpen(false);
		navigate("/");
	};

	const getUserInitials = () => {
		const name = profile?.fullName || user?.fullName || "";
		if (name) {
			return name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
				.slice(0, 2);
		}
		return user?.email?.[0]?.toUpperCase() || "U";
	};

	const getUserDisplayName = () =>
		profile?.fullName ||
		user?.fullName ||
		user?.email?.split("@")[0] ||
		"User";
	const getUserRole = () => profile?.role || user?.role || "user";
	const getUserAvatar = () =>
		profile?.profileImage || user?.profileImage || null;

	return (
		<>
			<header
				className={`sticky top-0 z-50 transition-all duration-200 ${
					scrolled
						? "bg-white/95 backdrop-blur-md shadow-sm"
						: "bg-white shadow-sm border-b border-gray-100"
				}`}
			>
				<div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
					{/* Logo */}
					<Link to="/" className="flex items-center gap-2 shrink-0">
						<div className="w-9 h-9 rounded-lg flex items-center justify-center">
							<img
								src="/favicon.svg"
								alt="TassiaQCA"
								className="w-8 h-8"
							/>
						</div>
						<span className="font-bold text-xl text-gray-900 tracking-tight">
							Tassia<span className="text-orange-500">QCA</span>
						</span>
					</Link>

					{/* Location Badge - Hidden on very small screens */}
					<div className="hidden sm:flex items-center gap-1.5 bg-orange-50 rounded-full px-3 py-1 text-xs text-gray-600 border border-orange-100">
						<MapPin size={14} className="text-orange-500" />
						<span className="font-medium">Tassia Complex</span>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
						<Link
							to="/discover"
							className="hover:text-orange-500 transition-colors flex items-center gap-1"
						>
							<Compass size={17} /> Discover
						</Link>
						<Link
							to="/community"
							className="hover:text-orange-500 transition-colors flex items-center gap-1"
						>
							<Users size={17} /> Community
						</Link>
						<Link
							to="/about"
							className="hover:text-orange-500 transition-colors flex items-center gap-1"
						>
							<BookOpen size={17} /> About
						</Link>
						{user && (
							<Link
								to="/orders"
								className="hover:text-orange-500 transition-colors flex items-center gap-1"
							>
								<ShoppingBag size={17} /> Orders
							</Link>
						)}
					</nav>

					{/* Right Side */}
					<div className="flex items-center gap-2">
						{/* Cart */}
						<button
							onClick={() => setCartOpen(true)}
							className="relative p-2.5 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-all"
							aria-label="Open cart"
						>
							<ShoppingCart size={22} className="text-gray-700" />
							{itemCount > 0 && (
								<span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow">
									{itemCount > 9 ? "9+" : itemCount}
								</span>
							)}
						</button>

						{/* User Menu */}
						{user ? (
							<div className="relative" ref={userMenuRef}>
								<button
									onClick={() =>
										setUserMenuOpen(!userMenuOpen)
									}
									className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 active:bg-gray-200"
								>
									<div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center overflow-hidden">
										{getUserAvatar() ? (
											<img
												src={getUserAvatar()}
												alt=""
												className="w-full h-full object-cover"
											/>
										) : (
											<span className="text-white font-semibold text-sm">
												{getUserInitials()}
											</span>
										)}
									</div>
									<ChevronDown
										size={16}
										className="text-gray-400 hidden sm:block"
									/>
								</button>

								{userMenuOpen && (
									<div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
										{/* User Info */}
										<div className="px-4 py-3 border-b">
											<p className="font-semibold truncate">
												{getUserDisplayName()}
											</p>
											<p className="text-sm text-gray-500 truncate">
												{user.email}
											</p>
											<span className="inline-block mt-2 text-xs px-2.5 py-0.5 bg-gray-100 rounded-full capitalize">
												{getUserRole()}
											</span>
										</div>

										<div className="py-1">
											<Link
												to="/profile"
												onClick={() =>
													setUserMenuOpen(false)
												}
												className="block px-4 py-2.5 hover:bg-gray-50 text-sm"
											>
												👤 My Profile
											</Link>
											<Link
												to="/orders"
												onClick={() =>
													setUserMenuOpen(false)
												}
												className="block px-4 py-2.5 hover:bg-gray-50 text-sm"
											>
												📦 My Orders
											</Link>
											{(getUserRole() ===
												"business_owner" ||
												getUserRole() === "admin") && (
												<Link
													to="/dashboard"
													onClick={() =>
														setUserMenuOpen(false)
													}
													className="block px-4 py-2.5 hover:bg-gray-50 text-sm"
												>
													🏪 Dashboard
												</Link>
											)}
											{getUserRole() === "admin" && (
												<Link
													to="/admin"
													onClick={() =>
														setUserMenuOpen(false)
													}
													className="block px-4 py-2.5 hover:bg-gray-50 text-sm"
												>
													⚙️ Admin Panel
												</Link>
											)}
										</div>

										<div className="border-t my-1" />
										<button
											onClick={handleSignOut}
											className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 text-sm"
										>
											🚪 Sign Out
										</button>
									</div>
								)}
							</div>
						) : (
							<Link
								to="/auth"
								className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-2xl text-sm font-semibold hover:brightness-105 transition"
							>
								Sign In
							</Link>
						)}

						{/* Mobile Menu Toggle */}
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 active:bg-gray-200"
							aria-label={menuOpen ? "Close menu" : "Open menu"}
						>
							{menuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{menuOpen && (
					<div className="md:hidden border-t bg-white animate-in slide-in-from-top-2 duration-200">
						<div className="px-4 py-6 flex flex-col gap-2 text-base">
							<Link
								to="/discover"
								onClick={() => setMenuOpen(false)}
								className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
							>
								<Compass size={22} /> Discover
							</Link>
							<Link
								to="/community"
								onClick={() => setMenuOpen(false)}
								className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
							>
								<Users size={22} /> Community
							</Link>
							<Link
								to="/about"
								onClick={() => setMenuOpen(false)}
								className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
							>
								<BookOpen size={22} /> About
							</Link>
							{user && (
								<Link
									to="/orders"
									onClick={() => setMenuOpen(false)}
									className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50"
								>
									<ShoppingBag size={22} /> My Orders
								</Link>
							)}
						</div>
					</div>
				)}
			</header>
		</>
	);
}
