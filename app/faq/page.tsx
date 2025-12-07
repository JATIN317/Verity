'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
} from '@/components/ui/accordion';
import { SiteNavbar } from '@/components/SiteNavbar';
import { SiteFooter } from '@/components/SiteFooter';
import { Button } from '@/components/ui/button';
import {
    PlusIcon,
    HelpCircle,
    Shield,
    CheckCircle,
    Mail,
    ArrowRight,
} from 'lucide-react';

// =============================================================================
// Types & Data
// =============================================================================

interface FAQItem {
    id: string;
    question: string;
    answer: string | React.ReactNode;
}

interface FAQSection {
    id: string;
    title: string;
    icon: React.ReactNode;
    iconBgColor: string;
    items: FAQItem[];
}

const faqSections: FAQSection[] = [
    {
        id: 'before-you-start',
        title: 'Before You Start',
        icon: <HelpCircle className="h-5 w-5" />,
        iconBgColor: 'bg-primary/20 text-primary',
        items: [
            {
                id: 'what-is-verity',
                question: 'What is Verity?',
                answer: (
                    <div className="space-y-4">
                        <p>
                            Verity analyzes your medical bill line-by-line to identify
                            common billing errors. You upload a PDF or image of your bill.
                            Our AI scans it for known patterns of overcharges, unbundling,
                            duplicates, and upcoding. You get a report with specific errors,
                            evidence, and a script to dispute them. We don&apos;t store your bill
                            and don&apos;t give medical or legal advice—we help you understand
                            what you&apos;re being charged for.
                        </p>
                    </div>
                ),
            },
            {
                id: 'what-bills-work',
                question: 'What types of bills work best with Verity?',
                answer: (
                    <div className="space-y-4">
                        <p>
                            Hospital bills, emergency room visits, surgery bills, and inpatient
                            stays. Basically, any complex bill with itemized charges.
                            Office visit bills and simple claims usually don&apos;t have errors
                            to find. We work best with detailed hospital bills that are hard
                            to understand.
                        </p>
                    </div>
                ),
            },
            {
                id: 'analysis-time',
                question: 'How long does the analysis take?',
                answer: (
                    <div className="space-y-4">
                        <p>
                            Most bills are analyzed within 60 seconds. Complex bills with
                            50+ line items may take 2-3 minutes. You&apos;ll see your results
                            immediately once the analysis is done.
                        </p>
                    </div>
                ),
            },
            {
                id: 'lawyer-replacement',
                question: 'Is this a replacement for a lawyer?',
                answer: (
                    <div className="space-y-4">
                        <p>
                            No. Verity is an educational tool, not legal advice. We identify
                            billing errors and give you templates to dispute them yourself.
                            For complex disputes (like coverage denials), a patient advocate
                            or billing attorney can help. For simple overcharges and unbundling,
                            Verity gives you everything you need.
                        </p>
                    </div>
                ),
            },
        ],
    },
    {
        id: 'privacy-trust',
        title: 'Privacy & Trust',
        icon: <Shield className="h-5 w-5" />,
        iconBgColor: 'bg-chart-2/20 text-chart-2',
        items: [
            {
                id: 'bill-safety',
                question: 'Is my bill safe and private?',
                answer: (
                    <div className="space-y-4">
                        <p>
                            Yes. We don&apos;t store your bill—it&apos;s deleted after analysis.
                            We use healthcare-grade encryption. We never sell your data.
                            We&apos;re not a healthcare provider, so HIPAA doesn&apos;t technically
                            apply, but we follow those principles. Your privacy is protected.
                        </p>
                    </div>
                ),
            },
            {
                id: 'personal-info',
                question: 'What happens to my personal information?',
                answer: (
                    <div className="space-y-4">
                        <p>
                            Since we delete your bill immediately after analysis, we don&apos;t build
                            a profile on you. We never store, sell, or share your personal
                            medical information. You can check our privacy policy for details,
                            but the short version is: we see your bill once, help you understand
                            it, and it&apos;s gone.
                        </p>
                    </div>
                ),
            },
        ],
    },
    {
        id: 'understanding-results',
        title: 'Understanding Your Results',
        icon: <CheckCircle className="h-5 w-5" />,
        iconBgColor: 'bg-chart-4/20 text-chart-4',
        items: [
            {
                id: 'ai-mistakes',
                question: 'What if the AI makes a mistake?',
                answer: (
                    <div className="space-y-4">
                        <p>
                            AI isn&apos;t perfect. Sometimes Verity might flag a legitimate charge
                            as an error, or miss one entirely. That&apos;s why we give you the
                            evidence (the specific lines from your bill) so you can verify
                            each finding. Before disputing anything, check with your hospital
                            billing department or insurance. If you&apos;re unsure, a billing
                            advocate can review for free.
                        </p>
                    </div>
                ),
            },
            {
                id: 'severity-levels',
                question: 'What\'s the difference between "HIGH," "MEDIUM," and "LOW" severity flags?',
                answer: (
                    <div className="space-y-4">
                        <p>
                            <strong>HIGH:</strong> Charges with very clear errors (surprise billing, obvious
                            duplicates, charges for services not rendered).
                        </p>
                        <p>
                            <strong>MEDIUM:</strong> Likely errors that need verification (unusual bundling,
                            repeated facility fees, supply charges outside normal range).
                        </p>
                        <p>
                            <strong>LOW:</strong> Possible issues that might be legitimate depending on your
                            insurance (coding variations, facilities that charge differently).
                        </p>
                        <p className="italic text-muted-foreground">
                            Don&apos;t ignore LOW flags, but verify them first before disputing.
                        </p>
                    </div>
                ),
            },
            {
                id: 'accuracy',
                question: 'How accurate is Verity really?',
                answer: (
                    <div className="space-y-4">
                        <p>
                            Verity is highly accurate at identifying common billing patterns and errors.
                            However, medical billing is complex and hospital-specific rules can vary.
                            We act as a specialized magnifying glass to highlight potential issues,
                            providing a Confidence Score (85-99%) for each flag to help you prioritize
                            what to investigate.
                        </p>
                    </div>
                ),
            },
        ],
    },
    {
        id: 'disputing-charges',
        title: 'Disputing Your Charges',
        icon: <Mail className="h-5 w-5" />,
        iconBgColor: 'bg-primary/20 text-primary',
        items: [
            {
                id: 'dispute-letter',
                question: 'Can I use the dispute letter you provide?',
                answer: (
                    <div className="space-y-4">
                        <p>
                            Yes, absolutely. Our dispute letter is written in plain language
                            so it sounds like you wrote it. You can copy it directly, personalize
                            it with your details, and send it via certified mail. Hospitals see
                            these letters constantly and respect them. You&apos;re not doing anything
                            wrong by using it—you&apos;re just being organized and clear.
                        </p>
                    </div>
                ),
            },
            {
                id: 'hospital-refusal',
                question: 'What if the hospital refuses to remove the charge?',
                answer: (
                    <div className="space-y-4">
                        <p>
                            If the hospital says no, you have options:
                        </p>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Request your state&apos;s patient advocate (free)</li>
                            <li>File a complaint with your state insurance commissioner (free)</li>
                            <li>Consult a patient attorney (some work on contingency)</li>
                        </ol>
                        <p>
                            For surprise billing specifically, there are federal protections.
                            For other errors, persistence usually wins—hospitals fix things
                            when challenged with evidence.
                        </p>
                    </div>
                ),
            },
            {
                id: 'multiple-bills',
                question: 'Can I dispute multiple bills at once?',
                answer: (
                    <div className="space-y-4">
                        <p>
                            Yes. Upload and analyze them one at a time. Each bill gets its
                            own report and dispute letter. If it&apos;s from the same hospital stay,
                            you can mention that when you call billing—it helps them process
                            everything together.
                        </p>
                    </div>
                ),
            },
        ],
    },
];

