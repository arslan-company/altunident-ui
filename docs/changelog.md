# Changelog

## [v0.0.3]

### Added
- Added localized URLs for services page for all supported languages:
  - German (de): `/dienstleistungen`
  - English (en): `/services`
  - French (fr): `/services`
  - Turkish (tr): `/hizmetlerimiz`
- Added middleware to handle URL redirection based on locale
- Added utility function `getServicesPath` to get the correct path based on locale
- Updated sitemap to include all localized service paths
- Updated all service-related links to use the localized paths
- Added support for localized service detail pages (e.g., `/hizmetlerimiz/[serviceId]/[serviceSlug]`)

### Changed
- Updated components to use localized service paths:
  - Services dropdown (restored original dropdown behavior while keeping localized URLs)
  - Service section
  - Service card
  - Footer
  - Breadcrumb links
- Updated metadata paths in service pages
- Enhanced middleware to handle all supported languages
- Enhanced middleware to handle service detail page redirections

### Removed
- Removed Arabic language support from services URLs
- Removed Russian language support from services URLs 