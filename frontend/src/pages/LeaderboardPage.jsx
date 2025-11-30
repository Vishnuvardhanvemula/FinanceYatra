import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, Star, Zap, Shield } from "lucide-react";
import challengeService from "../services/challengeService";
import { useAuth } from "../contexts/AuthContext";
import ParticleBackground from "../components/ParticleBackground";
import RankAvatar from "../components/RankAvatar";

export default function LeaderboardPage() {
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadBoard();
  }, []);

  const loadBoard = async () => {
    setLoading(true);
    try {
      const data = await challengeService.getLeaderboard();
      setBoard(data.entries || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (rank) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-slate-300";
    if (rank === 3) return "text-amber-600";
    return "text-slate-500";
  };

  const getRankBg = (rank) => {
    if (rank === 1) return "bg-yellow-500/20 border-yellow-500/50";
    if (rank === 2) return "bg-slate-300/20 border-slate-300/50";
    if (rank === 3) return "bg-amber-600/20 border-amber-600/50";
    return "bg-slate-800/50 border-slate-700";
  };

  const Podium = ({ entry, rank, delay }) => {
    if (!entry) return null;

    const height = rank === 1 ? "h-64" : rank === 2 ? "h-48" : "h-40";
    const color = rank === 1 ? "yellow" : rank === 2 ? "slate" : "amber";

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, type: "spring" }}
        className="flex flex-col items-center justify-end z-10"
      >
        <div className="relative mb-4">
          <div className={`w-20 h-20 rounded-full border-4 border-${color}-500 overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
            {/* Use RankAvatar if available, else fallback */}
            <div className="w-full h-full bg-slate-900 flex items-center justify-center">
              {entry.avatar ? (
                <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
              ) : (
                <span className={`text-2xl font-bold text-${color}-500`}>{entry.name?.charAt(0)}</span>
              )}
            </div>
          </div>
          <div className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-${color}-500 flex items-center justify-center border-2 border-slate-900 text-black font-bold text-sm`}>
            {rank}
          </div>
          {rank === 1 && (
            <Crown className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-400 fill-yellow-400 animate-bounce" size={32} />
          )}
        </div>

        <div className="text-center mb-2">
          <div className={`font-bold text-white truncate max-w-[120px]`}>{entry.name}</div>
          <div className={`text-xs font-mono text-${color}-400`}>{entry.points} XP</div>
        </div>

        <div className={`w-24 md:w-32 ${height} bg-gradient-to-t from-${color}-500/20 to-${color}-500/5 rounded-t-2xl border-t border-x border-${color}-500/30 flex items-end justify-center pb-4 backdrop-blur-sm`}>
          <div className={`text-4xl font-bold text-${color}-500/20`}>{rank}</div>
        </div>
      </motion.div>
    );
  };

  const topThree = [
    board.find(e => e.rank === 2),
    board.find(e => e.rank === 1),
    board.find(e => e.rank === 3)
  ];

  const restOfBoard = board.filter(e => e.rank > 3);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden pb-20">
      <ParticleBackground />

      <div className="relative pt-24 pb-12 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-400 mb-2"
          >
            Global Leaderboard
          </motion.h1>
          <p className="text-slate-400">Compete with the best finance learners worldwide.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Podium */}
            <div className="flex justify-center items-end gap-4 md:gap-8 mb-16 min-h-[300px]">
              <Podium entry={topThree[0]} rank={2} delay={0.2} />
              <Podium entry={topThree[1]} rank={1} delay={0.4} />
              <Podium entry={topThree[2]} rank={3} delay={0.3} />
            </div>

            {/* List */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <div className="w-12 text-center">Rank</div>
                <div className="flex-1">User</div>
                <div className="w-24 text-right">Streak</div>
                <div className="w-24 text-right">XP</div>
              </div>

              <div className="divide-y divide-slate-800/50">
                {restOfBoard.map((entry, idx) => (
                  <motion.div
                    key={entry.id || idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className={`p-4 flex items-center hover:bg-white/5 transition-colors ${entry.isMe ? 'bg-amber-500/10 border-l-4 border-amber-500' : ''}`}
                  >
                    <div className="w-12 text-center font-mono font-bold text-slate-400">#{entry.rank}</div>

                    <div className="flex-1 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700">
                        {entry.avatar ? (
                          <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-slate-400 font-bold">{entry.name?.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <div className={`font-medium ${entry.isMe ? 'text-amber-400' : 'text-white'}`}>
                          {entry.name} {entry.isMe && '(You)'}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="capitalize">{entry.level || 'Novice'}</span>
                          {entry.badges > 0 && (
                            <span className="flex items-center gap-1 text-amber-500/80">
                              • <Shield size={10} /> {entry.badges} Badges
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="w-24 text-right font-mono text-slate-400 flex items-center justify-end gap-1">
                      <Zap size={14} className={entry.streak > 0 ? "text-amber-400" : "text-slate-600"} />
                      {entry.streak}
                    </div>

                    <div className="w-24 text-right font-mono font-bold text-emerald-400">
                      {entry.points.toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
