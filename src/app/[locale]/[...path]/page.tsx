import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import pathMappings, { getSectionFromPath, PathKey } from '@/config/path-mappings';
import websiteConfig from '@/config/website.config';

// Import all base pages
import ContactPage from '../contact/page';
import DepartmentsPage from '../departments/page';
import DoctorsPage from '../doctors/page';
import ServicesPage from '../services/page';

type SectionComponent = React.ComponentType<any>;

// Map of section keys to their respective components
const SECTION_COMPONENTS: Partial<Record<PathKey, SectionComponent>> = {
    contact: ContactPage,
    departments: DepartmentsPage,
    doctors: DoctorsPage,
    services: ServicesPage,
};

interface LocalizedPageProps {
    params: Promise<{
        locale: string;
        path: string[];
    }>;
}

// Generate all possible localized paths at build time
export function generateStaticParams() {
    const paths: { locale: string; path: string[] }[] = [];

    // For each locale
    websiteConfig.locales.forEach((locale) => {
        // For each section in pathMappings
        Object.entries(pathMappings).forEach(([section, localePaths]) => {
            // Get the localized path for this section and locale
            const path = localePaths[locale as keyof typeof localePaths];
            if (path) {
                // Remove leading slash and add to paths
                paths.push({
                    locale,
                    path: [path.substring(1)],
                });
            }
        });
    });

    return paths;
}

// Generate metadata for each path
export async function generateMetadata({ params: paramsPromise }: LocalizedPageProps): Promise<Metadata> {
    const params = await paramsPromise;
    const locale = await getLocale();
    const pathSegment = params.path[0];
    const section = getSectionFromPath(pathSegment);

    if (!section) {
        return {};
    }

    // You can customize the metadata based on section and locale
    return {
        title: `${section.charAt(0).toUpperCase() + section.slice(1)} - Your Site Name`,
    };
}

export default async function LocalizedPage({ params }: LocalizedPageProps) {
    // Wait for params to be resolved
    const resolvedParams = await params;

    // Get the first segment of the path (e.g., "kontakt" from /de/kontakt)
    const pathSegment = resolvedParams.path[0];

    // Find which section this path belongs to
    const section = getSectionFromPath(pathSegment);

    // If we don't recognize this path, show 404
    if (!section) {
        notFound();
    }

    // Get the component for this section
    const Component = SECTION_COMPONENTS[section];

    // If we don't have a component for this section, show 404
    if (!Component) {
        notFound();
    }

    return <Component />;
} 