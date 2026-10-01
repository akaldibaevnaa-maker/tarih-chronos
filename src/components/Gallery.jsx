import React, { useState } from 'react';
import { Users, Quote, Info, ChevronRight, X, Star } from 'lucide-react';

const Gallery = ({ personalities }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-serif font-bold text-indigo mb-3">Интерактивті тұлғалар галереясы</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Қазақ тарихында өшпес із қалдырған ұлы хандар, билер, Алаш арыстары және тәуелсіздік қайраткерлерінің цифрлық досьесі.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {personalities.map((person) => (
          <div 
            key={person.id} 
            className="bg-white border-2 border-ivory rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer hover:-translate-y-1"
            onClick={() => setSelected(person)}
          >
           <div className="h-56 bg-indigo relative flex items-center justify-center border-b-4 border-golden overflow-hidden">
               {person.image ? (
                 <img src={person.image.startsWith('http') ? person.image : `${import.meta.env.BASE_URL}${person.image.replace(/^\//, '')}`} alt={person.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
               ) : (
                 <>
                   <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                   <div className="w-24 h-24 bg-golden/20 rounded-full flex items-center justify-center border-2 border-golden/50 relative z-10 group-hover:scale-110 transition-transform">
                     <Users className="w-12 h-12 text-golden" />
                   </div>
                 </>
               )}
               <div className="absolute bottom-0 w-full bg-gradient-to-t from-indigo to-transparent h-24 z-10"></div>
               <h3 className="absolute bottom-4 text-center w-full z-20 text-white font-serif font-bold text-xl px-2 drop-shadow-md">{person.name}</h3>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <p className="text-terracotta font-bold text-sm bg-terracotta/10 px-2 py-1 rounded inline-block">{person.years}</p>
              </div>
              <p className="text-gray-800 text-sm font-medium mb-5 line-clamp-2 leading-relaxed h-10">{person.role}</p>
              <div className="flex justify-between items-center text-indigo font-bold text-sm border-t border-gray-100 pt-4 group-hover:text-terracotta transition-colors">
                Толық досье ашу <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Expanded View */}
      {selected && (
        <div className="fixed inset-0 bg-indigo/90 backdrop-blur-md z-50 flex justify-center p-4 overflow-y-auto" onClick={() => setSelected(null)}>
          <div className="bg-parchment rounded-2xl w-full max-w-4xl my-auto overflow-hidden flex flex-col md:flex-row shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 bg-white/50 hover:bg-white p-2 rounded-full text-indigo transition-colors z-20 shadow-sm"
              onClick={() => setSelected(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full md:w-2/5 bg-indigo flex flex-col items-center p-8 text-center text-ivory relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-golden/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-terracotta/20 rounded-full blur-3xl"></div>
              
              <div className="w-40 h-40 bg-golden rounded-full mb-6 flex items-center justify-center border-4 border-ivory shadow-xl relative z-10 mt-8 overflow-hidden">
                {selected.image ? (
                  <img src={selected.image.startsWith('http') ? selected.image : `${import.meta.env.BASE_URL}${selected.image.replace(/^\//, '')}`} alt={selected.name} className="w-full h-full object-cover" />
                ) : (
                  <Users className="w-20 h-20 text-indigo" />
                )}
              </div>
              <h2 className="font-serif font-bold text-3xl mb-2 relative z-10">{selected.name}</h2>
              <p className="text-golden font-bold text-lg mb-4 relative z-10">{selected.years}</p>
              <span className="bg-white/10 px-4 py-2 rounded-lg text-sm font-medium border border-white/20 relative z-10">
                {selected.role}
              </span>
            </div>
            
            <div className="w-full md:w-3/5 p-8 bg-parchment">
              <div className="mb-8">
                <h4 className="text-sm font-bold text-terracotta uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-golden/30 pb-2">
                  <Info className="w-4 h-4" /> Тарихи рөлі мен қызметі
                </h4>
                <p className="text-gray-800 leading-relaxed text-lg">{selected.bio}</p>
              </div>

              {selected.decisions && (
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-indigo uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-golden/30 pb-2">
                    <Star className="w-4 h-4" /> Қабылдаған мемлекеттік шешімдері
                  </h4>
                  <p className="text-gray-800 leading-relaxed">{selected.decisions}</p>
                </div>
              )}

              <div className="bg-white p-6 rounded-xl border-l-4 border-terracotta shadow-md relative mt-6">
                <Quote className="absolute -top-4 -left-4 text-terracotta/30 w-12 h-12 bg-white rounded-full p-1" />
                <p className="font-serif text-xl italic text-gray-800 relative z-10 pl-2 leading-relaxed">"{selected.quote}"</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
