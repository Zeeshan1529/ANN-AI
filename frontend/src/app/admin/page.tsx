"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Users,
  ChefHat,
  Star,
  Trash2,
  LogOut,
  ShieldCheck,
  Activity,
  Database,
  KeyRound,
  AlertCircle,
  MessageCircle,
  TrendingUp,
  UserPlus,
  FileDown,
  RefreshCw,
  Cpu,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SummaryCard {
  label: string;
  value: string;
  unit: string;
  icon: React.ElementType;
  gradient: string;
  border: string;
  iconColor: string;
  shadow: string;
}

interface RatingBar {
  day: string;
  rating: number;
  feedbacks: number;
}

interface ComplaintTag {
  tag: string;
  count: number;
  color: string;
}

interface FeedbackEntry {
  name: string;
  rating: number;
  comment: string;
  time: string;
  meal: string;
}

interface SystemStatus {
  name: string;
  status: "online" | "degraded" | "offline";
  latency: string;
  icon: React.ElementType;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";
void API_BASE; // reserved for future API integration

const summaryCards: SummaryCard[] = [
  {
    label: "Total Students",
    value: "342",
    unit: "enrolled",
    icon: Users,
    gradient: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/25",
    iconColor: "text-violet-400",
    shadow: "shadow-violet-500/10",
  },
  {
    label: "Total Mess Staff",
    value: "18",
    unit: "active",
    icon: ChefHat,
    gradient: "from-teal-500/20 to-cyan-500/10",
    border: "border-teal-500/25",
    iconColor: "text-teal-400",
    shadow: "shadow-teal-500/10",
  },
  {
    label: "Avg Rating Today",
    value: "3.9",
    unit: "/ 5",
    icon: Star,
    gradient: "from-amber-500/20 to-yellow-500/10",
    border: "border-amber-500/25",
    iconColor: "text-amber-400",
    shadow: "shadow-amber-500/10",
  },
  {
    label: "Waste Logged",
    value: "2.4",
    unit: "kg today",
    icon: Trash2,
    gradient: "from-rose-500/20 to-red-500/10",
    border: "border-rose-500/25",
    iconColor: "text-rose-400",
    shadow: "shadow-rose-500/10",
  },
];

const ratingBars: RatingBar[] = [
  { day: "Mon", rating: 3.6, feedbacks: 38 },
  { day: "Tue", rating: 4.2, feedbacks: 51 },
  { day: "Wed", rating: 3.8, feedbacks: 44 },
  { day: "Thu", rating: 4.5, feedbacks: 62 },
  { day: "Fri", rating: 3.3, feedbacks: 29 },
  { day: "Sat", rating: 4.0, feedbacks: 47 },
  { day: "Sun", rating: 3.9, feedbacks: 40 },
];

const complaintTags: ComplaintTag[] = [
  { tag: "Too Salty", count: 18, color: "bg-rose-500/15 text-rose-300 border-rose-500/30" },
  { tag: "Undercooked", count: 11, color: "bg-orange-500/15 text-orange-300 border-orange-500/30" },
  { tag: "Need More Veg", count: 9, color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  { tag: "Too Oily", count: 7, color: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30" },
  { tag: "Cold Food", count: 5, color: "bg-sky-500/15 text-sky-300 border-sky-500/30" },
  { tag: "Small Portion", count: 4, color: "bg-purple-500/15 text-purple-300 border-purple-500/30" },
  { tag: "Stale Bread", count: 3, color: "bg-pink-500/15 text-pink-300 border-pink-500/30" },
];

const recentFeedback: FeedbackEntry[] = [
  { name: "Arjun S.", rating: 2, comment: "Rice was undercooked again today", time: "12:41 PM", meal: "Lunch" },
  { name: "Kavya R.", rating: 4, comment: "Paneer was decent, slightly oily", time: "12:38 PM", meal: "Lunch" },
  { name: "Rohan M.", rating: 5, comment: "Dal makhani was absolutely amazing!", time: "12:30 PM", meal: "Lunch" },
  { name: "Priya T.", rating: 3, comment: "Chapatis were hard, rest was fine", time: "12:22 PM", meal: "Lunch" },
  { name: "Aditya K.", rating: 2, comment: "Sabzi was way too salty today", time: "08:15 AM", meal: "Breakfast" },
  { name: "Sneha P.", rating: 5, comment: "Loved the dessert, more please!", time: "08:08 AM", meal: "Breakfast" },
  { name: "Vikram L.", rating: 3, comment: "Average meal, nothing special", time: "08:01 AM", meal: "Breakfast" },
];

const systemStatuses: SystemStatus[] = [
  { name: "API Server", status: "online", latency: "42ms", icon: Zap },
  { name: "Database", status: "online", latency: "18ms", icon: Database },
  { name: "Auth Service", status: "degraded", latency: "210ms", icon: KeyRound },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ─── Reusable Components ──────────────────────────────────────────────────────

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  accent = "text-white/50",
}: {
  icon: React.ElementType;
  title: string;
  accent?: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.07]">
        <Icon className={`w-4 h-4 ${accent}`} />
      </div>
      <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">{title}</h2>
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3 h-3 ${s <= rating ? "text-amber-400 fill-amber-400" : "text-white/15"}`}
        />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: SystemStatus["status"] }) {
  const map = {
    online: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    degraded: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    offline: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wider ${map[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${status === "online" ? "bg-emerald-400" : status === "degraded" ? "bg-amber-400" : "bg-rose-400"}`}
      />
      {status}
    </span>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

const adminName =
  typeof window !== "undefined"
    ? localStorage.getItem("ann_name") ?? "Admin"
    : "Admin";
  const [loggingOut, setLoggingOut] = useState(false);

  // ── Role Guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
setMounted(true);

  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    router.replace("/login");
  }
}, [router]);
const [adminSummary, setAdminSummary] = useState<{
  top_issue: string;
  sentiment_trend: string;
  waste_risk: string;
  recommendation: string;
} | null>(null);

