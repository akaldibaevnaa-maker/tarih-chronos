import React, { useState } from 'react';
import { Calendar, Globe, X } from 'lucide-react';

const Timeline = ({ data }) => {
  const [filter, setFilter] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const categories = ['All', ...new Set(data.map(item => item.category))];
  
  const filteredData = filter === 'All' ? data : data.filter(item => item.category === filter);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-serif font-bold text-indigo">Уақыт таспасы</h2>
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                filter === cat ? 'bg-terracotta text-ivory border-terracotta' : 'bg-white text-indigo border-indigo/20 hover:bg-golden/20'
              }`}
            >
              {cat === 'All' ? 'Барлығы' : cat}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative border-l-4 border-golden/50 ml-6 mt-8">
        {filteredData.map((event, index) => (
          <div key={event.id} className="mb-10 ml-8 relative group cursor-pointer" onClick={() => setSelectedEvent(event)}>
            <div className="absolute -left-10 w-5 h-5 bg-terracotta rounded-full border-4 border-white shadow-md group-hover:scale-125 transition-transform"></div>
            
            <div className="bg-white rounded-xl p-5 shadow-sm border border-golden/20 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-terracotta/50">
              <div className="flex flex-wrap justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-terracotta font-bold text-lg">
                  <Calendar className="w-5 h-5" />
                  <span>{event.date}</span>
                </div>
                <span className="px-3 py-1 bg-indigo/10 text-indigo text-xs font-bold rounded-full">
                  {event.category}
                </span>
              </div>
              
              <h3 className="text-2xl font-serif font-bold mb-2">{event.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{event.description}</p>
              
              <div className="text-sm font-medium text-terracotta underline decoration-dashed underline-offset-4">
                Толық ақпаратты көру
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Window */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-indigo/80 backdrop-blur-sm z-50 flex justify-center items-center p-4" onClick={() => setSelectedEvent(null)}>
          <div className="bg-parchment w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 bg-white/50 p-2 rounded-full hover:bg-white text-indigo transition-colors z-10">
              <X className="w-6 h-6" />
            </button>
            <div className="bg-indigo p-6 text-ivory">
              <span className="px-3 py-1 bg-terracotta text-white text-xs font-bold rounded-full mb-3 inline-block">{selectedEvent.category}</span>
              <h3 className="text-3xl font-serif font-bold mb-2">{selectedEvent.title}</h3>
              <div className="flex items-center gap-2 text-golden font-medium">
                <Calendar className="w-5 h-5" />
                <span>{selectedEvent.date}</span>
              </div>
            </div>
            <div className="p-8">
              <div className="mb-6">
                <h4 className="text-lg font-bold text-terracotta mb-2 border-b border-golden/30 pb-2">Оқиға барысы және мәні</h4>
                <p className="text-gray-800 leading-relaxed text-lg">{selectedEvent.details || selectedEvent.description}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-4">
                <Globe className="w-8 h-8 text-blue-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-1">Әлемде не болды? (Синхронды тарих)</h4>
                  <p className="text-blue-900 font-serif italic">"{selectedEvent.global_event}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
