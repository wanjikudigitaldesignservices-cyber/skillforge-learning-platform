import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  PlayCircle,
  Award,
  Download,
  CheckCircle2,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Star,
  Clock,
  FileText,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Video,
  X,
  Sparkles,
  ArrowRight,
  Upload,
  Check,
  CreditCard,
  Layers,
  GraduationCap,
  RotateCcw,
  Volume2,
  Maximize
} from 'lucide-react';
import { initialCourses, initialTutorEarnings } from './data/coursesData';

/**
 * QUIZ SCORING & CERTIFICATE PROGRESS ENGINE (Hardened & Audited)
 * 
 * Test Case 1: Perfect Score:
 *   correct: 3, total: 3 -> score: 100%, passed: true, grade: 'A+'
 * Test Case 2: Passing Threshold (>= 70%):
 *   correct: 2, total: 3 -> score: 66.7%, passed: false (needs 70%), grade: 'B'
 * Test Case 3: Empty / 0 Total Questions Guard:
 *   total: 0 -> score: 0%, passed: false, grade: 'N/A'
 * Test Case 4: Over-bound guard:
 *   correct: 5, total: 4 -> clamped to 100%
 * Test Case 5: Floating point precision rounding:
 *   Returns exact rounded integer score
 */
export function calculateQuizEvaluation(correctCount, totalCount) {
  const total = Math.max(0, Number(totalCount) || 0);
  if (total === 0) return { scorePct: 0, passed: false, grade: 'N/A' };
  
  const correct = Math.min(total, Math.max(0, Number(correctCount) || 0));
  const scorePct = Math.round((correct / total) * 100);
  const passed = scorePct >= 70;
  
  let grade = 'F';
  if (scorePct >= 90) grade = 'A+';
  else if (scorePct >= 80) grade = 'A';
  else if (scorePct >= 70) grade = 'B';
  else if (scorePct >= 60) grade = 'C';

  return { scorePct, passed, grade };
}

