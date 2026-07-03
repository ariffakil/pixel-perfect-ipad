import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Building2,
  MapPin,
  LogOut,
  CalendarCheck,
  ChevronRight,
  Users,
  CalendarDays,
  UserX,
  LogIn,
  Home,
} from "lucide-react";
import person1 from "@/assets/person1.jpg";
import person2 from "@/assets/person2.jpg";
import person3 from "@/assets/person3.jpg";
import person4 from "@/assets/person4.jpg";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const logs = [
  { name: "Michael Anderson", dept: "Engineering", time: "03:45 PM", status: "IN", img: person1 },
  { name: "Sophia Chen", dept: "Marketing", time: "03:32 PM", status: "IN", img: person2 },
  { name: "Olivia Martinez", dept: "Design", time: "02:18 PM", status: "OUT", img: person3 },
  { name: "James Wilson", dept: "Operations", time: "01:47 PM", status: "OUT", img: person4 },
];

function AnalogClock({ date }: { date: Date }) {
  const h = date.getHours() % 12;
  const m = date.getMinutes();
  const s = date.getSeconds();
  const hourDeg = h * 30 + m * 0.5;
  const minDeg = m * 6 + s * 0.1;
  const secDeg = s * 6;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="face" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.24 0.02 220)" />
          <stop offset="100%" stopColor="oklch(0.14 0.02 225)" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill="url(#face)" stroke="oklch(0.35 0.05 195 / 0.5)" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="oklch(0.82 0.15 180 / 0.15)" strokeWidth="0.5" />
      {Array.from({ length: 60 }).map((_, i) => {
        const angle = (i * 6 * Math.PI) / 180;
        const isHour = i % 5 === 0;
        const r1 = isHour ? 78 : 82;
        const r2 = 86;
        const x1 = 100 + r1 * Math.sin(angle);
        const y1 = 100 - r1 * Math.cos(angle);
        const x2 = 100 + r2 * Math.sin(angle);
        const y2 = 100 - r2 * Math.cos(angle);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="oklch(0.82 0.15 180)"
            strokeWidth={isHour ? 2 : 0.6}
            opacity={isHour ? 0.9 : 0.4}
            strokeLinecap="round"
          />
        );
      })}
      {[12, 3, 6, 9].map((n, i) => {
        const angle = (i * 90 * Math.PI) / 180;
        const x = 100 + 66 * Math.sin(angle);
        const y = 100 - 66 * Math.cos(angle) + 5;
        return (
          <text key={n} x={x} y={y} textAnchor="middle" fill="oklch(0.9 0.03 195)" fontSize="14" fontFamily="Space Grotesk" fontWeight="500">
            {n}
          </text>
        );
      })}
      {/* Hour hand */}
      <line
        x1="100" y1="100"
        x2={100 + 42 * Math.sin((hourDeg * Math.PI) / 180)}
        y2={100 - 42 * Math.cos((hourDeg * Math.PI) / 180)}
        stroke="oklch(0.85 0.18 180)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Minute hand */}
      <line
        x1="100" y1="100"
        x2={100 + 62 * Math.sin((minDeg * Math.PI) / 180)}
        y2={100 - 62 * Math.cos((minDeg * Math.PI) / 180)}
        stroke="oklch(0.9 0.12 185)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Second hand */}
      <line
        x1="100" y1="108"
        x2={100 + 70 * Math.sin((secDeg * Math.PI) / 180)}
        y2={100 - 70 * Math.cos((secDeg * Math.PI) / 180)}
        stroke="oklch(0.82 0.16 75)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="100" cy="100" r="4" fill="oklch(0.82 0.16 75)" />
      <circle cx="100" cy="100" r="1.5" fill="oklch(0.15 0.02 220)" />
    </svg>
  );
}

