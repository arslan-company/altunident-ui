import path from 'node:path';

import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/:locale/atakent-hospital',
        destination: '/:locale',
      },
      {
        source: '/:locale/departments/detail/:departmentId',
        destination: '/:locale/departments/:departmentId/department',
      },
      {
        source: '/:locale/doctors/detail/:doctorId',
        destination: '/:locale/doctors/:doctorId/doctor',
      },
      {
        source: '/:locale/:hospitalSlug/departments/detail/:departmentId',
        destination: '/:locale/:hospitalSlug/departments/:departmentId/department',
      },
      {
        source: '/:locale/:hospitalSlug/doctors/detail/:doctorId',
        destination: '/:locale/:hospitalSlug/doctors/:doctorId/doctor',
      },
    ];
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['api.altunident.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.altunident.com',
        pathname: '/files/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
