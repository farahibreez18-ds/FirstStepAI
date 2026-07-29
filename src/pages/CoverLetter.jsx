import { useState } from "react";
import Navbar from "../components/Navbar";
import { Copy, Download, Sparkles, Check, Upload, Loader2 } from "lucide-react";
import { parseResumeForCoverLetter } from "../utils/coverLetterParser";
import { useAuth } from "../context/AuthContext";
import { logActivity } from "../utils/activityLog";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";

function CoverLetter() {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    degree: "",
    college: "",
    email: "",
    phone: "",
    cgpa: "",
    role: "",
    company: "",
    skills: "",
    projects: "",
    traits: "",
  });
  const [letter, setLetter] = useState("");
  const [copied, setCopied] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const canGenerate = form.fullName && form.role && form.company;

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setParsing(true);
    setParseError("");
    try {
      const parsed = await parseResumeForCoverLetter(file);
      setForm((prev) => ({ ...prev, ...parsed }));
    } catch (err) {
      setParseError("Couldn't read that file — try filling in the details manually instead.");
    } finally {
      setParsing(false);
    }
  };

  const generateLetter = () => {
    const skillsList = form.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const skillsSentence =
      skillsList.length > 0
        ? `I have experience with ${skillsList.slice(0, -1).join(", ")}${
            skillsList.length > 1 ? `, and ${skillsList[skillsList.length - 1]}` : skillsList[0]
          }.`
        : "";

    const educationLine = [form.degree, form.college && `at ${form.college}`]
      .filter(Boolean)
      .join(" ");
    const cgpaLine = form.cgpa ? ` with a CGPA of ${form.cgpa}` : "";

    const projectsSentence = form.projects
      ? `I have also worked on ${form.projects}.`
      : "";

    const traitsSentence = form.traits
      ? `I am ${form.traits}, and I'm confident that my technical background and willingness to learn will allow me to contribute effectively to your team.`
      : `I am a quick learner and enjoy solving technical problems, and I'm confident that my background and willingness to learn will allow me to contribute effectively to your team.`;

    const header = [
      form.fullName,
      educationLine,
      [form.email, form.phone].filter(Boolean).join(" | "),
    ]
      .filter(Boolean)
      .join("\n");

    const body = `Subject: Application for ${form.role} at ${form.company}

Dear Hiring Manager,

I am ${educationLine ? educationLine + cgpaLine + "." : "a candidate"} I am excited to apply for the ${form.role} position at ${form.company}.

${skillsSentence} ${projectsSentence}

${traitsSentence}

Thank you for considering my application. I look forward to the opportunity to discuss my qualifications.

Sincerely,
${form.fullName}`;

    setLetter(`${header}\n\n${body}`);
    logActivity(currentUser?.uid, `Generated a cover letter for ${form.company || "a role"}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const marginLeft = 20;
    const marginTop = 20;
    const maxWidth = 170;
    const lineHeight = 6;

    doc.setFont("helvetica");
    doc.setFontSize(11);

    const lines = doc.splitTextToSize(letter, maxWidth);
    let y = marginTop;

    lines.forEach((line) => {
      if (y > 280) {
        doc.addPage();
        y = marginTop;
      }
      doc.text(line, marginLeft, y);
      y += lineHeight;
    });

    doc.save(`Cover Letter - ${form.company || "application"}.pdf`);
  };

  const handleDownloadWord = async () => {
    const paragraphs = letter.split("\n").map(
      (line) =>
        new Paragraph({
          children: [new TextRun({ text: line, size: 22 })],
          spacing: { after: 120 },
        })
    );

    const doc = new Document({
      sections: [{ properties: {}, children: paragraphs }],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Cover Letter - ${form.company || "application"}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white relative overflow-hidden">
      <Navbar />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4C6FFF]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <h1 className="font-display font-bold text-3xl text-[#F5F7FA]">Cover Letter Generator</h1>
        <p className="text-[#8A93A6] mt-2">Fill in your details and we'll draft a tailored cover letter.</p>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">

          <div className="space-y-5">

            <div className="border-2 border-dashed border-[#232D42] hover:border-[#4C6FFF] rounded-xl p-5 text-center transition-colors bg-[#121A2E]/50">
              <label className="cursor-pointer flex flex-col items-center gap-2">
                {parsing ? (
                  <Loader2 className="w-5 h-5 text-[#4C6FFF] animate-spin" />
                ) : (
                  <Upload className="w-5 h-5 text-[#4C6FFF]" />
                )}
                <span className="text-sm text-[#F5F7FA] font-medium">
                  {parsing ? "Reading your resume..." : "Or upload your resume to auto-fill these details"}
                </span>
                <span className="text-xs text-[#8A93A6]">PDF or DOCX — you can edit anything after</span>
                <input type="file" accept=".pdf,.docx" className="hidden" onChange={handleResumeUpload} disabled={parsing} />
              </label>
            </div>

            {parseError && (
              <p className="text-xs text-red-400">{parseError}</p>
            )}

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#232D42]"></div>
              <span className="text-xs text-[#8A93A6]">OR FILL IN MANUALLY</span>
              <div className="flex-1 h-px bg-[#232D42]"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm text-[#8A93A6] mb-1.5">Full Name *</label>
                <input
                  name="fullName" value={form.fullName} onChange={handleChange}
                  placeholder="e.g. Aslan Farah"
                  className="w-full bg-[#121A2E] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm text-[#8A93A6] mb-1.5">Degree / Course</label>
                <input
                  name="degree" value={form.degree} onChange={handleChange}
                  placeholder="e.g. B.E. Computer Science"
                  className="w-full bg-[#121A2E] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm text-[#8A93A6] mb-1.5">College / University</label>
                <input
                  name="college" value={form.college} onChange={handleChange}
                  placeholder="e.g. Dayananda Sagar Academy of Technology and Management"
                  className="w-full bg-[#121A2E] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
                />
              </div>

              <div>
                <label className="block text-sm text-[#8A93A6] mb-1.5">Email</label>
                <input
                  name="email" value={form.email} onChange={handleChange}
                  placeholder="you@email.com"
                  className="w-full bg-[#121A2E] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
                />
              </div>

              <div>
                <label className="block text-sm text-[#8A93A6] mb-1.5">Phone</label>
                <input
                  name="phone" value={form.phone} onChange={handleChange}
                  placeholder="+91-XXXXXXXXXX"
                  className="w-full bg-[#121A2E] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
                />
              </div>

              <div>
                <label className="block text-sm text-[#8A93A6] mb-1.5">CGPA (optional)</label>
                <input
                  name="cgpa" value={form.cgpa} onChange={handleChange}
                  placeholder="e.g. 8.93"
                  className="w-full bg-[#121A2E] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
                />
              </div>

              <div>
                <label className="block text-sm text-[#8A93A6] mb-1.5">Role Applying For *</label>
                <input
                  name="role" value={form.role} onChange={handleChange}
                  placeholder="e.g. Robotics Internship"
                  className="w-full bg-[#121A2E] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm text-[#8A93A6] mb-1.5">Company Name *</label>
                <input
                  name="company" value={form.company} onChange={handleChange}
                  placeholder="e.g. Wipro"
                  className="w-full bg-[#121A2E] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#8A93A6] mb-1.5">Skills (comma separated)</label>
              <input
                name="skills" value={form.skills} onChange={handleChange}
                placeholder="e.g. Java, Python, SQL, Machine Learning"
                className="w-full bg-[#121A2E] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
              />
            </div>

            <div>
              <label className="block text-sm text-[#8A93A6] mb-1.5">Projects / Experience</label>
              <textarea
                name="projects" rows={3} value={form.projects} onChange={handleChange}
                placeholder="e.g. an Octopus-Shaped Massager using Arduino servo motors, and a Rice Yield Prediction system using Machine Learning"
                className="w-full bg-[#121A2E] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
              />
            </div>

            <div>
              <label className="block text-sm text-[#8A93A6] mb-1.5">A few words about yourself</label>
              <input
                name="traits" value={form.traits} onChange={handleChange}
                placeholder="e.g. a quick learner who enjoys solving technical problems"
                className="w-full bg-[#121A2E] border border-[#232D42] text-[#F5F7FA] placeholder-[#8A93A6] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4C6FFF]"
              />
            </div>

            <button
              onClick={generateLetter}
              disabled={!canGenerate}
              className="flex items-center gap-2 bg-[#4C6FFF] hover:bg-[#3D5AE0] disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              <Sparkles className="w-4 h-4" /> Generate Cover Letter
            </button>
          </div>

          <div className="bg-[#121A2E] border border-[#232D42] rounded-2xl p-6 relative h-fit">
            {letter ? (
              <>
                <div className="flex gap-2 absolute top-4 right-4">
                  <button onClick={handleCopy} className="text-[#8A93A6] hover:text-[#F5F7FA] p-1.5" title="Copy">
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setShowDownloadMenu((prev) => !prev)}
                      className="text-[#8A93A6] hover:text-[#F5F7FA] p-1.5"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    {showDownloadMenu && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setShowDownloadMenu(false)}
                        ></div>
                        <div className="absolute right-0 top-9 z-20 bg-[#1A2338] border border-[#232D42] rounded-lg shadow-xl overflow-hidden w-36">
                          <button
                            onClick={() => {
                              handleDownloadWord();
                              setShowDownloadMenu(false);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-[#F5F7FA] hover:bg-[#232D42] transition-colors"
                          >
                            Word (.docx)
                          </button>
                          <button
                            onClick={() => {
                              handleDownloadPDF();
                              setShowDownloadMenu(false);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-[#F5F7FA] hover:bg-[#232D42] transition-colors"
                          >
                            PDF (.pdf)
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <pre className="whitespace-pre-wrap text-sm text-[#F5F7FA] font-sans leading-relaxed">{letter}</pre>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Sparkles className="w-8 h-8 text-[#4C6FFF] mb-3 opacity-60" />
                <p className="text-sm text-[#8A93A6]">Fill in your details and click Generate to see your cover letter here.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default CoverLetter;