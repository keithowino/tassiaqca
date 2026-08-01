// import { Link } from "react-router-dom";
// import { Search, MapPin } from "lucide-react";

// import platform from "../../../shared/config/platform.config";

// import { Hero } from "../../../shared/layout";
// import { Button, Badge, Heading, Text, TextInput } from "../../../shared/ui";

// export default function HeroSection() {
// 	return (
// 		<Hero>
// 			<div className="max-w-3xl mx-auto text-center">
// 				<Badge className="bg-white/20 text-white mb-6">
// 					<MapPin size={14} className="mr-2" />
// 					{platform.location.name}, {platform.location.area},{" "}
// 					{platform.location.city}
// 				</Badge>

// 				<Heading level={1} className="text-white leading-tight">
// 					One Community. <br /> One Marketplace. <br /> One Business
// 					Platform.
// 				</Heading>

// 				<Text className="text-orange-100 mt-6 text-lg">
// 					{platform.description}
// 				</Text>

// 				<div className="relative max-w-2xl mx-auto mt-10">
// 					<Search
// 						size={18}
// 						className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
// 					/>

// 					<TextInput
// 						className="pl-12 pr-36 bg-white"
// 						placeholder="Search businesses, products or services..."
// 					/>

// 					<Button
// 						as={Link}
// 						to="/marketplace"
// 						className="absolute right-2 top-2 bottom-2"
// 					>
// 						Explore
// 					</Button>
// 				</div>

// 				<div className="flex flex-wrap justify-center gap-4 mt-10">
// 					<Button as={Link} to="/marketplace">
// 						Marketplace
// 					</Button>

// 					<Button
// 						as={Link}
// 						to="/register"
// 						variant="outline"
// 						className="bg-white/10 text-white border-white"
// 					>
// 						Start a Business
// 					</Button>
// 				</div>
// 			</div>
// 		</Hero>
// 	);
// }

import { Search, MapPin } from "lucide-react";

import platform from "../../../shared/config/platform.config";

import { Hero } from "../../../shared/layout";
import { Button, Badge, Heading, Text, TextInput } from "../../../shared/ui";

import { JourneyLink, PlatformIntent } from "../../../platform/journey";

export default function HeroSection() {
	return (
		<Hero>
			<div className="max-w-3xl mx-auto text-center">
				<Badge className="bg-white/20 text-white mb-6">
					<MapPin size={14} className="mr-2" />
					{platform.location.name}, {platform.location.area},{" "}
					{platform.location.city}
				</Badge>

				<Heading level={1} className="text-white leading-tight">
					One Community. <br /> One Marketplace. <br /> One Business
					Platform.
				</Heading>

				<Text className="text-orange-100 mt-6 text-lg">
					{platform.description}
				</Text>

				<div className="relative max-w-2xl mx-auto mt-10">
					<Search
						size={18}
						className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
					/>

					<TextInput
						className="pl-12 pr-36 bg-white"
						placeholder="Search businesses, products or services..."
					/>

					<Button
						as={JourneyLink}
						intent={PlatformIntent.MARKETPLACE}
						className="absolute right-2 top-2 bottom-2"
					>
						Explore
					</Button>
				</div>

				<div className="flex flex-wrap justify-center gap-4 mt-10">
					<Button
						as={JourneyLink}
						intent={PlatformIntent.MARKETPLACE}
					>
						Marketplace
					</Button>

					<Button
						as={JourneyLink}
						intent={PlatformIntent.START_BUSINESS}
						variant="outline"
						className="bg-white/10 text-white border-white"
					>
						Start a Business
					</Button>
				</div>
			</div>
		</Hero>
	);
}
