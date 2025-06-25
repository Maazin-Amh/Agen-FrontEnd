/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost']
  },
  async rewrites() {
    return [
      {
        source: "/register",
        destination: "/auth/create",
      },
      {
        source: "/login",
        destination: "/auth/login",
      },
    ];
  },
};

module.exports = nextConfig;
