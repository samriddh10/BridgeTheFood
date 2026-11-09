import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { MapPin, Truck, Heart, TrendingUp, Users, Utensils, ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Floating Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl border-b border-emerald-500/10"
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-gradient-to-br from-emerald-500 to-amber-500 p-2 rounded-xl">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                PlatePal
              </span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-slate-300 hover:text-emerald-400 transition-colors font-medium">
                Home
              </a>
              <a href="#how-it-works" className="text-slate-300 hover:text-emerald-400 transition-colors font-medium">
                How it Works
              </a>
              <a href="#impact" className="text-slate-300 hover:text-emerald-400 transition-colors font-medium">
                Impact
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-6 py-2.5 border-2 border-emerald-500/50 rounded-xl text-emerald-400 hover:bg-emerald-500/10 transition-all font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2 group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Connecting Hearts, One Meal at a Time</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-400 bg-clip-text text-transparent">
                Turning Leftovers
              </span>
              <br />
              <span className="text-white">into Lifelines</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Connect surplus food from hotels to local orphanages in real-time.
              <br />
              <span className="text-emerald-400 font-semibold">Zero waste. Zero hunger.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                to="/register?type=donor"
                className="group relative px-8 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:scale-105 min-w-[280px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative flex items-center justify-center gap-3">
                  <Utensils className="w-6 h-6" />
                  <span>I Have Food (Donor)</span>
                </div>
              </Link>

              <Link
                to="/register?type=receiver"
                className="group relative px-8 py-5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover:scale-105 min-w-[280px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative flex items-center justify-center gap-3">
                  <Heart className="w-6 h-6" />
                  <span>I Need Food (Receiver)</span>
                </div>
              </Link>
            </motion.div>

            {/* Hero Visual Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-20 relative"
            >
              <div className="relative max-w-4xl mx-auto">
                {/* Glassmorphic Card */}
                <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="aspect-video bg-gradient-to-br from-emerald-500/10 to-amber-500/10 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="flex justify-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                          <Utensils className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                          <Heart className="w-8 h-8 text-amber-400" />
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm">Platform Preview Coming Soon</p>
                    </div>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Live Impact Banner */}
      <section id="impact" className="relative py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <ImpactCounter
                icon={<Utensils className="w-8 h-8" />}
                value={1200}
                label="Meals Saved"
                suffix="+"
                color="emerald"
              />
              <ImpactCounter
                icon={<Users className="w-8 h-8" />}
                value={50}
                label="Partner Hotels"
                suffix="+"
                color="amber"
              />
              <ImpactCounter
                icon={<Heart className="w-8 h-8" />}
                value={20}
                label="Orphanages Fed"
                suffix="+"
                color="emerald"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A simple, seamless process that connects generosity with need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <StepCard
              icon={<MapPin className="w-10 h-10" />}
              step="01"
              title="Hotel Posts Food"
              description="Surplus food is listed on the platform with details about quantity, type, and pickup time."
              color="emerald"
              delay={0.1}
            />
            <StepCard
              icon={<Truck className="w-10 h-10" />}
              step="02"
              title="Orphanage Gets Alerted"
              description="Nearby orphanages receive instant notifications about available food in their area."
              color="amber"
              delay={0.2}
            />
            <StepCard
              icon={<Heart className="w-10 h-10" />}
              step="03"
              title="Food is Rescued"
              description="Meals are picked up and delivered, ensuring zero waste and zero hunger."
              color="emerald"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-emerald-500/10 to-amber-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-16 text-center overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full blur-xl opacity-50" />
                  <div className="relative bg-gradient-to-br from-emerald-500 to-amber-500 p-6 rounded-full">
                    <TrendingUp className="w-12 h-12 text-white" />
                  </div>
                </div>
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Ready to Make a{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                  Difference?
                </span>
              </h2>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                Join our community of hotels and orphanages working together to eliminate food waste and fight hunger.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/register"
                  className="group px-10 py-5 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:scale-105 flex items-center justify-center gap-3"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="px-10 py-5 border-2 border-emerald-500/50 rounded-2xl font-semibold text-lg text-emerald-400 hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-3"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-800 py-12 px-6">
        <div className="container mx-auto">
          <div className="text-center text-slate-500">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-emerald-500 to-amber-500 p-2 rounded-lg">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                PlatePal
              </span>
            </div>
            <p>© 2024 PlatePal. Making every meal count.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Impact Counter Component
const ImpactCounter = ({ icon, value, label, suffix, color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600',
    amber: 'from-amber-500 to-amber-600',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${colorClasses[color]} rounded-2xl mb-4`}>
        {icon}
      </div>
      <div className={`text-5xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent mb-2`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-slate-400 font-medium">{label}</div>
    </motion.div>
  );
};

// Step Card Component
const StepCard = ({ icon, step, title, description, color, delay }) => {
  const colorClasses = {
    emerald: {
      gradient: 'from-emerald-500/10 to-emerald-600/10',
      border: 'border-emerald-500/20',
      icon: 'from-emerald-500 to-emerald-600',
      text: 'text-emerald-400',
    },
    amber: {
      gradient: 'from-amber-500/10 to-amber-600/10',
      border: 'border-amber-500/20',
      icon: 'from-amber-500 to-amber-600',
      text: 'text-amber-400',
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className={`relative bg-gradient-to-br ${colorClasses[color].gradient} backdrop-blur-xl border ${colorClasses[color].border} rounded-2xl p-8 hover:shadow-2xl transition-all group`}
    >
      {/* Step Number */}
      <div className={`absolute top-4 right-4 text-6xl font-bold ${colorClasses[color].text} opacity-10`}>
        {step}
      </div>

      {/* Icon */}
      <div className="relative mb-6">
        <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color].icon} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`} />
        <div className={`relative w-16 h-16 bg-gradient-to-br ${colorClasses[color].icon} rounded-2xl flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default LandingPage;