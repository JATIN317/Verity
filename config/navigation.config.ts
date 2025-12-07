/**
 * Navigation Configuration
 * 
 * Centralized navigation configuration with TypeScript types.
 * Easily extensible for adding new nav items, icons, or nested menus.
 */

import type { ReactNode } from "react";

// ============================================================================
// Type Definitions
// ============================================================================

export interface NavLink {
    /** Display name for the navigation item */
    name: string;
    /** Route path or URL */
    path: string;
    /** Optional icon component */
    icon?: ReactNode;
    /** Whether to open in new tab (for external links) */
    external?: boolean;
    /** Optional description for tooltips or mega menus */
    description?: string;
}

export interface BrandConfig {
    /** Brand/logo text */
    name: string;
    /** Path to logo image */
    logoSrc?: string;
    /** Logo alt text */
    logoAlt?: string;
    /** Link destination when clicking logo */
    href: string;
}

export interface CTAConfig {
    /** CTA button text */
    label: string;
    /** CTA destination */
    href: string;
    /** Button variant */
    variant?: "primary" | "secondary" | "dark" | "gradient";
}

export interface NavConfig {
    /** Navigation links */
    links: NavLink[];
    /** Brand/Logo configuration */
    brand: BrandConfig;
    /** Optional CTA button configuration */
    cta?: CTAConfig;
}

// ============================================================================
// Default Configuration
// ============================================================================

export const defaultNavLinks: NavLink[] = [
    { name: "Analyze", path: "/analyze" },
    { name: "Appeal", path: "/appeal" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
];

export const defaultBrandConfig: BrandConfig = {
    name: "Verity",
    href: "/",
};

export const defaultNavConfig: NavConfig = {
    links: defaultNavLinks,
    brand: defaultBrandConfig,
};

// ============================================================================
// Config Utilities
// ============================================================================

/**
 * Create a custom navigation config by merging with defaults
 */
export function createNavConfig(overrides: Partial<NavConfig>): NavConfig {
    return {
        ...defaultNavConfig,
        ...overrides,
        links: overrides.links ?? defaultNavConfig.links,
        brand: {
            ...defaultNavConfig.brand,
            ...overrides.brand,
        },
    };
}

/**
 * Transform NavLink[] to the format expected by NavItems component
 */
export function toNavItemsFormat(links: NavLink[]): { name: string; link: string }[] {
    return links.map((link) => ({
        name: link.name,
        link: link.path,
    }));
}
