'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Earth from '@/components/ui/globe';
import { SparklesCore } from '@/components/ui/sparkles';
import { Label } from '@/components/ui/label';
import { SiteNavbar } from '@/components/SiteNavbar';
import { SiteFooter } from '@/components/SiteFooter';
import { cn } from '@/lib/utils';
import {
    Check,
    Loader2,
    Mail,
    MessageCircle,
    Clock,
    Shield,
    HelpCircle,
    FileQuestion,
    AlertTriangle,
} from 'lucide-react';

// =============================================================================
// Types
// =============================================================================

interface ContactReason {
    id: string;
    label: string;
    icon: React.ReactNode;
    description: string;
}

// =============================================================================
// Contact Reasons
// =============================================================================

const contactReasons: ContactReason[] = [
    {
        id: 'general',
        label: 'General Inquiry',
        icon: <HelpCircle className="h-4 w-4" />,
        description: 'Questions about Verity',
    },
    {
        id: 'support',
        label: 'Technical Support',
        icon: <MessageCircle className="h-4 w-4" />,
        description: 'Help with analysis issues',
    },
    {
        id: 'privacy',
        label: 'Privacy Request',
        icon: <Shield className="h-4 w-4" />,
        description: 'Data deletion or access',
    },
    {
        id: 'feedback',
        label: 'Feedback',
        icon: <FileQuestion className="h-4 w-4" />,
        description: 'Suggestions or ideas',
    },
];

// =============================================================================
// Contact Form Component
// =============================================================================

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('general');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(formRef, { once: true, amount: 0.3 });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Simulate form submission
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Reset form
            setName('');
            setEmail('');
            setReason('general');
            setMessage('');
            setIsSubmitted(true);

            // Reset success state after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error('Error submitting form:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div ref={formRef} className="relative p-6 md:p-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative mb-8"
            >
                <div className="flex items-baseline gap-2">
                    <h2 className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                        Get in
                    </h2>
                    <span className="relative z-10 text-3xl font-bold tracking-tight text-primary md:text-4xl">
                        Touch
                    </span>
                </div>
                <SparklesCore
                    id="contact-sparkles"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={400}
                    className="absolute inset-0 top-0 h-20 w-full"
                    particleColor="hsl(var(--primary))"
                />
                <p className="mt-3 text-sm text-muted-foreground">
                    Have a question or need help? We typically respond within 24 hours.
                </p>
            </motion.div>

            {/* Form */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            required
                            className="bg-background/50"
                        />
                    </motion.div>

                    <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="bg-background/50"
                        />
                    </motion.div>
                </div>

                {/* Reason Selection */}
                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.55 }}
                >
                    <Label>What can we help you with?</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {contactReasons.map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => setReason(r.id)}
                                className={cn(
                                    'flex items-center gap-2 rounded-lg border p-3 text-left text-sm transition-all',
                                    reason === r.id
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-border bg-background/50 text-muted-foreground hover:border-primary/50'
                                )}
                            >
                                {r.icon}
                                <span className="font-medium">{r.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.6 }}
                >
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us how we can help..."
                        required
                        className="h-32 resize-none bg-background/50"
                    />
                </motion.div>

                {/* Error Message */}
                {error && (
                    <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                        <AlertTriangle className="h-4 w-4" />
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full"
                >
                    <Button
                        type="submit"
                        disabled={isSubmitting || isSubmitted}
                        className={cn(
                            'w-full shadow-lg transition-all',
                            isSubmitted
                                ? 'bg-chart-2 hover:bg-chart-2'
                                : 'bg-gradient-to-b from-primary to-primary/80 hover:shadow-xl hover:shadow-primary/20'
                        )}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Sending...
                            </span>
                        ) : isSubmitted ? (
                            <span className="flex items-center justify-center gap-2">
                                <Check className="h-4 w-4" />
                                Message Sent!
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Mail className="h-4 w-4" />
                                Send Message
                            </span>
                        )}
                    </Button>
                </motion.div>
            </motion.form>
        </div>
    );
}

