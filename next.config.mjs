/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/fisioterapia-clinic-systemMARED2',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
