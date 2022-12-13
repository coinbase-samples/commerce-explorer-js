/** @type {import('next').NextConfig} */

const withTranspileModules = require('next-transpile-modules');
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    //front end method of retreiving env variables
    API_KEY: 'YOUR_API_KEY', //NEXT_PUBLIC_API_KEY
    API_VERSION: '2018-03-22', //NEXT_PUBLIC_API_VERSION
  },
};

module.exports = withPlugins([
  nextConfig,
  withTranspileModules(['@cloudscape-design/components']),
]);
