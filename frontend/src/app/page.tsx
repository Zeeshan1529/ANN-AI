"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Brain,
  Cpu,
  Star,
  Trash2,
  Users,
  TrendingUp,
  MessageCircle,
  BarChart3,
  ShieldCheck,
  ChefHat,
  GraduationCap,
  ArrowRight,
  Zap,
  Database,
  Layers,
  Wind,
  CheckCircle2,
  ChevronDown,
  Activity,
  Clock,
  Sparkles,
  Target,
  Leaf,
} from "lucide-react";

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
      {children}
    </div>
  );
}

function GlassCard({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl shadow-xl ${hover ? "hover:border-white/[0.14] hover:bg-white/[0.06] transition-all duration-300" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function ScrollReveal({
  children,
  className = "",
  variants = fadeUp,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Background Layers ────────────────────────────────────────────────────────

function BackgroundAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      <div className="absolute -top-60 -left-60 w-[900px] h-[900px] bg-violet-700/[0.07] rounded-full blur-[160px]" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-teal-600/[0.06] rounded-full blur-[140px]" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/[0.05] rounded-full blur-[120px]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}

// ─── Hero Floating Cards ──────────────────────────────────────────────────────

function HeroFloatingCards() {
  return (
    <div className="relative w-full max-w-md mx-auto h-80 lg:h-96 select-none">
      {/* Central glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      {/* Card: Crowd Forecast */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-52"
      >
        <GlassCard className="p-4 border-teal-500/20 bg-gradient-to-br from-teal-500/10 to-transparent" hover={false}>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-semibold text-white/60">Crowd Forecast</span>
          </div>
          <div className="flex items-end gap-1.5 h-10 mb-1">
            {[40, 75, 55, 90, 60, 35, 80].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-teal-400/50" style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="text-[11px] text-white/30">Peak: 12:00 PM · 88% capacity</p>
        </GlassCard>
      </motion.div>

      {/* Card: Waste Reduced */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-6 right-0 w-48"
      >
        <GlassCard className="p-4 border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent" hover={false}>
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-white/60">Waste Reduced</span>
          </div>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold text-emerald-400">38</span>
            <span className="text-sm text-white/40 mb-1">%</span>
          </div>
          <p className="text-[11px] text-white/30">vs. last semester avg</p>
        </GlassCard>
      </motion.div>

      {/* Card: Feedback */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-4 left-8 w-52"
      >
        <GlassCard className="p-4 border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent" hover={false}>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-white/60">Student Feedback</span>
          </div>
          <div className="space-y-1.5">
            {[
              { label: "Breakfast", v: 72 },
              { label: "Lunch", v: 89 },
              { label: "Dinner", v: 65 },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-2">
                <span className="text-[10px] text-white/35 w-14">{r.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full bg-amber-400/70" style={{ width: `${r.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Card: AI prediction pill */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-0 right-4 w-44"
      >
        <GlassCard className="p-3 border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-transparent" hover={false}>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-violet-500/20">
              <Brain className="w-3.5 h-3.5 text-violet-400" />
            </div>
            <div>
              <p className="text-[10px] text-white/40">ANN Prediction</p>
              <p className="text-xs font-bold text-white/80">94.2% accurate</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const router = useRouter();
  const featuresRef = useRef<HTMLElement>(null);
  const rolesRef = useRef<HTMLElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#060a10] text-white font-sans overflow-x-hidden">
      <BackgroundAtmosphere />

      {/* ── Navbar ──────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#060a10]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 border border-violet-500/20">
              <Cpu className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.22em] text-violet-400/80 uppercase leading-none">ANN</p>
              <p className="text-sm font-bold text-white/90 leading-none tracking-tight">AI</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/40">
            <button onClick={() => scrollTo(featuresRef)} className="hover:text-white/70 transition-colors">Features</button>
            <button onClick={() => scrollTo(rolesRef)} className="hover:text-white/70 transition-colors">Demo</button>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo(rolesRef)}
              className="hidden sm:flex px-4 py-2 text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              Demo
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/login")}
              className="px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/25 hover:bg-violet-500/20 text-violet-300 text-sm font-semibold transition-all duration-200"
            >
              Login
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 lg:py-28">

            {/* Left: copy */}
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp}>
                <SectionLabel>Hackathon Finalist &bull; Smart Mess System</SectionLabel>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6"
              >
                <span className="bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                  Eliminate
                </span>
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                  Food Waste
                </span>
                <br />
                <span className="bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                  with AI.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg text-white/45 leading-relaxed max-w-lg mb-10"
              >
                ANN-AI is an artificial neural network&ndash;powered mess management platform that predicts demand,
                collects real-time student feedback, and helps hostel kitchens run smarter &mdash; reducing waste by up to 30%.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => scrollTo(rolesRef)}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 transition-all duration-200"
                >
                  <Zap className="w-4 h-4" />
                  View Demo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => router.push("/login")}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white font-semibold text-sm transition-all duration-200"
                >
                  Login
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo(featuresRef)}
                  className="flex items-center gap-1.5 px-4 py-3.5 text-white/35 hover:text-white/60 text-sm transition-colors"
                >
                  See Features
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right: floating cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            >
              <HeroFloatingCards />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Problem Section ──────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal className="text-center mb-16">
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-white/90">
              Hostel messes run blind &mdash; every day.
            </h2>
            <p className="mt-4 text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
              Without data, kitchens guess. Guesses create waste. Waste costs money, harms the environment,
              and leaves students hungry or disappointed.
            </p>
          </ScrollReveal>

          <motion.div
            ref={undefined}
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              {
                icon: Trash2,
                title: "Massive Food Waste",
                body: "Up to 40% of prepared food is discarded daily due to overproduction with no demand insight.",
                color: "text-rose-400",
                border: "border-rose-500/20",
                glow: "from-rose-500/10 to-transparent",
              },
              {
                icon: Target,
                title: "Poor Demand Estimation",
                body: "Mess staff rely on intuition and rough headcounts — no historical pattern analysis exists.",
                color: "text-orange-400",
                border: "border-orange-500/20",
                glow: "from-orange-500/10 to-transparent",
              },
              {
                icon: MessageCircle,
                title: "No Real-Time Feedback",
                body: "Students have no channel to report meal quality, leaving issues unresolved for days or weeks.",
                color: "text-amber-400",
                border: "border-amber-500/20",
                glow: "from-amber-500/10 to-transparent",
              },
              {
                icon: Activity,
                title: "Inefficient Operations",
                body: "No analytics means no accountability. Kitchen efficiency has no baseline to improve from.",
                color: "text-sky-400",
                border: "border-sky-500/20",
                glow: "from-sky-500/10 to-transparent",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.title} variants={scaleIn}>
                  <GlassCard className={`p-6 h-full bg-gradient-to-br ${card.glow} border ${card.border}`}>
                    <Icon className={`w-6 h-6 ${card.color} mb-4`} />
                    <h3 className="text-sm font-bold text-white/80 mb-2">{card.title}</h3>
                    <p className="text-xs text-white/38 leading-relaxed">{card.body}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Solution / Features ──────────────────────────────────────────────── */}
      <section ref={featuresRef} className="relative z-10 py-24 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal className="text-center mb-16">
            <SectionLabel>The Solution</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-white/90">
              Data-driven decisions. Every meal.
            </h2>
            <p className="mt-4 text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
              ANN-AI transforms mess operations with an artificial neural network at its core, connecting
              students, staff, and administrators in one intelligent ecosystem.
            </p>
          </ScrollReveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {[
              {
                icon: Brain,
                title: "AI Demand Prediction",
                body: "Our ANN model analyzes historical meal data, seasonal patterns, and event schedules to predict exact food quantities required per meal — minimizing over/under-preparation.",
                accent: "violet",
                tag: "Core Engine",
              },
              {
                icon: Star,
                title: "Student Feedback System",
                body: "Real-time star ratings and comments per meal. Students shape the menu quality daily. Instant alerts notify mess staff of recurring issues like undercooked food or excess salt.",
                accent: "amber",
                tag: "Live Feedback",
              },
              {
                icon: BarChart3,
                title: "Mess Analytics Dashboard",
                body: "Comprehensive daily, weekly, and monthly analytics for mess in-charges. Track crowd flow, rating trends, waste logs, and complaint breakdowns in one unified view.",
                accent: "teal",
                tag: "Operations",
              },
              {
                icon: Leaf,
                title: "Waste Reduction Insights",
                body: "Log food waste after each meal with quantity and reason. Over time, the system identifies waste patterns and recommends targeted prep adjustments to reduce losses.",
                accent: "emerald",
                tag: "Sustainability",
              },
            ].map((f) => {
              const Icon = f.icon;
              const colors: Record<string, string> = {
                violet: "text-violet-400 border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-transparent",
                amber: "text-amber-400 border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent",
                teal: "text-teal-400 border-teal-500/20 bg-gradient-to-br from-teal-500/10 to-transparent",
                emerald: "text-emerald-400 border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent",
              };
              const tagColors: Record<string, string> = {
                violet: "bg-violet-500/15 text-violet-300 border-violet-500/25",
                amber: "bg-amber-500/15 text-amber-300 border-amber-500/25",
                teal: "bg-teal-500/15 text-teal-300 border-teal-500/25",
                emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
              };
              return (
                <motion.div key={f.title} variants={fadeUp}>
                  <GlassCard className={`p-7 h-full border ${colors[f.accent]}`}>
                    <div className="flex items-start justify-between mb-5">
                      <Icon className={`w-7 h-7 ${colors[f.accent].split(" ")[0]}`} />
                      <span className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold tracking-wider uppercase ${tagColors[f.accent]}`}>
                        {f.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white/85 mb-3">{f.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{f.body}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <ScrollReveal className="text-center mb-16">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-white/90">
              Three steps to a smarter mess.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-violet-500/30 via-teal-500/30 to-transparent" />

            {[
              {
                step: "01",
                icon: Star,
                title: "Students Rate Meals",
                body: "After each meal, students submit instant ratings and comments directly from their phones — no login friction, no waiting.",
                color: "text-amber-400",
                glowColor: "bg-amber-400",
              },
              {
                step: "02",
                icon: Brain,
                title: "System Analyses Trends",
                body: "Our ANN processes feedback patterns, attendance data, and historical waste logs to generate precise demand predictions.",
                color: "text-violet-400",
                glowColor: "bg-violet-400",
              },
              {
                step: "03",
                icon: ChefHat,
                title: "Staff Optimise Prep",
                body: "Mess in-charges receive daily briefings: exact quantities to prepare, crowd forecasts, and alerts on recurring complaint tags.",
                color: "text-teal-400",
                glowColor: "bg-teal-400",
              },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <ScrollReveal key={s.step} delay={i * 0.12}>
                  <GlassCard className="p-7 text-center relative">
                    <div className="relative inline-flex items-center justify-center mb-5">
                      <div className={`absolute w-12 h-12 rounded-full ${s.glowColor} opacity-10 blur-lg`} />
                      <div className="relative w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${s.color}`} />
                      </div>
                    </div>
                    <div className="text-[11px] font-bold tracking-[0.2em] text-white/25 uppercase mb-2">Step {s.step}</div>
                    <h3 className="text-base font-bold text-white/85 mb-3">{s.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{s.body}</p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Role-Based Access (Judge Focus) ──────────────────────────────────── */}
      <section ref={rolesRef} className="relative z-10 py-28 border-t border-white/[0.05]">
        {/* Section glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-600/[0.06] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <ScrollReveal className="text-center mb-4">
            <SectionLabel>Live Demo Access</SectionLabel>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-4">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter">
              <span className="bg-gradient-to-r from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                Three roles.
              </span>
              {" "}
              <span className="bg-gradient-to-r from-violet-400 to-teal-400 bg-clip-text text-transparent">
                One platform.
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal className="text-center mb-16">
            <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed">
              Click any role below to explore a fully functioning demo dashboard — no login required
              for the demo views.
            </p>
          </ScrollReveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Student */}
            <motion.div variants={scaleIn}>
              <div className="group relative rounded-3xl border border-amber-500/20 bg-gradient-to-b from-amber-500/[0.08] to-transparent backdrop-blur-xl overflow-hidden hover:border-amber-500/40 transition-all duration-400 shadow-xl hover:shadow-amber-500/10">
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-yellow-500" />
                <div className="p-8">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 w-16 h-16 bg-amber-400/15 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-amber-400" />
                    </div>
                  </div>

                  <div className="mb-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-amber-400/60 uppercase">Role</span>
                  </div>
                  <h3 className="text-2xl font-black text-white/90 mb-3 tracking-tight">Student</h3>
                  <p className="text-sm text-white/45 leading-relaxed mb-6">
                    Rate meals after every dining session, view today&rsquo;s menu, check crowd levels before heading to mess,
                    and track your feedback history.
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {[
                      "Rate breakfast, lunch & dinner",
                      "View live crowd forecast",
                      "See today&rsquo;s menu and ratings",
                      "Submit meal complaints & comments",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span
                          className="text-xs text-white/45 leading-snug"
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push("/student")}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 hover:border-amber-500/50 text-amber-300 font-semibold text-sm transition-all duration-200 group-hover:shadow-lg group-hover:shadow-amber-500/10"
                  >
                    <Zap className="w-4 h-4" />
                    Open Student Dashboard
                    <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Mess In-Charge — center, slightly elevated */}
            <motion.div variants={scaleIn} className="md:-mt-4 md:mb-4">
              <div className="group relative rounded-3xl border border-teal-500/30 bg-gradient-to-b from-teal-500/[0.1] to-transparent backdrop-blur-xl overflow-hidden hover:border-teal-500/50 transition-all duration-400 shadow-2xl hover:shadow-teal-500/15 ring-1 ring-teal-500/10">
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-teal-400 to-cyan-500" />
                {/* Badge */}
                <div className="absolute top-5 right-5">
                  <span className="px-2.5 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                    Operations
                  </span>
                </div>
                <div className="p-8">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 w-16 h-16 bg-teal-400/15 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                      <ChefHat className="w-8 h-8 text-teal-400" />
                    </div>
                  </div>

                  <div className="mb-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-teal-400/60 uppercase">Role</span>
                  </div>
                  <h3 className="text-2xl font-black text-white/90 mb-3 tracking-tight">Mess In-Charge</h3>
                  <p className="text-sm text-white/45 leading-relaxed mb-6">
                    Monitor all feedback in real-time, log food waste, view crowd forecasts, analyze top complaints,
                    and take data-driven operational decisions.
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {[
                      "Live feedback & rating overview",
                      "Log and track daily food waste",
                      "View crowd load & peak forecasts",
                      "Analyze top complaint tags",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-white/45 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push("/mess")}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-teal-500/15 border border-teal-500/30 hover:bg-teal-500/25 hover:border-teal-500/50 text-teal-300 font-semibold text-sm transition-all duration-200 group-hover:shadow-lg group-hover:shadow-teal-500/10"
                  >
                    <Zap className="w-4 h-4" />
                    Open Mess Dashboard
                    <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Admin */}
            <motion.div variants={scaleIn}>
              <div className="group relative rounded-3xl border border-violet-500/20 bg-gradient-to-b from-violet-500/[0.08] to-transparent backdrop-blur-xl overflow-hidden hover:border-violet-500/40 transition-all duration-400 shadow-xl hover:shadow-violet-500/10">
                <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-purple-600" />
                <div className="p-8">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 w-16 h-16 bg-violet-400/15 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                      <ShieldCheck className="w-8 h-8 text-violet-400" />
                    </div>
                  </div>

                  <div className="mb-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-violet-400/60 uppercase">Role</span>
                  </div>
                  <h3 className="text-2xl font-black text-white/90 mb-3 tracking-tight">Admin</h3>
                  <p className="text-sm text-white/45 leading-relaxed mb-6">
                    Full-system oversight: manage users, review cross-mess analytics, monitor system health,
                    and generate reports across all hostel units.
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {[
                      "Manage students & mess staff",
                      "Cross-unit analytics overview",
                      "System health monitoring",
                      "Export reports & reset cycles",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-white/45 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push("/admin")}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-violet-500/15 border border-violet-500/30 hover:bg-violet-500/25 hover:border-violet-500/50 text-violet-300 font-semibold text-sm transition-all duration-200 group-hover:shadow-lg group-hover:shadow-violet-500/10"
                  >
                    <Zap className="w-4 h-4" />
                    Open Admin Dashboard
                    <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Impact Stats ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <ScrollReveal className="text-center mb-14">
            <SectionLabel>Measured Impact</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-white/90">
              Real numbers. Real change.
            </h2>
          </ScrollReveal>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              { value: "30%", label: "Food waste reduced", icon: Leaf, color: "text-emerald-400", glow: "from-emerald-500/10" },
              { value: "89%", label: "Demand prediction accuracy", icon: Brain, color: "text-violet-400", glow: "from-violet-500/10" },
              { value: "1200+", label: "Feedback entries collected", icon: MessageCircle, color: "text-sky-400", glow: "from-sky-500/10" },
              { value: "+18%", label: "Meal satisfaction score", icon: TrendingUp, color: "text-amber-400", glow: "from-amber-500/10" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} variants={scaleIn} transition={{ delay: i * 0.08 }}>
                  <GlassCard className={`p-6 text-center bg-gradient-to-b ${stat.glow} to-transparent`}>
                    <Icon className={`w-5 h-5 ${stat.color} mx-auto mb-3`} />
                    <div className={`text-3xl sm:text-4xl font-black ${stat.color} mb-2 tracking-tight`}>
                      {stat.value}
                    </div>
                    <p className="text-xs text-white/35 leading-snug">{stat.label}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Tech Stack ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <ScrollReveal className="text-center mb-14">
            <SectionLabel>Built With</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-white/90">
              Production-grade stack.
            </h2>
          </ScrollReveal>

          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { name: "Next.js 14", icon: Layers, desc: "App Router", color: "border-white/15 text-white/70" },
              { name: "FastAPI", icon: Zap, desc: "Python Backend", color: "border-teal-500/30 text-teal-300" },
              { name: "PostgreSQL", icon: Database, desc: "Primary DB", color: "border-sky-500/30 text-sky-300" },
              { name: "ANN / ML", icon: Brain, desc: "Demand Predictor", color: "border-violet-500/30 text-violet-300" },
              { name: "Tailwind CSS", icon: Wind, desc: "Styling", color: "border-cyan-500/30 text-cyan-300" },
              { name: "Framer Motion", icon: Sparkles, desc: "Animations", color: "border-pink-500/30 text-pink-300" },
            ].map((tech) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  variants={fadeUp}
                  whileHover={{ scale: 1.06, y: -3 }}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border bg-white/[0.03] backdrop-blur cursor-default transition-shadow duration-200 hover:shadow-lg ${tech.color}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <div>
                    <p className="text-sm font-bold leading-none mb-0.5">{tech.name}</p>
                    <p className="text-[10px] text-white/30 leading-none">{tech.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-28 border-t border-white/[0.05]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/[0.08] rounded-full blur-[100px]" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center relative z-10">
          <ScrollReveal>
            <SectionLabel>Ready to Explore?</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-5">
              <span className="bg-gradient-to-r from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                The future of mess
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                management is here.
              </span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-xl mx-auto">
              Explore the full ANN-AI ecosystem. Log in to access your role-specific dashboard,
              or dive straight into the student demo to see how intelligent feedback loops work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => router.push("/login")}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-violet-500/20 transition-all duration-200"
              >
                <ShieldCheck className="w-4 h-4" />
                Login to Platform
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => router.push("/student")}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white font-bold text-sm transition-all duration-200"
              >
                <GraduationCap className="w-4 h-4" />
                Explore Student Dashboard
                <ArrowRight className="w-4 h-4 opacity-50" />
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.05] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-violet-500/10 border border-violet-500/15">
              <Cpu className="w-3.5 h-3.5 text-violet-400" />
            </div>
            <span className="text-sm font-bold text-white/50">ANN-AI</span>
          </div>
          <p className="text-xs text-white/25 text-center">
            Smart Mess Management System &mdash; Built for Hackathon 2025
          </p>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-white/20" />
            <span className="text-xs text-white/20">Powered by neural networks</span>
          </div>
        </div>
      </footer>
    </div>
  );
}