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
  GraduationCap
} from 'lucide-react';
import { initialCourses, initialTutorEarnings } from './data/coursesData';

export default function App() {
  const [viewMode, setViewMode] = useState('student'); // 'student' or 'tutor'
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('skillforge_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [tutorEarnings, setTutorEarnings] = useState(() => {
    const saved = localStorage.getItem('skillforge_earnings');
    return saved ? JSON.parse(saved) : initialTutorEarnings;
  });

  const [enrolledCourseIds, setEnrolledCourseIds] = useState(() => {
    const saved = localStorage.getItem('skillforge_enrolled');
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
    lessonTitle: '1. Course Orientation & Environment Setup',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    materialName: 'Full_Curriculum_Source_Guide.pdf',
  });

  useEffect(() => {
    localStorage.setItem('skillforge_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('skillforge_earnings', JSON.stringify(tutorEarnings));
  }, [tutorEarnings]);

  useEffect(() => {
    localStorage.setItem('skillforge_enrolled', JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEnrollCourse = (courseId, courseTitle, e) => {
    e?.stopPropagation();
    if (!enrolledCourseIds.includes(courseId)) {
      setEnrolledCourseIds(prev => [...prev, courseId]);
      // Update tutor earnings
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
      showToast(`Enrolled in "${courseTitle}"! Access granted.`);
    }
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.price) return;

    const courseObj = {
      id: `COURSE-${Math.floor(400 + Math.random() * 500)}`,
      title: newCourse.title,
      tutor: "Dr. Ethan Mwangi",
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
            question: "What is the foundational prerequisite before deploying high-throughput production services?",
            options: [
              "Automated testing, metrics telemetry, and fault-tolerance error handling",
              "Skipping CI/CD pipelines to release faster",
              "Hardcoding environment secrets directly into repository files",
              "Disabling container logging"
            ],
            correct: 0,
            explanation: "Production resilience demands rigorous validation, automated testing, and comprehensive observability telemetry."
          }
        ]
      }
    };

    setCourses(prev => [courseObj, ...prev]);
    setIsCreateCourseOpen(false);
    showToast(`Course "${courseObj.title}" published to marketplace!`);
  };

  const handleQuizAnswer = (qId, optionIdx) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleQuizSubmit = (quiz) => {
    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) {
        correctCount += 1;
      }
    });
    const calculated = Math.round((correctCount / quiz.questions.length) * 100);
    setQuizScore(calculated);
    setQuizSubmitted(true);
    if (calculated >= 70) {
      showToast(`Congratulations! You passed with ${calculated}% and earned your Certificate!`);
    } else {
      showToast(`Score: ${calculated}%. You can review the explanations and try again.`);
    }
  };

  const filteredCourses = courses.filter(c => {
    const matchesCat = categoryFilter === 'All' || c.category === categoryFilter;
    const matchesQuery =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tutor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-cyan-500 text-slate-950 font-bold px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md border border-cyan-400 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
            <BookOpen className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent font-display">
                SKILLFORGE
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full bg-cyan-500/10">
                LMS & Studio
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Creator-Led Video & Quizzes Learning Cloud</p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => {
              setViewMode('student');
              setSelectedCourse(null);
            }}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'student'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Student Portal
          </button>
          <button
            onClick={() => {
              setViewMode('tutor');
              setSelectedCourse(null);
            }}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'tutor'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tutor Studio & Payouts
          </button>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          {viewMode === 'tutor' ? (
            <button
              onClick={() => setIsCreateCourseOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Upload New Course</span>
            </button>
          ) : (
            <button
              onClick={() => setIsSubscribeModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Pro Subscription ($29/mo)</span>
            </button>
          )}
        </div>
      </nav>

      {/* ======================= VIEW: CLASSROOM (WHEN A COURSE IS ACTIVE) ======================= */}
      {selectedCourse ? (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                &larr; Back to Catalog
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Enrolled Status:</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Active Student
                </span>
              </div>
            </div>

            {/* Video Lesson Player */}
            {classroomTab === 'video' && (
              <div className="space-y-4">
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
                  <video
                    key={selectedCourse.lessons[activeLessonIndex]?.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                    src={selectedCourse.lessons[activeLessonIndex]?.videoUrl}
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-cyan-400">
                      Lesson {activeLessonIndex + 1} of {selectedCourse.lessons.length}
                    </span>
                    <h2 className="text-xl font-bold text-white mt-0.5">
                      {selectedCourse.lessons[activeLessonIndex]?.title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl">
                      {selectedCourse.lessons[activeLessonIndex]?.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setClassroomTab('materials')}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Study Materials</span>
                    </button>
                    <button
                      onClick={() => setClassroomTab('quiz')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Take Module Quiz</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Study Materials Hub */}
            {classroomTab === 'materials' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Downloadable Study Materials & Source Code</h2>
                  <button
                    onClick={() => setClassroomTab('video')}
                    className="text-xs font-semibold text-cyan-400"
                  >
                    Return to Video Lesson &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCourse.materials?.map((mat, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-white">{mat.name}</div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            {mat.type} • {mat.size} • Verified Tutor Asset
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => showToast(`Initiated download: ${mat.name}`)}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Module Quiz */}
            {classroomTab === 'quiz' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedCourse.quiz?.title}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Score at least 70% to earn your Official Verified Course Certificate.
                    </p>
                  </div>
                  <button
                    onClick={() => setClassroomTab('video')}
                    className="text-xs font-semibold text-cyan-400"
                  >
                    Return to Video &rarr;
                  </button>
                </div>

                <div className="space-y-6">
                  {selectedCourse.quiz?.questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <h3 className="font-semibold text-sm text-white leading-relaxed">{q.question}</h3>
                      </div>

                      <div className="space-y-2 pl-9">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = quizAnswers[q.id] === oIdx;
                          let optStyle =
                            'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                          if (isSelected) optStyle = 'bg-cyan-500/20 border-cyan-400 text-white font-medium';
                          if (quizSubmitted) {
                            if (oIdx === q.correct) {
                              optStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold';
                            } else if (isSelected && oIdx !== q.correct) {
                              optStyle = 'bg-rose-500/20 border-rose-400 text-rose-300';
                            }
                          }

                          return (
                            <div
                              key={oIdx}
                              onClick={() => !quizSubmitted && handleQuizAnswer(q.id, oIdx)}
                              className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && oIdx === q.correct && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="mt-3 pl-9 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                          <strong className="text-cyan-400">Explanation: </strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-4">
                    {quizSubmitted ? (
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-white">
                          Final Result: <strong className="text-cyan-400">{quizScore}%</strong>
                        </span>
                        {quizScore >= 70 && (
                          <button
                            onClick={() => setClassroomTab('certificate')}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                          >
                            <Award className="w-4 h-4" />
                            <span>Claim Verified Certificate</span>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setQuizSubmitted(false);
                            setQuizAnswers({});
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
                        >
                          Retry Assessment
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleQuizSubmit(selectedCourse.quiz)}
                        className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 ml-auto"
                      >
                        Submit Assessment for Grading
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Official Certificate of Completion */}
            {classroomTab === 'certificate' && (
              <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-cyan-500/40 shadow-2xl text-center space-y-6 max-w-2xl mx-auto">
                <div className="inline-flex p-4 rounded-3xl bg-cyan-500/20 text-cyan-400">
                  <Award className="w-12 h-12" />
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest font-extrabold text-cyan-400">
                    CERTIFICATE OF PROFESSIONAL MASTERY
                  </div>
                  <h3 className="text-3xl font-extrabold text-white mt-1 font-display">
                    SKILLFORGE ACADEMY
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">This document certifies that</p>
                  <h4 className="text-2xl font-bold text-cyan-300 mt-2 font-serif underline decoration-cyan-500/50">
                    Alex Vance Chemutai
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
                    has successfully completed all rigorous laboratory exercises, video lectures, and achieved an honors grade on the final certification exam for:
                  </p>
                  <div className="text-base font-extrabold text-white mt-2">
                    {selectedCourse.title}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div>
                    <span className="block text-slate-200 font-bold">{selectedCourse.tutor}</span>
                    <span className="text-[10px]">Lead Instructor</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-cyan-400 block">ID: CERT-SF-{Date.now().toString().slice(-6)}</span>
                    <span className="text-[10px]">Cryptographically Signed</span>
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / Print High-Res PDF Certificate</span>
                </button>
              </div>
            )}
          </div>

          {/* Curriculum Sidebar */}
          <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/50 p-5 space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400">Course Syllabus</h3>

            <div className="space-y-2">
              {selectedCourse.lessons.map((lesson, idx) => {
                const isActive = activeLessonIndex === idx;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      setActiveLessonIndex(idx);
                      setClassroomTab('video');
                    }}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isActive
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold truncate pr-2">{lesson.title}</span>
                      <span className="text-[10px] text-cyan-400 font-mono">{lesson.duration}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{lesson.summary}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => setClassroomTab('materials')}
                className="w-full py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Resources ({selectedCourse.materials?.length || 0})</span>
              </button>
              <button
                onClick={() => setClassroomTab('quiz')}
                className="w-full py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Certification Assessment</span>
              </button>
            </div>
          </aside>
        </div>
      ) : viewMode === 'tutor' ? (
        /* ======================= VIEW: TUTOR STUDIO & EARNINGS ======================= */
        <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Tutor Studio & Monetization Hub
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Manage curriculum, publish new courses, track subscription MRR, and request payouts.
              </p>
            </div>
            <button
              onClick={() => setIsCreateCourseOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Create New Course</span>
            </button>
          </div>

          {/* Revenue Telemetry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <div className="text-xs text-slate-400 uppercase font-medium">All-Time Revenue</div>
              <div className="text-3xl font-extrabold text-white mt-1">
                ${tutorEarnings.totalRevenue.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+24.5% month-on-month</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <div className="text-xs text-slate-400 uppercase font-medium">Monthly Recurring (MRR)</div>
              <div className="text-3xl font-extrabold text-cyan-400 mt-1">
                ${tutorEarnings.monthlyRecurring.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">Subscription share</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <div className="text-xs text-slate-400 uppercase font-medium">Active Paid Students</div>
              <div className="text-3xl font-extrabold text-white mt-1">
                {tutorEarnings.activeSubscribers.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-400 mt-1">Across all published courses</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <div className="text-xs text-slate-400 uppercase font-medium">Payout Status</div>
              <div className="text-lg font-bold text-emerald-400 mt-1">
                {tutorEarnings.payoutStatus}
              </div>
              <button
                onClick={() => showToast('Payout request of $4,200 initiated to your bank account.')}
                className="mt-2 text-[11px] font-bold text-cyan-400 hover:underline"
              >
                Withdraw Funds &rarr;
              </button>
            </div>
          </div>

          {/* Manage Courses Table */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">Your Published Courses</h3>
              <span className="text-xs text-slate-400">{courses.length} Active Courses</span>
            </div>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 font-semibold uppercase text-[10px]">
                  <th className="p-4">Course Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price / Access</th>
                  <th className="p-4">Students</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {courses.map(course => (
                  <tr key={course.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white">{course.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{course.id}</div>
                    </td>
                    <td className="p-4 text-slate-300">{course.category}</td>
                    <td className="p-4 font-bold text-cyan-400">${course.price} / Lifetime</td>
                    <td className="p-4 font-semibold text-slate-200">{course.studentsCount}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{course.rating}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          setActiveLessonIndex(0);
                        }}
                        className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 font-semibold text-[11px]"
                      >
                        Launch Classroom
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      ) : (
        /* ======================= VIEW: STUDENT COURSE CATALOG ======================= */
        <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full space-y-8">
          {/* Hero Banner */}
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 relative overflow-hidden shadow-2xl">
            <div className="max-w-2xl space-y-3 relative z-10">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                Continuous Professional Education
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
                Accelerate Your Tech Career With World-Class Curricula
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                Learn directly from elite practitioners. Get unrestricted access to project videos, code repositories, assessments, and verified credentials.
              </p>
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 overflow-x-auto">
              {['All', 'AI & Software Engineering', 'Web Development', 'DevOps & Cloud'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                    categoryFilter === cat
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Search courses or tutors..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="px-3.5 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-64"
            />
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => {
              const isEnrolled = enrolledCourseIds.includes(course.id);
              return (
                <div
                  key={course.id}
                  onClick={() => {
                    setSelectedCourse(course);
                    setActiveLessonIndex(0);
                    setClassroomTab('video');
                  }}
                  className="rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden cursor-pointer shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-video overflow-hidden bg-slate-800">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                          {course.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-amber-400 text-xs font-bold bg-slate-950/80 px-2 py-0.5 rounded-md">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{course.rating}</span>
                        <span className="text-slate-400 font-normal">({course.studentsCount} students)</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>

                      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                        <img
                          src={course.tutorAvatar}
                          alt={course.tutor}
                          className="w-7 h-7 rounded-full object-cover border border-cyan-500/40"
                        />
                        <div className="text-[11px]">
                          <div className="font-semibold text-white">{course.tutor}</div>
                          <div className="text-slate-500">{course.tutorRole}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">Tuition Fee</span>
                      <span className="text-base font-extrabold font-mono text-cyan-400">${course.price}</span>
                    </div>

                    {isEnrolled ? (
                      <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Enrolled</span>
                      </span>
                    ) : (
                      <button
                        onClick={e => handleEnrollCourse(course.id, course.title, e)}
                        className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* ======================= MODAL: CREATE COURSE ======================= */}
      {isCreateCourseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setIsCreateCourseOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400">
                <Upload className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display">Tutor Course Studio</h3>
                <p className="text-xs text-slate-400">Upload lessons, attach materials, and monetize your expertise</p>
              </div>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Course Title</label>
                <input
                  type="text"
                  placeholder="e.g. Advanced Rust & WebAssembly Microservices"
                  value={newCourse.title}
                  onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Domain Category</label>
                  <select
                    value={newCourse.category}
                    onChange={e => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="AI & Software Engineering">AI & Software Engineering</option>
                    <option value="Web Development">Web Development</option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Price in USD ($)</label>
                  <input
                    type="number"
                    value={newCourse.price}
                    onChange={e => setNewCourse({ ...newCourse, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">First Lesson Title</label>
                <input
                  type="text"
                  value={newCourse.lessonTitle}
                  onChange={e => setNewCourse({ ...newCourse, lessonTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Lesson Video URL (MP4 / WebM)</label>
                <input
                  type="url"
                  value={newCourse.videoUrl}
                  onChange={e => setNewCourse({ ...newCourse, videoUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Curriculum Overview / Summary</label>
                <textarea
                  rows={3}
                  placeholder="Outline key learning outcomes..."
                  value={newCourse.description}
                  onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateCourseOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20"
                >
                  Publish Course to Marketplace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= MODAL: SUBSCRIPTION ======================= */}
      {isSubscribeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-center space-y-4">
            <button
              onClick={() => setIsSubscribeModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex p-3 rounded-2xl bg-cyan-500/20 text-cyan-400">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-white font-display">SkillForge All-Access Pass</h3>
            <p className="text-xs text-slate-400">
              Unlimited access to every video course, downloadable blueprints, quizzes, and instant certificates.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Access all 50+ specialized engineering tracks</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Download full source code & cheatsheets</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Verified credentials for LinkedIn & resume</span>
              </div>
            </div>

            <div className="text-3xl font-extrabold text-white font-mono">
              $29 <span className="text-xs text-slate-400 font-normal">/ month</span>
            </div>

            <button
              onClick={() => {
                setIsSubscribeModalOpen(false);
                showToast('Welcome to SkillForge Pro! You now have unrestricted access.');
              }}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25"
            >
              Activate Pro Membership
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
