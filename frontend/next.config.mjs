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
  images: { domains: ['localhost','gm2.equibiomedic.co','gm2dev.equibiomedic.co'], unoptimized: true },
}

export default nextConfig
