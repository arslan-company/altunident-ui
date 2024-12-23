import type { NextConfig } from "next";

import path from 'node:path';

const nextConfig: NextConfig = {
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    API_URL: process.env.API_URL,
  },
  output: 'standalone',
  compiler: {
    emotion: true,
  },
};

export default nextConfig;
