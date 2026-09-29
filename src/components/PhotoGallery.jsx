import React, { useState } from 'react';
import { Camera, X, Filter } from 'lucide-react';

const PhotoGallery = ({ galleryData }) => {
  const [selectedEpoch, setSelectedEpoch] = useState('Барлығы');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const epochs = [
    'Барлығы',
    'Сақ-ғұн және көне дәуір',
    'Түрік қағанаттары мен орта ғасырлар',
    'Қазақ хандығы',
    'Ұлт-азаттық қозғалыстар мен Алаш',
    'Тәуелсіз Қазақстан'
  ];

  const filteredPhotos = selectedEpoch === 'Барлығы' 
    ? galleryData 
    : galleryData.filter(photo => photo.category === selectedEpoch);

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-indigo mb-3">Фотогалерея: Тарихи артефактілер</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ежелгі дәуірден қазіргі Қазақстанға дейінгі тарихи жәдігерлер, архивтік суреттер мен маңызды оқиғалардың визуалды шежіресі.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <div className="flex items-center gap-2 mr-2 text-terracotta font-medium">
          <Filter className="w-5 h-5" /> Сүзгі:
        </div>
        {epochs.map(epoch => (
          <button
            key={epoch}
            onClick={() => setSelectedEpoch(epoch)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedEpoch === epoch
                ? 'bg-indigo text-white shadow-md'
                : 'bg-white text-indigo border border-indigo/20 hover:bg-indigo/5'
            }`}
          >
            {epoch}
          </button>
        ))}
      </div>

      {/* Masonry-like Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredPhotos.map((photo) => (
          <div 
            key={photo.id} 
            className="break-inside-avoid bg-white rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden cursor-pointer group border border-golden/20"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="relative overflow-hidden">
              <img 
                src={photo.image} 
                alt={photo.name} 
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-indigo/0 group-hover:bg-indigo/20 transition-colors flex items-center justify-center">
                <Camera className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 w-12 h-12" />
              </div>
            </div>
            <div className="p-5">
              <div className="inline-block bg-terracotta/10 text-terracotta text-xs font-bold px-2 py-1 rounded mb-2 uppercase tracking-wide">
                {photo.epoch_year}
              </div>
              <h3 className="text-lg font-serif font-bold text-indigo mb-2">{photo.name}</h3>
              <p className="text-sm text-gray-700 line-clamp-3">{photo.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex justify-center items-center p-4 md:p-8" onClick={() => setSelectedPhoto(null)}>
          <button 
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/30 text-white p-3 rounded-full transition-colors z-50"
            onClick={() => setSelectedPhoto(null)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-[500px]">
              <img 
                src={selectedPhoto.image} 
                alt={selectedPhoto.name} 
                className="max-w-full max-h-[50vh] md:max-h-[90vh] object-contain"
              />
            </div>
            <div className="w-full md:w-2/5 p-6 md:p-10 bg-parchment flex flex-col overflow-y-auto">
              <div className="mb-auto">
                <div className="inline-block bg-terracotta text-white text-xs font-bold px-3 py-1 rounded mb-4 uppercase tracking-wide shadow-sm">
                  {selectedPhoto.epoch_year}
                </div>
                <h2 className="text-3xl font-serif font-bold text-indigo mb-6 leading-tight">{selectedPhoto.name}</h2>
                <div className="w-16 h-1 bg-golden mb-6"></div>
                <p className="text-gray-800 text-lg leading-relaxed font-medium">
                  {selectedPhoto.description}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-golden/30 text-sm text-gray-500 font-medium">
                Дәуір: {selectedPhoto.category}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
