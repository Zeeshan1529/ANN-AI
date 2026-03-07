"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Star,
  MessageCircle,
  Trash2,
  Users,
  TrendingUp,
  Clock,
  ChefHat,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";


// ─── Mock Data ────────────────────────────────────────────────────────────────

const summaryCards = [
  {
    label: "Avg Rating Today",
    value: "3.8",
    unit: "/ 5",
    icon: Star,
    color: "from-amber-500/20 to-yellow-500/10",
    border: "border-amber-500/20",
    iconColor: "text-amber-400",
    glow: "shadow-amber-500/10",
  },
  {
    label: "Feedback Received",
    value: "47",
    unit: "responses",
    icon: MessageCircle,
    color: "from-sky-500/20 to-blue-500/10",
    border: "border-sky-500/20",
    iconColor: "text-sky-400",
    glow: "shadow-sky-500/10",
  },
  {
    label: "Waste Logged",
    value: "2.4",
    unit: "kg",
    icon: Trash2,
    color: "from-rose-500/20 to-red-500/10",
    border: "border-rose-500/20",
    iconColor: "text-rose-400",
    glow: "shadow-rose-500/10",
  },
  {
    label: "Current Crowd",
    value: "63",
    unit: "%",
    icon: Users,
    color: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    glow: "shadow-emerald-500/10",
  },
];

const mealFeedback = [
  { meal: "Breakfast", rating: 3.6, feedbacks: 14, color: "bg-amber-400" },
  { meal: "Lunch", rating: 4.1, feedbacks: 22, color: "bg-emerald-400" },
  { meal: "Dinner", rating: 3.9, feedbacks: 11, color: "bg-sky-400" },
];

