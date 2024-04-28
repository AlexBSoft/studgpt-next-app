/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/v0/:path*",
        // Почему-то при билде он не хавает env
        destination: process.env.NEXT_PUBLIC_BACKEND_URL
          ? process.env.NEXT_PUBLIC_BACKEND_URL + ":path*"
          : "http://localhost:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