// =============================================================================
// Globe Visual Component
// =============================================================================

function GlobeVisual() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative hidden items-center justify-center overflow-hidden md:flex"
        >
            <article className="relative mx-auto flex h-[400px] min-h-80 w-full flex-col items-start justify-start overflow-hidden rounded-3xl border bg-gradient-to-b from-primary to-primary/5 p-8 text-2xl tracking-tight lg:h-[450px] lg:text-3xl">
                <div className="relative z-10 max-w-[200px]">
                    <p className="font-semibold leading-tight text-white">
                        Questions about your medical bills?
                    </p>
                    <p className="mt-4 text-base text-white/90">
                        We&apos;re here to help you understand and dispute unfair charges.
                    </p>
                </div>

                {/* Quick Contact Info */}
                <div className="relative z-10 mt-auto space-y-3">
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <Mail className="h-4 w-4" />
                        contact@verity.app
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <Clock className="h-4 w-4" />
                        Response within 24 hours
                    </div>
                </div>

                {/* Globe */}
                <div className="absolute -bottom-24 -right-24 z-0 mx-auto flex h-full w-full max-w-[350px] items-center justify-center transition-all duration-700 hover:scale-105 lg:-bottom-28 lg:-right-28 lg:max-w-[450px]">
                    <Earth
                        scale={1.1}
                        baseColor={[0.08, 0.5, 0.46]}
                        markerColor={[0, 0, 0]}
                        glowColor={[0.08, 0.5, 0.46]}
                    />
                </div>
            </article>
        </motion.div>
    );
}

// =============================================================================
// Info Cards Component
// =============================================================================

function InfoCards() {
    const cards = [
        {
            icon: <Clock className="h-5 w-5" />,
            title: 'Quick Response',
            description: 'We respond to all inquiries within 24 hours.',
        },
        {
            icon: <Shield className="h-5 w-5" />,
            title: 'Privacy First',
            description: 'Your information is secure and never shared.',
        },
        {
            icon: <MessageCircle className="h-5 w-5" />,
            title: 'Expert Support',
            description: 'Our team understands medical billing complexities.',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 grid gap-4 sm:grid-cols-3"
        >
            {cards.map((card, index) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="rounded-xl border border-border/50 bg-card/50 p-4 text-center backdrop-blur-sm"
                >
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {card.icon}
                    </div>
                    <h3 className="mb-1 font-semibold text-foreground">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                </motion.div>
            ))}
        </motion.div>
    );
}

// =============================================================================
// Main Contact Page
// =============================================================================

export default function ContactPage() {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-background font-sans">
            {/* Navigation */}
            <SiteNavbar />

            {/* Main Content */}
            <main className="pt-16 md:pt-20">
                <section className="relative w-full overflow-hidden py-12 md:py-16">
                    {/* Background Gradients */}
                    <div
                        className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
                        style={{
                            background: 'radial-gradient(circle at center, hsl(var(--primary)), transparent 70%)',
                        }}
                    />
                    <div
                        className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
                        style={{
                            background: 'radial-gradient(circle at center, hsl(var(--primary)), transparent 70%)',
                        }}
                    />

                    <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
                        {/* Page Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8 text-center"
                        >
                            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                                Contact{' '}
                                <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                                    Us
                                </span>
                            </h1>
                            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                                Have questions about Verity or need help with your medical bill analysis?
                                We&apos;re here to help.
                            </p>
                        </motion.div>

                        {/* Main Card */}
                        <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-border/40 bg-secondary/20 shadow-xl backdrop-blur-sm">
                            <div className="grid md:grid-cols-2">
                                {/* Form Side */}
                                <ContactForm />

                                {/* Globe Side */}
                                <GlobeVisual />
                            </div>
                        </div>

                        {/* Info Cards */}
                        <InfoCards />
                    </div>
                </section>
            </main>

            {/* Footer */}
            <SiteFooter />
        </div>
    );
}
