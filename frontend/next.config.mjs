/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  output: 'standalone',
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        locale: false
      }
    ]
  },
  images: {
    domains:['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080', // Puerto del servidor donde se están sirviendo las imágenes
        pathname: '/media/**', // Ruta de las imágenes
      },
    ],
  },
}

export default nextConfig
