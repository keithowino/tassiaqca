import { Link } from "react-router-dom";

import { MapPin, Mail, Phone } from "lucide-react";

import {
	IoLogoFacebook,
	IoLogoGithub,
	IoLogoInstagram,
	IoLogoTwitter,
} from "react-icons/io5";

import platform from "../../../shared/config/platform.config";

import { Container } from "../../../shared/ui";

export default function FooterSection() {
	const year = new Date().getFullYear();

	return (
		<footer className="bg-gray-900 text-white">
			<Container className="py-14">
				<div className="grid gap-10 lg:grid-cols-4">
					<div>
						<h2 className="text-2xl font-bold">{platform.name}</h2>

						<p className="text-gray-400 mt-4">
							{platform.description}
						</p>

						<div className="flex gap-4 mt-6">
							{[
								IoLogoTwitter,
								IoLogoInstagram,
								IoLogoFacebook,
								IoLogoGithub,
							].map((Icon, index) => (
								<a
									key={index}
									href="#"
									className="text-gray-400 hover:text-orange-500"
								>
									<Icon size={20} />
								</a>
							))}
						</div>
					</div>

					<div>
						<h3 className="font-semibold mb-4">Platform</h3>

						<ul className="space-y-3">
							<li>
								<Link to="/">Gateway</Link>
							</li>

							<li>
								<Link to="/marketplace">Marketplace</Link>
							</li>

							<li>
								<Link to="/business">Business OS</Link>
							</li>

							<li>
								<Link to="/admin">Administration</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold mb-4">Business OS</h3>

						<ul className="space-y-3">
							<li>
								<Link to="/register">Register Business</Link>
							</li>

							<li>
								<Link to="/login">Sign In</Link>
							</li>

							<li>
								<Link to="/login">Workspace</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold mb-4">Contact</h3>

						<div className="space-y-4">
							<div className="flex gap-3">
								<MapPin size={18} />
								<span>
									{platform.location.name},{" "}
									{platform.location.city}
								</span>
							</div>

							<div className="flex gap-3">
								<Mail size={18} />
								<span>{platform.contact.email}</span>
							</div>

							<div className="flex gap-3">
								<Phone size={18} />
								<span>{platform.contact.phone}</span>
							</div>
						</div>
					</div>
				</div>

				<div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-400">
					<p>
						© {year} {platform.name}. All rights reserved.
					</p>

					<div className="flex gap-6">
						<Link to="/about">About</Link>

						<Link to="/privacy">Privacy</Link>

						<Link to="/terms">Terms</Link>
					</div>
				</div>
			</Container>
		</footer>
	);
}