const [adminSummaryLoading, setAdminSummaryLoading] = useState(true);

  // ── Logout ──────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
      localStorage.removeItem("ann_name");
      router.replace("/login");
    }, 600);
  };

  useEffect(() => {
  const fetchAdminSummary = async () => {
    try {
      setAdminSummaryLoading(true);

      const res = await fetch(`${API_BASE}/ai/admin-summary`);

      if (!res.ok) {
        throw new Error("Failed to fetch admin summary");
      }

      const data = await res.json();
      setAdminSummary(data);
    } catch (error) {
      console.error("Admin summary error:", error);
    } finally {
      setAdminSummaryLoading(false);
    }
  };

  fetchAdminSummary();
}, []);

  if (!mounted) {
  return (
    <div className="min-h-screen bg-[#060a10] flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 rounded-full border-2 border-violet-500/40 border-t-violet-400"
      />
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#060a10] text-white font-sans">
      {/* ── Background atmosphere ───────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[700px] h-[700px] bg-violet-700/[0.06] rounded-full blur-[130px]" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-teal-600/[0.05] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-rose-600/[0.04] rounded-full blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* ── Sticky Header ──────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#060a10]/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-violet-500/20">
              <Cpu className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] text-violet-400/80 uppercase leading-none mb-0.5">
                ANN AI
              </p>
              <p className="text-sm font-semibold text-white/80 leading-none">Admin Control Center</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              {adminName}
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] font-semibold text-white/50 uppercase tracking-wider">
              Admin
            </span>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold transition-all duration-200 disabled:opacity-50"
            >
              <AnimatePresence mode="wait">
                {loggingOut ? (
                  <motion.div
                    key="spin"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </motion.div>
                ) : (
                  <motion.div key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <LogOut className="w-3.5 h-3.5" />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="hidden sm:block">Logout</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10">

        {/* Page title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-white/85 to-white/40 bg-clip-text text-transparent">
            Operations Overview
          </h1>
          <p className="text-sm text-white/35 mt-1">
            Real-time insights across all mess units &mdash; NeuralNexus demo mode
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-violet-500/30 via-white/[0.07] to-transparent" />
        </motion.div>

        {/* ── Summary Cards ────────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
        >
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.label} variants={itemVariants}>
                <GlassCard
                  className={`p-4 bg-gradient-to-br ${card.gradient} border ${card.border} shadow-lg ${card.shadow} hover:scale-[1.025] transition-transform duration-300 cursor-default group`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-xs text-white/40 leading-tight">{card.label}</p>
                    <Icon className={`w-4 h-4 ${card.iconColor} shrink-0 group-hover:scale-110 transition-transform duration-200`} />
                  </div>
                  <div className="flex items-end gap-1.5">
                    <motion.span
                      className="text-3xl font-bold text-white tabular-nums"
                      initial={{ opacity: 0, scale: 0.75 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                    >
                      {card.value}
                    </motion.span>
                    <span className="text-xs text-white/30 mb-1">{card.unit}</span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Two-column analytics + right sidebar ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-6 mb-6">

          {/* LEFT: analytics */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >

            {/* Ratings Trend */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-6">
                <SectionHeading icon={TrendingUp} title="7-Day Ratings Trend" accent="text-violet-400" />
                <div className="flex items-end gap-2 h-28 mb-2">
                  {ratingBars.map((bar, i) => {
                    const heightPct = (bar.rating / 5) * 100;
                    const isToday = i === ratingBars.length - 1;
                    return (
                      <div key={bar.day} className="flex-1 flex flex-col items-center gap-1.5 group cursor-default">
                        <div className="relative w-full flex flex-col justify-end h-20">
                          <motion.div
                            className={`w-full rounded-t-lg transition-all duration-200 group-hover:opacity-100 ${
                              isToday
                                ? "bg-gradient-to-t from-violet-500 to-purple-400 opacity-100"
                                : "bg-white/[0.12] opacity-70 group-hover:bg-white/20"
                            }`}
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPct}%` }}
                            transition={{ delay: 0.2 + i * 0.07, duration: 0.7, ease: "easeOut" }}
                            style={{ minHeight: 6 }}
                          />
                          {/* Tooltip */}
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white/80 text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none">
                            {bar.rating} &bull; {bar.feedbacks}
                          </div>
                        </div>
                        <span className={`text-[10px] font-medium ${isToday ? "text-violet-400" : "text-white/30"}`}>
                          {bar.day}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[11px] text-white/25 text-right">Hover bars for details</p>
              </GlassCard>
            </motion.div>

            {/* Top Complaint Tags */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-6">
                <SectionHeading icon={AlertCircle} title="Top Complaint Tags (Week)" accent="text-rose-400" />
                <div className="flex flex-wrap gap-2">
                  {complaintTags.map((c, i) => (
                    <motion.span
                      key={c.tag}
                      initial={{ opacity: 0, scale: 0.82 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.12 + i * 0.05, duration: 0.3, ease: "easeOut" }}
                      whileHover={{ scale: 1.07 }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium cursor-default ${c.color}`}
                    >
                      {c.tag}
                      <span className="font-bold opacity-75">({c.count})</span>
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

          </motion.div>

          {/* RIGHT: recent feedback */}
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <GlassCard className="p-6 h-full">
              <SectionHeading icon={MessageCircle} title="Recent Feedback" accent="text-sky-400" />
              <div className="space-y-0 max-h-[420px] overflow-y-auto pr-1">
                {recentFeedback.map((entry, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: "easeOut" }}
                    className="flex gap-3 py-3.5 border-b border-white/[0.05] last:border-0 group"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/[0.04] border border-white/[0.08] flex items-center justify-center text-xs font-bold text-white/55">
                      {entry.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white/70">{entry.name}</span>
                          <StarRow rating={entry.rating} />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-white/20 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06]">
                            {entry.meal}
                          </span>
                          <span className="text-[10px] text-white/20">{entry.time}</span>
                        </div>
                      </div>
                      <p className="text-xs text-white/38 leading-relaxed truncate">
                        &ldquo;{entry.comment}&rdquo;
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* ── AI Weekly Summary ───────────────────────────────────────────── */}
<motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-6">
  <GlassCard className="p-6">
    <SectionHeading icon={Cpu} title="AI Weekly Summary" accent="text-violet-400" />

    {adminSummaryLoading ? (
      <div className="text-sm text-white/40">Loading AI weekly summary...</div>
    ) : adminSummary ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
          <p className="text-xs text-white/35 mb-1">Top Recurring Issue</p>
          <p className="text-lg font-bold text-rose-300">{adminSummary.top_issue}</p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
          <p className="text-xs text-white/35 mb-1">Sentiment Trend</p>
          <p className="text-sm font-medium text-amber-300">{adminSummary.sentiment_trend}</p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
          <p className="text-xs text-white/35 mb-1">Waste Risk</p>
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
              adminSummary.waste_risk === "High"
                ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                : adminSummary.waste_risk === "Medium"
                ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
            }`}
          >
            {adminSummary.waste_risk}
          </span>
        </div>

        <div className="rounded-xl border border-violet-500/20 bg-violet-500/[0.08] p-4">
          <p className="text-xs text-white/35 mb-1">AI Recommendation</p>
          <p className="text-sm text-violet-200 leading-relaxed">
            {adminSummary.recommendation}
          </p>
        </div>
      </div>
    ) : (
      <div className="text-sm text-rose-300">Could not load AI weekly summary.</div>
    )}
  </GlassCard>
</motion.div>

        {/* ── Bottom row: Controls + System Health ─────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >

          {/* Controls Card */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6">
              <SectionHeading icon={Activity} title="Admin Controls" accent="text-teal-400" />

              <div className="mb-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-amber-500/[0.08] border border-amber-500/20">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <p className="text-xs text-amber-300/70">
                  Demo mode &mdash; actions are disabled for this preview build
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Create User", icon: UserPlus, accent: "text-violet-400 border-violet-500/20 hover:border-violet-500/40 hover:bg-violet-500/10" },
                  { label: "Export Report", icon: FileDown, accent: "text-teal-400 border-teal-500/20 hover:border-teal-500/40 hover:bg-teal-500/10" },
                  { label: "Reset Day", icon: RefreshCw, accent: "text-rose-400 border-rose-500/20 hover:border-rose-500/40 hover:bg-rose-500/10" },
                ].map((btn) => {
                  const Icon = btn.icon;
                  return (
                    <motion.button
                      key={btn.label}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border bg-white/[0.03] opacity-50 cursor-not-allowed transition-all duration-200 ${btn.accent}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-[11px] font-medium text-white/60 text-center leading-tight">
                        {btn.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>

          {/* System Health Card */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6">
              <SectionHeading icon={CheckCircle2} title="System Health" accent="text-emerald-400" />

              <div className="space-y-3">
                {systemStatuses.map((sys, i) => {
                  const Icon = sys.icon;
                  return (
                    <motion.div
                      key={sys.name}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.09, duration: 0.4, ease: "easeOut" }}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.06]">
                          <Icon className="w-3.5 h-3.5 text-white/40" />
                        </div>
                        <span className="text-sm font-medium text-white/70">{sys.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/25 font-mono">{sys.latency}</span>
                        <StatusBadge status={sys.status} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                <p className="text-[11px] text-white/25">Last checked: just now</p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/70">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
                  />
                  Live monitoring
                </div>
              </div>
            </GlassCard>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}