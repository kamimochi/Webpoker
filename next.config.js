/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  assetPrefix: isProd ? '/Webpoker/' : '',
  basePath: isProd ? '/Webpoker' : '',
};

module.exports = nextConfig;