// =============================================================================
// Animation Variants
// =============================================================================

const fadeInAnimationVariants = {
    initial: { opacity: 0, y: 10 },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.05 * index, duration: 0.4 },
    }),
};

const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.1 * index, duration: 0.5 },
    }),
};

// =============================================================================
// FAQ Section Component
// =============================================================================

interface FAQSectionComponentProps {
    section: FAQSection;
    sectionIndex: number;
}

function FAQSectionComponent({ section, sectionIndex }: FAQSectionComponentProps) {
    return (
        <motion.div
            custom={sectionIndex}
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            className="relative"
        >
            {/* Section Header */}
            <div className="mb-4 flex items-center gap-3">
                <div
                    className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl',
                        section.iconBgColor
                    )}
                >
                    {section.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                    {section.title}
                </h3>
            </div>

            {/* Accordion */}
            <Accordion
                type="single"
                collapsible
                className="w-full rounded-xl border border-border/40 bg-card/30 p-2 backdrop-blur-sm"
                defaultValue={section.items[0]?.id}
            >
                {section.items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        custom={index}
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <AccordionItem
                            value={item.id}
                            className={cn(
                                'my-1 overflow-hidden rounded-lg border-none bg-card/50 px-2 shadow-sm transition-all',
                                'data-[state=open]:bg-card/80 data-[state=open]:shadow-md'
                            )}
                        >
                            <AccordionPrimitive.Header className="flex">
                                <AccordionPrimitive.Trigger
                                    className={cn(
                                        'group flex flex-1 items-center justify-between gap-4 py-4 text-left text-base font-medium',
                                        'transition-all duration-300 outline-none hover:text-primary',
                                        'focus-visible:ring-2 focus-visible:ring-primary/50',
                                        'data-[state=open]:text-primary'
                                    )}
                                >
                                    <span className="pr-4">{item.question}</span>
                                    <PlusIcon
                                        size={18}
                                        className={cn(
                                            'shrink-0 text-primary/70 transition-transform duration-300 ease-out',
                                            'group-data-[state=open]:rotate-45'
                                        )}
                                        aria-hidden="true"
                                    />
                                </AccordionPrimitive.Trigger>
                            </AccordionPrimitive.Header>
                            <AccordionContent
                                className={cn(
                                    'overflow-hidden pb-4 pt-0 text-muted-foreground',
                                    'data-[state=open]:animate-accordion-down',
                                    'data-[state=closed]:animate-accordion-up'
                                )}
                            >
                                <div className="border-t border-border/30 pt-3">
                                    {item.answer}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </motion.div>
                ))}
            </Accordion>
        </motion.div>
    );
}

