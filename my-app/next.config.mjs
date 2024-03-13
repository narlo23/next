/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: 'https://microlink.io/:path*'
            }
        ]
    }
};

export default nextConfig;
