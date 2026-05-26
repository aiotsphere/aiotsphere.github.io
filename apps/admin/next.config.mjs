const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['@aiotsphere/ui', '@aiotsphere/lib', '@aiotsphere/config', '@aiotsphere/types'],
};

export default nextConfig;
