import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";

export async function logActivity(userId, text) {
  if (!userId) return;
  try {
    await addDoc(collection(db, "activity"), {
      userId,
      text,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Failed to log activity:", err);
  }
}

export async function saveResumeScore(userId, score, verdict) {
  if (!userId) return;
  try {
    await setDoc(doc(db, "resumeScores", userId), {
      score,
      verdict,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Failed to save resume score:", err);
  }
}