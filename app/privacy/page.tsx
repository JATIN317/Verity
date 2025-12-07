'use client';

import { SiteNavbar } from '@/components/SiteNavbar';
import { SiteFooter } from '@/components/SiteFooter';
import { cn } from '@/lib/utils';
import {
    Shield,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ChevronDown,
} from 'lucide-react';
import { useState, useEffect } from 'react';

// =============================================================================
// Types & Data
// =============================================================================

interface TOCItem {
    id: string;
    title: string;
    desc: string;
}

const tocItems: TOCItem[] = [
    { id: 'core-commitment', title: '1. Our Core Commitment', desc: 'What we promise you' },
    { id: 'what-we-collect', title: '2. What Information We Collect', desc: 'Uploads & account data' },
    { id: 'how-we-use', title: '3. How We Use Your Information', desc: 'Analysis & security' },
    { id: 'data-security', title: '4. Data Security & Protection', desc: 'Encryption & access' },
    { id: 'retention', title: '5. How Long We Keep Your Data', desc: 'Retention periods' },
    { id: 'rights', title: '6. Your Privacy Rights & Choices', desc: 'Access, delete, opt-out' },
    { id: 'third-parties', title: '7. Third-Party Services', desc: 'Who touches your data' },
    { id: 'minors', title: '8. Children & Minors', desc: 'Policy for under 13' },
    { id: 'international', title: '9. International Users', desc: 'GDPR & international' },
    { id: 'updates', title: '10. Policy Updates', desc: 'Changes & notifications' },
    { id: 'contact', title: '11. Questions & Contact', desc: 'How to reach us' },
];

// =============================================================================
// Components
// =============================================================================

function SectionHeading({ id, title }: { id: string; title: string }) {
    return (
        <h2
            id={id}
            className="mt-12 mb-6 scroll-mt-28 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
        >
            {title}
        </h2>
    );
}

function SubHeading({ title }: { title: string }) {
    return <h3 className="mb-3 mt-8 text-xl font-semibold text-foreground">{title}</h3>;
}

function InfoBox({
    variant = 'info',
    title,
    children,
}: {
    variant?: 'info' | 'warning' | 'tip';
    title: string;
    children: React.ReactNode;
}) {
    const variants = {
        info: 'bg-primary/5 border-primary/20 text-primary-foreground',
        warning: 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400',
        tip: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400',
    };

    const icons = {
        info: <Shield className="h-5 w-5 text-primary" />,
        warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
        tip: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    };

    return (
        <div className={cn('my-6 rounded-xl border p-5', variants[variant])}>
            <div className="mb-2 flex items-center gap-2 font-semibold">
                {icons[variant]}
                <span className={cn(
                    variant === 'info' ? 'text-foreground' : 'text-inherit'
                )}>{title}</span>
            </div>
            <div className="text-muted-foreground text-sm leading-relaxed">
                {children}
            </div>
        </div>
    );
}

