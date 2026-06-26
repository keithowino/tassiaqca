import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
import {
	IoLogoFacebook,
	IoLogoGithub,
	IoLogoInstagram,
	IoLogoTwitter,
} from "react-icons/io5";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900 text-white mt-12">
			<div className="max-w-5xl mx-auto px-4 py-12">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Brand */}
					<div>
						<Link to="/" className="flex items-center gap-2 mb-4">
							{/* <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
								<img src="/favicon.svg" alt="" />
							</div> */}
							{/* <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
								<MapPin size={16} className="text-white" />
							</div> */}
							<div className="w-10 h-10 flex items-center justify-center">
								<img src="/favicon.svg" alt="" />
							</div>
							<span className="font-bold text-lg">
								Tassia
								<span className="text-orange-500">QCA</span>
							</span>
						</Link>
						<p className="text-gray-400 text-sm leading-relaxed">
							Quiet Compound Assets — Your community marketplace
							for Tassia Complex, Embakasi East, Nairobi.
						</p>
						<div className="flex gap-3 mt-4">
							<a
								href="#"
								className="text-gray-400 hover:text-orange-500 transition-colors"
							>
								<IoLogoTwitter size={18} />
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-orange-500 transition-colors"
							>
								<IoLogoInstagram size={18} />
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-orange-500 transition-colors"
							>
								<IoLogoFacebook size={18} />
							</a>
							<a
								href="#"
								className="text-gray-400 hover:text-orange-500 transition-colors"
							>
								<IoLogoGithub size={18} />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
							Quick Links
						</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="text-gray-300 hover:text-orange-500 transition-colors text-sm"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/discover"
									className="text-gray-300 hover:text-orange-500 transition-colors text-sm"
								>
									Discover
								</Link>
							</li>
							<li>
								<Link
									to="/community"
									className="text-gray-300 hover:text-orange-500 transition-colors text-sm"
								>
									Community Board
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="text-gray-300 hover:text-orange-500 transition-colors text-sm"
								>
									About Us
								</Link>
							</li>
						</ul>
					</div>

					{/* For Businesses */}
					<div>
						<h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
							For Businesses
						</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/dashboard/new"
									className="text-gray-300 hover:text-orange-500 transition-colors text-sm"
								>
									List Your Business
								</Link>
							</li>
							<li>
								<Link
									to="/dashboard"
									className="text-gray-300 hover:text-orange-500 transition-colors text-sm"
								>
									Business Dashboard
								</Link>
							</li>
							<li>
								<Link
									to="/auth"
									className="text-gray-300 hover:text-orange-500 transition-colors text-sm"
								>
									Sign In
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
							Contact
						</h4>
						<ul className="space-y-3">
							<li className="flex items-start gap-2 text-sm text-gray-300">
								<MapPin
									size={16}
									className="text-orange-500 shrink-0 mt-0.5"
								/>
								<span>
									Tassia Complex, Embakasi East, Nairobi
								</span>
							</li>
							<li className="flex items-center gap-2 text-sm text-gray-300">
								<Mail
									size={16}
									className="text-orange-500 shrink-0"
								/>
								<a
									href="mailto:designsolutions1629@gmail.com"
									className="hover:text-orange-500 transition-colors"
								>
									designsolutions1629@gmail.com
								</a>
							</li>
							<li className="flex items-center gap-2 text-sm text-gray-300">
								<Phone
									size={16}
									className="text-orange-500 shrink-0"
								/>
								<a
									href="tel:+254768290857"
									className="hover:text-orange-500 transition-colors"
								>
									+254 768 290 857
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
					<p className="text-sm text-gray-400">
						© {currentYear} TassiaQCA — Quiet Compound Assets. All
						rights reserved.
					</p>
					<div className="flex gap-6 text-xs text-gray-500">
						<Link
							to="/about"
							className="hover:text-orange-500 transition-colors"
						>
							About
						</Link>
						<Link
							to="/"
							className="hover:text-orange-500 transition-colors"
						>
							Privacy Policy
						</Link>
						<Link
							to="/"
							className="hover:text-orange-500 transition-colors"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
