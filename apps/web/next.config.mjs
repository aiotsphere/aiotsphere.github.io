const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: false,
  },
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['@aiotsphere/ui', '@aiotsphere/lib', '@aiotsphere/config', '@aiotsphere/types'],
};

export default nextConfig;