const complaints = [
  { tag: "Too Salty", count: 12, color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  { tag: "Need More Veg", count: 7, color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { tag: "Undercooked", count: 5, color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  { tag: "Too Oily", count: 4, color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  { tag: "Cold Food", count: 3, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { tag: "Portion Small", count: 3, color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
];

const recentComments = [
  { name: "Arjun", rating: 2, comment: "Rice was undercooked today", time: "12:41 PM" },
  { name: "Kavya", rating: 4, comment: "Paneer was good but too oily", time: "12:38 PM" },
  { name: "Rohan", rating: 5, comment: "Dal makhani was amazing today!", time: "12:30 PM" },
  { name: "Priya", rating: 3, comment: "Chapatis were a bit hard, rest was okay", time: "12:22 PM" },
  { name: "Aditya", rating: 2, comment: "Sabzi was too salty, could barely eat", time: "12:15 PM" },
  { name: "Sneha", rating: 4, comment: "Loved the dessert today, more please", time: "12:08 PM" },
];

const crowdForecast = [
  { slot: "7 AM", pct: 45, label: "Breakfast" },
  { slot: "9 AM", pct: 20, label: "" },
  { slot: "12 PM", pct: 88, label: "Lunch" },
  { slot: "2 PM", pct: 55, label: "" },
  { slot: "7 PM", pct: 72, label: "Dinner" },
  { slot: "9 PM", pct: 18, label: "" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const GlassCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl shadow-xl ${className}`}
  >
    {children}
  </div>
);

const SectionHeading = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <div className="flex items-center gap-2 mb-5">
    <div className="p-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08]">
      <Icon className="w-4 h-4 text-white/60" />
    </div>
    <h2 className="text-sm font-semibold tracking-widest text-white/50 uppercase">{title}</h2>
  </div>
);

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`w-3.5 h-3.5 ${s <= rating ? "text-amber-400 fill-amber-400" : "text-white/15"}`}
      />
    ))}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MessDashboard() {
  const [wasteForm, setWasteForm] = useState({
    meal: "Breakfast",
    quantity: "",
    reason: "Overproduction",
  });
  const [submitted, setSubmitted] = useState(false);
  const [prediction, setPrediction] = useState<{
  predicted_attendance: number;
  crowd_level: string;
  suggested_preparation_index: number;
} | null>(null);

const [predictionLoading, setPredictionLoading] = useState(true);
const [feedbackAnalysis, setFeedbackAnalysis] = useState<{
  sentiment: string;
  categories: string[];
  severity: string;
} | null>(null);

const [feedbackAnalysisLoading, setFeedbackAnalysisLoading] = useState(true);

  const handleSubmit = () => {
    if (!wasteForm.quantity) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setWasteForm((f) => ({ ...f, quantity: "" }));
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };


const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("role");
  localStorage.removeItem("ann_name");

  router.replace("/login");
};

useEffect(() => {
  const fetchPrediction = async () => {
    try {
      setPredictionLoading(true);

      const res = await fetch(`${API_BASE}/ai/predict-demand`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: "Monday",
          meal_type: "Lunch",
          prev_attendance: 180,
          avg_rating: 4.1,
          complaint_count: 5,
          previous_waste_kg: 8.2,
          is_weekend: 0,
          is_special_day: 0,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch AI prediction");
      }

      const data = await res.json();
      setPrediction(data);
    } catch (error) {
      console.error("AI prediction error:", error);
    } finally {
      setPredictionLoading(false);
    }
  };

  fetchPrediction();
}, []);

useEffect(() => {
  const fetchFeedbackAnalysis = async () => {
    try {
      setFeedbackAnalysisLoading(true);

      const res = await fetch(`${API_BASE}/feedback/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: 1,
          tags: ["Too Salty"],
          comment: "Rice was undercooked and too salty",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch feedback analysis");
      }

      const data = await res.json();
      setFeedbackAnalysis(data.ai_analysis);
    } catch (error) {
      console.error("Feedback AI analysis error:", error);
    } finally {
      setFeedbackAnalysisLoading(false);
    }
  };

  fetchFeedbackAnalysis();
}, []);

useEffect(() => {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (!token) {
    router.replace("/login");
    return;
  }

  if (role !== "mess" && role !== "mess_incharge") {
    router.replace("/login");
  }
}, [router]);

  return (
    <div className="min-h-screen bg-[#080c14] text-white font-sans">
      {/* Background glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-teal-600/[0.07] rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-indigo-600/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-rose-600/[0.05] rounded-full blur-[100px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-2">
  
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/10 border border-teal-500/20">
                <ChefHat className="w-6 h-6 text-teal-400" />
              </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                   Mess Operations Dashboard
              </h1>
                 <p className="text-sm text-white/40 mt-0.5">
                   Monitor feedback, waste and crowd patterns
                 </p>
            </div>
          </div>

  {/* Logout Button */}
  <button
    onClick={handleLogout}
    className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-sm text-white/70 hover:text-white transition-all"
  >
    Logout
  </button>

</div>
          <div className="mt-5 h-px bg-gradient-to-r from-teal-500/30 via-white/10 to-transparent" />
        </motion.div>

        {/* ── Summary Cards ──────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.label} variants={itemVariants}>
                <GlassCard
                  className={`p-4 border ${card.border} bg-gradient-to-br ${card.color} shadow-lg ${card.glow} hover:scale-[1.02] transition-transform duration-300 cursor-default`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-xs text-white/40 leading-snug">{card.label}</p>
                    <Icon className={`w-4 h-4 ${card.iconColor} shrink-0`} />
                  </div>
                  <div className="flex items-end gap-1">
                    <motion.span
                      className="text-3xl font-bold text-white tabular-nums"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {card.value}
                    </motion.span>
                    <span className="text-xs text-white/35 mb-1">{card.unit}</span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Main Two-Column Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-6">

          {/* LEFT COLUMN */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >

            {/* Meal Feedback Breakdown */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-6">
                <SectionHeading icon={Star} title="Meal Feedback Overview" />
                <div className="space-y-5">
                  {mealFeedback.map((row, i) => (
                    <div key={row.meal}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-white/80">{row.meal}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-sm font-semibold text-amber-400">{row.rating}</span>
                          </div>
                        </div>
                        <span className="text-xs text-white/35">{row.feedbacks} responses</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${row.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(row.rating / 5) * 100}%` }}
                          transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Top Complaint Tags */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-6">
                <SectionHeading icon={AlertCircle} title="Top Complaints Today" />
                <div className="flex flex-wrap gap-2.5">
                  {complaints.map((c, i) => (
                    <motion.span
                      key={c.tag}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.35 }}
                      whileHover={{ scale: 1.06 }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium cursor-default ${c.color}`}
                    >
                      {c.tag}
                      <span className="font-bold opacity-80">({c.count})</span>
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Recent Comments */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-6">
                <SectionHeading icon={MessageCircle} title="Recent Feedback" />
                <div className="space-y-0 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                  {recentComments.map((entry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className="group flex gap-3 py-3.5 border-b border-white/[0.05] last:border-0"
                    >
                      {/* Avatar */}
                      <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                        {entry.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white/80">{entry.name}</span>
                            <StarRating rating={entry.rating} />
                          </div>
                          <span className="text-[11px] text-white/25">{entry.time}</span>
                        </div>
                        <p className="text-sm text-white/45 leading-relaxed truncate">&quot;{entry.comment}&quot;</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
             {/* AI Prediction Card */}
<motion.div variants={itemVariants}>
  <GlassCard className="p-6">
    <SectionHeading icon={ChefHat} title="AI Demand Prediction" />

    {predictionLoading ? (
      <div className="text-sm text-white/40">Loading AI prediction...</div>
    ) : prediction ? (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/35 mb-1">Predicted Attendance</p>
            <div className="flex items-end gap-1.5">
              <span className="text-4xl font-bold text-teal-400">
                {prediction.predicted_attendance}
              </span>
              <span className="text-base text-white/40 mb-1">students</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-white/35 mb-1">Crowd Level</p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                prediction.crowd_level === "high"
                  ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                  : prediction.crowd_level === "medium"
                  ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                  : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
              }`}
            >
              {prediction.crowd_level}
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs text-white/35 mb-2">Preparation Index</p>
          <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
              style={{ width: `${Math.min(prediction.suggested_preparation_index * 100, 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-white/30 mt-2">
            Recommended Prep Level: {Math.round(prediction.suggested_preparation_index * 100)}%
          </p>
        </div>

        <div className="rounded-xl border border-teal-500/20 bg-teal-500/10 p-3">
          <p className="text-xs text-teal-200 leading-relaxed">
            AI Alert: Expected {prediction.crowd_level} crowd for the next meal. Prepare food according to the predicted attendance to reduce waste and avoid shortages.
          </p>
        </div>
      </div>
    ) : (
      <div className="text-sm text-rose-300">Could not load AI prediction.</div>
    )}
  </GlassCard>
</motion.div>
{/* AI Complaint Intelligence */}
<motion.div variants={itemVariants}>
  <GlassCard className="p-6">
    <SectionHeading icon={MessageCircle} title="AI Complaint Intelligence" />

    {feedbackAnalysisLoading ? (
      <div className="text-sm text-white/40">Analyzing student feedback...</div>
    ) : feedbackAnalysis ? (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/35 mb-1">Sentiment</p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                feedbackAnalysis.sentiment === "negative"
                  ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                  : feedbackAnalysis.sentiment === "neutral"
                  ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                  : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
              }`}
            >
              {feedbackAnalysis.sentiment}
            </span>
          </div>

          <div className="text-right">
            <p className="text-xs text-white/35 mb-1">Severity</p>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                feedbackAnalysis.severity === "high"
                  ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                  : feedbackAnalysis.severity === "medium"
                  ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                  : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
              }`}
            >
              {feedbackAnalysis.severity}
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs text-white/35 mb-2">Detected Issues</p>
          <div className="flex flex-wrap gap-2">
            {feedbackAnalysis.categories.map((category: string) => (
              <span
                key={category}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] border border-white/[0.1] text-white/70"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">
          <p className="text-xs text-amber-200 leading-relaxed">
            AI Insight: Students are reporting recurring issues in this meal. Immediate quality checks are recommended before the next serving cycle.
          </p>
        </div>
      </div>
    ) : (
      <div className="text-sm text-rose-300">Could not load AI complaint analysis.</div>
    )}
  </GlassCard>
</motion.div>
            {/* Crowd Forecast */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-6">
                <SectionHeading icon={TrendingUp} title="Crowd Forecast" />

                {/* Current load */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-white/35 mb-1">Current Load</p>
                    <div className="flex items-end gap-1.5">
                      <span className="text-4xl font-bold text-emerald-400">63</span>
                      <span className="text-base text-white/40 mb-1">%</span>
                    </div>
                  </div>
                  <div className="text-right space-y-1.5">
                    <div className="flex items-center gap-1.5 justify-end">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs text-white/40">Best: <span className="text-emerald-400 font-medium">9 AM</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-xs text-white/40">Peak: <span className="text-rose-400 font-medium">12 PM</span></span>
                    </div>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="flex items-end gap-2 h-24">
                  {crowdForecast.map((slot, i) => (
                    <div key={slot.slot} className="flex-1 flex flex-col items-center gap-1.5">
                      <div className="w-full flex flex-col justify-end h-16">
                        <motion.div
                          className={`w-full rounded-t-md ${slot.pct > 75 ? "bg-rose-500/70" : slot.pct > 50 ? "bg-amber-500/60" : "bg-emerald-500/60"}`}
                          initial={{ height: 0 }}
                          animate={{ height: `${slot.pct}%` }}
                          transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          style={{ minHeight: 4 }}
                        />
                      </div>
                      <span className="text-[10px] text-white/30">{slot.slot}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Waste Log Form */}
            <motion.div variants={itemVariants}>
              <GlassCard className="p-6">
                <SectionHeading icon={Trash2} title="Log Food Waste" />

                <div className="space-y-4">
                  {/* Meal */}
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">Meal</label>
                    <select
                      value={wasteForm.meal}
                      onChange={(e) => setWasteForm((f) => ({ ...f, meal: e.target.value }))}
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-sm text-white/80 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.07] transition-all cursor-pointer appearance-none"
                    >
                      <option value="Breakfast" className="bg-[#0d1420]">Breakfast</option>
                      <option value="Lunch" className="bg-[#0d1420]">Lunch</option>
                      <option value="Dinner" className="bg-[#0d1420]">Dinner</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">Waste Quantity (kg)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="e.g. 1.5"
                      value={wasteForm.quantity}
                      onChange={(e) => setWasteForm((f) => ({ ...f, quantity: e.target.value }))}
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.07] transition-all"
                    />
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="text-xs text-white/40 mb-1.5 block">Reason</label>
                    <select
                      value={wasteForm.reason}
                      onChange={(e) => setWasteForm((f) => ({ ...f, reason: e.target.value }))}
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-sm text-white/80 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.07] transition-all cursor-pointer appearance-none"
                    >
                      <option value="Overproduction" className="bg-[#0d1420]">Overproduction</option>
                      <option value="Low attendance" className="bg-[#0d1420]">Low attendance</option>
                      <option value="Food quality issue" className="bg-[#0d1420]">Food quality issue</option>
                    </select>
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    className="w-full mt-1 py-2.5 rounded-xl bg-gradient-to-r from-teal-500/80 to-cyan-500/70 hover:from-teal-500 hover:to-cyan-500 border border-teal-400/20 text-sm font-semibold text-white shadow-lg shadow-teal-500/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <AnimatePresence mode="wait">
                      {submitted ? (
                        <motion.span
                          key="done"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Logged Successfully
                        </motion.span>
                      ) : (
                        <motion.span
                          key="submit"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                        >
                          Submit Waste Log
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </GlassCard>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}