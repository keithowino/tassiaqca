import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
import {
	IoLogoFacebook,
	IoLogoGithub,
	IoLogoInstagram,
	IoLogoTwitter,
} from "react-icons/io5";
import { MainLogo } from "../common/Logo";
import data from "../../lib/data";

export default function Footer() {
	const { metadata } = data;
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900 text-white mt-16">
			<div className="max-w-5xl mx-auto px-4 py-12">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
					{/* Brand */}
					<div>
						<div className="mb-4">
							<MainLogo
								iconPD="10"
								iconD="9"
								text={{ size: "text-2xl", color: "" }}
								bg="dark"
							/>
						</div>
						<p className="text-gray-400 text-[15px] leading-relaxed">
							{metadata.tagline} — {metadata.description}
						</p>

						<div className="flex gap-4 mt-6">
							{[
								IoLogoTwitter,
								IoLogoInstagram,
								IoLogoFacebook,
								IoLogoGithub,
							].map((Icon, i) => (
								<a
									key={i}
									href="#"
									className="text-gray-400 hover:text-orange-500 transition-colors"
								>
									<Icon size={20} />
								</a>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="font-semibold uppercase tracking-widest text-xs text-gray-400 mb-4">
							Quick Links
						</h4>
						<ul className="space-y-2.5 text-sm">
							{[
								"Home",
								"Discover",
								"Community Board",
								"About Us",
							].map((label, i) => (
								<li key={i}>
									<Link
										to={
											[
												"/",
												"/discover",
												"/community",
												"/about",
											][i]
										}
										className="text-gray-300 hover:text-orange-400 transition"
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* For Businesses */}
					<div>
						<h4 className="font-semibold uppercase tracking-widest text-xs text-gray-400 mb-4">
							For Businesses
						</h4>
						<ul className="space-y-2.5 text-sm">
							<li>
								<Link
									to="/dashboard/new"
									className="text-gray-300 hover:text-orange-400"
								>
									List Your Business
								</Link>
							</li>
							<li>
								<Link
									to="/dashboard"
									className="text-gray-300 hover:text-orange-400"
								>
									Business Dashboard
								</Link>
							</li>
							<li>
								<Link
									to="/auth"
									className="text-gray-300 hover:text-orange-400"
								>
									Sign In
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h4 className="font-semibold uppercase tracking-widest text-xs text-gray-400 mb-4">
							Contact
						</h4>
						<div className="space-y-4 text-sm text-gray-300">
							<div className="flex gap-3">
								<MapPin
									size={18}
									className="text-orange-500 mt-0.5 flex-shrink-0"
								/>
								<span>
									Tassia Complex, Embakasi East, Nairobi
								</span>
							</div>
							<a
								href="mailto:designsolutions1629@gmail.com"
								className="flex gap-3 hover:text-orange-400 transition"
							>
								<Mail
									size={18}
									className="text-orange-500 flex-shrink-0"
								/>
								designsolutions1629@gmail.com
							</a>
							<a
								href="tel:+254768290857"
								className="flex gap-3 hover:text-orange-400 transition"
							>
								<Phone
									size={18}
									className="text-orange-500 flex-shrink-0"
								/>
								+254 768 290 857
							</a>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
					<p>
						© {currentYear} {metadata.name} — {metadata.tagline}.
						All rights reserved.
					</p>
					<div className="flex gap-6">
						<Link to="/about" className="hover:text-gray-300">
							About
						</Link>
						<Link to="/" className="hover:text-gray-300">
							Privacy
						</Link>
						<Link to="/" className="hover:text-gray-300">
							Terms
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
