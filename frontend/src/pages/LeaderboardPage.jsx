import React, { useEffect, useState } from "react";
import challengeService from "../services/challengeService";
import { useAuth } from "../contexts/AuthContext";

export default function LeaderboardPage() {
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const loadBoard = async () => {
    setLoading(true);
    try { const data = await challengeService.getLeaderboard(); setBoard(data.entries || data); } 
    catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  useEffect(() => { loadBoard(); }, []);

  return (
    <div className="max-w-3xl mx-auto p-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-100">Top Contributors</h3>
          <div className="text-sm text-gray-300">Anonymous weekly rankings</div>
        </div>
        <div className="text-sm text-gray-300">Live</div>
      </div>

      {loading && <div className="text-gray-300">Loading...</div>}

      {!loading && (
        <div className="card-elevated rounded-lg overflow-hidden border">
          <ul className="divide-y">
            {board.length === 0 && <li className="p-4 text-gray-400">No leaderboard data yet.</li>}
            {board.map((row, idx) => (
              <li key={idx} className={`p-4 flex justify-between items-center ${row.isMe ? 'bg-teal-900/30' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${row.isMe ? 'bg-teal-500 text-white' : 'bg-gray-700 text-gray-200'}`}>{row.nameInitial || (row.displayName?.charAt(0) || "A")}</div>
                  <div>
                    <div className="font-medium text-gray-100">{row.isMe ? 'You' : (row.displayName || `Anonymous ${row.rank || idx + 1}`)}</div>
                    <div className="text-sm text-gray-300">{row.badge || ""}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-300 mr-2">#{row.rank}</div>
                  <div className="font-semibold text-gray-100">{(row.points ?? 0)} pts</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
