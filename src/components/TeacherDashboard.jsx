import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FilePlus, Download, BookOpen, CheckCircle, Users, Eye, Trash2, Filter } from 'lucide-react';

const TeacherDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('submissions');
  const [submissions, setSubmissions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [viewSubmission, setViewSubmission] = useState(null);
  
  // Filters
  const [epochFilter, setEpochFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    setSubmissions(saved);
  }, []);

  const handleAddMaterial = (e) => {
    e.preventDefault();
    setShowAddModal(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  const handleDeleteSubmission = (id) => {
    if (window.confirm('Бұл оқушының жұмысын өшіруге сенімдісіз бе?')) {
      const updated = submissions.filter(sub => sub.id !== id);
      setSubmissions(updated);
      localStorage.setItem('completedTasks', JSON.stringify(updated));
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchEpoch = epochFilter === '' || sub.epoch === epochFilter;
    const matchLevel = levelFilter === '' || sub.level === levelFilter;
    return matchEpoch && matchLevel;
  });

  const epochs = ['Ежелгі және ортағасырлық дәуір', 'Қазақ хандығы кезеңі', 'Ұлт-азаттық қозғалыстар және XX ғасыр басы', 'Тәуелсіз Қазақстан'];
  const levels = ['Жеңіл (А деңгейі)', 'Орташа (В деңгейі)', 'Күрделі (С деңгейі)'];

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full min-h-[600px] animate-in fade-in">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-72 bg-indigo text-ivory rounded-xl p-5 shadow-md flex flex-col gap-2">
        <div className="mb-4 border-b border-white/20 pb-4">
          <h3 className="font-serif font-bold text-xl mb-1 text-golden">Мұғалім кабинеті</h3>
          <p className="text-xs text-white/60">Педагогикалық басқару панелі</p>
        </div>
        
        <button onClick={() => setActiveMenu('submissions')} className={`flex items-center gap-3 w-full p-3 rounded-lg font-medium transition-colors ${activeMenu === 'submissions' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'}`}>
          <Users className="w-5 h-5" />
          <span>Оқушылар жұмысы</span>
        </button>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-3 w-full p-3 rounded-lg text-white/70 hover:bg-white/5 transition-colors">
          <FilePlus className="w-5 h-5" />
          <span>Жаңа материал қосу</span>
        </button>
        <button onClick={() => setActiveMenu('downloads')} className={`flex items-center gap-3 w-full p-3 rounded-lg font-medium transition-colors ${activeMenu === 'downloads' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'}`}>
          <Download className="w-5 h-5" />
          <span>Әдістемелік файлдар</span>
        </button>
        <button onClick={() => setActiveMenu('syllabus')} className={`flex items-center gap-3 w-full p-3 rounded-lg font-medium transition-colors ${activeMenu === 'syllabus' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'}`}>
          <BookOpen className="w-5 h-5" />
          <span>Оқу бағдарламасы</span>
        </button>
      </div>

      {/* Main Content Dashboard */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center gap-3 animate-in fade-in">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span className="font-bold">Жаңа материал сәтті сақталды! Ол платформаға енгізілді.</span>
          </div>
        )}

        {activeMenu === 'submissions' && !viewSubmission && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="font-bold text-lg text-indigo">Оқушылардың орындаған жұмыстары</h3>
              <div className="flex gap-2">
                <button className="text-sm bg-green-600 text-white px-3 py-1.5 rounded flex items-center gap-2 hover:bg-green-700 shadow-sm transition-colors">
                  <Download className="w-4 h-4" /> Excel
                </button>
              </div>
            </div>
            
            {/* Filters */}
            <div className="p-4 border-b border-gray-100 bg-white flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                <Filter className="w-4 h-4" /> Сүзгілер:
              </div>
              <select 
                className="border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-indigo"
                value={epochFilter}
                onChange={e => setEpochFilter(e.target.value)}
              >
                <option value="">Барлық дәуірлер</option>
                {epochs.map(ep => <option key={ep} value={ep}>{ep}</option>)}
              </select>
              <select 
                className="border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-indigo"
                value={levelFilter}
                onChange={e => setLevelFilter(e.target.value)}
              >
                <option value="">Барлық деңгейлер</option>
                {levels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
              </select>
            </div>

            {filteredSubmissions.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <p className="text-lg mb-2">Әзірге бұл санатта ешқандай жұмыс жоқ.</p>
                <p className="text-sm">Басқа сүзгілерді таңдап көріңіз немесе оқушылардың тапсырма орындауын күтіңіз.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="p-4 font-semibold border-b">Оқушы</th>
                      <th className="p-4 font-semibold border-b">Тапсырма / Дәуір</th>
                      <th className="p-4 font-semibold border-b">Деңгей</th>
                      <th className="p-4 font-semibold border-b text-center">Әрекет</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.map(sub => (
                      <tr key={sub.id} className="hover:bg-gray-50 transition-colors border-b last:border-0 group">
                        <td className="p-4">
                          <div className="font-bold text-indigo">{sub.studentName}</div>
                          <div className="text-xs text-gray-500 mt-1">{sub.time}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-gray-800 line-clamp-1">{sub.taskName}</div>
                          <div className="text-xs text-gray-500 mt-1">{sub.epoch || 'Дәуірі белгісіз'}</div>
                        </td>
                        <td className="p-4">
                          <span className={`text-xs font-bold px-2 py-1 rounded border ${
                            (sub.level || '').includes('А') ? 'bg-green-50 text-green-700 border-green-200' :
                            (sub.level || '').includes('В') ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            (sub.level || '').includes('С') ? 'bg-red-50 text-red-700 border-red-200' :
                            'bg-gray-100 text-gray-600 border-gray-200'
                          }`}>
                            {sub.level || 'Белгісіз'}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setViewSubmission(sub)} className="text-indigo hover:text-white bg-indigo/10 hover:bg-indigo p-2 rounded transition-colors shadow-sm" title="Қарау">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteSubmission(sub.id)} className="text-red-500 hover:text-white bg-red-50 hover:bg-red-500 p-2 rounded transition-colors shadow-sm" title="Жою">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {viewSubmission && (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 animate-in slide-in-from-right-4">
            <button onClick={() => setViewSubmission(null)} className="text-sm text-indigo font-bold mb-6 hover:text-terracotta transition-colors flex items-center gap-1">← Тізімге қайту</button>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
              <div>
                <div className="flex gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-indigo/10 text-indigo">{viewSubmission.epoch}</span>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-600">{viewSubmission.level}</span>
                </div>
                <h3 className="text-2xl font-bold text-indigo font-serif mb-1">{viewSubmission.taskName}</h3>
                <p className="text-gray-500 text-sm">Оқушы: <span className="font-bold text-gray-800">{viewSubmission.studentName}</span> • {viewSubmission.time}</p>
              </div>
              <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 text-center">
                <span className="block text-xs text-gray-500 font-bold uppercase mb-1">Жүйе бағасы</span>
                <span className="font-bold text-indigo">{viewSubmission.score}</span>
              </div>
            </div>
            
            <div className="bg-parchment p-6 rounded-xl mb-8 border border-golden/30 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-golden/5 rounded-bl-full pointer-events-none"></div>
              <h4 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-4 border-b border-golden/20 pb-2">Оқушының жауабы:</h4>
              <p className="text-gray-800 leading-relaxed font-medium whitespace-pre-wrap text-lg">{viewSubmission.answer}</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <label className="block font-bold text-indigo mb-3 text-lg">Мұғалімнің пікірі / Бағасы:</label>
              <textarea className="w-full border border-gray-300 p-4 rounded-lg outline-none focus:border-terracotta focus:ring-4 focus:ring-terracotta/10 transition-all resize-none h-32" placeholder="Оқушының жұмысына кері байланыс қалдырыңыз..."></textarea>
              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setViewSubmission(null)} className="px-6 py-2.5 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors">Болдырмау</button>
                <button onClick={() => setViewSubmission(null)} className="bg-terracotta text-white px-8 py-2.5 rounded-lg font-bold hover:bg-red-800 transition-colors shadow-md">Бағалауды сақтау</button>
              </div>
            </div>
          </div>
        )}

        {/* ... (Downloads and Syllabus sections remain mostly the same) ... */}
        {activeMenu === 'downloads' && (
          <div className="bg-white p-6 rounded-xl border border-golden/30 shadow-sm flex flex-col h-full animate-in fade-in">
            <h4 className="text-xl font-bold text-indigo mb-2 flex items-center gap-2">
              <Download className="w-6 h-6 text-terracotta" /> Әдістемелік материалдар
            </h4>
            <p className="text-gray-600 mb-6 text-sm">Сабақ жоспарлары, БЖБ/ТЖБ дескрипторлары мен үлестірме материалдарды жүктеп алыңыз.</p>
            
            <div className="space-y-3">
              <button className="w-full flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
                <span className="font-bold text-gray-700 text-sm group-hover:text-indigo">БЖБ үлгісі: Қазақ хандығы (.docx)</span>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-terracotta transition-colors" />
              </button>
              <button className="w-full flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
                <span className="font-bold text-gray-700 text-sm group-hover:text-indigo">ТЖБ дескрипторлары (.pdf)</span>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-terracotta transition-colors" />
              </button>
              <button className="w-full flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
                <span className="font-bold text-gray-700 text-sm group-hover:text-indigo">Сабақ жоспары: Мырхиев Ә.М. авторлық бағдарламасы (.pdf)</span>
                <Download className="w-5 h-5 text-gray-400 group-hover:text-terracotta transition-colors" />
              </button>
            </div>
          </div>
        )}

        {activeMenu === 'syllabus' && (
          <div className="bg-white p-6 rounded-xl border border-golden/30 shadow-sm flex flex-col h-full animate-in fade-in">
            <h4 className="text-xl font-bold text-indigo mb-2 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-terracotta" /> Оқу бағдарламасымен интеграция
            </h4>
            <p className="text-gray-600 mb-4 text-sm">Платформа модульдерінің ҚР Оқу-ағарту министрлігі бекіткен «Қазақстан тарихы» пәнінің үлгілік оқу бағдарламасына сәйкестігі.</p>
            
            <div className="bg-parchment p-6 rounded-lg border border-golden/20 text-sm shadow-inner">
              <ul className="space-y-5 text-gray-800">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo text-white flex items-center justify-center font-bold shrink-0">5</div>
                  <div>
                    <strong className="text-indigo text-base block mb-1">5-6 сыныптар: Ежелгі Қазақстан</strong>
                    "Тарихи карта" және "Уақыт таспасы" модульдері арқылы сақ-ғұн дәуірін кеңістікте ұғындыру.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo text-white flex items-center justify-center font-bold shrink-0">7</div>
                  <div>
                    <strong className="text-indigo text-base block mb-1">7 сынып: Орта ғасырлар</strong>
                    Қазақ хандығының құрылуын "Тұлғалар галереясы" (Қасым, Тәуке хандар) арқылы бекіту.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-terracotta text-white flex items-center justify-center font-bold shrink-0">8</div>
                  <div>
                    <strong className="text-terracotta text-base block mb-1">8-9 сыныптар: Жаңа заман</strong>
                    "Тапсырмалар орталығы" арқылы ұлт-азаттық қозғалыстарды сыни талдау және эссе жазу.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-golden text-indigo flex items-center justify-center font-bold shrink-0">10</div>
                  <div>
                    <strong className="text-indigo text-base block mb-1">10-11 сыныптар: Қазіргі заман</strong>
                    Алаш қозғалысы және Тәуелсіз Қазақстан тақырыптары бойынша зерттеу жобаларын қорғау және кейс-стади шешу.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Add Material Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-indigo/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="bg-indigo p-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg flex items-center gap-2"><FilePlus className="w-5 h-5"/> Жаңа материал немесе тапсырма қосу</h3>
              <button onClick={() => setShowAddModal(false)} className="hover:text-gray-300 transition-colors">✕</button>
            </div>
            <form onSubmit={handleAddMaterial} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Материал түрі</label>
                <select className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-terracotta outline-none bg-gray-50 transition-colors">
                  <option>Уақыт таспасына оқиға қосу</option>
                  <option>Тарихи картаға нүкте қосу</option>
                  <option>Жаңа тест немесе эссе сұрағы</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Тақырыбы / Сұрақ</label>
                <input required type="text" className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-terracotta outline-none transition-colors" placeholder="Мәтін..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Мәтіні / Сипаттамасы</label>
                <textarea required rows="4" className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-terracotta outline-none resize-none transition-colors" placeholder="Толық мәлімет..."></textarea>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                  Болдырмау
                </button>
                <button type="submit" className="px-6 py-2.5 bg-terracotta text-white rounded-lg font-bold hover:bg-red-800 transition-colors shadow-md">
                  Сақтау және жариялау
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
