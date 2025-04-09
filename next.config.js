/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? '/test-web-poker/' : '',
  basePath: isProd ? '/test-web-poker' : '',
};
