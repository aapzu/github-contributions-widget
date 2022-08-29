module.exports = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/api',
      },
      {
        source: '/img.svg',
        destination: '/api',
      },
    ]
  },
}
