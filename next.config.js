/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverComponentsExternalPackages: ['@resvg/resvg-js', 'jsdom'],
  },
}
