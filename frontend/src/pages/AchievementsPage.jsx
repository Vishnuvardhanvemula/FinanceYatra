import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import BadgeCollection from '../components/BadgeCollection';
import ParticleBackground from '../components/ParticleBackground';

const AchievementsPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden pb-20">
      <ParticleBackground />

      <div className="relative pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-400 mb-2"
            >
              Badge Collection
            </motion.h1>
            <p className="text-slate-400 text-lg">
              Track your milestones and show off your achievements.
            </p>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <BadgeCollection />
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
