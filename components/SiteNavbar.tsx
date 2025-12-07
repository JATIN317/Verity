"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    NavbarButton,
} from "@/components/ui/resizable-navbar";
import {
    defaultNavConfig,
    toNavItemsFormat,
    type NavConfig,
    type CTAConfig,
} from "@/config/navigation.config";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DemoDropdown } from "@/components/DemoDropdown";
import { cn } from "@/lib/utils";
import { VerityLogo } from "@/components/ui/verity-logo";

// ============================================================================
// Type Definitions
// ============================================================================

interface SiteNavbarProps {
    /** Custom navigation config (merged with defaults) */
    config?: Partial<NavConfig>;
    /** Additional CSS classes for the navbar container */
    className?: string;
}

// ============================================================================
// Logo Component
// ============================================================================

interface NavLogoProps {
    name: string;
    href: string;
    className?: string;
}

function NavLogo({ name, href, className }: NavLogoProps) {
    return (
        <Link
            href={href}
            className={cn(
                "relative z-20 flex items-center gap-2 px-2 py-1",
                className
            )}
        >
            <VerityLogo withText={false} className="h-8 w-8" />
            <span className="font-bold text-xl tracking-tight text-foreground">{name}</span>
        </Link>
    );
}

// ============================================================================
// Mobile Navigation Items
// ============================================================================

interface MobileNavItemsProps {
    items: { name: string; link: string }[];
    onItemClick?: () => void;
}

function MobileNavItems({ items, onItemClick }: MobileNavItemsProps) {
    return (
        <>
            {items.map((item, idx) => (
                <Link
                    key={`mobile-link-${idx}`}
                    href={item.link}
                    onClick={onItemClick}
                    className="relative w-full px-4 py-2 text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white"
                >
                    {item.name}
                </Link>
            ))}
        </>
    );
}

// ============================================================================
// CTA Button
// ============================================================================

interface NavCTAProps {
    cta: CTAConfig;
    className?: string;
}

function NavCTA({ cta, className }: NavCTAProps) {
    return (
        <NavbarButton
            href={cta.href}
            variant={cta.variant || "primary"}
            className={className}
        >
            {cta.label}
        </NavbarButton>
    );
}

// ============================================================================
// Main SiteNavbar Component
// ============================================================================

export function SiteNavbar({ config, className }: SiteNavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Merge provided config with defaults
    const navConfig: NavConfig = {
        ...defaultNavConfig,
        ...config,
        brand: {
            ...defaultNavConfig.brand,
            ...config?.brand,
        },
    };

    // Transform links to the format expected by NavItems
    const navItems = toNavItemsFormat(navConfig.links);

    const handleMobileMenuClose = () => setIsMobileMenuOpen(false);

    return (
        <Navbar className={className}>
            {/* Desktop Navigation */}
            <NavBody>
                <NavLogo
                    name={navConfig.brand.name}
                    href={navConfig.brand.href}
                />

                <NavItems items={navItems} />

                <div className="flex items-center gap-4">
                    <ThemeToggle size="sm" />
                    <DemoDropdown />
                </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    <NavLogo
                        name={navConfig.brand.name}
                        href={navConfig.brand.href}
                    />
                    <div className="flex items-center gap-3">
                        <ThemeToggle size="sm" />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </div>
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={isMobileMenuOpen}
                    onClose={handleMobileMenuClose}
                >
                    <MobileNavItems items={navItems} onItemClick={handleMobileMenuClose} />

                    <div className="w-full px-4 pt-4 flex justify-center">
                        <DemoDropdown />
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}

export default SiteNavbar;
