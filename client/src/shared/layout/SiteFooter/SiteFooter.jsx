import { Link } from "react-router-dom";

import {
	IoLogoFacebook,
	IoLogoGithub,
	IoLogoInstagram,
	IoLogoTwitter,
} from "react-icons/io5";

import { Container } from "../../ui/index.js";
import { MainLogo } from "../../components/LoadLogo.jsx";

export default function SiteFooter({
	brand = "TassiaQCA",
	description = "",
	columns = [],
	bottomLinks = [],
	copyright,
	className = "",
}) {
	return (
		<footer
			className={["border-t border-slate-200 bg-white", className].join(
				" ",
			)}
		>
			<Container className="py-12 sm:px-6 lg:px-8">
				<div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
					<div>
						<div className="mb-4">
							<MainLogo
								iconPD="10"
								iconD="9"
								text={{
									size: "text-2xl",
									color: "text-slate-950",
								}}
								bg="light"
							/>
						</div>

						{description && (
							<p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
								{description}
							</p>
						)}

						<div className="mt-6 flex gap-4">
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

					{columns.length > 0 && (
						<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
							{columns.map((column) => (
								<div key={column.title}>
									<h2 className="text-sm font-semibold text-slate-950">
										{column.title}
									</h2>

									{column.content ? (
										<div className="mt-4">
											{column.content}
										</div>
									) : (
										<ul className="mt-4 space-y-3">
											{(column.links || []).map(
												(link) => (
													<li key={link.to}>
														<Link
															to={link.to}
															className="text-sm text-slate-600 transition-colors hover:text-slate-950"
														>
															{link.label}
														</Link>
													</li>
												),
											)}
										</ul>
									)}
								</div>
							))}
						</div>
					)}
				</div>

				<div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-xs text-slate-500">
						{copyright ||
							`© ${new Date().getFullYear()} ${brand}. All rights reserved.`}
					</p>

					{bottomLinks.length > 0 && (
						<nav className="flex flex-wrap gap-x-5 gap-y-2">
							{bottomLinks.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									className="text-xs text-slate-500 hover:text-slate-900"
								>
									{link.label}
								</Link>
							))}
						</nav>
					)}
				</div>
			</Container>
		</footer>
	);
}
