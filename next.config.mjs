/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/kitchen-remodeling",
        destination: "/services/kitchen-remodeling",
        permanent: true,
      },
      {
        source: "/bathroom-remodeling",
        destination: "/services/bathroom-remodeling",
        permanent: true,
      },
      {
        source: "/home-addition",
        destination: "/services/home-addition",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