// =============================================================================
// CTA Section
// =============================================================================

function CTASection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center"
        >
            <div className="rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm">
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                    Still have questions?
                </h3>
                <p className="mb-6 text-muted-foreground">
                    We&apos;re here to help you understand your medical bills.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        asChild
                        variant="outline"
                        className="w-full gap-2 sm:w-auto"
                    >
                        <a href="mailto:contact@verity.app">
                            <Mail className="h-4 w-4" />
                            Email Us
                        </a>
                    </Button>
                    <Button
                        asChild
                        className="w-full gap-2 bg-primary shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20 sm:w-auto"
                    >
                        <a href="/analyze">
                            Start Analyzing Your Bill
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

// =============================================================================
// Main FAQ Page
// =============================================================================

export default function FAQPage() {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-background font-sans">
            {/* Navigation */}
            <SiteNavbar />

            {/* Main Content */}
            <main className="pt-16 md:pt-20">
                <section className="py-12 md:py-16">
                    <div className="container mx-auto max-w-4xl px-4 md:px-6">
                        {/* Page Header */}
                        <div className="mb-12 text-center">
                            <motion.h1
                                className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                Frequently Asked{' '}
                                <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                                    Questions
                                </span>
                            </motion.h1>
                            <motion.p
                                className="mx-auto max-w-2xl text-muted-foreground"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                Everything you need to know about using Verity to analyze
                                your medical bills. Honest answers, no fluff.
                            </motion.p>
                        </div>

                        {/* Decorative gradients */}
                        <div className="relative">
                            <div className="absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                            <div className="absolute -bottom-20 -right-20 -z-10 h-72 w-72 rounded-full bg-chart-2/10 blur-3xl" />

                            {/* FAQ Sections */}
                            <div className="space-y-10">
                                {faqSections.map((section, index) => (
                                    <FAQSectionComponent
                                        key={section.id}
                                        section={section}
                                        sectionIndex={index}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <CTASection />
                    </div>
                </section>
            </main>

            {/* Footer */}
            <SiteFooter />
        </div>
    );
}
