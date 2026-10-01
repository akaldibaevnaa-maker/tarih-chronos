import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Compass, Clock, Map as MapIcon, Shield, Landmark, MapPin, Swords, User, History } from 'lucide-react';

const MapController = ({ locations, activeEpoch }) => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
      if (locations.length > 0) {
        const bounds = L.latLngBounds(locations.map(loc => loc.coordinates));
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8, animate: true, duration: 1.5 });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [locations, map, activeEpoch]);
  return null;
}

const epochData = {
  'Ежелгі және орта ғасыр': {
    left: {
      chronology: "Б.з.б. VIII ғ. — б.з. XV ғ.",
      events: [
        "Сақ, ғұн тайпалық одақтарының қалыптасуы",
        "Түрік қағанатының құрылуы (552 ж.)",
        "Арабтардың Жетісуға келуі және исламның таралуы",
        "Шыңғыс хан жорықтары мен Алтын Орданың құрылуы"
      ],
      states: "Сақ, Үйсін, Қаңлы, Ғұн мемлекеттері, Түрік қағанаттары, Қарахан мемлекеті, Алтын Орда, Ақ Орда.",
      centers: "Суяб, Баласағұн, Отырар, Тараз, Сығанақ."
    },
    right: {
      routes: "Ұлы Жібек жолының Тянь-Шань және Сырдария тармақтары.",
      battles: ["Атлах шайқасы (751 ж.)", "Отырар қорғанысы (1219 ж.)"],
      cities: ["Отырар", "Тараз", "Испиджаб", "Сығанақ", "Сауран"],
      heritage: ["Қожа Ахмет Ясауи кесенесі", "Айша бибі кесенесі", "Таңбалы тас петроглифтері", "Орхон-Енисей жазбалары"]
    }
  },
  'Қазақ хандығы': {
    left: {
      chronology: "1465 ж. — 1847 ж.",
      events: [
        "Қазақ хандығының құрылуы (1465 ж.)",
        "«Қасым ханның қасқа жолы» (XVI ғ. басы)",
        "«Жеті жарғының» қабылдануы (XVII ғ. соңы)",
        "Жоңғар шапқыншылығы және «Ақтабан шұбырынды»"
      ],
      states: "Қазақ хандығы (Ұлы жүз, Орта жүз, Кіші жүз).",
      centers: "Созақ, Сығанақ, Түркістан, Сарайшық."
    },
    right: {
      routes: "Орта Азия мен Ресейді байланыстыратын ірі керуен жолдары.",
      battles: ["Орбұлақ шайқасы (1643 ж.)", "Бұланты шайқасы (1727 ж.)", "Аңырақай шайқасы (1729 ж.)"],
      cities: ["Түркістан", "Сауран", "Сығанақ", "Сарайшық"],
      heritage: ["Түркістан қаласындағы хандар қорымы", "Ұлытау тарихи ескерткіштері", "Сарайшық көне шаһары"]
    }
  },
  'Ұлт-азаттық (XVIII-XX ғғ.)': {
    left: {
      chronology: "XVIII ғ. аяғы — 1991 ж.",
      events: [
        "Сырым Датұлы көтерілісі (1783-1797 жж.)",
        "Кенесары хан бастаған ұлт-азаттық қозғалыс (1837-1847 жж.)",
        "1916 жылғы ұлт-азаттық көтеріліс",
        "Алаш автономиясының құрылуы (1917 ж.)",
        "Желтоқсан көтерілісі (1986 ж.)"
      ],
      states: "Бөкей Ордасы, Алаш автономиясы, Қазақ АСР-і, Қазақ КСР-і.",
      centers: "Омбы, Орынбор, Қызылорда, Семей, Алматы."
    },
    right: {
      routes: "Транссібір және Түрксіб теміржолдары, керуен жолдары.",
      battles: ["Кенесары сарбаздарының шайқастары", "1916 жылғы Торғайдағы шайқастар (Амангелді Иманов)"],
      cities: ["Орынбор", "Семей", "Орал", "Қарқаралы", "Торғай"],
      heritage: ["«Алаш» қозғалысының тарихи орындары (Семей)", "Абайдың Жидебайдағы қорығы"]
    }
  },
  'Тәуелсіз Қазақстан': {
    left: {
      chronology: "1991 жылдан бастап қазіргі кезге дейін",
      events: [
        "Тәуелсіздік декларациясы (1991 ж.)",
        "Мемлекеттік рәміздердің бекітілуі (1992 ж.)",
        "Ұлттық валюта – Теңгенің айналымға енуі (1993 ж.)",
        "Астананың жаңа елорда болып жариялануы (1997 ж.)"
      ],
      states: "Қазақстан Республикасы (Унитарлық, зайырлы мемлекет).",
      centers: "Алматы (1991-1997), Астана (1997 жылдан бері)."
    },
    right: {
      routes: "«Батыс Еуропа – Батыс Қытай» халықаралық дәлізі, Транскаспий бағыты.",
      battles: ["- Бейбітшілік пен келісім саясаты -"],
      cities: ["Астана", "Алматы", "Шымкент", "Атырау", "Ақтау", "Түркістан"],
      heritage: ["Бәйтерек монументі", "Мәңгілік ел қақпасы", "ЭКСПО-2017 қалашығы", "Түркістан қаласының жаңаруы"]
    }
  }
};

