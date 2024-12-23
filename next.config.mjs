/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // images: {
    //     domains: ["g7ttfzigvkyrt3gn.public.blop.vercel-storage.com"],
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
            },
        ]
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
            serverActions: true,
            allowedOrigins: ['localhost:3000/', 'gamerecord.online'],
        },
    },
};

export default nextConfig;
