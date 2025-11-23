import React, { useEffect, useState } from 'react';
import challengeService from '../services/challengeService';
import { toast } from 'react-hot-toast';

export default function DailyQuizPage() {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [answeredToday, setAnsweredToday] = useState(false);
  const [userStreak, setUserStreak] = useState(0);

  const loadQuestion = async () => {
    setLoading(true);
    try {
      const data = await challengeService.getDailyQuestion();
      setQuestion(data.question || data);
      setAnsweredToday(!!data.answeredToday);
      setUserStreak(data.userStreak || 0);
    } catch (err) {
      console.error('Daily question load error', err);
      toast.error('Could not load question');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadQuestion(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answeredToday) { toast('You have already answered today'); return; }
    if (!selected) { toast('Please select an answer'); return; }
    setSubmitting(true);
    try {
      const res = await challengeService.submitDailyAnswer({ answer: selected, questionId: question?.id });
      if (res?.correct) toast.success(`Correct! +${res.bonus || 0} points`);
      else toast.error('Wrong answer — try again tomorrow');
      setAnsweredToday(true);
      setUserStreak(res?.currentStreak || 0);
      await loadQuestion();
      setSelected(null);
    } catch (err) {
      console.error('Failed to submit daily answer', err);
      toast.error('Failed to submit answer');
    } finally { setSubmitting(false); }
  };

  if (loading) return <div className="p-6 text-gray-300">Loading daily question...</div>;

  return (
    <div className="max-w-3xl mx-auto p-2">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100">Question of the Day</h2>
          <p className="text-sm text-gray-300">Quick daily question to keep you sharp</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-300">Streak</div>
          <div className="text-sm font-semibold px-3 py-1 rounded-full bg-teal-700 text-white">{userStreak}d</div>
        </div>
      </div>
      {answeredToday && <div className="p-3 mb-4 rounded-md bg-teal-900/30 text-teal-100">You've already answered today — your current streak is {userStreak} day(s).</div>}
      {!question && <div className="p-4 rounded-md bg-yellow-600/10 text-yellow-300">No question available right now. Check back later.</div>}
      {question && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-6 card-elevated rounded-lg">
            <div className="text-lg font-semibold mb-3 text-gray-100">{question.prompt}</div>
            <div className="grid gap-3">
              {(question?.choices ?? []).map((c, idx) => {
                const id = `choice-${idx}`;
                return (
                  <label key={idx} htmlFor={id} className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${selected === c ? 'border-teal-500 bg-teal-900/20 text-gray-100' : 'border-gray-700 text-gray-200'}`}>
                    <input id={id} type="radio" name="choice" value={c} checked={selected === c} onChange={() => setSelected(c)} disabled={answeredToday || submitting} />
                    <span>{c}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-gradient" disabled={submitting || answeredToday}>{submitting ? 'Submitting...' : 'Submit Answer'}</button>
            <button type="button" onClick={loadQuestion} className="px-4 py-2 rounded-md border border-gray-600 text-gray-200">Refresh</button>
          </div>
        </form>
      )}
    </div>
  );
}
