/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', ""]
  },
  env:{
    NEXT_API: 'https://dove-chat.herokuapp.com'
  }
}

module.exports = nextConfig
