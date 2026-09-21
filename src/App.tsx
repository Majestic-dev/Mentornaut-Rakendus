import React, { useState, useMemo } from 'react';

// Types and Interfaces for Mentornaat System

export type Role = 'STUDENT' | 'MENTOR' | 'COORDINATOR' | 'ADMIN';

export interface School {
  id: string;
  name: string;
  city: string;
  contactPerson: string;
  contactEmail: string;
  studentCount: number;
  status: 'ACTIVE' | 'PENDING' | 'REJECTED';
  joinedDate: string;
}

export interface MentorApplication {
  id: string;
  schoolId: string;
  applicantName: string;
  applicantClass: '11. klass' | '12. klass';
  email: string;
  subjects: string[];
  motivation: string;
  maxMentees: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
}

export interface MentorProfile {
  id: string;
  schoolId: string;
  name: string;
  grade: '11. klass' | '12. klass';
  subjects: string[];
  bio: string;
  email: string;
  status: 'VABA' | 'HÕIVATUD';
  maxMentees: number;
  currentMenteesCount: number;
  rating: number;
}

export interface MenteeRequest {
  id: string;
  schoolId: string;
  mentorId: string;
  mentorName: string;
  studentName: string;
  studentClass: string;
  studentEmail: string;
  subject: string;
  note: string;
  status: 'OOTEL' | 'KINNITATUD' | 'TAGASI_LÜKATUD';
  createdAt: string;
}

export interface MeetingSession {
  id: string;
  requestId: string;
  mentorName: string;
  studentName: string;
  subject: string;
  date: string;
  time: string;
  topic: string;
  notes?: string;
}

// Icon Components (Inline SVGs for self-contained execution)

const IconUser = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconGraduation = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const IconSchool = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4" />
  </svg>
);

const IconShield = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const IconCross = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconSearch = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconPlus = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const IconBook = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconCalendar = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconHeart = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const IconClock = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Initial Mock Data for Estonian Schools Mentornaat System

const INITIAL_SCHOOLS: School[] = [
  {
    id: 'sch-1',
    name: 'Tallinna Reaalkool',
    city: 'Tallinn',
    contactPerson: 'Kertu Sepp (Kooli psühholoog)',
    contactEmail: 'kertu.sepp@real.edu.ee',
    studentCount: 950,
    status: 'ACTIVE',
    joinedDate: '2023-09-01',
  },
  {
    id: 'sch-2',
    name: 'Hugo Treffneri Gümnaasium',
    city: 'Tartu',
    contactPerson: 'Aivar Kallas (Huvijuht)',
    contactEmail: 'aivar.kallas@htg.tartu.ee',
    studentCount: 540,
    status: 'ACTIVE',
    joinedDate: '2023-10-15',
  },
  {
    id: 'sch-3',
    name: 'Gustav Adolfi Gümnaasium',
    city: 'Tallinn',
    contactPerson: 'Mari Laan (Õppealajuhataja)',
    contactEmail: 'mari.laan@gag.ee',
    studentCount: 1100,
    status: 'ACTIVE',
    joinedDate: '2024-01-10',
  },
  {
    id: 'sch-4',
    name: 'Pärnu Sütevaka Humanitaargümnaasium',
    city: 'Pärnu',
    contactPerson: 'Tiit Rand (Arendusjuht)',
    contactEmail: 'tiit.rand@sytevaka.ee',
    studentCount: 420,
    status: 'PENDING',
    joinedDate: '2026-02-01',
  },
  {
    id: 'sch-5',
    name: 'Saaremaa Gümnaasium',
    city: 'Kuressaare',
    contactPerson: 'Helena Tamm (Koolipsühholoog)',
    contactEmail: 'helena.tamm@saaremaagymn.ee',
    studentCount: 510,
    status: 'PENDING',
    joinedDate: '2026-03-05',
  },
];

const INITIAL_MENTOR_PROFILES: MentorProfile[] = [
  {
    id: 'm-1',
    schoolId: 'sch-1',
    name: 'Karl-Erik Tamm',
    grade: '12. klass',
    subjects: ['Matemaatika', 'Füüsika'],
    bio: 'Hei! Olen Reaalkooli abiturient. Aitan suurima hea meelega gümnaasiumi alustavatel rebestel matemaatika lahenduskäikudest ja füüsika valemitest aru saada.',
    email: 'karl.tamm@real.edu.ee',
    status: 'VABA',
    maxMentees: 3,
    currentMenteesCount: 1,
    rating: 4.9,
  },
  {
    id: 'm-2',
    schoolId: 'sch-1',
    name: 'Laura Kask',
    grade: '11. klass',
    subjects: ['Eesti keel', 'Ajalugu', 'Inglise keel'],
    bio: 'Mulle meeldib kirjandus ja humanitaarained. Olen alati olemas, et rääkida esseede ülesehitusest või aidata uue koolikeskkonnaga kohaneda.',
    email: 'laura.kask@real.edu.ee',
    status: 'VABA',
    maxMentees: 2,
    currentMenteesCount: 1,
    rating: 5.0,
  },
  {
    id: 'm-3',
    schoolId: 'sch-1',
    name: 'Markus Oja',
    grade: '12. klass',
    subjects: ['Informaatika', 'Keemia'],
    bio: 'Olen programmeerimishuviline. Aitan eKooli/Stuudiumiga harjuda, programmeerimise aluseid mõista ning arvestuste nädalaks valmistuda.',
    email: 'markus.oja@real.edu.ee',
    status: 'HÕIVATUD',
    maxMentees: 2,
    currentMenteesCount: 2,
    rating: 4.8,
  },
  {
    id: 'm-4',
    schoolId: 'sch-2',
    name: 'Eliise Saar',
    grade: '11. klass',
    subjects: ['Bioloogia', 'Keemia', 'Saksa keel'],
    bio: 'Treffneri loodussuuna õpilane. Tean täpselt, kui tihe võib Treffneri graafik olla ja jagan parimaid ajaplaneerimise ning õpinippe!',
    email: 'eliise.saar@htg.tartu.ee',
    status: 'VABA',
    maxMentees: 3,
    currentMenteesCount: 0,
    rating: 4.9,
  },
];

