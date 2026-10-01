import React, { useState } from 'react';
import { ShieldAlert, FileQuestion, CheckCircle, PenTool, LayoutList, MapPin, MousePointerClick, ListOrdered } from 'lucide-react';

const DetectiveQuest = ({ cases, userData }) => {
  const [activeTask, setActiveTask] = useState(null);
  const [answer, setAnswer] = useState('');
  const [cluesFound, setCluesFound] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sequence, setSequence] = useState([]);
  const [matches, setMatches] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  const [epochFilter, setEpochFilter] = useState('Барлығы');
  
  const epochs = ['Барлығы', 'Ежелгі және ортағасырлық дәуір', 'Қазақ хандығы кезеңі', 'Ұлт-азаттық қозғалыстар және XX ғасыр басы', 'Тәуелсіз Қазақстан'];

  const handleSelectTask = (task) => {
    setActiveTask(task);
    setAnswer('');
    setCluesFound([]);
    setSelectedOption(null);
    setSequence(task.items ? [...task.items].sort(() => Math.random() - 0.5) : []);
    setMatches({});
    setSubmitted(false);
  };

  const saveResult = (finalAnswer, score = 'Тесттен өтті') => {
    const existing = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    const newResult = {
      id: Date.now(),
      studentName: userData?.fullName || 'Белгісіз оқушы',
      taskName: activeTask.title,
      epoch: activeTask.epoch,
      level: activeTask.level,
      time: new Date().toLocaleString(),
      answer: finalAnswer,
      score: score
    };
    localStorage.setItem('completedTasks', JSON.stringify([newResult, ...existing]));
    setSubmitted(true);
  };

  const renderTaskContent = () => {
    if (activeTask.type === 'investigation') {
      return (
        <div className="animate-in fade-in">
          <div className="bg-parchment p-6 rounded-xl border-l-4 border-terracotta mb-6 shadow-sm">
            <p className="text-lg font-serif italic text-gray-800">"{activeTask.question}"</p>
          </div>
          <h4 className="font-bold text-indigo mb-3">Айғақтар мен мәліметтер (Кемінде 2-уін таңдаңыз):</h4>
          <div className="grid gap-3 mb-6">
            {activeTask.clues.map((clue, idx) => (
              <div key={idx} onClick={() => {
                if (cluesFound.includes(clue)) setCluesFound(cluesFound.filter(c => c !== clue));
                else setCluesFound([...cluesFound, clue]);
              }} className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${cluesFound.includes(clue) ? 'border-golden bg-golden/10' : 'border-gray-200 hover:border-golden/50'}`}>
                {clue}
              </div>
            ))}
          </div>
          <textarea className="w-full h-32 p-4 border border-gray-300 rounded-lg outline-none focus:border-terracotta mb-4 resize-none" placeholder="Қорытынды эссе / үкім жазыңыз..." value={answer} onChange={e => setAnswer(e.target.value)}></textarea>
          <button disabled={cluesFound.length < 2 || answer.length < 10} onClick={() => saveResult(answer, 'Тексеруде')} className="bg-terracotta text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-red-800 transition-colors">Тапсырманы мұғалімге жіберу</button>
        </div>
      );
    }
    
    if (activeTask.type === 'quiz') {
      return (
        <div className="animate-in fade-in">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-6">
            <p className="text-xl font-medium text-blue-900">{activeTask.question}</p>
          </div>
          <div className="grid gap-3 mb-6">
            {activeTask.options.map((opt, idx) => (
              <div key={idx} onClick={() => setSelectedOption(opt)} className={`p-4 rounded-lg border-2 cursor-pointer transition-colors font-medium ${selectedOption === opt ? 'border-indigo bg-indigo text-white' : 'border-gray-200 hover:border-indigo/50 text-gray-700'}`}>
                {opt}
              </div>
            ))}
          </div>
          <button disabled={!selectedOption} onClick={() => saveResult(selectedOption, selectedOption === activeTask.correctAnswer ? 'Дұрыс' : 'Қате')} className="bg-indigo text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-blue-800 transition-colors">Жауапты бекіту</button>
        </div>
      );
    }

    if (activeTask.type === 'sequence') {
      const moveUp = (index) => {
        if (index === 0) return;
        const newSeq = [...sequence];
        const temp = newSeq[index - 1];
        newSeq[index - 1] = newSeq[index];
        newSeq[index] = temp;
        setSequence(newSeq);
      };
      
      const moveDown = (index) => {
        if (index === sequence.length - 1) return;
        const newSeq = [...sequence];
        const temp = newSeq[index + 1];
        newSeq[index + 1] = newSeq[index];
        newSeq[index] = temp;
        setSequence(newSeq);
      };

      return (
        <div className="animate-in fade-in">
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 mb-6">
            <p className="text-xl font-medium text-purple-900">{activeTask.question}</p>
          </div>
          <div className="space-y-2 mb-6">
            {sequence.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveUp(idx)} className="p-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 disabled:opacity-30" disabled={idx === 0}>▲</button>
                  <button onClick={() => moveDown(idx)} className="p-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 disabled:opacity-30" disabled={idx === sequence.length - 1}>▼</button>
                </div>
                <div className="font-bold text-indigo w-8 h-8 flex items-center justify-center bg-indigo/10 rounded-full shrink-0">{idx + 1}</div>
                <div className="font-medium text-gray-800">{item}</div>
              </div>
            ))}
          </div>
          <button onClick={() => saveResult(sequence.join(' -> '), 'Тексеруде')} className="bg-indigo text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors">Жауапты жіберу</button>
        </div>
      );
    }

    if (activeTask.type === 'match') {
      return (
        <div className="animate-in fade-in">
          <div className="bg-green-50 p-6 rounded-xl border border-green-200 mb-6">
            <p className="text-xl font-medium text-green-900">{activeTask.question}</p>
          </div>
          <p className="text-sm text-gray-500 mb-4">Жауаптарды қолмен енгізіп сәйкестендіріңіз:</p>
          <div className="space-y-4 mb-6">
            {activeTask.pairs.map((pair, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="bg-gray-100 p-3 rounded-lg font-bold text-gray-700 flex-1 border border-gray-200">{pair.left}</div>
                <div className="text-gray-400 hidden md:block">→</div>
                <select 
                  className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:border-indigo"
                  value={matches[pair.left] || ''}
                  onChange={(e) => setMatches({...matches, [pair.left]: e.target.value})}
                >
                  <option value="" disabled>Таңдаңыз...</option>
                  {[...activeTask.pairs].sort(() => Math.random() - 0.5).map((p, i) => (
                    <option key={i} value={p.right}>{p.right}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button disabled={Object.keys(matches).length < activeTask.pairs.length} onClick={() => saveResult(JSON.stringify(matches), 'Тексеруде')} className="bg-indigo text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors disabled:opacity-50">Жауапты жіберу</button>
        </div>
      );
    }

    if (activeTask.type === 'map_point' || activeTask.type === 'drag_drop') {
      return (
        <div className="animate-in fade-in">
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 mb-6">
            <p className="text-xl font-medium text-yellow-900">{activeTask.question}</p>
          </div>
          <div className="bg-parchment p-4 rounded-lg mb-6 border border-golden/30 border-dashed text-center text-gray-600">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-golden" />
            <p className="text-sm">Бұл интерактивті тапсырма. Өз жауабыңызды мәтін түрінде түсіндіріп жазыңыз немесе координаталарды көрсетіңіз.</p>
          </div>
          <textarea className="w-full h-32 p-4 border border-gray-300 rounded-lg outline-none focus:border-indigo mb-4 resize-none" placeholder="Жауабыңызды осында жазыңыз..." value={answer} onChange={e => setAnswer(e.target.value)}></textarea>
          <button disabled={answer.length < 5} onClick={() => saveResult(answer, 'Тексеруде')} className="bg-indigo text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-blue-800 transition-colors">Тапсырманы жіберу</button>
        </div>
      );
    }
  };

  const getIconForType = (type) => {
    switch(type) {
      case 'investigation': return <ShieldAlert className="w-6 h-6 text-terracotta" />;
      case 'quiz': return <FileQuestion className="w-6 h-6 text-blue-500" />;
      case 'sequence': return <ListOrdered className="w-6 h-6 text-purple-500" />;
      case 'match': return <LayoutList className="w-6 h-6 text-green-500" />;
      case 'map_point': return <MapPin className="w-6 h-6 text-red-500" />;
      case 'drag_drop': return <MousePointerClick className="w-6 h-6 text-yellow-600" />;
      default: return <PenTool className="w-6 h-6 text-indigo" />;
    }
  };

  const filteredCases = epochFilter === 'Барлығы' ? cases : cases.filter(c => c.epoch === epochFilter);

  if (!activeTask) {
    return (
      <div className="animate-in fade-in">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-indigo mb-2">Тапсырмалар орталығы</h2>
          <p className="text-gray-600 font-medium">Дәуірлер мен деңгейлер бойынша біліміңізді тексеріңіз.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {epochs.map(epoch => (
            <button
              key={epoch}
              onClick={() => setEpochFilter(epoch)}
              className={`px-4 py-2 text-sm font-bold rounded-full transition-all border-2 ${
                epochFilter === epoch 
                  ? 'bg-indigo text-white border-indigo shadow-md' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-indigo/50 hover:text-indigo'
              }`}
            >
              {epoch}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredCases.map((c, idx) => (
            <div key={c.id} onClick={() => handleSelectTask(c)} className="bg-white rounded-2xl border border-gray-200 hover:border-golden cursor-pointer shadow-sm hover:shadow-xl transition-all group flex flex-col relative overflow-hidden">
              <div className="h-2 w-full absolute top-0 left-0" style={{
                backgroundColor: c.level.includes('А') ? '#22c55e' : c.level.includes('В') ? '#eab308' : '#ef4444'
              }}></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                    {getIconForType(c.type)}
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-600 border border-gray-200">
                    {c.level}
                  </span>
                </div>
                <span className="text-xs font-bold text-gray-400 mb-1 block uppercase tracking-wider">{c.epoch}</span>
                <h3 className="text-lg font-bold text-indigo mb-2 line-clamp-2">{c.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-3 mt-auto">{c.question}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl border border-golden/30 shadow-xl min-h-[500px] flex flex-col relative overflow-hidden">
      <button onClick={() => setActiveTask(null)} className="absolute top-6 right-6 text-gray-400 hover:text-indigo font-bold transition-colors">✕ Жабу</button>
      
      {!submitted && (
        <div className="mb-6 border-b border-gray-100 pb-4 pr-12">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs font-bold px-2 py-1 rounded bg-indigo/10 text-indigo">{activeTask.epoch}</span>
            <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-600">{activeTask.level}</span>
          </div>
          <h3 className="text-2xl font-bold text-indigo font-serif">{activeTask.title}</h3>
        </div>
      )}

      {submitted ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500 py-10">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-white outline outline-4 outline-green-50">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-indigo mb-4">Тапсырма сәтті аяқталды!</h2>
          <p className="text-lg text-gray-600 max-w-xl leading-relaxed mb-8">
            Сіздің талдауыңыз мұғалімнің кабинетіне жіберілді. Жарайсыз, жас тарихшы! Бұл тарихи процестердің себеп-салдарлық байланысын тереңірек түсінуге көмектеседі.
          </p>
          <button onClick={() => setActiveTask(null)} className="px-8 py-3 bg-indigo text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">Басқа тапсырмаларға өту</button>
        </div>
      ) : (
        renderTaskContent()
      )}
    </div>
  );
};

export default DetectiveQuest;
