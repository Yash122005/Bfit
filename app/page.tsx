import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Activity,
  Zap,
  TrendingUp,
  ChevronDown,
  Dumbbell,
  Utensils,
  Scan,
  CheckCircle2,
  Instagram
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-blue-600 selection:text-white font-sans">

      {/* 1. HERO SECTION */}
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            alt="Gym Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-gray-950/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-400 font-bold text-sm tracking-wide uppercase shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            🚀 The Future of Fitness Tracking
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 drop-shadow-2xl px-2">
            WHERE DISCIPLINE <br className="hidden md:block" />
            MEETS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500">TRANSFORMATION</span>
          </h1>

          <p className="max-w-xl mx-auto text-lg md:text-xl text-gray-300 mb-10 leading-relaxed font-light">
            Track workouts, nutrition, and progress with detailed analytics and AI-powered insights. Stop guessing. Start transforming.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login?redirect=/trainers"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 group"
            >
              <Dumbbell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Find a Trainer
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-600 hover:border-gray-400 text-white rounded-full font-bold text-lg transition-all hover:bg-white/5 flex items-center justify-center"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400 opacity-70" />
        </div>
      </div>


      {/* 2. FEATURE SHOWCASE (Grid) */}
      <section className="py-24 bg-gray-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Win</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">BFIT puts professional-grade tracking tools in your pocket. No clutter, just performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Dumbbell,
                title: "Workout Tracking",
                desc: "Log sets, reps, and volume across varied workout types.",
                color: "text-blue-500",
                bg: "bg-blue-500/10",
                border: "hover:border-blue-500/50"
              },
              {
                icon: Utensils,
                title: "Diet & Macros",
                desc: "Keep your nutrition on point with easy calorie and macro logging.",
                color: "text-green-500",
                bg: "bg-green-500/10",
                border: "hover:border-green-500/50"
              },
              {
                icon: Scan,
                title: "NutriScan AI",
                desc: "Instantly analyze food content with our smart nutrition engine.",
                color: "text-purple-500",
                bg: "bg-purple-500/10",
                border: "hover:border-purple-500/50"
              },
              {
                icon: TrendingUp,
                title: "Progress Stats",
                desc: "Visual charts for weight, consistency, and body metrics.",
                color: "text-orange-500",
                bg: "bg-orange-500/10",
                border: "hover:border-orange-500/50"
              },
            ].map((feature, idx) => (
              <div key={idx} className={`p-6 rounded-2xl bg-gray-900/50 border border-gray-800 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl ${feature.border}`}>
                <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 3. VISUAL BREAK SECTION */}
      <section className="relative h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=2070&auto=format&fit=crop"
            alt="Athlete lifting"
            fill
            className="object-cover object-top opacity-60"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-widest leading-tight mb-4 italic">
            "Built for real people <br /> chasing <span className="text-blue-500">real progress</span>."
          </h2>
        </div>
      </section>


      {/* 4. APP PREVIEW / MOCK UI SECTION */}
      <section className="py-24 bg-gray-900 text-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-blue-400 font-bold tracking-wider text-sm uppercase">Command Center</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">Your Fitness Dashboard</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Use the BFIT dashboard to monitor your daily stats at a glance.</p>
          </div>

          {/* MOCK UI Container */}
          <div className="relative mx-auto max-w-4xl bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl p-4 md:p-8 transform md:rotate-1 md:hover:rotate-0 transition-transform duration-500">
            {/* Fake Browser Header */}
            <div className="flex items-center space-x-2 mb-6 border-b border-gray-800 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="ml-4 bg-gray-900 rounded-full h-6 w-64"></div>
            </div>

            {/* Dashboard-like content grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Card 1 */}
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500"><Activity /></div>
                  <div>
                    <p className="text-xs text-gray-500">Daily Steps</p>
                    <p className="font-bold text-lg">8,432</p>
                  </div>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[70%]"></div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-500/20 rounded-lg text-green-500"><Utensils /></div>
                  <div>
                    <p className="text-xs text-gray-500">Calories In</p>
                    <p className="font-bold text-lg">1,850 <span className="text-xs font-normal text-gray-500">/ 2,400</span></p>
                  </div>
                </div>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[60%]"></div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="col-span-1 md:col-span-1 bg-gray-900 p-6 rounded-2xl border border-gray-800 flex flex-col justify-center items-center">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full rotate-45"></div>
                  <div className="text-center">
                    <span className="block text-xl font-bold">75%</span>
                    <span className="text-[10px] text-gray-400 uppercase">Goal</span>
                  </div>
                </div>
              </div>

              {/* Wide Card */}
              <div className="col-span-1 md:col-span-3 bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <h3 className="font-bold mb-4">Weekly Progress</h3>
                <div className="flex items-end space-x-4 h-24">
                  {[40, 60, 45, 80, 55, 70, 65].map((h, i) => (
                    <div key={i} className="flex-1 bg-gray-800 rounded-t-lg hover:bg-blue-600 transition-colors relative group">
                      <div className="absolute bottom-0 w-full bg-blue-600/50 rounded-t-lg transition-all duration-500" style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 5. HOW IT WORKS */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">How BFIT Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Set Your Goals", text: "Create your profile, define your weight & fitness targets." },
              { step: "02", title: "Track Activity", text: "Log workouts and daily steps to measure output." },
              { step: "03", title: "Log Nutrition", text: "Use NutriScan or manual search to track your fuel." },
              { step: "04", title: "Analyze & Adapt", text: "Review weekly insights and adjust for continuous progress." }
            ].map((item, i) => (
              <div key={i} className="relative p-6 group">
                <div className="text-6xl font-black text-gray-800/50 absolute top-0 right-0 group-hover:text-blue-900/40 transition-colors z-0">
                  {item.step}
                </div>
                <div className="relative z-10 pt-8">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. WHY BFIT / DIFFERENCE */}
      <section className="py-20 bg-blue-900/10 border-y border-blue-900/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Why BFIT?</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {["Discipline over Motivation", "Data-Driven Results", "No Ads, No Fluff", "Designed for Consistency"].map((tag, i) => (
              <div key={i} className="flex items-center space-x-2 bg-gray-900 border border-gray-700 px-4 py-2 rounded-full">
                <CheckCircle2 className="text-blue-500 w-5 h-5" />
                <span className="font-bold text-sm tracking-wide">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 7. FINAL CTA */}
      <section className="py-32 relative text-center px-4 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            START BUILDING <br />
            <span className="text-blue-500">DISCIPLINE</span> TODAY
          </h2>
          <p className="text-gray-400 text-xl mb-10">Join thousands of others taking control of their body and mind.</p>
          <Link
            href="/signup"
            className="inline-flex items-center px-10 py-5 bg-white text-gray-950 rounded-full font-bold text-xl hover:bg-gray-200 transition-colors group"
          >
            Get Started Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
      </section>


      {/* FOOTER */}
      <footer className="py-8 border-t border-gray-900 bg-black text-center text-gray-600 text-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/bfits_tayfit/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
          <p>© {new Date().getFullYear()} BFIT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