const INITIAL_APPLICATIONS: MentorApplication[] = [
  {
    id: 'app-1',
    schoolId: 'sch-1',
    applicantName: 'Rasmus Puusepp',
    applicantClass: '11. klass',
    email: 'rasmus.puusepp@real.edu.ee',
    subjects: ['Matemaatika', 'Inglise keel'],
    motivation: 'Soovin pakkuda noorematele õpilastele tuge, mida ise 10. klassi tulles vajasin. Olen läbinud juhtimiskoolituse ja aktiivne meeskonnamängija.',
    maxMentees: 2,
    status: 'PENDING',
    submittedAt: '2026-03-18',
  },
  {
    id: 'app-2',
    schoolId: 'sch-1',
    applicantName: 'Sofia Luik',
    applicantClass: '12. klass',
    email: 'sofia.luik@real.edu.ee',
    subjects: ['Prantsuse keel', 'Ajalugu'],
    motivation: 'Aitan hea meelega keelõppe ja uurimistöö planeerimisega. Tahaksin panustada kooli ühtse kogukonna hoidmisesse.',
    maxMentees: 2,
    status: 'PENDING',
    submittedAt: '2026-03-20',
  },
];

const INITIAL_REQUESTS: MenteeRequest[] = [
  {
    id: 'req-1',
    schoolId: 'sch-1',
    mentorId: 'm-1',
    mentorName: 'Karl-Erik Tamm',
    studentName: 'Marten Rebane',
    studentClass: '10.a',
    studentEmail: 'marten.rebane@real.edu.ee',
    subject: 'Matemaatika',
    note: 'Sooviksin tuge laia matemaatika esimese arvestuse ettevalmistamisel ning ajaplaneerimisel.',
    status: 'KINNITATUD',
    createdAt: '2026-03-10',
  },
  {
    id: 'req-2',
    schoolId: 'sch-1',
    mentorId: 'm-2',
    mentorName: 'Laura Kask',
    studentName: 'Kirke Kukk',
    studentClass: '10.c',
    studentEmail: 'kirke.kukk@real.edu.ee',
    subject: 'Eesti keel',
    note: 'Kirjandi struktuur ja arvestusteks valmistumine tekitavad pisut ärevust, sooviks arutleda vanema õpilasega.',
    status: 'OOTEL',
    createdAt: '2026-03-19',
  },
];

const INITIAL_MEETINGS: MeetingSession[] = [
  {
    id: 'meet-1',
    requestId: 'req-1',
    mentorName: 'Karl-Erik Tamm',
    studentName: 'Marten Rebane',
    subject: 'Matemaatika',
    date: '2026-03-25',
    time: '15:30',
    topic: 'Trigonomeetria valemite praktiline harjutamine ja arvestuste nädala õpiplaan',
    notes: 'Koguneme raamatukogu 2. korruse vaikses alal.',
  },
];

