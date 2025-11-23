import React from 'react';

export default function ChallengeCard({ task, claimingIds = [], onClaim }) {
  const claiming = claimingIds.includes(task.id);
  const disabled = task.claimed || claiming;
  return (
    <div className="card-elevated p-4 rounded-lg hover-glow transition-transform hover:-translate-y-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex-1">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-md flex items-center justify-center text-white text-sm font-bold shadow" style={{background: 'linear-gradient(135deg,#14b8a6 0%,#0d9488 100%)'}}>{task.points || 0}</div>
          <div>
            <div className="font-medium text-gray-100">{task.title}</div>
            <div className="text-sm text-gray-300">{task.detail}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-3 sm:mt-0">
        <div className="text-sm text-gray-200">+{task.points} pts</div>
        <button onClick={() => onClaim(task.id)} disabled={disabled} className={`px-3 py-1 rounded-md text-sm font-semibold ${disabled ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'btn-gradient text-white shadow-sm'}`}>
          {task.claimed ? 'Claimed' : claiming ? 'Claiming...' : 'Claim'}
        </button>
      </div>
    </div>
  );
}
