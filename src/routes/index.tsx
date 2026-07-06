import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Building2,
  MapPin,
  LogOut,
  ChevronRight,
  Users,
  CalendarDays,
  UserX,
  LogIn,
  Home,
  CalendarCheck,
} from "lucide-react";
import person1 from "@/assets/person1.jpg";
import person2 from "@/assets/person2.jpg";
import person3 from "@/assets/person3.jpg";
import person4 from "@/assets/person4.jpg";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const logs = [
  { name: "Michael Anderson", dept: "Engineering", time: "15:45:22", status: "IN", img: person1 },
  { name: "Sophia Chen", dept: "Marketing", time: "15:32:07", status: "IN", img: person2 },
  { name: "Olivia Martinez", dept: "Design", time: "14:18:49", status: "OUT", img: person3 },
  { name: "James Wilson", dept: "Operations", time: "13:47:15", status: "OUT", img: person4 },
];

const ACCENT = "#f4c33a";
const SURFACE = "#d1d9e6";

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
          <stop offset="0%" stopColor="#f2f4f8" />
          <stop offset="100%" stopColor="#d9dee6" />
        </radialGradient>
        <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="3" dy="3" result="offset" />
          <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff" />
          <feFlood floodColor="#a3b1c6" floodOpacity="0.6" />
          <feComposite in2="shadowDiff" operator="in" />
          <feComposite in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
      <circle cx="100" cy="100" r="92" fill="url(#face)" filter="url(#innerShadow)" />
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
            stroke={isHour ? "#5a6372" : "#a3b1c6"}
            strokeWidth={isHour ? 2 : 0.6}
            strokeLinecap="round"
          />
        );
      })}
      {[12, 3, 6, 9].map((n, i) => {
        const angle = (i * 90 * Math.PI) / 180;
        const x = 100 + 64 * Math.sin(angle);
        const y = 100 - 64 * Math.cos(angle) + 5;
        return (
          <text key={n} x={x} y={y} textAnchor="middle" fill="#2b2f38" fontSize="14" fontFamily="Nunito" fontWeight="700">
            {n}
          </text>
        );
      })}
      <line
        x1="100" y1="100"
        x2={100 + 42 * Math.sin((hourDeg * Math.PI) / 180)}
        y2={100 - 42 * Math.cos((hourDeg * Math.PI) / 180)}
        stroke="#2b2f38" strokeWidth="4" strokeLinecap="round"
      />
      <line
        x1="100" y1="100"
        x2={100 + 62 * Math.sin((minDeg * Math.PI) / 180)}
        y2={100 - 62 * Math.cos((minDeg * Math.PI) / 180)}
        stroke="#5a6372" strokeWidth="2.5" strokeLinecap="round"
      />
      <line
        x1={100 - 14 * Math.sin((secDeg * Math.PI) / 180)}
        y1={100 + 14 * Math.cos((secDeg * Math.PI) / 180)}
        x2={100 + 70 * Math.sin((secDeg * Math.PI) / 180)}
        y2={100 - 70 * Math.cos((secDeg * Math.PI) / 180)}
        stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round"
      />
      <circle cx="100" cy="100" r="4.5" fill={ACCENT} />
      <circle cx="100" cy="100" r="1.5" fill="#2b2f38" />
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
  const [hh, mm, ss] = timeStr;

  const stats = [
    { label: "TOTAL STAFF", value: 50, icon: Users },
    { label: "PRESENT", value: 42, icon: CalendarDays },
    { label: "ABSENT", value: 8, icon: UserX },
    { label: "TOTAL IN", value: 38, icon: LogIn },
    { label: "TOTAL OUT", value: 30, icon: LogOut },
    { label: "INSIDE OFFICE", value: 8, icon: Home },
  ];

  return (
    <main className="min-h-screen w-full p-5 md:p-8 flex items-center justify-center" style={{ background: SURFACE }}>
      <div className="w-full max-w-[1400px] neo p-6 md:p-8">
        {/* Header */}
        <header className="neo-sm p-4 md:p-5 flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 min-w-0">
            <div className="neo-circle w-16 h-16 grid place-items-center shrink-0">
              <Building2 className="w-7 h-7" style={{ color: ACCENT }} strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground truncate">Akil Group</h1>
              <p className="text-[11px] tracking-[0.3em] text-muted-foreground mt-1 font-semibold">ATTENDANCE SYSTEM</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="neo-sm flex items-center gap-3 px-5 py-3 hover:brightness-[0.98] active:shadow-inner transition">
              <MapPin className="w-4 h-4" style={{ color: ACCENT }} />
              <span className="text-sm font-semibold text-foreground">Dubai Main Branch</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground rotate-90" />
            </button>
            <button className="neo-circle w-12 h-12 grid place-items-center hover:brightness-[0.98] transition">
              <LogOut className="w-5 h-5" style={{ color: ACCENT }} />
            </button>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1fr] gap-6">
          {/* Clock Panel */}
          <section className="neo-sm p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[11px] tracking-[0.25em] text-muted-foreground font-bold">WEDNESDAY</p>
                <p className="text-2xl font-extrabold text-foreground mt-1">July 1, 2026</p>
              </div>
              <div className="neo-circle w-10 h-10 grid place-items-center">
                <CalendarCheck className="w-5 h-5" style={{ color: ACCENT }} />
              </div>
            </div>
            <div className="flex-1 grid place-items-center py-3">
              <div className="w-full max-w-[280px] aspect-square neo-circle p-3">
                <AnalogClock date={now} />
              </div>
            </div>
            <div className="neo-inset mt-4 py-3 text-center">
              <div className="font-mono text-3xl font-extrabold text-foreground tracking-wider">
                {hh}<span style={{ color: ACCENT }}>:</span>{mm}<span style={{ color: ACCENT }}>:</span>{ss}
              </div>
              <p className="text-[10px] tracking-[0.3em] text-muted-foreground mt-1 font-bold">CURRENT TIME</p>
            </div>
          </section>

          {/* Recent Logs */}
          <section className="neo-sm p-5 md:col-span-2 lg:col-span-1 md:order-3 lg:order-none">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] tracking-[0.25em] text-muted-foreground font-bold">RECENT LOGS</p>
              <button className="flex items-center gap-1 text-sm font-semibold" style={{ color: ACCENT }}>
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.name} className="neo-inset flex items-center gap-3 p-3">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: log.status === "IN" ? "#5cb85c" : "#e0533d",
                                 boxShadow: `0 0 8px ${log.status === "IN" ? "#5cb85c" : "#e0533d"}` }} />
                  <div className="neo-circle w-11 h-11 p-[3px] shrink-0">
                    <img src={log.img} alt={log.name} loading="lazy" width={44} height={44} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-bold truncate">{log.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{log.dept}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-sm font-mono font-bold text-foreground">{log.time}</span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-md"
                          style={{
                            background: log.status === "IN" ? "rgba(92,184,92,0.15)" : "rgba(224,83,61,0.15)",
                            color: log.status === "IN" ? "#3d8b3d" : "#c0392b",
                          }}>{log.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Inside Office */}
          <section className="neo-sm p-6 flex flex-col items-center justify-center gap-5">
            <div className="neo-circle w-36 h-36 grid place-items-center">
              <div className="neo-circle-inset w-28 h-28 grid place-items-center">
                <Home className="w-12 h-12" style={{ color: ACCENT }} strokeWidth={1.8} />
              </div>
            </div>
            <div className="text-center">
              <div className="text-7xl font-extrabold leading-none" style={{ color: ACCENT, textShadow: "1px 1px 2px rgba(163,177,198,0.6), -1px -1px 2px rgba(255,255,255,0.9)" }}>8</div>
              <p className="text-[11px] tracking-[0.3em] text-foreground/70 mt-3 font-bold">INSIDE OFFICE</p>
              <p className="text-xs text-muted-foreground mt-1">16% of total staff</p>
            </div>
          </section>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-5 mt-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="neo-sm px-2 py-4 md:p-4 flex flex-col items-center gap-2 min-w-0">
                <div className="neo-circle-inset w-10 h-10 md:w-11 md:h-11 grid place-items-center">
                  <Icon className="w-5 h-5" style={{ color: ACCENT }} strokeWidth={2} />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-foreground">{s.value}</div>
                <p className="text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.22em] text-muted-foreground font-bold text-center whitespace-nowrap">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