export default function App() {
  // Navigation & Role State
  const [currentRole, setCurrentRole] = useState<Role>('STUDENT');
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>('sch-1');

  // Application Dynamic Database State
  const [schools, setSchools] = useState<School[]>(INITIAL_SCHOOLS);
  const [mentors, setMentors] = useState<MentorProfile[]>(INITIAL_MENTOR_PROFILES);
  const [applications, setApplications] = useState<MentorApplication[]>(INITIAL_APPLICATIONS);
  const [requests, setRequests] = useState<MenteeRequest[]>(INITIAL_REQUESTS);
  const [meetings, setMeetings] = useState<MeetingSession[]>(INITIAL_MEETINGS);

  // System Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Active School Object
  const currentSchool = useMemo(() => {
    return schools.find((s) => s.id === selectedSchoolId) || schools[0];
  }, [schools, selectedSchoolId]);

  // Active School Mentors
  const activeSchoolMentors = useMemo(() => {
    return mentors.filter((m) => m.schoolId === selectedSchoolId);
  }, [mentors, selectedSchoolId]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <IconCheck className="w-5 h-5" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Top Global Header with Role & School Switcher */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Brand Logo & Description */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-500 to-sky-400 flex items-center justify-center font-bold text-xl text-white shadow-lg">
                M
              </div>
              <div>
                <h1 className="text-lg font-bold leading-none tracking-tight flex items-center gap-2">
                  Mentornaat <span className="text-xs bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2 py-0.5 rounded-full font-mono">Eesti koolid</span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">Struktureeritud mentorlussüsteem gümnaasiumidele</p>
              </div>
            </div>

            {/* Controls: School Selector & Role Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              {/* School Switcher Dropdown (for Student, Mentor, Coordinator) */}
              {currentRole !== 'ADMIN' && (
                <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs">
                  <IconSchool className="w-4 h-4 text-sky-400" />
                  <span className="text-slate-400 hidden sm:inline">Kool:</span>
                  <select
                    value={selectedSchoolId}
                    onChange={(e) => setSelectedSchoolId(e.target.value)}
                    className="bg-transparent text-white focus:outline-none cursor-pointer font-medium"
                  >
                    {schools
                      .filter((s) => s.status === 'ACTIVE')
                      .map((sch) => (
                        <option key={sch.id} value={sch.id} className="bg-slate-800 text-white">
                          {sch.name} ({sch.city})
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Role Switcher Pills */}
              <div className="bg-slate-800 p-1 rounded-xl flex items-center gap-1 border border-slate-700 text-xs">
                <button
                  onClick={() => setCurrentRole('STUDENT')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    currentRole === 'STUDENT'
                      ? 'bg-sky-500 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <IconUser className="w-3.5 h-3.5" />
                  <span>Õpilane</span>
                </button>

                <button
                  onClick={() => setCurrentRole('MENTOR')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    currentRole === 'MENTOR'
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <IconGraduation className="w-3.5 h-3.5" />
                  <span>Mentor</span>
                </button>

                <button
                  onClick={() => setCurrentRole('COORDINATOR')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    currentRole === 'COORDINATOR'
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <IconShield className="w-3.5 h-3.5" />
                  <span>Koolitöötaja</span>
                </button>

                <button
                  onClick={() => setCurrentRole('ADMIN')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    currentRole === 'ADMIN'
                      ? 'bg-rose-600 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <IconSchool className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Context Header Banner */}
      <div className="bg-slate-800 text-slate-100 border-b border-slate-700 px-4 py-2.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sky-400">Aktiivne vaade:</span>
            {currentRole === 'STUDENT' && <span>Õpilase (Mentiitava) vaade — Otsi ja leia sobiv mentor</span>}
            {currentRole === 'MENTOR' && <span>Mentori vaade — Halda kandideerimist ja mentiitavate soove</span>}
            {currentRole === 'COORDINATOR' && <span>Koolitöötaja (Koordinaatori) vaade — Kinnita mentoreid ja jälgi süsteemi</span>}
            {currentRole === 'ADMIN' && <span>Süsteemi Admini vaade — Halda Eesti koolide liitumistaotlusi</span>}
          </div>
          {currentRole !== 'ADMIN' && (
            <div className="text-slate-400 flex items-center gap-2">
              <span>Valitud kool: <strong className="text-white">{currentSchool?.name}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Main Workspace Dynamic Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentRole === 'STUDENT' && (
          <StudentView
            school={currentSchool}
            mentors={activeSchoolMentors}
            requests={requests}
            setRequests={setRequests}
            showToast={showToast}
          />
        )}

        {currentRole === 'MENTOR' && (
          <MentorView
            school={currentSchool}
            applications={applications}
            setApplications={setApplications}
            mentors={mentors}
            requests={requests}
            setRequests={setRequests}
            meetings={meetings}
            setMeetings={setMeetings}
            showToast={showToast}
          />
        )}

        {currentRole === 'COORDINATOR' && (
          <CoordinatorView
            school={currentSchool}
            applications={applications}
            setApplications={setApplications}
            mentors={mentors}
            setMentors={setMentors}
            requests={requests}
            showToast={showToast}
          />
        )}

        {currentRole === 'ADMIN' && (
          <AdminView
            schools={schools}
            setSchools={setSchools}
            mentors={mentors}
            requests={requests}
            showToast={showToast}
          />
        )}
      </main>

      {/* Footer Info & Program Principles */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Mentornaadi programm (Mentornaat) — Toetame noorte kohanemist ja õpeteed.</p>
          <div className="flex items-center gap-4 text-slate-600 font-medium">
            <span className="flex items-center gap-1">
              <IconBook className="w-3.5 h-3.5 text-sky-500" /> Akadeemiline tugi
            </span>
            <span className="flex items-center gap-1">
              <IconHeart className="w-3.5 h-3.5 text-rose-500" /> Sotsiaal-emotsionaalne tugi
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// 1. ÕPILASE (MENTIITAVA) VAADE
// ==========================================

interface StudentViewProps {
  school: School;
  mentors: MentorProfile[];
  requests: MenteeRequest[];
  setRequests: React.Dispatch<React.SetStateAction<MenteeRequest[]>>;
  showToast: (msg: string) => void;
}

function StudentView({ school, mentors, requests, setRequests, showToast }: StudentViewProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>('Kõik');
  const [selectedGrade, setSelectedGrade] = useState<string>('Kõik');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Request Modal State
  const [requestingMentor, setRequestingMentor] = useState<MentorProfile | null>(null);
  const [studentName, setStudentName] = useState('Mari Maasikas');
  const [studentClass, setStudentClass] = useState('10.a');
  const [studentEmail] = useState('mari.maasikas@kool.ee');
  const [requestedSubject, setRequestedSubject] = useState('');
  const [requestNote, setRequestNote] = useState('');

  // Extract all available subjects
  const allSubjects = useMemo(() => {
    const set = new Set<string>();
    mentors.forEach((m) => m.subjects.forEach((s) => set.add(s)));
    return ['Kõik', ...Array.from(set)];
  }, [mentors]);

  // Filtered Mentors list
  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      const matchSubject =
        selectedSubject === 'Kõik' || m.subjects.includes(selectedSubject);
      const matchGrade = selectedGrade === 'Kõik' || m.grade === selectedGrade;
      const matchQuery =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchSubject && matchGrade && matchQuery;
    });
  }, [mentors, selectedSubject, selectedGrade, searchQuery]);

  // Student's submitted requests
  const myRequests = useMemo(() => {
    return requests.filter((r) => r.schoolId === school.id);
  }, [requests, school.id]);

  const handleOpenModal = (mentor: MentorProfile) => {
    setRequestingMentor(mentor);
    setRequestedSubject(mentor.subjects[0] || 'Üldine tugi');
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestingMentor) return;

    const newReq: MenteeRequest = {
      id: `req-${Date.now()}`,
      schoolId: school.id,
      mentorId: requestingMentor.id,
      mentorName: requestingMentor.name,
      studentName,
      studentClass,
      studentEmail,
      subject: requestedSubject,
      note: requestNote,
      status: 'OOTEL',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setRequests((prev) => [newReq, ...prev]);
    setRequestingMentor(null);
    setRequestNote('');
    showToast(`Mentoripäring saadetud kasutajale ${requestingMentor.name}!`);
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-linear-to-r from-sky-600 to-indigo-700 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="max-w-3xl space-y-3">
          <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-sky-100">
            Tere tulemast koolikogukonda!
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold">
            Otsi endale vanem koolivend või -õde mentoriks
          </h2>
          <p className="text-sky-100 text-sm md:text-base leading-relaxed">
            Koolis kohanemine, eKooli/Stuudiumi mõistmine ja arvestuste nädalateks valmistumine on lihtsam koos kogenud juhendajaga. Vali aine ja leiad endale sobiva mentori.
          </p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 md:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <IconSearch className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Otsi nime, aine või märksõna järgi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
            />
          </div>

          {/* Grade Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Klass:</span>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="Kõik">Kõik klassid</option>
              <option value="11. klass">11. klass</option>
              <option value="12. klass">12. klass</option>
            </select>
          </div>

          {/* Subject Quick Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Õppeaine:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              {allSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Subject Pill Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-medium text-slate-400 self-center mr-1">Kiirfiltrid:</span>
          {allSubjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                selectedSubject === subject
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Mentors Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Saadaolevad mentorid koolis: <span className="text-sky-600 font-extrabold">{school.name}</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Leitud: {filteredMentors.length} mentor(it)
          </span>
        </div>

        {filteredMentors.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            <IconGraduation className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-slate-700">Ühtegi nõuetele vastavat mentorit ei leitud.</p>
            <p className="text-xs mt-1">Proovi muuta otsingufiltreid või vali teine õppeaine.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => {
              const isFull = mentor.currentMenteesCount >= mentor.maxMentees;
              return (
                <div
                  key={mentor.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-5 space-y-4">
                    {/* Mentor Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-sky-500 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md">
                          {mentor.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                            {mentor.name}
                          </h4>
                          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {mentor.grade}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          isFull
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {isFull ? 'Hõivatud' : 'Vaba'}
                      </span>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      "{mentor.bio}"
                    </p>

                    {/* Subjects Tag List */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Õppeained & Valdkonnad:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {mentor.subjects.map((s) => (
                          <span
                            key={s}
                            className="text-xs bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-0.5 rounded-md font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mentor Footer Details & Action Button */}
                  <div className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between text-xs">
                    <div className="text-slate-500">
                      Kohti: <strong className="text-slate-700">{mentor.currentMenteesCount}/{mentor.maxMentees}</strong>
                    </div>

                    <button
                      onClick={() => handleOpenModal(mentor)}
                      disabled={isFull}
                      className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                        isFull
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-sky-600 text-white hover:bg-sky-700 shadow-sm active:scale-95'
                      }`}
                    >
                      <IconPlus className="w-4 h-4" />
                      <span>{isFull ? 'Kohtasid pole' : 'Soovi mentorit'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Student's Sent Requests Tracking Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <IconClock className="w-5 h-5 text-indigo-600" />
          <span>Minu esitatud mentorsoovid ({myRequests.length})</span>
        </h3>

        {myRequests.length === 0 ? (
          <p className="text-xs text-slate-500 italic">Sa ei ole veel ühtegi mentorsoovi teele saatnud.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {myRequests.map((req) => (
              <div key={req.id} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-slate-800">
                    Mentor: {req.mentorName} <span className="font-normal text-slate-500">({req.subject})</span>
                  </p>
                  <p className="text-slate-500 mt-0.5">Teade: "{req.note || 'Soovin tuge õppetöös'}"</p>
                  <span className="text-[10px] text-slate-400">Esitatud: {req.createdAt}</span>
                </div>
                <div>
                  {req.status === 'OOTEL' && (
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-semibold border border-amber-200">
                      Ootel kordinaatori / mentori kinnitust
                    </span>
                  )}
                  {req.status === 'KINNITATUD' && (
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-semibold border border-emerald-200 flex items-center gap-1">
                      <IconCheck className="w-3.5 h-3.5" /> Mentor vastas positiivselt!
                    </span>
                  )}
                  {req.status === 'TAGASI_LÜKATUD' && (
                    <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full font-semibold border border-rose-200">
                      Kahjuks lükati tagasi
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Send Mentor Request Modal */}
      {requestingMentor && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Saada mentorsoov</h3>
                <p className="text-xs text-slate-500">Mentor: {requestingMentor.name} ({requestingMentor.grade})</p>
              </div>
              <button
                onClick={() => setRequestingMentor(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <IconCross className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendRequest} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sinu nimi:</label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Klass / paralleel:</label>
                  <input
                    type="text"
                    required
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Vali õppeaine / teema tuge vajavale alale:</label>
                <select
                  value={requestedSubject}
                  onChange={(e) => setRequestedSubject(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium cursor-pointer"
                >
                  {requestingMentor.subjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Lühike selgitus või teade mentorile:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Kirjelda lühidalt, milles vajad tuge (nt arvestuste ettevalmistus, koolimajas kohanemine, eKool)..."
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRequestingMentor(null)}
                  className="px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-100"
                >
                  Tühista
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg font-semibold bg-sky-600 text-white hover:bg-sky-700 shadow-sm"
                >
                  Saada soov
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. MENTORI VAADE
// ==========================================

interface MentorViewProps {
  school: School;
  applications: MentorApplication[];
  setApplications: React.Dispatch<React.SetStateAction<MentorApplication[]>>;
  mentors: MentorProfile[];
  requests: MenteeRequest[];
  setRequests: React.Dispatch<React.SetStateAction<MenteeRequest[]>>;
  meetings: MeetingSession[];
  setMeetings: React.Dispatch<React.SetStateAction<MeetingSession[]>>;
  showToast: (msg: string) => void;
}

function MentorView({
  school,
  applications,
  setApplications,
  requests,
  setRequests,
  meetings,
  setMeetings,
  showToast,
}: MentorViewProps) {
  // Application form local states
  const [applicantName, setApplicantName] = useState('Rasmus Puusepp');
  const [applicantClass, setApplicantClass] = useState<'11. klass' | '12. klass'>('11. klass');
  const [email, setEmail] = useState('rasmus.puusepp@real.edu.ee');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Matemaatika', 'Inglise keel']);
  const [motivation, setMotivation] = useState(
    'Soovin panustada uute rebasgümnaasiumi õpilaste tugevasse kohanemisse ning jagada oma õpivõtteid.'
  );
  const [maxMentees, setMaxMentees] = useState(2);

  // New Meeting state
  const [newMeetingStudent, setNewMeetingStudent] = useState('');
  const [newMeetingSubject, setNewMeetingSubject] = useState('');
  const [newMeetingDate, setNewMeetingDate] = useState('');
  const [newMeetingTime, setNewMeetingTime] = useState('15:00');
  const [newMeetingTopic, setNewMeetingTopic] = useState('');

  // Check if current mentor application exists
  const myApplication = useMemo(() => {
    return applications.find(
      (app) => app.schoolId === school.id && app.applicantName === applicantName
    );
  }, [applications, school.id, applicantName]);

  // Mentor's incoming requests
  const incomingRequests = useMemo(() => {
    return requests.filter((r) => r.schoolId === school.id);
  }, [requests, school.id]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp: MentorApplication = {
      id: `app-${Date.now()}`,
      schoolId: school.id,
      applicantName,
      applicantClass,
      email,
      subjects: selectedSubjects,
      motivation,
      maxMentees,
      status: 'PENDING',
      submittedAt: new Date().toISOString().split('T')[0],
    };

    setApplications((prev) => [newApp, ...prev]);
    showToast('Mentori kandideerimisavaldus edastatud koolitöötajatele!');
  };

  const handleSubjectToggle = (subj: string) => {
    if (selectedSubjects.includes(subj)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subj));
    } else {
      setSelectedSubjects([...selectedSubjects, subj]);
    }
  };

  const handleAcceptRequest = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'KINNITATUD' as const } : r))
    );
    showToast('Mentiitava soov kinnitatud!');
  };

  const handleRejectRequest = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'TAGASI_LÜKATUD' as const } : r))
    );
    showToast('Mentiitava soov tagasi lükatud.');
  };

  const handleAddMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeetingStudent || !newMeetingTopic) return;

    const newSession: MeetingSession = {
      id: `meet-${Date.now()}`,
      requestId: 'req-active',
      mentorName: applicantName,
      studentName: newMeetingStudent,
      subject: newMeetingSubject || 'Ainealane nõustamine',
      date: newMeetingDate || '2026-03-28',
      time: newMeetingTime,
      topic: newMeetingTopic,
    };

    setMeetings((prev) => [newSession, ...prev]);
    setNewMeetingTopic('');
    showToast('Kohtumine lisatud kalendrisse!');
  };

  return (
    <div className="space-y-8">
      {/* Mentor Portal Intro Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full font-medium">
              Mentori töölaud
            </span>
            <h2 className="text-2xl font-bold mt-2">Tere tulemast, Mentor!</h2>
            <p className="text-slate-400 text-sm mt-1">
              Siin saad kandideerida mentoriks, vaadata nooremate õpilaste soove ja planeerida kohtumisi.
            </p>
          </div>

          {/* Application Status Badge */}
          {myApplication && (
            <div className="bg-slate-800 border border-slate-700 p-3 rounded-xl flex items-center gap-3">
              <div className="text-xs">
                <span className="text-slate-400 block">Kandideerimise olek:</span>
                {myApplication.status === 'PENDING' && (
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <IconClock className="w-4 h-4" /> Ootel koolitöötaja ülevaatamist
                  </span>
                )}
                {myApplication.status === 'APPROVED' && (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <IconCheck className="w-4 h-4" /> Kinnitatud (Oled aktiivne mentor!)
                  </span>
                )}
                {myApplication.status === 'REJECTED' && (
                  <span className="text-rose-400 font-bold flex items-center gap-1">
                    <IconCross className="w-4 h-4" /> Tagasi lükatud
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form to apply or status info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
              <IconGraduation className="w-5 h-5 text-indigo-600" />
              <span>Mentori kandideerimisvorm</span>
            </h3>

            {myApplication ? (
              <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-800">Avaldused saadetud:</p>
                <p>Nimi: <strong>{myApplication.applicantName}</strong></p>
                <p>Klass: <strong>{myApplication.applicantClass}</strong></p>
                <p>Ained: <strong>{myApplication.subjects.join(', ')}</strong></p>
                <p>Maksimaalne mentiitavate arv: <strong>{myApplication.maxMentees}</strong></p>
                <p className="text-slate-500 italic mt-2">
                  Avaldusi saab muuta või uuesti esitada võttes ühendust kooli koordinaatoriga.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ees- ja perekonnanimi:</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Klass:</label>
                  <select
                    value={applicantClass}
                    onChange={(e) => setApplicantClass(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer"
                  >
                    <option value="11. klass">11. klass</option>
                    <option value="12. klass">12. klass</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">E-post:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Vali ained, milles saad nõustada:
                  </label>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Matemaatika', 'Füüsika', 'Keemia', 'Eesti keel', 'Inglise keel', 'Informaatika', 'Ajalugu'].map(
                      (subj) => (
                        <button
                          type="button"
                          key={subj}
                          onClick={() => handleSubjectToggle(subj)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all ${
                            selectedSubjects.includes(subj)
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {subj}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Motivatsioonikiri / Miks soovid mentoriks?</label>
                  <textarea
                    rows={3}
                    required
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Mitu mentiitavat oled valmis võtma (max):
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={maxMentees}
                    onChange={(e) => setMaxMentees(parseInt(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-all"
                >
                  Esita kandideerimisavalduse vorm
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Mentee Requests & Meeting Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {/* Incoming Mentee Requests */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-slate-800 flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="flex items-center gap-2">
                <IconUser className="w-5 h-5 text-sky-600" />
                <span>Laekunud õpilaste (mentiitavate) soovid ({incomingRequests.length})</span>
              </span>
            </h3>

            {incomingRequests.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4 text-center">
                Praegu pole ühtegi mentiitava sooviavaldust laekunud.
              </p>
            ) : (
              <div className="space-y-3">
                {incomingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{req.studentName}</span>
                        <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-semibold text-[11px]">
                          {req.studentClass}
                        </span>
                        <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold text-[11px]">
                          Aine: {req.subject}
                        </span>
                      </div>
                      <p className="text-slate-600">"{req.note}"</p>
                      <p className="text-[10px] text-slate-400">Suunatud mentorile: {req.mentorName} • Kuupäev: {req.createdAt}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center">
                      {req.status === 'OOTEL' ? (
                        <>
                          <button
                            onClick={() => handleAcceptRequest(req.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1 shadow-sm transition-all"
                          >
                            <IconCheck className="w-3.5 h-3.5" /> Kinnita
                          </button>
                          <button
                            onClick={() => handleRejectRequest(req.id)}
                            className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg font-semibold transition-all"
                          >
                            Lükka tagasi
                          </button>
                        </>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full font-bold ${
                            req.status === 'KINNITATUD'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {req.status === 'KINNITATUD' ? 'Kinnitatud' : 'Tagasi lükatud'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Meeting Planner & Log */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
              <IconCalendar className="w-5 h-5 text-emerald-600" />
              <span>Kohtumiste graafik & õpisessioonid</span>
            </h3>

            {/* Quick Add Session Form */}
            <form onSubmit={handleAddMeeting} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
              <span className="font-semibold text-slate-800 block">Planeeri uus mentorluskohtumine:</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Mentiitava nimi..."
                  required
                  value={newMeetingStudent}
                  onChange={(e) => setNewMeetingStudent(e.target.value)}
                  className="p-2 bg-white border border-slate-200 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Õppeaine / Valdkond..."
                  value={newMeetingSubject}
                  onChange={(e) => setNewMeetingSubject(e.target.value)}
                  className="p-2 bg-white border border-slate-200 rounded-lg"
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={newMeetingDate}
                    onChange={(e) => setNewMeetingDate(e.target.value)}
                    className="p-2 bg-white border border-slate-200 rounded-lg w-1/2"
                  />
                  <input
                    type="time"
                    value={newMeetingTime}
                    onChange={(e) => setNewMeetingTime(e.target.value)}
                    className="p-2 bg-white border border-slate-200 rounded-lg w-1/2"
                  />
                </div>
              </div>

              <input
                type="text"
                placeholder="Kohtumise teema (nt Arvestuste nädala õpitehnikad ja raamatukogu kohtumine)..."
                required
                value={newMeetingTopic}
                onChange={(e) => setNewMeetingTopic(e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg"
              />

              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm"
              >
                Lisa kohtumine graafikusse
              </button>
            </form>

            {/* Existing Scheduled Meetings */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700 block">Planeeritud sessioonid:</span>
              {meetings.length === 0 ? (
                <p className="text-xs text-slate-500 italic">Pole ühtegi sessiooni kalendrisse lisatud.</p>
              ) : (
                <div className="space-y-2">
                  {meetings.map((m) => (
                    <div key={m.id} className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">{m.studentName}</span>
                          <span className="text-slate-500 font-medium">• {m.subject}</span>
                        </div>
                        <p className="text-slate-600 mt-0.5">{m.topic}</p>
                        {m.notes && <p className="text-[10px] text-slate-400 mt-0.5">Märkus: {m.notes}</p>}
                      </div>
                      <div className="text-right">
                        <span className="bg-sky-50 text-sky-700 px-2.5 py-1 rounded font-mono font-bold block">
                          {m.date} kell {m.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. KOOLITÖÖTAJA (KOORDINAATORI) VAADE
// ==========================================

interface CoordinatorViewProps {
  school: School;
  applications: MentorApplication[];
  setApplications: React.Dispatch<React.SetStateAction<MentorApplication[]>>;
  mentors: MentorProfile[];
  setMentors: React.Dispatch<React.SetStateAction<MentorProfile[]>>;
  requests: MenteeRequest[];
  showToast: (msg: string) => void;
}

function CoordinatorView({
  school,
  applications,
  setApplications,
  mentors,
  setMentors,
  requests,
  showToast,
}: CoordinatorViewProps) {
  // Pending Applications for this school
  const pendingApplications = useMemo(() => {
    return applications.filter((a) => a.schoolId === school.id && a.status === 'PENDING');
  }, [applications, school.id]);

  // Approved Mentors for this school
  const schoolMentors = useMemo(() => {
    return mentors.filter((m) => m.schoolId === school.id);
  }, [mentors, school.id]);

  // Approved Pairs / Matches in this school
  const activePairs = useMemo(() => {
    return requests.filter((r) => r.schoolId === school.id && r.status === 'KINNITATUD');
  }, [requests, school.id]);

  const handleApproveApplication = (app: MentorApplication) => {
    // 1. Update application status
    setApplications((prev) =>
      prev.map((a) => (a.id === app.id ? { ...a, status: 'APPROVED' as const } : a))
    );

    // 2. Add to active mentors list
    const newMentor: MentorProfile = {
      id: `m-${Date.now()}`,
      schoolId: app.schoolId,
      name: app.applicantName,
      grade: app.applicantClass,
      subjects: app.subjects,
      bio: app.motivation,
      email: app.email,
      status: 'VABA',
      maxMentees: app.maxMentees,
      currentMenteesCount: 0,
      rating: 5.0,
    };

    setMentors((prev) => [...prev, newMentor]);
    showToast(`Mentori avaldus vastu võetud! ${app.applicantName} lisatud süsteemi.`);
  };

  const handleRejectApplication = (appId: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'REJECTED' as const } : a))
    );
    showToast('Avaldustoimik lükatud tagasi.');
  };

  return (
    <div className="space-y-8">
      {/* Coordinator Header & Summary Stats */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-medium">
              Kooli koordinaatori vaade
            </span>
            <h2 className="text-2xl font-bold mt-2">{school.name} mentorlussüsteem</h2>
            <p className="text-slate-400 text-sm mt-1">
              Koordinaator: {school.contactPerson} • Kontakt: {school.contactEmail}
            </p>
          </div>
        </div>

        {/* Dashboard Quick Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-xs block">Ootel avalduse vorme</span>
            <span className="text-2xl font-extrabold text-amber-400">{pendingApplications.length}</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-xs block">Aktiivseid mentoreid</span>
            <span className="text-2xl font-extrabold text-emerald-400">{schoolMentors.length}</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-xs block">Aktiivseid paare (matches)</span>
            <span className="text-2xl font-extrabold text-sky-400">{activePairs.length}</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-xs block">Õpilasi koolis kokku</span>
            <span className="text-2xl font-extrabold text-purple-400">{school.studentCount}</span>
          </div>
        </div>
      </div>

      {/* Review Pending Mentor Applications Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-md font-bold text-slate-800 flex items-center gap-2">
            <IconShield className="w-5 h-5 text-emerald-600" />
            <span>Laekunud mentorite kandideerimisavaldused (Forms)</span>
          </h3>
          <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">
            Ootel: {pendingApplications.length}
          </span>
        </div>

        {pendingApplications.length === 0 ? (
          <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs">
            Uusi ootel kandideerimisavaldusi praegu pole.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingApplications.map((app) => (
              <div
                key={app.id}
                className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3 text-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{app.applicantName}</h4>
                      <span className="text-slate-500">{app.applicantClass} • {app.email}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{app.submittedAt}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700 block">Pakutavad ained:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {app.subjects.map((s) => (
                        <span key={s} className="bg-white border border-slate-300 text-slate-700 px-2 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700 block">Motivatsioon:</span>
                    <p className="text-slate-600 bg-white p-2.5 rounded border border-slate-200 leading-relaxed italic">
                      "{app.motivation}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-200">
                  <button
                    onClick={() => handleApproveApplication(app)}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1"
                  >
                    <IconCheck className="w-4 h-4" /> Kinnita mentoriks
                  </button>
                  <button
                    onClick={() => handleRejectApplication(app.id)}
                    className="py-2 px-3 bg-rose-100 hover:bg-rose-200 text-rose-700 font-semibold rounded-lg"
                  >
                    Lükka tagasi
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Mentors List & Active Mentee Matches Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Mentors */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-slate-800 flex items-center justify-between border-b border-slate-100 pb-3">
            <span>Aktiivsed mentorid koolis ({schoolMentors.length})</span>
          </h3>

          <div className="space-y-3 text-xs">
            {schoolMentors.map((m) => (
              <div key={m.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{m.name} ({m.grade})</p>
                  <p className="text-slate-500">{m.subjects.join(', ')}</p>
                  <p className="text-[10px] text-slate-400">E-post: {m.email}</p>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                    Kohti: {m.currentMenteesCount}/{m.maxMentees}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Mentee Matches */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-slate-800 flex items-center justify-between border-b border-slate-100 pb-3">
            <span>Kinnitatud mentorlussuhted ({activePairs.length})</span>
          </h3>

          <div className="space-y-3 text-xs">
            {activePairs.length === 0 ? (
              <p className="text-slate-500 italic">Aktiivseid paare veel tekitatud pole.</p>
            ) : (
              activePairs.map((pair) => (
                <div key={pair.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>Mentiitav: {pair.studentName} ({pair.studentClass})</span>
                    <span className="text-emerald-600 font-normal">Aine: {pair.subject}</span>
                  </div>
                  <p className="text-slate-600">Mentor: {pair.mentorName}</p>
                  <p className="text-[10px] text-slate-400">Märkus: "{pair.note}"</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. RAKENDUSE ADMINI (SUPER ADMIN) VAADE
// ==========================================

interface AdminViewProps {
  schools: School[];
  setSchools: React.Dispatch<React.SetStateAction<School[]>>;
  mentors: MentorProfile[];
  requests: MenteeRequest[];
  showToast: (msg: string) => void;
}

function AdminView({ schools, setSchools, mentors, requests, showToast }: AdminViewProps) {
  // New School Form States
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newSchoolCity, setNewSchoolCity] = useState('');
  const [newSchoolContact, setNewSchoolContact] = useState('');
  const [newSchoolEmail, setNewSchoolEmail] = useState('');
  const [newSchoolStudents, setNewSchoolStudents] = useState(500);

  const pendingSchools = useMemo(() => {
    return schools.filter((s) => s.status === 'PENDING');
  }, [schools]);

  const activeSchools = useMemo(() => {
    return schools.filter((s) => s.status === 'ACTIVE');
  }, [schools]);

  const handleApproveSchool = (schoolId: string) => {
    setSchools((prev) =>
      prev.map((s) => (s.id === schoolId ? { ...s, status: 'ACTIVE' as const } : s))
    );
    showToast('Kool kinnitatud ja lisatud Mentornaadi võrgustikku!');
  };

  const handleRejectSchool = (schoolId: string) => {
    setSchools((prev) =>
      prev.map((s) => (s.id === schoolId ? { ...s, status: 'REJECTED' as const } : s))
    );
    showToast('Kooli taotlus lükatud tagasi.');
  };

  const handleAddSchoolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchoolName || !newSchoolCity) return;

    const newSchool: School = {
      id: `sch-${Date.now()}`,
      name: newSchoolName,
      city: newSchoolCity,
      contactPerson: newSchoolContact || 'Huvijuht / Psühholoog',
      contactEmail: newSchoolEmail || 'info@kool.ee',
      studentCount: newSchoolStudents,
      status: 'ACTIVE',
      joinedDate: new Date().toISOString().split('T')[0],
    };

    setSchools((prev) => [...prev, newSchool]);
    setNewSchoolName('');
    setNewSchoolCity('');
    setNewSchoolContact('');
    setNewSchoolEmail('');
    showToast(`Uus kool ${newSchool.name} edukalt süsteemi lisatud!`);
  };

  return (
    <div className="space-y-8">
      {/* Admin Dashboard Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full font-medium">
              Üle-eestiline Administraator
            </span>
            <h2 className="text-2xl font-bold mt-2">Mentornaat Eesti koolides</h2>
            <p className="text-slate-400 text-sm mt-1">
              Hallake võrgustiku koole, vaadake liitumistaotlusi ning jälgige süsteemi statistikat.
            </p>
          </div>
        </div>

        {/* National Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-xs block">Liitunud koole kokku</span>
            <span className="text-2xl font-extrabold text-sky-400">{activeSchools.length}</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-xs block">Ootel koolide taotlusi</span>
            <span className="text-2xl font-extrabold text-amber-400">{pendingSchools.length}</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-xs block">Kokku registreeritud mentoreid</span>
            <span className="text-2xl font-extrabold text-emerald-400">{mentors.length}</span>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span className="text-slate-400 text-xs block">Kokku mentee taotlusi</span>
            <span className="text-2xl font-extrabold text-purple-400">{requests.length}</span>
          </div>
        </div>
      </div>

      {/* Grid Layout: Pending Schools Applications & Add New School Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending School Applications */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-md font-bold text-slate-800 flex items-center gap-2">
              <IconSchool className="w-5 h-5 text-indigo-600" />
              <span>Koolide liitumistaotlused ({pendingSchools.length})</span>
            </h3>
          </div>

          {pendingSchools.length === 0 ? (
            <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs">
              Uusi liitumistaotlusi koolidelt ei ole praegu ootel.
            </div>
          ) : (
            <div className="space-y-4">
              {pendingSchools.map((sch) => (
                <div
                  key={sch.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{sch.name}</h4>
                      <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-semibold text-[11px]">
                        {sch.city}
                      </span>
                    </div>
                    <p className="text-slate-600">Kontaktisik: {sch.contactPerson} ({sch.contactEmail})</p>
                    <p className="text-[10px] text-slate-400">Õpilaste arv: {sch.studentCount} • Soov esitatud: {sch.joinedDate}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => handleApproveSchool(sch.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1 shadow-sm"
                    >
                      <IconCheck className="w-4 h-4" /> Kinnita kool
                    </button>
                    <button
                      onClick={() => handleRejectSchool(sch.id)}
                      className="px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg font-semibold"
                    >
                      Lükka tagasi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form to Manually Add a New School */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-md font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
            <IconPlus className="w-5 h-5 text-rose-600" />
            <span>Lisa uus kool süsteemi</span>
          </h3>

          <form onSubmit={handleAddSchoolSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Kooli täisnimi:</label>
              <input
                type="text"
                required
                placeholder="nt Pärnu Koidula Gümnaasium"
                value={newSchoolName}
                onChange={(e) => setNewSchoolName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Linn / Asukoht:</label>
              <input
                type="text"
                required
                placeholder="nt Pärnu"
                value={newSchoolCity}
                onChange={(e) => setNewSchoolCity(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Kooli koordinaatori nimi:</label>
              <input
                type="text"
                placeholder="nt Helena Tamm (Psühholoog)"
                value={newSchoolContact}
                onChange={(e) => setNewSchoolContact(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Kontakt e-post:</label>
              <input
                type="email"
                placeholder="nt info@kool.ee"
                value={newSchoolEmail}
                onChange={(e) => setNewSchoolEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Õpilaste koguarv:</label>
              <input
                type="number"
                value={newSchoolStudents}
                onChange={(e) => setNewSchoolStudents(parseInt(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-sm"
            >
              Aktiviseeri kool süsteemis
            </button>
          </form>
        </div>
      </div>

      {/* Registered Schools Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-md font-bold text-slate-800 border-b border-slate-100 pb-3">
          Süsteemis aktiivsed Eesti koolid ({activeSchools.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <th className="p-3 font-semibold">Kooli Nimi</th>
                <th className="p-3 font-semibold">Linn</th>
                <th className="p-3 font-semibold">Kontaktisik</th>
                <th className="p-3 font-semibold">Õpilaste arv</th>
                <th className="p-3 font-semibold">Aktiivseid mentoreid</th>
                <th className="p-3 font-semibold">Olek</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeSchools.map((sch) => {
                const countMentors = mentors.filter((m) => m.schoolId === sch.id).length;
                return (
                  <tr key={sch.id} className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-slate-900">{sch.name}</td>
                    <td className="p-3 text-slate-600">{sch.city}</td>
                    <td className="p-3 text-slate-600">{sch.contactPerson}</td>
                    <td className="p-3 text-slate-600">{sch.studentCount}</td>
                    <td className="p-3 font-bold text-indigo-600">{countMentors}</td>
                    <td className="p-3">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                        Aktiivne
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}