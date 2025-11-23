import React, { useEffect, useState } from "react";
import challengeService from "../services/challengeService";
import ChallengeCard from '../components/ChallengeCard';
import { toast } from "react-hot-toast";
import confetti from 'canvas-confetti';

export default function WeeklyChallengesPage() {
  const [weekly, setWeekly] = useState(null);
  const [loading, setLoading] = useState(false);
  const [claimingIds, setClaimingIds] = useState([]);

  const loadWeekly = async () => {
    setLoading(true);
    try { const data = await challengeService.getWeeklyChallenges(); setWeekly(data); } 
    catch { toast.error("Could not load weekly challenges"); } 
    finally { setLoading(false); }
  };

  useEffect(() => { loadWeekly(); }, []);

  const handleClaim = async (taskId) => {
    if (!taskId) return;
    setClaimingIds(prev => [...prev, taskId]);
    try {
      const res = await challengeService.claimWeeklyTask(taskId, weekly?.weekId);
      toast.success(res.message || "Task claimed");
      // Small celebratory confetti on successful claim
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore confetti issues
      }
      await loadWeekly();
    } catch {
      toast.error("Could not claim task");
    } finally {
      setClaimingIds(prev => prev.filter(id => id !== taskId));
    }
  };

  if (loading) return <div className="p-6 text-gray-300">Loading weekly challenges...</div>;

  return (
    <div className="max-w-4xl mx-auto p-2">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">Weekly Challenges</h2>
      {!weekly && <div className="p-4 rounded-md bg-yellow-600/10 text-yellow-300">No weekly theme active.</div>}
      {weekly && (
        <div className="space-y-4">
          <div className="p-4 card-elevated rounded-lg">
            <h3 className="text-xl font-semibold text-gray-100">{weekly.theme}</h3>
            <p className="text-sm text-gray-300">{weekly.description}</p>
          </div>
          <div className="p-3 card-elevated rounded-lg">
            {/* Small progress bar */}
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-100">Progress</div>
              <div className="text-sm text-gray-300">{(weekly.tasks || []).filter(t => t.claimed).length}/{(weekly.tasks || []).length}</div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div className="progress-fill" style={{ width: `${Math.round(((weekly.tasks || []).filter(t => t.claimed).length / ((weekly.tasks || []).length || 1)) * 100)}%` }} />
            </div>
          </div>
          <div className="grid gap-3">
            {weekly.tasks?.map(task => (
              <ChallengeCard key={task.id} task={task} claimingIds={claimingIds} onClaim={handleClaim} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
