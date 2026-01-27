import Link from 'next/link';
import { ArrowRight, Activity, Zap, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            BFIT
          </div>
          <div className="space-x-4">
            <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-blue-500/30"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Where Discipline Meets <br />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Transformation
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-10">
          The ultimate platform to track your workouts, nutrition, and progress using advanced analytics and AI-powered insights.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/signup"
            className="group bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg flex items-center hover:bg-gray-200 transition-all"
          >
            Start Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="bg-gray-800 border border-gray-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-700 transition-all"
          >
            Log In
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-colors">
              <Activity className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Workout Tracking</h3>
              <p className="text-gray-400">Log every set, rep, and mile. Visualize your consistency and break your limits.</p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-colors">
              <Zap className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">NutriScan AI</h3>
              <p className="text-gray-400">Instantly analyze calorie and macro content of your meals with our smart food database.</p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-green-500 transition-colors">
              <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Progress Analytics</h3>
              <p className="text-gray-400">Watch your body transform with detailed charts tracking weight, body fat, and strength.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
