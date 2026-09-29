import React, { useState, useEffect } from 'react';
import { BookOpen, Map, Clock, LayoutDashboard, Search, Users, ShieldAlert, ArrowRight, UserCircle, Key, Camera } from 'lucide-react';
import Timeline from './components/Timeline';
import GisMap from './components/GisMap';
import DetectiveQuest from './components/DetectiveQuest';
import TeacherDashboard from './components/TeacherDashboard';
import Gallery from './components/Gallery';
import PhotoGallery from './components/PhotoGallery';
import db from './history_database.json';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState(null); // 'student' or 'teacher'
  const [userData, setUserData] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(true);

  const [studentForm, setStudentForm] = useState({ name: '', grade: '5', letter: 'А' });
  const [teacherPin, setTeacherPin] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    const savedData = localStorage.getItem('userData');
    if (savedRole && savedData) {
      setUserRole(savedRole);
      setUserData(JSON.parse(savedData));
      setShowAuthModal(false);
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

  const handleTeacherLogin = (e) => {
    e.preventDefault();
    if (teacherPin === '7890') {
      const data = { name: 'Әбдікамал ағай', role: 'teacher' };
      localStorage.setItem('userRole', 'teacher');
      localStorage.setItem('userData', JSON.stringify(data));
      setUserRole('teacher');
      setUserData(data);
      setShowAuthModal(false);
    } else {
      setAuthError('ПИН-код қате!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    setUserRole(null);
    setUserData(null);
    setShowAuthModal(true);
    setActiveTab('home');
  };

  const tabs = [
    { id: 'home', label: 'Басты бет', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'timeline', label: 'Уақыт таспасы', icon: <Clock className="w-5 h-5" /> },
    { id: 'map', label: 'Тарихи карта', icon: <Map className="w-5 h-5" /> },
    { id: 'detective', label: 'Тапсырмалар орталығы', icon: <ShieldAlert className="w-5 h-5" /> },
    { id: 'gallery', label: 'Тұлғалар', icon: <Users className="w-5 h-5" /> },
    { id: 'photogallery', label: 'Фотогалерея', icon: <Camera className="w-5 h-5" /> },
  ];

  if (userRole === 'teacher') {
    tabs.push({ id: 'teacher', label: 'Мұғалім кабинеті', icon: <LayoutDashboard className="w-5 h-5" /> });
  }

  return (
    <div className="min-h-screen bg-parchment flex flex-col font-sans">
      {/* Header */}
      <header className="bg-indigo text-ivory py-4 px-6 shadow-md border-b-4 border-golden flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-golden rounded-full flex items-center justify-center text-indigo font-bold text-2xl font-serif">
            TC
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold tracking-wide">TarihChronos</h1>
            <p className="text-xs text-ivory/80">Интерактивті тарих платформасы</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-center md:text-right border-x border-white/20 px-4 hidden md:block">
            <p className="text-sm font-semibold text-golden">Авторы: Мырхиев Әбдікамал Мұқамбетқалиұлы</p>
            <p className="text-xs text-ivory/70">Тарих пәні мұғалімі, педагог-зерттеуші</p>
          </div>
          
          {userData && (
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg">
              <UserCircle className="w-6 h-6 text-golden" />
              <div className="text-sm">
                <p className="font-bold">{userRole === 'student' ? userData.name : userData.name}</p>
                <p className="text-xs text-white/60">{userRole === 'student' ? `${userData.grade} "${userData.letter}" сынып` : 'Мұғалім'}</p>
              </div>
              <button onClick={handleLogout} className="ml-2 text-xs bg-terracotta px-2 py-1 rounded hover:bg-red-800 transition-colors">
                Шығу
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-indigo/90 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-parchment p-8 flex flex-col justify-center border-r border-gray-200">
              <div className="mb-6 text-center">
                <UserCircle className="w-16 h-16 text-terracotta mx-auto mb-2" />
                <h2 className="text-2xl font-serif font-bold text-indigo">Оқушы ретінде кіру</h2>
                <p className="text-sm text-gray-500">Тапсырмаларды орындау үшін өз мәліметтеріңізді енгізіңіз.</p>
              </div>
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Толық аты-жөніңіз</label>
                  <input type="text" required value={studentForm.name} onChange={e => setStudentForm({...studentForm, name: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-terracotta outline-none" placeholder="Мысалы: Асан Үсенов" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Сыныбы</label>
                    <select value={studentForm.grade} onChange={e => setStudentForm({...studentForm, grade: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none">
                      {[5,6,7,8,9,10,11].map(n => <option key={n} value={n}>{n} сынып</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Литера</label>
                    <select value={studentForm.letter} onChange={e => setStudentForm({...studentForm, letter: e.target.value})} className="w-full border-gray-300 rounded-lg p-2.5 border outline-none">
                      {['А','Ә','Б','В','Г'].map(l => <option key={l} value={l}>"{l}"</option>)}
                    </select>
                  </div>
                </div>
                {authError && userRole !== 'teacher' && <p className="text-red-500 text-sm">{authError}</p>}
                <button type="submit" className="w-full bg-terracotta text-white font-bold py-3 rounded-lg hover:bg-red-800 transition-colors shadow-md">Платформаға кіру</button>
              </form>
            </div>
            
            <div className="w-full md:w-1/2 bg-indigo p-8 flex flex-col justify-center text-ivory">
              <div className="mb-6 text-center">
                <Key className="w-16 h-16 text-golden mx-auto mb-2" />
                <h2 className="text-2xl font-serif font-bold text-white">Мұғалім кабинеті</h2>
                <p className="text-sm text-ivory/70">Платформаны басқару және оқушылардың жұмысын тексеру.</p>
              </div>
              <form onSubmit={handleTeacherLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ivory/80 mb-1">Құпия ПИН-код</label>
                  <input type="password" required value={teacherPin} onChange={e => setTeacherPin(e.target.value)} className="w-full border-white/20 bg-white/10 rounded-lg p-2.5 border focus:ring-golden text-white outline-none placeholder-white/30" placeholder="****" />
                </div>
                {authError && userRole !== 'student' && <p className="text-red-400 text-sm">{authError}</p>}
                <button type="submit" className="w-full bg-golden text-indigo font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors shadow-md">Кабинетке кіру</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      {!showAuthModal && (
        <nav className="bg-white border-b border-golden/30 px-6 py-2 shadow-sm overflow-x-auto">
          <ul className="flex space-x-6 min-w-max">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-terracotta text-white font-medium shadow-sm'
                      : 'text-indigo hover:bg-parchment'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Main Content */}
      {!showAuthModal && (
        <main className="flex-1 p-4 md:p-6 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-golden/30 p-4 md:p-8 min-h-[70vh] relative">
            <div className="ornament-divider absolute top-0 left-8 right-8"></div>
            
            {activeTab === 'home' && (
              <div className="text-center py-8 animate-in fade-in">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-indigo mb-6">«TarihChronos» платформасына қош келдіңіз!</h2>
                <div className="w-24 h-1 bg-terracotta mx-auto mb-6 rounded-full"></div>
                <p className="text-lg md:text-xl text-gray-800 max-w-4xl mx-auto leading-relaxed mb-10 font-medium">
                  Оқушылардың тарихи танымын, себеп-салдарлық байланысты түсінуін және сыни ойлауын дамытуға арналған авторлық цифрлық оқу-әдістемелік кешен.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto text-left">
                  <button onClick={() => setActiveTab('timeline')} className="group bg-parchment p-8 rounded-2xl border-2 border-golden/20 hover:border-terracotta shadow-md hover:shadow-xl transition-all flex flex-col h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-terracotta mb-6 shadow-sm group-hover:-translate-y-1 transition-transform relative z-10 border border-terracotta/20">
                      <Clock className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-indigo mb-3 relative z-10">4D Уақыт таспасы</h3>
                    <p className="text-gray-700 flex-1 mb-6 relative z-10 font-medium">Ежелгі дәуірден Тәуелсіз Қазақстанға дейінгі оқиғалар хронологиясы.</p>
                    <div className="flex items-center text-terracotta font-bold text-sm uppercase tracking-wide relative z-10">Модульді ашу <ArrowRight className="w-5 h-5 ml-2" /></div>
                  </button>

                  <button onClick={() => setActiveTab('map')} className="group bg-parchment p-8 rounded-2xl border-2 border-golden/20 hover:border-indigo shadow-md hover:shadow-xl transition-all flex flex-col h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo mb-6 shadow-sm group-hover:-translate-y-1 transition-transform relative z-10 border border-indigo/20">
                      <Map className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-indigo mb-3 relative z-10">Тарихи гео-карта</h3>
                    <p className="text-gray-700 flex-1 mb-6 relative z-10 font-medium">Дәуірлер бойынша мемлекет шекаралары мен тарихи орындарды зерттеу.</p>
                    <div className="flex items-center text-indigo font-bold text-sm uppercase tracking-wide relative z-10">Модульді ашу <ArrowRight className="w-5 h-5 ml-2" /></div>
                  </button>

                  <button onClick={() => setActiveTab('detective')} className="group bg-parchment p-8 rounded-2xl border-2 border-golden/20 hover:border-golden shadow-md hover:shadow-xl transition-all flex flex-col h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-golden/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-golden mb-6 shadow-sm group-hover:-translate-y-1 transition-transform relative z-10 border border-golden/30">
                      <ShieldAlert className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-indigo mb-3 relative z-10">Тапсырмалар орталығы</h3>
                    <p className="text-gray-700 flex-1 mb-6 relative z-10 font-medium">Интерактивті квесттер, тесттер, және логикалық талдау.</p>
                    <div className="flex items-center text-golden font-bold text-sm uppercase tracking-wide relative z-10">Модульді ашу <ArrowRight className="w-5 h-5 ml-2" /></div>
                  </button>

                  <button onClick={() => setActiveTab('gallery')} className="group bg-parchment p-8 rounded-2xl border-2 border-golden/20 hover:border-blue-600 shadow-md hover:shadow-xl transition-all flex flex-col h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-700 mb-6 shadow-sm group-hover:-translate-y-1 transition-transform relative z-10 border border-blue-200">
                      <Users className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-indigo mb-3 relative z-10">Тұлғалар галереясы</h3>
                    <p className="text-gray-700 flex-1 mb-6 relative z-10 font-medium">Қазақ тарихындағы ұлы тұлғалардың цифрлық досьелері.</p>
                    <div className="flex items-center text-blue-700 font-bold text-sm uppercase tracking-wide relative z-10">Модульді ашу <ArrowRight className="w-5 h-5 ml-2" /></div>
                  </button>

                  <button onClick={() => setActiveTab('photogallery')} className="group bg-parchment p-8 rounded-2xl border-2 border-golden/20 hover:border-green-600 shadow-md hover:shadow-xl transition-all flex flex-col h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-green-700 mb-6 shadow-sm group-hover:-translate-y-1 transition-transform relative z-10 border border-green-200">
                      <Camera className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-indigo mb-3 relative z-10">Фотогалерея</h3>
                    <p className="text-gray-700 flex-1 mb-6 relative z-10 font-medium">Тарихи артефактілер, архивтік суреттер мен жәдігерлер шежіресі.</p>
                    <div className="flex items-center text-green-700 font-bold text-sm uppercase tracking-wide relative z-10">Модульді ашу <ArrowRight className="w-5 h-5 ml-2" /></div>
                  </button>

                  {userRole === 'teacher' && (
                    <button onClick={() => setActiveTab('teacher')} className="group bg-indigo p-8 rounded-2xl border-2 border-transparent shadow-md hover:shadow-xl transition-all flex flex-col h-full relative overflow-hidden">
                      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-golden mb-6 shadow-sm group-hover:-translate-y-1 transition-transform relative z-10">
                        <LayoutDashboard className="w-8 h-8" />
                      </div>
                      <h3 className="font-serif font-bold text-2xl text-white mb-3 relative z-10">Мұғалім кабинеті</h3>
                      <p className="text-white/80 flex-1 mb-6 relative z-10 font-medium">Оқушылардың жұмысын тексеру және платформаны басқару.</p>
                      <div className="flex items-center text-golden font-bold text-sm uppercase tracking-wide relative z-10">Кабинетке кіру <ArrowRight className="w-5 h-5 ml-2" /></div>
                    </button>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'timeline' && <Timeline data={db.timeline_events} />}
            {activeTab === 'map' && <GisMap locations={db.gis_locations} />}
            {activeTab === 'detective' && <DetectiveQuest cases={db.detective_cases} userData={userData} />}
            {activeTab === 'gallery' && <Gallery personalities={db.personalities} />}
            {activeTab === 'photogallery' && <PhotoGallery galleryData={db.photo_gallery} />}
            {activeTab === 'teacher' && <TeacherDashboard />}
          </div>
        </main>
      )}

      <footer className="bg-indigo text-center py-4 text-ivory/60 text-xs mt-auto border-t border-white/10">
        <p>© 2026 TarihChronos. Барлық құқықтар қорғалған.</p>
        <p>Платформа авторы: Мырхиев Әбдікамал Мұқамбетқалиұлы, педагогика ғылымдарының магистрі.</p>
      </footer>
    </div>
  );
}

export default App;