const GisMap = ({ locations }) => {
  const epochs = ['Барлығы', 'Ежелгі және орта ғасыр', 'Қазақ хандығы', 'Ұлт-азаттық (XVIII-XX ғғ.)', 'Тәуелсіз Қазақстан'];
  const [activeEpoch, setActiveEpoch] = useState('Барлығы');
  const [kazGeoJson, setKazGeoJson] = useState(null);
  
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries/KAZ.geo.json')
      .then(res => res.json())
      .then(data => setKazGeoJson(data))
      .catch(err => console.log("Failed to load KAZ GeoJSON", err));
  }, []);

  const filteredLocations = activeEpoch === 'Барлығы' 
    ? locations 
    : locations.filter(loc => loc.epoch === activeEpoch);

  const center = [48.0196, 66.9237];

  const createCustomIcon = (colorHex) => new L.DivIcon({
    className: 'bg-transparent',
    html: `<div class="marker-pulse w-5 h-5 rounded-full border-2 border-white shadow-md" style="background-color: ${colorHex}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  const activeData = activeEpoch !== 'Барлығы' ? epochData[activeEpoch] : null;

  return (
    <div className="h-full flex flex-col min-h-[700px] animate-in fade-in relative">
      <div className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-indigo mb-2">Тарихи гео-карта</h2>
          <p className="text-gray-600 font-medium">Дәуірлер бойынша тарихи орындар мен шекараларды зерттеңіз.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {epochs.map(epoch => (
            <button
              key={epoch}
              onClick={() => setActiveEpoch(epoch)}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all border-2 ${
                activeEpoch === epoch 
                  ? 'bg-terracotta text-white border-terracotta shadow-md scale-105' 
                  : 'bg-white text-indigo border-indigo/20 hover:border-golden hover:text-terracotta'
              }`}
            >
              {epoch}
            </button>
          ))}
        </div>
      </div>
      
      <div className={`flex-1 flex flex-col ${activeData ? 'xl:flex-row' : ''} gap-4 min-h-[600px]`}>
        
        {/* Сол жақ панель (Саяси-хронологиялық шолу) */}
        {activeData && (
          <div className="w-full xl:w-1/4 bg-white/90 border-2 border-golden/30 rounded-xl p-5 shadow-lg flex flex-col gap-4 overflow-y-auto h-full max-h-[600px] animate-in slide-in-from-left">
            <h3 className="font-serif font-bold text-xl text-indigo border-b-2 border-terracotta pb-2 mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-terracotta" /> Саяси-хронологиялық шолу
            </h3>
            
            <div className="bg-parchment p-4 rounded-lg border border-golden/20">
              <h4 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-golden" /> Хронологиялық шеңбер
              </h4>
              <p className="text-terracotta font-bold text-lg">{activeData.left.chronology}</p>
            </div>

            <div className="bg-parchment p-4 rounded-lg border border-golden/20">
              <h4 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2 mb-2">
                <History className="w-4 h-4 text-golden" /> Шешуші тарихи оқиғалар
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 font-medium">
                {activeData.left.events.map((evt, idx) => (
                  <li key={idx} className="leading-tight mb-1">{evt}</li>
                ))}
              </ul>
            </div>

            <div className="bg-parchment p-4 rounded-lg border border-golden/20">
              <h4 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2 mb-2">
                <Landmark className="w-4 h-4 text-golden" /> Мемлекеттік құрылымдар
              </h4>
              <p className="text-sm text-gray-800 font-medium mb-3">{activeData.left.states}</p>
              <h4 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-golden" /> Саяси орталықтар
              </h4>
              <p className="text-sm text-indigo font-bold">{activeData.left.centers}</p>
            </div>
          </div>
        )}

        {/* Орталық Карта */}
        <div className={`border-4 border-golden rounded-xl overflow-hidden shadow-xl relative z-0 ${activeData ? 'w-full xl:w-2/4 h-[400px] xl:h-auto' : 'w-full h-[600px]'}`}>
          <div className="absolute top-4 right-4 z-[400] bg-parchment/80 backdrop-blur-sm p-3 rounded-full shadow-lg border-2 border-golden flex flex-col items-center justify-center text-indigo font-serif pointer-events-none">
            <span className="text-xs font-bold mb-1">С (N)</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold">Б (W)</span>
              <Compass className="w-8 h-8 text-terracotta" />
              <span className="text-xs font-bold">Ш (E)</span>
            </div>
            <span className="text-xs font-bold mt-1">О (S)</span>
          </div>

          <MapContainer center={center} zoom={5} className="w-full h-full bg-[#F3EBD8] z-0" style={{minHeight: '100%'}}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={18}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              className="map-vintage-layer"
            />
            
            {(activeEpoch === 'Тәуелсіз Қазақстан' || activeEpoch === 'Барлығы') && kazGeoJson && (
              <GeoJSON 
                data={kazGeoJson} 
                style={{ color: '#1B2A4A', weight: 2, fillOpacity: 0.1, fillColor: '#1B2A4A' }} 
              />
            )}

            {filteredLocations.map((loc) => (
              <Marker 
                key={loc.id} 
                position={loc.coordinates}
                icon={createCustomIcon(loc.epoch === 'Ұлт-азаттық (XVIII-XX ғғ.)' ? '#dc2626' : (loc.epoch === 'Тәуелсіз Қазақстан' ? '#2563eb' : '#8B3A2B'))}
              >
                <Popup className="custom-popup" minWidth={250}>
                  <div className="p-1 min-w-[250px] max-w-[300px]">
                    {loc.image && (
                      <img src={loc.image.startsWith('http') ? loc.image : `${import.meta.env.BASE_URL}${loc.image.replace(/^\//, '')}`} alt={loc.name} className="w-full h-32 object-cover rounded-md mb-2 border border-gray-200 shadow-sm" />
                    )}
                    <h3 className="font-bold text-lg text-indigo mb-1 font-serif">{loc.name}</h3>
                    <p className="text-xs text-gray-500 mb-2 italic">Қазіргі атауы: {loc.modernName}</p>
                    
                    <div className="ornament-divider my-2"></div>
                    
                    <div className="flex gap-2 mb-3 flex-wrap">
                      <span className="text-xs font-bold px-2 py-1 bg-terracotta/10 text-terracotta rounded">Мезгілі: {loc.period}</span>
                      <span className="text-xs font-bold px-2 py-1 bg-golden/20 text-yellow-800 rounded">{loc.type}</span>
                    </div>
                    
                    <p className="text-sm text-gray-800 leading-relaxed font-medium">{loc.description}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            <MapController locations={filteredLocations} activeEpoch={activeEpoch} />
          </MapContainer>
        </div>

        {/* Оң жақ панель (Мәдени және географиялық нысандар) */}
        {activeData && (
          <div className="w-full xl:w-1/4 bg-white/90 border-2 border-golden/30 rounded-xl p-5 shadow-lg flex flex-col gap-4 overflow-y-auto h-full max-h-[600px] animate-in slide-in-from-right">
            <h3 className="font-serif font-bold text-xl text-indigo border-b-2 border-golden pb-2 mb-2 flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-golden" /> Мәдени және гео-нысандар
            </h3>
            
            <div className="bg-parchment p-4 rounded-lg border border-golden/20">
              <h4 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-terracotta" /> Негізгі сауда жолдары
              </h4>
              <p className="text-sm text-gray-800 font-medium mb-4 leading-tight">{activeData.right.routes}</p>

              <h4 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2 mb-2">
                <Swords className="w-4 h-4 text-terracotta" /> Шайқас өткен жерлер
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-800 space-y-1 font-medium mb-4">
                {activeData.right.battles.map((b, i) => <li key={i}>{b}</li>)}
              </ul>

              <h4 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2 mb-2">
                <Landmark className="w-4 h-4 text-terracotta" /> Маңызды қалалар
              </h4>
              <div className="flex flex-wrap gap-1">
                {activeData.right.cities.map((city, i) => (
                  <span key={i} className="text-xs bg-indigo/10 text-indigo font-bold px-2 py-1 rounded">{city}</span>
                ))}
              </div>
            </div>

            <div className="bg-parchment p-4 rounded-lg border border-golden/20">
              <h4 className="text-sm font-bold text-gray-500 uppercase flex items-center gap-2 mb-2">
                <History className="w-4 h-4 text-terracotta" /> Тарихи-мәдени мұра
              </h4>
              <ul className="space-y-2 mt-2">
                {activeData.right.heritage.map((h, i) => (
                  <li key={i} className="text-sm text-gray-800 font-medium flex items-start gap-2">
                    <span className="text-terracotta mt-1">•</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GisMap;
