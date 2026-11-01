/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: { quietDeps: true, silenceDeprecations: ['import', 'global-builtin', 'color-functions'] },
};
export default nextConfig;
