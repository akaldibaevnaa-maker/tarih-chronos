import React, { useState } from 'react';
import { FileText, CheckCircle, HelpCircle, AlertTriangle, Highlighter, Book, User, Clock } from 'lucide-react';

const SourcesLab = ({ sources }) => {
  const [activeSource, setActiveSource] = useState(sources[0]);
  const [annotations, setAnnotations] = useState({});
  const [analysis, setAnalysis] = useState({ type: '', bias: '' });

  const handleAnnotate = (type) => {
    setAnnotations(prev => ({ ...prev, [activeSource.id]: type }));
  };

  const highlightText = (text) => {
    // Simple mock highlighting for demonstration: wrap specific keywords for visual effect
    let highlighted = text;
    const keywords = ['ұлт болуға', 'Жеті жарғы', 'тілі, діні, тарихы', 'құн төлеу'];
    
    keywords.forEach(kw => {
      if (highlighted.includes(kw)) {
        highlighted = highlighted.replace(kw, `<mark class="bg-yellow-200 px-1 rounded">${kw}</mark>`);
      }
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Sidebar - Source List */}
      <div className="w-full lg:w-1/3 bg-ivory rounded-xl p-4 border border-golden/30 h-auto lg:h-[700px] overflow-y-auto custom-scrollbar shadow-inner">
        <h3 className="text-xl font-serif font-bold text-indigo mb-4 flex items-center gap-2">
          <Book className="w-5 h-5 text-terracotta" />
          Мұрағат қоржыны
        </h3>
        <div className="space-y-3">
          {sources.map(src => (
            <button
              key={src.id}
              onClick={() => { setActiveSource(src); setAnalysis({ type: '', bias: '' }); }}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                activeSource?.id === src.id 
                  ? 'bg-white border-terracotta shadow-md scale-[1.02]' 
                  : 'bg-white/50 border-transparent hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <FileText className={`w-4 h-4 ${activeSource?.id === src.id ? 'text-terracotta' : 'text-gray-500'}`} />
                <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded text-gray-600 uppercase tracking-wide">{src.type}</span>
              </div>
              <h4 className="font-bold text-sm text-indigo leading-tight">{src.title}</h4>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><Clock className="w-3 h-3"/> {src.date}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Source Viewer */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        {activeSource ? (
          <>
            <div className="bg-[#fdfaf5] p-6 md:p-10 rounded-xl border border-golden/50 shadow-sm relative flex-1"
                 style={{ backgroundImage: 'radial-gradient(#C89B3C 0.5px, transparent 0.5px)', backgroundSize: '24px 24px', backgroundPosition: '0 0' }}>
              <div className="absolute top-0 left-0 w-full h-2 bg-terracotta/30 rounded-t-xl"></div>
              
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-md border border-ivory">
                <div className="flex justify-between items-start mb-6 border-b border-gray-200 pb-4">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-indigo mb-2">{activeSource.title}</h2>
                    <div className="flex gap-4 text-sm text-gray-600 font-medium">
                      <p className="flex items-center gap-1"><User className="w-4 h-4 text-terracotta"/> {activeSource.author}</p>
                      <p className="flex items-center gap-1"><Clock className="w-4 h-4 text-terracotta"/> {activeSource.date}</p>
                    </div>
                  </div>
                  <button className="text-golden hover:text-terracotta transition-colors" title="Мәтінді маркерлеу құралы">
                    <Highlighter className="w-6 h-6" />
                  </button>
                </div>
                
                <p className="text-xl leading-loose font-serif text-gray-800 italic">
                  "{highlightText(activeSource.content)}"
                </p>
              </div>

              {/* Annotation & Analysis Tools */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <span className="block text-sm font-bold text-indigo mb-3 uppercase tracking-wide">Дереккөзді бағалау:</span>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => handleAnnotate('reliable')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${annotations[activeSource.id] === 'reliable' ? 'bg-green-100 text-green-800 border-2 border-green-400' : 'bg-gray-50 border-2 border-gray-100 hover:bg-gray-100'}`}>
                      <CheckCircle className="w-5 h-5 text-green-600" /> Тарихи сенімді факт
                    </button>
                    <button onClick={() => handleAnnotate('secondary')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${annotations[activeSource.id] === 'secondary' ? 'bg-blue-100 text-blue-800 border-2 border-blue-400' : 'bg-gray-50 border-2 border-gray-100 hover:bg-gray-100'}`}>
                      <HelpCircle className="w-5 h-5 text-blue-600" /> Жанама/субъективті пікір
                    </button>
                    <button onClick={() => handleAnnotate('doubtful')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${annotations[activeSource.id] === 'doubtful' ? 'bg-red-100 text-red-800 border-2 border-red-400' : 'bg-gray-50 border-2 border-gray-100 hover:bg-gray-100'}`}>
                      <AlertTriangle className="w-5 h-5 text-red-600" /> Күмәнді ақпарат/бұрмалау
                    </button>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
                  <div>
                    <span className="block text-sm font-bold text-indigo mb-3 uppercase tracking-wide">Аналитикалық карточка:</span>
                    <select className="w-full p-2 mb-3 border border-gray-200 rounded text-sm focus:ring-terracotta focus:border-terracotta" value={analysis.type} onChange={(e) => setAnalysis({...analysis, type: e.target.value})}>
                      <option value="">Дереккөз түрін анықтаңыз...</option>
                      <option value="official">Заңнамалық / Ресми құжат</option>
                      <option value="press">Мерзімді баспасөз</option>
                      <option value="ego">Эго-құжат (хат, естелік)</option>
                    </select>
                    <select className="w-full p-2 border border-gray-200 rounded text-sm focus:ring-terracotta focus:border-terracotta" value={analysis.bias} onChange={(e) => setAnalysis({...analysis, bias: e.target.value})}>
                      <option value="">Автордың ұстанымы...</option>
                      <option value="objective">Бейтарап, объективті баяндау</option>
                      <option value="subjective">Авторлық көзқарас айқын сезіледі</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions Section */}
            <div className="bg-indigo text-ivory p-6 rounded-xl shadow-md mt-auto">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-golden">
                <Search className="w-5 h-5" />
                Сыни талдау сұрақтары
              </h3>
              <ul className="list-decimal list-inside space-y-3">
                {activeSource.questions.map((q, idx) => (
                  <li key={idx} className="text-ivory/90 pl-2 border-l-2 border-terracotta/50 ml-2">{q}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white rounded-xl border border-gray-200 text-gray-400">
            Зерттеу үшін сол жақтан құжатты таңдаңыз
          </div>
        )}
      </div>
    </div>
  );
};

export default SourcesLab;
