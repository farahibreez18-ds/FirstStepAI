import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Send, Mic, RotateCcw } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { logActivity } from "../utils/activityLog";

const QUESTIONS = [
  "Tell me about yourself and your background.",
  "Why are you interested in this role?",
  "Describe a challenging project you worked on.",
  "How do you handle tight deadlines?",
  "Where do you see yourself in 5 years?",
];

function MockInterview() {
  const { currentUser } = useAuth();
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [answerCount, setAnswerCount] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const start = () => {
    setStarted(true);
    setFinished(false);
    setQIndex(0);
    setAnswerCount(0);
    setTotalWords(0);
    setMessages([{ role: "ai", text: QUESTIONS[0] }]);
  };

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    const question = QUESTIONS[qIndex];
    const userAnswer = input;
    const nextIndex = qIndex + 1;

    setMessages((prev) => [...prev, { role: "user", text: userAnswer }]);
    setInput("");
    setSending(true);
    setAnswerCount((prev) => prev + 1);
    setTotalWords((prev) => prev + userAnswer.split(/\s+/).filter(Boolean).length);

    try {
      const res = await fetch("/api/interview-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer: userAnswer }),
      });
      const data = await res.json();
      const feedbackText = data.feedback || "Thanks for your answer — let's move to the next question.";

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: feedbackText, sampleAnswer: data.sampleAnswer },
      ]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", text: "Couldn't get AI feedback right now — moving to the next question." }]);
    } finally {
      setSending(false);
      if (nextIndex < QUESTIONS.length) {
        setMessages((prev) => [...prev, { role: "ai", text: QUESTIONS[nextIndex] }]);
        setQIndex(nextIndex);
      } else {
        setFinished(true);
        logActivity(currentUser?.uid, "Completed a mock interview session");
      }
    }
  };

  const avgWords = answerCount > 0 ? Math.round(totalWords / answerCount) : 0;

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex flex-col">
      <Navbar />

      <div className="max-w-2xl mx-auto w-full px-6 py-10 flex-1 flex flex-col">
        <h1 className="font-display font-bold text-3xl text-[#F5F7FA]">Mock Interview</h1>
        <p className="text-[#8A93A6] mt-2 mb-6">Practice with real, AI-powered feedback.</p>

        {!started ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#121A2E] border border-[#232D42] rounded-2xl p-10 text-center">
            <Mic className="w-10 h-10 text-[#4C6FFF] mb-4" />
            <h2 className="font-display font-semibold text-xl text-[#F5F7FA]">Ready to practice?</h2>
            <p className="text-[#8A93A6] text-sm mt-2 mb-6">5 questions, text-based for now.</p>
            <button
              onClick={start}
              className="bg-[#4C6FFF] hover:bg-[#3D5AE0] text-white font-semibold px-8 py-3 rounded-lg transition"
            >
              Start Interview
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 bg-[#121A2E] border border-[#232D42] rounded-2xl p-5 overflow-y-auto space-y-4 max-h-[50vh]">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm ${
                      m.role === "user"
                        ? "bg-[#4C6FFF] text-white"
                        : "bg-[#0B1120] border border-[#232D42] text-[#F5F7FA]"
                    }`}
                  >
                    {m.text}
                  </div>

                  {m.sampleAnswer && (
                    <details className="max-w-[85%] mt-1.5 group">
                      <summary className="text-xs text-[#4C6FFF] cursor-pointer hover:text-[#3D5AE0] list-none flex items-center gap-1">
                        <span className="group-open:rotate-90 transition-transform">▸</span> See a strong example answer
                      </summary>
                      <div className="mt-2 bg-[#121A2E] border border-[#4C6FFF]/30 rounded-lg px-4 py-3 text-sm text-[#8A93A6] italic">
                        "{m.sampleAnswer}"
                      </div>
                    </details>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {finished && (
              <div className="mt-4 bg-[#121A2E] border border-[#4C6FFF]/40 rounded-2xl p-6">
                <h3 className="font-display font-semibold text-[#F5F7FA] mb-3">Session Summary</h3>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <div className="font-data font-semibold text-xl text-[#F5F7FA]">{answerCount}/{QUESTIONS.length}</div>
                    <div className="text-xs text-[#8A93A6]">Questions answered</div>
                  </div>
                  <div>
                    <div className="font-data font-semibold text-xl text-[#F5F7FA]">{avgWords}</div>
                    <div className="text-xs text-[#8A93A6]">Avg. words/answer</div>
                  </div>
                </div>
                <button
                  onClick={start}
                  className="flex items-center gap-2 mt-3 text-sm text-[#4C6FFF] hover:text-[#3D5AE0]"
                >
                  <RotateCcw className="w-4 h-4" /> Practice again
                </button>
              </div>
            )}

            {!finished && (
              <div className="flex gap-2 mt-4">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your answer..."
                  disabled={sending}
                  className="flex-1 bg-[#121A2E] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF] transition disabled:opacity-60"
                />
                <button
                  onClick={handleSend}
                  disabled={sending}
                  className="bg-[#4C6FFF] hover:bg-[#3D5AE0] disabled:opacity-60 text-white p-3 rounded-lg transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MockInterview;