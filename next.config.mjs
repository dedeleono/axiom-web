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
      {
        source: "/adu",
        destination: "/services/adu",
        permanent: true,
      },
      // Legacy URLs reported by Google Search Console. Keep their equity on
      // current pages instead of serving soft dead ends after the site migration.
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/san-jose-bathroom-remodeling",
        destination: "/services/bathroom-remodeling",
        permanent: true,
      },
      {
        source: "/portfolio-collections/my-portfolio/sunnyvale-bathroom-remodel",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/how-long-does-a-bathroom-remodel-take",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/service-areas/:slug",
        destination: "/areas",
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
