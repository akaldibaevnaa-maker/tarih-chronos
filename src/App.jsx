import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Map, 
  Clock, 
  Users, 
  ShieldAlert, 
  ArrowRight, 
  UserCircle, 
  Camera, 
  Landmark,
  Award,
  Sparkles,
  X
} from 'lucide-react';
import Timeline from './components/Timeline';
import GisMap from './components/GisMap';
import DetectiveQuest from './components/DetectiveQuest';
import Gallery from './components/Gallery';
import PhotoGallery from './components/PhotoGallery';
import KyzylordaCapital from './components/KyzylordaCapital';
import QuotesTicker from './components/QuotesTicker';
import db from './history_database.json';

function App() {
  const [activeTab, setActiveTab] = useState('kyzylorda');
  const [userRole, setUserRole] = useState('student');
  const [userData, setUserData] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [studentForm, setStudentForm] = useState({ name: '', grade: '11', letter: 'А' });
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    const savedData = localStorage.getItem('userData');
    if (savedRole && savedData) {
      setUserRole(savedRole);
      setUserData(JSON.parse(savedData));
    }
  }, []);

  const handleStudentLogin = (e) => {
    e.preventDefault();
    if (studentForm.name.trim().length < 3) {
      setAuthError('Аты-жөніңізді толық жазыңыз.');
      return;
    }
    const data = { ...studentForm, fullName: `${studentForm.grade} "${studentForm.letter}" - ${studentForm.name}` };
    localStorage.setItem('userRole', 'student');
    localStorage.setItem('userData', JSON.stringify(data));
    setUserRole('student');
    setUserData(data);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    setUserRole('student');
    setUserData(null);
  };

  const tabs = [
    { id: 'kyzylorda', label: '1928 ж. Инженерлер ісі (Басты бет)', icon: <Landmark className="w-5 h-5" /> },
    { id: 'timeline', label: 'Уақыт таспасы', icon: <Clock className="w-5 h-5" /> },
    { id: 'map', label: 'Тарихи карта', icon: <Map className="w-5 h-5" /> },
    { id: 'detective', label: 'Тапсырмалар орталығы', icon: <ShieldAlert className="w-5 h-5" /> },
    { id: 'gallery', label: 'Тұлғалар', icon: <Users className="w-5 h-5" /> },
    { id: 'photogallery', label: 'Фотогалерея', icon: <Camera className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F2] flex flex-col font-sans text-gray-900 selection:bg-amber-200">
      {/* Top Header - Bright, Elegant, Kazakh Golden Identity */}
      <header className="bg-white/95 backdrop-blur-md text-gray-900 py-3 px-4 md:px-8 shadow-xs border-b-2 border-amber-300 flex flex-col md:flex-row justify-between items-center gap-4 relative z-20">
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveTab('kyzylorda')}>
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white rounded-2xl flex items-center justify-center font-bold text-xl font-serif shadow-md border-2 border-amber-200 flex-shrink-0">
            1928
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-serif font-black tracking-tight text-amber-950 flex items-center gap-2">
              «1928 жылғы Қызылордадағы инженерлер ісі»
            </h1>
            <p className="text-xs text-amber-900 font-semibold flex flex-wrap items-center gap-2 mt-0.5">
              <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-amber-300">
                Ғылыми-зерттеу жобасы
              </span>
              <span className="text-gray-600">Қоғамдық-гуманитарлық • «Өлкетану» • 11-сынып</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Research Authorship Attribution */}
          <div className="text-right border-l-2 border-amber-300 pl-4 hidden md:block">
            <div className="flex items-center justify-end gap-1.5 text-xs">
              <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[11px] border border-amber-300">
                Орындаушы:
              </span>
              <span className="font-bold text-gray-900">
                Мертебе Әмина Ғалымжанқызы
              </span>
              <span className="text-xs text-gray-500 font-medium">(11-сынып)</span>
            </div>
            <div className="text-[11px] text-gray-600 mt-0.5 flex items-center justify-end gap-2">
              <span><strong>Жоба жетекшісі:</strong> Мырхиев Ә. М.</span>
              <span className="text-amber-400">•</span>
              <span><strong>Ғыл. жетекші:</strong> т.ғ.к., доцент Тайман С. Т.</span>
            </div>
          </div>
          
          {/* User Profile / Login status */}
          {userData ? (
            <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl shadow-2xs">
              <UserCircle className="w-5 h-5 text-amber-700" />
              <div className="text-xs">
                <p className="font-bold text-gray-900">{userData.name}</p>
                <p className="text-[10px] text-gray-500">{userData.grade} "{userData.letter}" сынып</p>
              </div>
              <button 
                onClick={handleLogout} 
                className="ml-1 text-[11px] bg-red-100 text-red-700 hover:bg-red-200 px-2 py-0.5 rounded transition-colors font-medium"
              >
                Шығу
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-1.5 text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-xl transition-colors font-semibold"
            >
              <UserCircle className="w-4 h-4 text-amber-700" />
              <span>Оқушы профилі</span>
            </button>
          )}
        </div>
      </header>

      {/* Navigation Bar - Bright and Fresh */}
      <nav className="bg-white border-b border-amber-200/80 px-4 md:px-8 py-2.5 shadow-2xs overflow-x-auto sticky top-0 z-10 backdrop-blur-md">
        <ul className="flex space-x-3 md:space-x-4 min-w-max">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 text-white font-bold shadow-sm scale-102 border border-amber-500'
                    : 'text-gray-700 hover:bg-amber-50 hover:text-amber-900 font-medium'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Moving Words Aphorisms Ticker */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-3">
        <QuotesTicker />
      </div>

      {/* Student Profile Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border-2 border-amber-300 relative animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-6 md:p-8">
              <div className="mb-6 text-center">
                <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-amber-200">
                  <UserCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Оқушы профилі</h2>
                <p className="text-xs text-gray-600 mt-1">
                  Тапсырмалар мен квесттер нәтижесін сақтау үшін аты-жөніңізді енгізіңіз.
                </p>
              </div>
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Толық аты-жөніңіз</label>
                  <input 
                    type="text" 
                    required 
                    value={studentForm.name} 
                    onChange={e => setStudentForm({...studentForm, name: e.target.value})} 
                    className="w-full border-gray-300 rounded-xl p-2.5 border focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm" 
                    placeholder="Мысалы: Асан Үсенов" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Сыныбы</label>
                    <select 
                      value={studentForm.grade} 
                      onChange={e => setStudentForm({...studentForm, grade: e.target.value})} 
                      className="w-full border-gray-300 rounded-xl p-2.5 border outline-none text-sm bg-white"
                    >
                      {[5,6,7,8,9,10,11].map(n => <option key={n} value={n}>{n} сынып</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Литера</label>
                    <select 
                      value={studentForm.letter} 
                      onChange={e => setStudentForm({...studentForm, letter: e.target.value})} 
                      className="w-full border-gray-300 rounded-xl p-2.5 border outline-none text-sm bg-white"
                    >
                      {['А','Ә','Б','В','Г'].map(l => <option key={l} value={l}>"{l}"</option>)}
                    </select>
                  </div>
                </div>
                {authError && <p className="text-red-500 text-xs font-medium">{authError}</p>}
                <div className="flex gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowAuthModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Жабу
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl transition-colors shadow-md text-sm"
                  >
                    Сақтау
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area - Clean, Bright, Beautiful */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl border-2 border-amber-200/70 p-4 md:p-8 min-h-[70vh] relative">
          <div className="ornament-divider absolute top-0 left-8 right-8"></div>
          
          {activeTab === 'kyzylorda' && <KyzylordaCapital />}
          {activeTab === 'timeline' && <Timeline data={db.timeline_events} />}
          {activeTab === 'map' && <GisMap locations={db.gis_locations} />}
          {activeTab === 'detective' && <DetectiveQuest cases={db.detective_cases} userData={userData} />}
          {activeTab === 'gallery' && <Gallery personalities={db.personalities} />}
          {activeTab === 'photogallery' && <PhotoGallery galleryData={db.photo_gallery} />}
        </div>
      </main>

      {/* Footer - Updated with Project Title, Authors, and Supervisor */}
      <footer className="bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-white text-center py-6 px-4 text-xs mt-auto border-t-2 border-amber-400/60 shadow-inner">
        <div className="max-w-4xl mx-auto space-y-2">
          <h3 className="font-serif font-bold text-base text-amber-300 tracking-wide">
            «1928 жылғы Қызылордадағы инженерлер ісі»
          </h3>
          <p className="text-amber-100/90 text-xs font-medium">
            Бағыты: Қоғамдық-гуманитарлық • Секциясы: «Өлкетану» • Пәні: Қазақстан тарихы
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-1 text-white/95 text-xs pt-2 border-t border-white/10 font-medium">
            <span><strong>Орындаушысы:</strong> Мертебе Әмина Ғалымжанқызы (11-сынып)</span>
            <span className="text-amber-400">•</span>
            <span><strong>Жоба жетекшісі:</strong> Мырхиев Әбдікамал Мұқамбетқалиұлы</span>
            <span className="text-amber-400">•</span>
            <span><strong>Ғылыми жетекшісі:</strong> Тайман С. Т. (т.ғ.к., доцент, Қорқыт ата атындағы ҚУ)</span>
          </div>
          <p className="text-white/40 text-[11px] pt-1">
            © 2026 Барлық құқықтар қорғалған. Ғылыми-зерттеу жобасының цифрлық оқу-әдістемелік кешені.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
