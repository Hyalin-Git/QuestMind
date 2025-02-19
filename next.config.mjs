/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		serverActions: {
			bodySizeLimit: "3mb",
		},
	},
	images: {
		domains: ["res.cloudinary.com"],
	},
};

export default nextConfig;