function CheckList({ items }: { items: string[] }) {
    return (
        <ul className="mb-4 space-y-2">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function XList({ items }: { items: string[] }) {
    return (
        <ul className="mb-4 space-y-2">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <XCircle className="mt-1 h-4 w-4 shrink-0 text-destructive" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

// =============================================================================
// Page Content
// =============================================================================

export default function PrivacyPolicyPage() {
    const [activeSection, setActiveSection] = useState<string>('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Initial scroll handling
    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const element = document.getElementById(hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, []);

    // Scroll spy
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -60% 0px' }
        );

        tocItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans text-foreground">
            <SiteNavbar />

            <main className="pt-20 lg:pt-24 pb-20">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Page Header */}
                    <div className="mx-auto max-w-4xl text-center mb-16">
                        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                            Privacy Policy
                        </h1>
                        <p className="mb-8 text-muted-foreground font-medium">
                            Last Updated: December 6, 2024 | Effective: January 1, 2025
                        </p>

                        <div className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 text-left">
                            <p className="mb-4 font-semibold text-lg text-foreground">
                                Your medical bill is sensitive. It contains health information,
                                financial data, and potentially identifiable details. We take
                                that responsibility seriously. This is how we protect your data.
                            </p>

                            <div className="mt-6 space-y-3">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Here&apos;s what you need to know:</h4>
                                <CheckList items={[
                                    "We delete your bills within 60 seconds of analysis",
                                    "We never store, sell, or share your personal information",
                                    "Your data is encrypted in transit and processed in memory",
                                    "You control your account—delete anytime",
                                    "Only you and Verity staff can access your data (unless legally required)"
                                ]} />
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-[280px_1fr] relative">
                        {/* Sidebar / Mobile TOC */}
                        <aside className="lg:block">
                            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl border border-border/50 bg-card/50 p-1 backdrop-blur-sm lg:p-4">
                                <div className="lg:hidden p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                    <span className="font-semibold">Table of Contents</span>
                                    <ChevronDown className={cn("h-4 w-4 transition-transform", isMobileMenuOpen && "rotate-180")} />
                                </div>

                                <nav className={cn(
                                    "space-y-1 p-2 lg:p-0 lg:block",
                                    isMobileMenuOpen ? "block" : "hidden"
                                )}>
                                    {tocItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => scrollToSection(item.id)}
                                            className={cn(
                                                "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                                                "hover:bg-muted hover:text-foreground",
                                                activeSection === item.id
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            <div className="line-clamp-1">{item.title}</div>
                                            <div className="text-xs opacity-70 line-clamp-1 font-normal mt-0.5">{item.desc}</div>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <article className="prose prose-slate dark:prose-invert max-w-[700px]">

                            {/* 1. Core Commitment */}
                            <section>
                                <SectionHeading id="core-commitment" title="1. Our Core Commitment" />
                                <p>
                                    Your medical bill contains sensitive health and financial information. We treat it with the same care a hospital would.
                                    When you use Verity, here&apos;s what happens:
                                </p>

                                <div className="mt-6 rounded-xl border border-border bg-card p-6">
                                    <h4 className="font-bold mb-4 flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-emerald-500" />
                                        What We Promise
                                    </h4>
                                    <CheckList items={[
                                        "Your bill is never stored after analysis (Deleted within 60 seconds)",
                                        "Your data is never sold or shared with third parties",
                                        "Your analysis reports are yours to keep (accessible anytime)",
                                        "You control your account (delete history or account anytime)",
                                        "We delete everything when you ask (Response time: 5 business days)"
                                    ]} />
                                </div>

                                <div className="mt-6 rounded-xl border border-border bg-card p-6">
                                    <h4 className="font-bold mb-4 flex items-center gap-2">
                                        <XCircle className="h-5 w-5 text-destructive" />
                                        What We DON&apos;T Do
                                    </h4>
                                    <XList items={[
                                        "Store your uploaded bills beyond analysis",
                                        "Sell or share your data with insurance companies or hospitals",
                                        "Train AI models on your bill data without permission",
                                        "Target you with ads based on your medical information",
                                        "Share data with government (unless legally compelled with warrant)",
                                        "Use your data to deny you coverage or set rates"
                                    ]} />
                                </div>
                                <p className="mt-4 italic text-muted-foreground">This is the foundation of our relationship with you.</p>
                            </section>

                            {/* 2. What Information We Collect */}
                            <section>
                                <SectionHeading id="what-we-collect" title="2. What Information We Collect" />

                                <SubHeading title="When You Upload a Bill" />
                                <p>When you submit a bill to Verity, we collect:</p>
                                <ul>
                                    <li>Bill document (PDF, JPG, or PNG file)</li>
                                    <li>Text extracted from that bill (OCR processing)</li>
                                    <li>Analysis results (error flags, confidence scores, evidence)</li>
                                    <li>IP address (for security and abuse prevention)</li>
                                    <li>Timestamp of upload (to track processing)</li>
                                </ul>
                                <p>Your bill is processed and then <strong>permanently deleted</strong>. See Section 5 for retention details.</p>

                                <SubHeading title="When You Create an Account (Optional)" />
                                <p>Creating an account is optional. You can analyze one bill without an account. If you create an account to save reports, we collect:</p>
                                <ul>
                                    <li>Email address (required, for account access)</li>
                                    <li>First name (optional, for personalization)</li>
                                    <li>Account creation date</li>
                                    <li>Analysis history (saved reports and results only)</li>
                                    <li>Payment information (only if you upgrade to premium)</li>
                                </ul>
                                <p className="text-sm">Passwords are hashed (encrypted one-way) so even Verity staff can&apos;t see them.</p>

                                <SubHeading title="What We DON'T Collect" />
                                <p>We intentionally do NOT collect:</p>
                                <XList items={[
                                    "Your name from your bill",
                                    "Your social security number",
                                    "Your insurance ID or policy number",
                                    "Your medical diagnosis or treatment codes",
                                    "Your patient health record number",
                                    "Your date of birth or age",
                                    "Your full address",
                                    "Your phone number (unless you voluntarily provide it)"
                                ]} />
                                <InfoBox title="Best Practice" variant="tip">
                                    You can redact sensitive information from your bill before uploading. Verity will still analyze it perfectly—we only need the charges and codes, not personal identifiers.
                                </InfoBox>

                                <SubHeading title="Automatic Data (Like All Websites)" />
                                <p>Like most websites, we collect:</p>
                                <ul>
                                    <li>IP address (for security, fraud prevention, geographic stats)</li>
                                    <li>Browser type and operating system</li>
                                    <li>Pages visited and time spent on each</li>
                                    <li>Referring URL (where you came from)</li>
                                </ul>
                                <p>We use this data to prevent fraud, improve performance, and fix bugs. We do <strong>NOT</strong> use this to build individual user profiles or track you across other websites.</p>
                            </section>

                            {/* 3. How We Use */}
                            <section>
                                <SectionHeading id="how-we-use" title="3. How We Use Your Information" />

                                <SubHeading title="Processing Your Bill (30-60 seconds)" />
                                <p>Here&apos;s exactly what happens when you upload a bill:</p>
                                <ol>
                                    <li><strong>Upload:</strong> You submit a file. It&apos;s encrypted in transit using TLS 1.2+.</li>
                                    <li><strong>Parse:</strong> Verity extracts text and reads it into memory (RAM). Original file is deleted immediately.</li>
                                    <li><strong>Analyze:</strong> AI scans text for errors and generates flags.</li>
                                    <li><strong>Report:</strong> You see your report. It is optionally saved to your account.</li>
                                    <li><strong>Delete:</strong> All temporary files are deleted from memory. Your bill document is gone.</li>
                                </ol>
                                <p>Total time: 30-60 seconds. Your bill is not stored on disk at any point.</p>

                                <SubHeading title="Improving Verity" />
                                <p>We use aggregate, anonymized data to make Verity better. For example, &quot;15% of bills have duplicate facility fees&quot;. We do NOT link this back to individual users.</p>

                                <SubHeading title="Security & Fraud Prevention" />
                                <p>We monitor for suspicious activity like multiple failed logins or bulk uploads. We may lock accounts if security is compromised.</p>

                                <SubHeading title="Legal Obligations" />
                                <p>We may disclose info if required by law (Court order, search warrant, etc). We will not voluntarily share with government without legal process.</p>
                            </section>

                            {/* 4. Data Security */}
                            <section>
                                <SectionHeading id="data-security" title="4. Data Security & Protection" />

                                <SubHeading title="Encryption in Transit" />
                                <p>All data is encrypted using TLS 1.2+ (AES-256). Nobody can intercept or read your data while it&apos;s traveling to Verity.</p>

                                <SubHeading title="Ephemeral Processing" />
                                <p>Your bill is processed in RAM (memory), not on disk. RAM is cleared when processing completes, leaving no file remnants.</p>

                                <SubHeading title="Access Controls" />
                                <p>Only authorized Verity staff can access user data. Access is logged, audited monthly, and requires multi-factor authentication.</p>

                                <SubHeading title="Data Breach Response" />
                                <p>In the unlikely event of a breach:
                                    <br />
                                    <strong>Within 72 hours:</strong> We notify affected users and regulatory bodies, and begin forensic analysis. We maintain cyber insurance to cover breach costs.
                                </p>
                            </section>

                            {/* 5. Retention */}
                            <section>
                                <SectionHeading id="retention" title="5. How Long We Keep Your Data" />
                                <div className="border rounded-xl overflow-hidden mt-4">
                                    <table className="w-full text-sm my-0">
                                        <thead className="bg-muted/50">
                                            <tr>
                                                <th className="p-4 text-left font-semibold">Data Type</th>
                                                <th className="p-4 text-left font-semibold">Retention Period</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            <tr>
                                                <td className="p-4 font-medium">Bill Documents</td>
                                                <td className="p-4">Deleted within 60 seconds</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 font-medium">Analysis Reports</td>
                                                <td className="p-4">Kept while account is active</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 font-medium">Account Info</td>
                                                <td className="p-4">30 days after deletion</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 font-medium">Analytics & Logs</td>
                                                <td className="p-4">90 days</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* 6. Your Rights */}
                            <section>
                                <SectionHeading id="rights" title="6. Your Privacy Rights & Choices" />
                                <p>Depending on where you live, you have these rights:</p>

                                <div className="grid gap-6 mt-6">
                                    <div>
                                        <h4 className="font-bold">Right to Access</h4>
                                        <p className="text-sm text-muted-foreground mt-1">Request all data Verity has about you (Account info, reports, logs). Response time: 30 days. Cost: Free.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Right to Delete</h4>
                                        <p className="text-sm text-muted-foreground mt-1">Request deletion of account and all personal data. Response time: 5-30 days.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Right to Correct & Portability</h4>
                                        <p className="text-sm text-muted-foreground mt-1">Update incorrect info or download your reports in PDF/CSV/JSON formats.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Right to Opt-Out</h4>
                                        <p className="text-sm text-muted-foreground mt-1">Opt out of marketing emails and analytics anytime via Settings.</p>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 rounded-lg bg-muted inline-block">
                                    <strong>How to Exercise:</strong> Email <a href="mailto:contact@verity.app" className="text-primary hover:underline">contact@verity.app</a> with subject &quot;[Right Name] Request&quot;.
                                </div>
                            </section>

                            {/* 7. Third Parties */}
                            <section>
                                <SectionHeading id="third-parties" title="7. Third-Party Services" />
                                <p>We use these trusted services:</p>
                                <div className="border rounded-xl overflow-hidden mt-4">
                                    <table className="w-full text-sm my-0">
                                        <thead className="bg-muted/50">
                                            <tr>
                                                <th className="p-4 text-left font-semibold">Service</th>
                                                <th className="p-4 text-left font-semibold">What They See</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            <tr>
                                                <td className="p-4">AI Provider (Google Gemini)</td>
                                                <td className="p-4">Bill text only (Deleted after analysis)</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4">Hosting (Vercel)</td>
                                                <td className="p-4">Encrypted data in transit</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4">Email (SendGrid)</td>
                                                <td className="p-4">Email address only</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4">Analytics (Google)</td>
                                                <td className="p-4">Aggregate data only</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground">We have Data Processing Agreements with all providers to ensure they protect your data.</p>
                            </section>

                            {/* 8. Minors */}
                            <section>
                                <SectionHeading id="minors" title="8. Children & Minors" />
                                <p>Verity is not intended for users under 13. We do not knowingly collect data from children. If discovered, we delete it immediately.</p>
                                <p><strong>Parents:</strong> Email us at <a href="mailto:contact@verity.app" className="text-primary hover:underline">contact@verity.app</a> to request account deletion for a child.</p>
                            </section>

                            {/* 9. International */}
                            <section>
                                <SectionHeading id="international" title="9. International Users" />
                                <p>Verity operates in the US. If you are in the EU, UK, or Canada, you have additional rights under GDPR, UK GDPR, and PIPEDA.</p>
                                <p>We honor these rights (access, deletion, rectification). Your data is not transferred internationally without proper safeguards.</p>
                            </section>

                            {/* 10. Updates */}
                            <section>
                                <SectionHeading id="updates" title="10. Policy Updates" />
                                <p>We may update this policy. Material changes will be announced via email 30 days in advance. Minor updates will be posted here.</p>
                                <p className="text-sm text-muted-foreground">Version 1.0 — Effective January 1, 2025</p>
                            </section>

                            {/* 11. Contact */}
                            <section>
                                <SectionHeading id="contact" title="11. Questions & Contact" />
                                <p>We&apos;re here to help. We take privacy seriously and respond to all inquiries manually (no bots).</p>
                                <div className="mt-4">
                                    <strong>Email:</strong> <a href="mailto:contact@verity.app" className="text-primary hover:underline font-semibold">contact@verity.app</a>
                                    <br />
                                    <strong>Response time:</strong> 5 business days (usually 24-48 hours)
                                </div>
                            </section>

                        </article>
                    </div>

                    {/* Footer */}
                    <div className="mt-20 border-t pt-8 text-center text-sm text-muted-foreground max-w-4xl mx-auto">
                        <p>Verity is committed to transparency about how we handle your data. This policy reflects our actual practices.</p>
                        <p className="mt-2 text-xs">Last Updated: December 6, 2024 • Version 1.0 • Effective: Jan 1, 2025</p>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
