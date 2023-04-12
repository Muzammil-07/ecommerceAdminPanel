/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: { domains: ['firebasestorage.googleapis.com'], },
  env:
  {
    API_KEY: process.env.NEXT_APP_API_KEY
  }
  
}


module.exports = nextConfig