function Dashboard() {
  const [now, setNow] = useState(new Date("2026-07-01T21:12:13"));
  useEffect(() => {
    const t = setInterval(() => setNow((d) => new Date(d.getTime() + 1000)), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = now.toLocaleTimeString("en-US", { hour12: false }).split(":");
  const hh = timeStr[0];
  const mm = timeStr[1];
  const ss = timeStr[2];
  const ampm = now.getHours() >= 12 ? "PM" : "AM";
  const displayHH = String(((now.getHours() + 11) % 12) + 1).padStart(2, "0");

  const stats = [
    { label: "TOTAL STAFF", value: 50, icon: Users, color: "text-teal" },
    { label: "PRESENT", value: 42, icon: CalendarDays, color: "text-[oklch(0.78_0.20_145)]" },
    { label: "ABSENT", value: 8, icon: UserX, color: "text-[oklch(0.68_0.22_25)]" },
    { label: "TOTAL IN", value: 38, icon: LogIn, color: "text-teal" },
    { label: "TOTAL OUT", value: 30, icon: LogOut, color: "text-[oklch(0.78_0.16_65)]" },
    { label: "INSIDE OFFICE", value: 8, icon: Home, color: "text-teal" },
  ];

  return (
    <main className="min-h-screen w-full p-5 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-[1400px] card-panel p-6 md:p-8">
        {/* Header */}
        <header className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative shrink-0">
              <div className="w-16 h-16 grid place-items-center rounded-2xl border border-teal/40 bg-teal/5 teal-glow"
                   style={{ clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)" }}>
                <Building2 className="w-7 h-7 text-teal" />
              </div>
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl md:text-4xl font-bold text-white truncate">Akil Group</h1>
              <p className="text-xs tracking-[0.3em] text-teal/80 mt-1">ATTENDANCE SYSTEM</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-teal/30 bg-card/60 hover:bg-card transition">
              <MapPin className="w-4 h-4 text-teal" />
              <span className="text-sm text-white">Dubai Main Branch</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground rotate-90" />
            </button>
            <button className="w-12 h-12 grid place-items-center rounded-2xl border border-teal/30 bg-card/60 hover:bg-card transition">
              <LogOut className="w-5 h-5 text-teal" />
            </button>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1fr] gap-5">
          {/* Clock Panel */}
          <section className="card-panel p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs tracking-[0.25em] text-teal/80">WEDNESDAY</p>
                <p className="text-2xl font-semibold text-white mt-1">July 1, 2026</p>
              </div>
              <button className="w-10 h-10 grid place-items-center rounded-xl border border-teal/30 bg-teal/5">
                <CalendarCheck className="w-5 h-5 text-teal" />
              </button>
            </div>
            <div className="flex-1 grid place-items-center py-3">
              <div className="w-full max-w-[280px] aspect-square">
                <AnalogClock date={now} />
              </div>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-white tracking-wider">
                {displayHH}<span className="text-teal">:</span>{mm}<span className="text-teal">:</span>{ss}
                <span className="text-teal text-xl ml-2">{ampm}</span>
              </div>
              <p className="text-[10px] tracking-[0.3em] text-teal/80 mt-1">CURRENT TIME</p>
            </div>
          </section>

          {/* Recent Logs */}
          <section className="card-panel p-5 md:col-span-2 lg:col-span-1 md:order-3 lg:order-none">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs tracking-[0.25em] text-teal/80">RECENT LOGS</p>
              <button className="flex items-center gap-1 text-sm text-teal hover:text-teal-glow">
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.name} className="flex items-center gap-3 p-3 rounded-2xl bg-[oklch(0.19_0.02_225)] border border-border/50">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${log.status === "IN" ? "bg-[oklch(0.78_0.20_145)]" : "bg-[oklch(0.68_0.22_25)]"}`} />
                  <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-teal/30 shrink-0">
                    <img src={log.img} alt={log.name} loading="lazy" width={44} height={44} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{log.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{log.dept}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-sm text-white/90 font-mono">{log.time}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${
                      log.status === "IN"
                        ? "text-[oklch(0.82_0.20_150)] border-[oklch(0.78_0.20_145)]/40 bg-[oklch(0.78_0.20_145)]/10"
                        : "text-[oklch(0.75_0.22_25)] border-[oklch(0.68_0.22_25)]/40 bg-[oklch(0.68_0.22_25)]/10"
                    }`}>{log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Inside Office */}
          <section className="card-panel p-5 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20"
                 style={{ backgroundImage: "radial-gradient(oklch(0.82 0.15 180 / 0.4) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
            <div className="relative flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-36 h-36 grid place-items-center border-2 border-teal/50 teal-glow"
                     style={{ clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)" }}>
                  <Home className="w-14 h-14 text-teal text-glow" strokeWidth={1.5} />
                </div>
              </div>
              <div className="text-center">
                <div className="text-7xl font-bold text-teal text-glow leading-none">8</div>
                <p className="text-xs tracking-[0.3em] text-teal/90 mt-3">INSIDE OFFICE</p>
                <p className="text-xs text-muted-foreground mt-1">16% of total staff</p>
              </div>
            </div>
          </section>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mt-5">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="card-panel p-4 flex flex-col items-center gap-2">
                <Icon className={`w-7 h-7 ${s.color}`} strokeWidth={1.8} />
                <div className={`text-4xl font-bold ${s.color}`}>{s.value}</div>
                <p className="text-[10px] tracking-[0.25em] text-muted-foreground text-center">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
