# FirstStepAI

**FirstStepAI** is an AI-powered career development platform that helps students and job seekers prepare for their careers in one place — resume analysis, cover letter generation, mock interview practice, and job application tracking.

🔗 **Live site:** [first-step-ai-mu.vercel.app](https://first-step-ai-mu.vercel.app)

## Features

- 📄 **Resume Analyzer** — Upload a resume (PDF/DOCX) and get a real, AI-generated ATS score, strengths, and improvement suggestions. Optionally paste a job description to get a match score for a specific role.
- ✉️ **Cover Letter Generator** — Auto-fills from an uploaded resume or manual entry, and generates a tailored cover letter draft. Download as PDF or Word.
- 🎤 **Mock Interview** — Practice common interview questions with AI-generated, answer-specific feedback and example responses.
- 💼 **Job Tracker** — Track applications (company, role, status) with real-time sync via Firestore.
- 📊 **Dashboard** — A live overview of your activity, resume score, and application progress.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router
- **Auth & Database:** Firebase Authentication, Firestore
- **AI:** Google Gemini API, via serverless functions
- **Hosting:** Vercel (frontend + serverless API routes)
- **File parsing:** pdfjs-dist, mammoth (PDF/DOCX text extraction)
- **Document generation:** jsPDF, docx

## How it works

The frontend is a React SPA hosted on Vercel. AI features (resume analysis, cover letter, interview feedback) call serverless functions in `/api`, which securely hold the Gemini API key server-side and forward requests to Google's Gemini API. User data (job applications, activity history, resume scores) is stored in Firestore, scoped per-user via Firebase Auth and enforced with Firestore security rules.

## Getting started locally

```bash
npm install
npm run dev
```

You'll need a `.env` file with your own Firebase config, and a `GEMINI_API_KEY` environment variable set in Vercel (or locally via `vercel dev`) for AI features to work.

## Author

Built by Farah Ibreez Zameer.