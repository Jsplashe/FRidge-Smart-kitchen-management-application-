import React from 'react';
import { Link } from 'react-router-dom';
import { Refrigerator, ChefHat, Calendar, Leaf, Clock, ShoppingCart } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <Refrigerator className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              FRiDGE
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How it Works</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm hover:shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        <main>
          {/* Hero Section */}
          <div className="py-20 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
              Organize your kitchen.
              <br />
              <span className="text-emerald-600">Reduce waste.</span>
              <br />
              Plan smarter.
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join thousands of households saving time, money, and the planet with smart kitchen management.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 text-lg font-medium shadow-lg flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <span>Get Started Now</span>
                <Leaf className="h-5 w-5" />
              </Link>
              <a
                href="#how-it-works"
                className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors text-lg font-medium flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <span>See How It Works</span>
                <Clock className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div id="features" className="py-20">
            <h2 className="text-3xl font-bold text-center mb-12">Smart Features for a Smarter Kitchen</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <FeatureCard
                icon={<ShoppingCart className="h-8 w-8 text-emerald-600" />}
                title="Smart Inventory"
                description="Track your groceries in real-time and get smart notifications before items expire."
              />
              <FeatureCard
                icon={<ChefHat className="h-8 w-8 text-emerald-600" />}
                title="Recipe Suggestions"
                description="Discover personalized recipes based on what's in your kitchen."
              />
              <FeatureCard
                icon={<Calendar className="h-8 w-8 text-emerald-600" />}
                title="Meal Planning"
                description="Plan your weekly meals with our intuitive drag-and-drop interface."
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl px-8 my-20">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center text-white">
              <StatCard number="40%" text="Average reduction in food waste" />
              <StatCard number="$150+" text="Monthly grocery savings" />
              <StatCard number="1000+" text="Recipe suggestions" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
    >
      {children}
    </a>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1">
      <div className="mb-4 bg-emerald-50 w-16 h-16 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, text }: { number: string; text: string }) {
  return (
    <div className="p-6">
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-emerald-100">{text}</div>
    </div>
  );
}