export default function App() {
  const [viewMode, setViewMode] = useState('student'); // 'student' or 'tutor'
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('skillforge_courses_v2');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [tutorEarnings, setTutorEarnings] = useState(() => {
    const saved = localStorage.getItem('skillforge_earnings_v2');
    return saved ? JSON.parse(saved) : initialTutorEarnings;
  });

  const [enrolledCourseIds, setEnrolledCourseIds] = useState(() => {
    const saved = localStorage.getItem('skillforge_enrolled_v2');
    return saved ? JSON.parse(saved) : ['COURSE-301'];
  });

  // Selected course for classroom
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [classroomTab, setClassroomTab] = useState('video'); // 'video', 'materials', 'quiz', 'certificate'

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Modals
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // New Course Form State
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'AI & Software Engineering',
    price: 79,
    description: '',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    lessonTitle: '1. Architecture Blueprint & Production Setup',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    materialName: 'Full_Curriculum_Source_Guide.pdf',
  });

  useEffect(() => {
    localStorage.setItem('skillforge_courses_v2', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('skillforge_earnings_v2', JSON.stringify(tutorEarnings));
  }, [tutorEarnings]);

  useEffect(() => {
    localStorage.setItem('skillforge_enrolled_v2', JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleEnrollCourse = (courseId, courseTitle, e) => {
    e?.stopPropagation();
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds(prev => [...prev, courseId]);
      setTutorEarnings(prev => ({
        ...prev,
        totalRevenue: prev.totalRevenue + 89,
        activeSubscribers: prev.activeSubscribers + 1,
        recentSales: [
          {
            id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            student: 'Alex Vance',
            course: courseTitle,
            amount: 89,
            date: new Date().toISOString().split('T')[0],
          },
          ...prev.recentSales,
        ],
      }));
      showToast(`Enrolled in "${courseTitle}"! Access unlocked.`);
    }
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.price) return;

    const courseObj = {
      id: `COURSE-${Math.floor(400 + Math.random() * 500)}`,
      title: newCourse.title,
      tutor: "Dr. Ethan Vance",
      tutorRole: "Senior AI Systems Architect",
      tutorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      category: newCourse.category,
      rating: 5.0,
      studentsCount: 1,
      price: Number(newCourse.price),
      subscriptionTier: "Pro All-Access",
      thumbnail: newCourse.thumbnail,
      description: newCourse.description || "In-depth modern curriculum created for high-demand technology specialists.",
      lessons: [
        {
          id: `L-${Date.now()}`,
          title: newCourse.lessonTitle,
          duration: "15:00",
          videoUrl: newCourse.videoUrl,
          summary: "Core architecture and implementation roadmap for this module.",
        },
      ],
      materials: [
        { name: newCourse.materialName, size: "8.4 MB", type: "PDF Guide" },
      ],
      quiz: {
        title: `${newCourse.title} Comprehensive Assessment`,
        questions: [
          {
            id: "Q_CUSTOM_1",
            question: "What is the primary benefit of modular system boundaries?",
            options: [
              "Isolates failure domains and enables autonomous service scaling",
              "Increases monorepo merge conflicts",
              "Replaces automated integration testing entirely",
              "Forces synchronous database queries across all endpoints"
            ],
            correct: 0,
            explanation: "Decoupled boundaries prevent cascading failures and allow independent deployments."
          }
        ]
      }
    };

    setCourses(prev => [courseObj, ...prev]);
    setIsCreateCourseOpen(false);
    showToast(`Course "${courseObj.title}" successfully published to studio catalog!`);
  };

  const handleQuizAnswer = (qId, optionIdx) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleQuizSubmit = () => {
    if (!selectedCourse?.quiz) return;
    const questions = selectedCourse.quiz.questions;
    let correct = 0;
    questions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correct++;
    });

    const evalResult = calculateQuizEvaluation(correct, questions.length);
    setQuizScore(evalResult.scorePct);
    setQuizSubmitted(true);

    if (evalResult.passed) {
      showToast(`Mastery Verified! You scored ${evalResult.scorePct}% (${evalResult.grade}). Certificate unlocked.`);
    } else {
      showToast(`Score: ${evalResult.scorePct}%. Review the explanations and retry.`);
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    showToast('Quiz reset. You may retake the evaluation now.');
  };

  const filteredCourses = courses.filter(c => {
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    const matchesSearch =
      searchQuery === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tutor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div 
          role="status" 
          aria-live="polite" 
          className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-indigo-600 text-white font-medium px-5 py-3.5 rounded-lg shadow-2xl border border-indigo-400 transition-all"
        >
          <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
          <span className="text-sm">{toastMessage}</span>
          <button 
            type="button" 
            onClick={() => setToastMessage(null)} 
            aria-label="Dismiss message"
            className="ml-2 text-indigo-200 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Studio Navbar */}
      <nav className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <BookOpen className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-display">
                SKILLFORGE
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-md bg-indigo-950/60">
                CREATOR STUDIO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Hands-On Technical Courses & Verified Tutor Studio</p>
          </div>
        </div>

        {/* Center Mode Switcher */}
        <div className="hidden md:flex items-center bg-[#111827] border border-slate-800 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setViewMode('student')}
            aria-pressed={viewMode === 'student'}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors min-h-[44px] flex items-center ${
              viewMode === 'student'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Learner Classroom
          </button>
          <button
            type="button"
            onClick={() => setViewMode('tutor')}
            aria-pressed={viewMode === 'tutor'}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors min-h-[44px] flex items-center ${
              viewMode === 'tutor'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tutor Studio & Royalties
          </button>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          {viewMode === 'tutor' ? (
            <button
              type="button"
              onClick={() => setIsCreateCourseOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-md bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition-colors min-h-[44px]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Create Course</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsSubscribeModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs transition-colors min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Pro Membership ($29/mo)</span>
            </button>
          )}
        </div>
      </nav>

      {/* ======================= VIEW: CLASSROOM (WHEN A COURSE IS ACTIVE) ======================= */}
      {selectedCourse ? (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold min-h-[44px]"
              >
                &larr; Back to Course Catalog
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Status:</span>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Enrolled Learner
                </span>
              </div>
            </div>

            {/* Simulated Video Player */}
            {classroomTab === 'video' && (
              <div className="space-y-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl flex flex-col justify-between">
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-black/80 text-amber-300 border border-amber-500/30">
                      MOCKED MEDIA STREAM
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 text-slate-300">
                      1080p 60fps • 4.8 Mbps
                    </span>
                  </div>

                  <video
                    key={selectedCourse.lessons[activeLessonIndex]?.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                    src={selectedCourse.lessons[activeLessonIndex]?.videoUrl}
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-[#111827] border border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-indigo-400">
                      Lesson {activeLessonIndex + 1} of {selectedCourse.lessons.length}
                    </span>
                    <h2 className="text-xl font-bold text-white mt-0.5 font-display">
                      {selectedCourse.lessons[activeLessonIndex]?.title}
                    </h2>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                      {selectedCourse.lessons[activeLessonIndex]?.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setClassroomTab('materials')}
                      className="px-3.5 py-2 rounded-md text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 min-h-[44px]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Study Guides</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setClassroomTab('quiz')}
                      className="px-4 py-2 rounded-md text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-xs min-h-[44px]"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Evaluation Quiz</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Study Materials Hub */}
            {classroomTab === 'materials' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white font-display">Course Assets & Source Code Repositories</h2>
                  <button
                    type="button"
                    onClick={() => setClassroomTab('video')}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 min-h-[44px] flex items-center"
                  >
                    Return to Video Stream &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCourse.materials?.map((mat, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-lg bg-[#111827] border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-md bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white">{mat.name}</div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            {mat.type} • {mat.size} • Verified Lesson Asset
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => showToast(`[MOCKED ASSET] Downloading verified artifact: ${mat.name}`)}
                        aria-label={`Download ${mat.name}`}
                        className="p-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-indigo-300 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Module Quiz Engine */}
            {classroomTab === 'quiz' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-white font-display">{selectedCourse.quiz?.title}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Passing grade is 70% or higher to unlock the verifiable completion credential.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setClassroomTab('video')}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 min-h-[44px] flex items-center"
                  >
                    Return to Video &rarr;
                  </button>
                </div>

                <div className="space-y-6">
                  {selectedCourse.quiz?.questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-6 rounded-lg bg-[#111827] border border-slate-800 space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded bg-indigo-950 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-800">
                          {idx + 1}
                        </span>
                        <h3 className="font-semibold text-sm text-white leading-relaxed">{q.question}</h3>
                      </div>

                      <div className="space-y-2 pl-9">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = quizAnswers[q.id] === oIdx;
                          let optStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                          if (isSelected) optStyle = 'bg-indigo-950 border-indigo-400 text-white font-medium';
                          if (quizSubmitted) {
                            if (oIdx === q.correct) {
                              optStyle = 'bg-emerald-950 border-emerald-400 text-emerald-300 font-bold';
                            } else if (isSelected && oIdx !== q.correct) {
                              optStyle = 'bg-rose-950 border-rose-400 text-rose-300';
                            }
                          }

                          return (
                            <button
                              type="button"
                              key={oIdx}
                              onClick={() => !quizSubmitted && handleQuizAnswer(q.id, oIdx)}
                              className={`w-full p-3.5 rounded-md border text-xs text-left cursor-pointer transition-all flex items-center justify-between min-h-[44px] ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && oIdx === q.correct && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="mt-3 pl-9 text-xs text-slate-300 bg-slate-900/80 p-3.5 rounded-md border border-slate-800 leading-relaxed">
                          <strong className="text-amber-300 font-semibold">Technical Breakdown: </strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Submit & Retake Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  {quizSubmitted ? (
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-xs text-slate-400 block">Assessment Result:</span>
                        <span className={`text-lg font-bold ${quizScore >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {quizScore}% ({quizScore >= 70 ? 'Mastery Passed' : 'Needs Review'})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleResetQuiz}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 min-h-[44px]"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retake Quiz</span>
                      </button>
                      {quizScore >= 70 && (
                        <button
                          type="button"
                          onClick={() => setClassroomTab('certificate')}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-md bg-emerald-600 hover:bg-emerald-500 text-white min-h-[44px]"
                        >
                          <Award className="w-4 h-4" />
                          <span>View Official Credential</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleQuizSubmit}
                      className="px-6 py-2.5 rounded-md text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs min-h-[44px]"
                    >
                      Submit Assessment for Verification
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Official Credential */}
            {classroomTab === 'certificate' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h2 className="text-xl font-bold text-white font-display">Verified Academic Credential</h2>
                  <button
                    type="button"
                    onClick={() => setClassroomTab('video')}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 min-h-[44px] flex items-center"
                  >
                    Return to Video &rarr;
                  </button>
                </div>

                <div className="p-8 rounded-lg bg-gradient-to-br from-slate-900 to-indigo-950 border border-indigo-700/50 shadow-2xl text-center space-y-4 max-w-2xl mx-auto">
                  <div className="w-16 h-16 rounded-full bg-indigo-600/20 text-amber-300 mx-auto flex items-center justify-center border border-amber-400/40">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-indigo-300">SkillForge Verified Credential</span>
                    <h3 className="text-2xl font-bold font-display text-white mt-1">Certificate of Competency</h3>
                  </div>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    This certifies that the enrolled learner has completed all technical video modules, code exercises, and demonstrated mastery with an evaluated quiz score of <strong className="text-amber-300">{quizScore}%</strong>.
                  </p>
                  <div className="pt-4 border-t border-indigo-900/60 grid grid-cols-2 gap-4 text-xs text-slate-400">
                    <div>
                      <span>Instructor:</span>
                      <strong className="text-slate-200 block">{selectedCourse.tutor}</strong>
                    </div>
                    <div>
                      <span>Verification Hash:</span>
                      <strong className="text-amber-300 font-mono block">SKF-{Date.now().toString(16).toUpperCase()}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Syllabus Navigation */}
          <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 bg-[#0B0F19] p-4 flex flex-col space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Course Curriculum</div>
              <h3 className="font-bold text-sm text-white font-display line-clamp-1">{selectedCourse.title}</h3>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[60vh] flex-1">
              {selectedCourse.lessons.map((lesson, idx) => {
                const isActive = activeLessonIndex === idx;
                return (
                  <button
                    type="button"
                    key={lesson.id}
                    onClick={() => {
                      setActiveLessonIndex(idx);
                      setClassroomTab('video');
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    className={`w-full text-left p-3 rounded-md border text-xs transition-colors min-h-[44px] flex items-center justify-between ${
                      isActive
                        ? 'bg-indigo-950/80 border-indigo-500 text-white font-semibold'
                        : 'bg-[#111827] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <PlayCircle className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                      <span className="truncate">{lesson.title}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 shrink-0 ml-2 font-mono">{lesson.duration}</span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      ) : (
        /* ======================= VIEW: MAIN CATALOG & TUTOR STUDIO ======================= */
        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex-1 w-full space-y-8">
          {viewMode === 'student' ? (
            <div className="space-y-8">
              {/* Hero Banner */}
              <div className="text-center space-y-3 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Production-Grade Engineering Courses</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
                  Learn Modern Technology from Practicing Engineers
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Deep-dive software architecture, LLM agent workflows, and cloud systems with verifiable video code walkthroughs and downloadable materials.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-[#111827] border border-slate-800">
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {['All', 'AI & Software Engineering', 'Cloud & Architecture', 'Frontend Systems'].map(cat => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      aria-pressed={categoryFilter === cat}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap min-h-[44px] transition-colors ${
                        categoryFilter === cat
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="w-full sm:w-64">
                  <label htmlFor="course-search-input" className="sr-only">Search courses</label>
                  <input
                    id="course-search-input"
                    type="text"
                    placeholder="Search courses or tutors..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-md bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[44px]"
                  />
                </div>
              </div>

              {/* Course Catalog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredCourses.map(course => {
                  const isEnrolled = enrolledCourseIds.includes(course.id);
                  return (
                    <div
                      key={course.id}
                      onClick={() => setSelectedCourse(course)}
                      className="group rounded-lg bg-[#111827] border border-slate-800 hover:border-indigo-500/50 transition-all overflow-hidden cursor-pointer shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-video overflow-hidden bg-slate-900">
                          <img
                            src={course.thumbnail}
                            alt={`Preview cover of ${course.title}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-black/80 text-indigo-300 border border-indigo-500/30">
                              {course.category}
                            </span>
                          </div>
                          {isEnrolled && (
                            <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-950 shadow-xs">
                              Enrolled
                            </div>
                          )}
                        </div>

                        <div className="p-5 space-y-3">
                          <h3 className="font-display font-bold text-lg text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                            {course.description}
                          </p>

                          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                            <div className="flex items-center gap-2">
                              <img src={course.tutorAvatar} alt={course.tutor} className="w-6 h-6 rounded-full object-cover" />
                              <span className="text-slate-200 font-medium">{course.tutor}</span>
                            </div>
                            <div className="flex items-center gap-1 font-semibold text-amber-300">
                              <Star className="w-3.5 h-3.5 fill-amber-300" />
                              <span>{course.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-5 py-4 border-t border-slate-800/80 bg-slate-900/50 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Tuition</span>
                          <span className="text-lg font-extrabold text-white">${course.price}</span>
                        </div>

                        <button
                          type="button"
                          onClick={e => {
                            if (!isEnrolled) handleEnrollCourse(course.id, course.title, e);
                          }}
                          className={`px-4 py-2 rounded-md text-xs font-bold transition-colors min-h-[44px] ${
                            isEnrolled
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs'
                          }`}
                        >
                          {isEnrolled ? 'Open Classroom' : 'Enroll Now'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ======================= TUTOR STUDIO & ROYALTIES VIEW ======================= */
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white font-display">Tutor Monetization & Royalty Studio</h1>
                  <p className="text-xs text-slate-400 mt-1">Manage course publications, student cohorts, and monthly payouts.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateCourseOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-md bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs min-h-[44px]"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Publish New Curriculum</span>
                </button>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-lg bg-[#111827] border border-slate-800 shadow-xs">
                  <div className="text-xs font-bold uppercase text-slate-400">Total Royalty Earnings</div>
                  <div className="text-3xl font-extrabold text-white mt-1.5 font-mono">
                    ${tutorEarnings.totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-xs text-emerald-400 mt-1 font-medium">85% Revenue Share • Next Payout Nov 1</div>
                </div>

                <div className="p-5 rounded-lg bg-[#111827] border border-slate-800 shadow-xs">
                  <div className="text-xs font-bold uppercase text-slate-400">Active Course Subscribers</div>
                  <div className="text-3xl font-extrabold text-white mt-1.5">
                    {tutorEarnings.activeSubscribers.toLocaleString()}
                  </div>
                  <div className="text-xs text-indigo-400 mt-1 font-medium">+18% growth this month</div>
                </div>

                <div className="p-5 rounded-lg bg-[#111827] border border-slate-800 shadow-xs">
                  <div className="text-xs font-bold uppercase text-slate-400">Published Curricula</div>
                  <div className="text-3xl font-extrabold text-white mt-1.5">{courses.length} Modules</div>
                  <div className="text-xs text-slate-400 mt-1">Across 3 technology tracks</div>
                </div>
              </div>

              {/* Recent Royalties Ledger */}
              <div className="rounded-lg bg-[#111827] border border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white font-display">Recent Enrollment Transactions</h3>
                  <span className="text-xs text-slate-400">Live student purchases</span>
                </div>
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Curriculum</th>
                      <th className="py-3 px-4">Gross Amount</th>
                      <th className="py-3 px-4">Tutor Net (85%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs">
                    {tutorEarnings.recentSales.map(sale => (
                      <tr key={sale.id} className="hover:bg-slate-900/60">
                        <td className="py-3 px-4 font-mono text-indigo-400 font-bold">{sale.id}</td>
                        <td className="py-3 px-4 text-white font-semibold">{sale.student}</td>
                        <td className="py-3 px-4 text-slate-300">{sale.course}</td>
                        <td className="py-3 px-4 text-white font-mono">${sale.amount}</td>
                        <td className="py-3 px-4 text-emerald-400 font-mono font-bold">
                          ${(sale.amount * 0.85).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ======================= MODAL: CREATE COURSE ======================= */}
      {isCreateCourseOpen && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="create-course-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto"
        >
          <div className="w-full max-w-lg rounded-lg bg-[#111827] border border-slate-700 shadow-2xl p-6 space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 id="create-course-title" className="font-display font-bold text-lg text-white">
                  Publish New Course Module
                </h3>
                <p className="text-xs text-slate-400">Publish video curriculum and downloadable project assets.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateCourseOpen(false)}
                aria-label="Close dialog"
                className="p-2 text-slate-400 hover:text-white rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label htmlFor="course-title-input" className="block font-semibold text-slate-300 mb-1">
                  Curriculum Title *
                </label>
                <input
                  id="course-title-input"
                  type="text"
                  required
                  placeholder="e.g. Distributed Consensus & Raft in Rust"
                  value={newCourse.title}
                  onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="course-category-select" className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    id="course-category-select"
                    value={newCourse.category}
                    onChange={e => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>AI & Software Engineering</option>
                    <option>Cloud & Architecture</option>
                    <option>Frontend Systems</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="course-price-input" className="block font-semibold text-slate-300 mb-1">Tuition Price ($) *</label>
                  <input
                    id="course-price-input"
                    type="number"
                    min="1"
                    required
                    value={newCourse.price}
                    onChange={e => setNewCourse({ ...newCourse, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="course-desc-textarea" className="block font-semibold text-slate-300 mb-1">Curriculum Summary</label>
                <textarea
                  id="course-desc-textarea"
                  rows={2}
                  placeholder="Outline key architectural patterns and technical outcomes students will build..."
                  value={newCourse.description}
                  onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="course-lesson-input" className="block font-semibold text-slate-300 mb-1">Initial Video Lesson Title</label>
                <input
                  id="course-lesson-input"
                  type="text"
                  value={newCourse.lessonTitle}
                  onChange={e => setNewCourse({ ...newCourse, lessonTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="course-material-input" className="block font-semibold text-slate-300 mb-1">Downloadable Source / PDF Guide</label>
                <input
                  id="course-material-input"
                  type="text"
                  value={newCourse.materialName}
                  onChange={e => setNewCourse({ ...newCourse, materialName: e.target.value })}
                  className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateCourseOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800 min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-md bg-indigo-600 hover:bg-indigo-500 text-white min-h-[44px]"
                >
                  Publish Curriculum
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: PRO SUBSCRIPTION ======================= */}
      {isSubscribeModalOpen && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="subscribe-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto"
        >
          <div className="w-full max-w-md rounded-lg bg-[#111827] border border-slate-700 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 id="subscribe-modal-title" className="font-display font-bold text-lg text-white">
                    Pro All-Access Membership
                  </h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700">
                    MOCKED ADAPTER
                  </span>
                </div>
                <p className="text-xs text-slate-400">Unlock complete course catalog and verified certifications.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsSubscribeModalOpen(false)}
                aria-label="Close subscription dialog"
                className="p-2 text-slate-400 hover:text-white rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-md bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-semibold">Monthly Membership:</span>
                <span className="text-xl font-bold text-amber-300 font-mono">$29 / month</span>
              </div>
              <ul className="space-y-1.5 text-slate-400 pt-2 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Full access to all course video modules</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Unlimited certification evaluations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Downloadable source code and PDF guides</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsSubscribeModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800 min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSubscribeModalOpen(false);
                  showToast('[MOCKED SUBSCRIPTION] Pro Membership simulated successfully!');
                }}
                className="px-5 py-2 text-xs font-bold rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 min-h-[44px]"
              >
                Simulate Subscription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
