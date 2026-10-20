import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  FileText, 
  Users, 
  Zap, 
  Phone, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  Maximize2, 
  BookOpen, 
  Calendar, 
  Coins, 
  Home, 
  Activity, 
  Compass, 
  Landmark 
} from 'lucide-react';
import { getImageUrl } from '../utils/imageUrl';

const KyzylordaCapital = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, construction, table, objects, gallery, sources
  const [selectedImage, setSelectedImage] = useState(null);
  const [objectFilter, setObjectFilter] = useState('all');

  const historicalStats = [
    { label: 'Қала халқы (1920 ж.)', value: '9 993 адам', icon: <Users className="w-5 h-5 text-indigo" />, note: 'Тұрғындардың негізгі кәсібі – сауда' },
    { label: 'Бөлінген бастапқы қаржы', value: '200 000 рубль', icon: <Coins className="w-5 h-5 text-golden" />, note: 'А. Кенжин басқарған арнайы комиссияға' },
    { label: 'Көшірілген мекемелер', value: '83 мемлекеттік орган', icon: <Building className="w-5 h-5 text-terracotta" />, note: '1 306 қызметкер отбасыларымен' },
    { label: 'Муниципалдық үйлер', value: '126 үй (425 пәтер)', icon: <Home className="w-5 h-5 text-indigo" />, note: 'Жалпы пайдалы ауданы 6231,8 сажын' },
    { label: 'Телефон байланысы', value: '12 абонент', icon: <Phone className="w-5 h-5 text-terracotta" />, note: 'Су құбыры мен жарық болмаған' },
    { label: 'Салынған жаңа нысандар', value: '70-ке жуық ғимарат', icon: <Landmark className="w-5 h-5 text-golden" />, note: '1925–1927 жылдары (В. Н. Львов жобасы)' },
  ];

  const constructedObjects = [
    { id: 1, category: 'energy', name: 'Электр станциясының ғимараты және оған қарасты қызметтік құрылыстар', note: 'Қалаға алғаш рет орталықтандырылған жарық пен қуат беру жүйесі' },
    { id: 2, category: 'education', name: 'І сатыдағы екі мектеп', note: 'Бастауыш білім беру базасын қалыптастыру үшін салынды' },
    { id: 3, category: 'education', name: 'ІІ сатыдағы мектеп', note: 'Жоғары сатыдағы оқушыларға арналған білім ордасы' },
    { id: 4, category: 'education', name: 'Қызметтік құрылыстары бар партия мектебі', note: 'Мемлекеттік басқару кадрларын даярлау кешені' },
    { id: 5, category: 'education', name: 'Қосалқы қызмет орындары мен пәтерлері бар Ветеринариялық институт', note: 'Ауыл шаруашылығын ғылыми негізде дамыту бастамасы' },
    { id: 6, category: 'health', name: 'Амбулатория және хирургиялық бөлім', note: '15 төсектік ескі аурухананың орнына салынған алғашқы мамандандырылған емдеу мекемесі' },
    { id: 7, category: 'trade', name: 'Жатақханасы мен қызметтік құрылыстары бар «Қазторг» кеңсесі', note: 'Республиканың негізгі сауда-саттық мекемесінің орталық басқармасы' },
    { id: 8, category: 'finance', name: 'Қызметтік құрылыстары мен пәтерлері бар Ауыл шаруашылығы банкінің ғимараты', note: 'Аграрлық секторды несиелеу және қаржыландыру орталығы' },
    { id: 9, category: 'communication', name: 'Қызметтік құрылыстары және төрт тұрғын үйі бар радиостанция ғимараты', note: 'Бүкіл республика аумағына ақпарат тарататын байланыс түйіні' },
    { id: 10, category: 'culture', name: 'Іскерлік клуб ғимараты', note: 'Қоғамдық-мәдени шаралар мен іскерлік кездесулер өтетін орталық' },
    { id: 11, category: 'infrastructure', name: 'Қазақ Орталық Атқару Комитетінің ат қорасына арналған үй-жай', note: 'Көлік құралы ретінде қызметтік жылқылар мен күймелерге арналған кешен' },
    { id: 12, category: 'culture', name: 'Қазақ Орталық Атқару Комитетінің фотографиясына арналған үй-жай', note: 'Тарихи құжаттар мен оқиғаларды фотошежіреге түсіру зертханасы' },
    { id: 13, category: 'trade', name: 'Қызметкерлерге арналған пәтерлері бар Былғары синдикатының ғимараты', note: 'Шикізат өңдеу және жеңіл өнеркәсіпті үйлестіру штабы' },
    { id: 14, category: 'housing', name: 'Мемлекеттік қойманың тұрғын үй ретінде пайдалануға арналған екі үйі', note: 'Жаңадан көшіп келген қызметкерлерді баспанамен қамту' },
    { id: 15, category: 'housing', name: 'Мемлекеттік сауда және Сыртқы сауда мекемелерінің қызметкерлеріне арналған үш тұрғын үй', note: 'Сыртқы сауда мамандарына арнайы салынған кешен' },
    { id: 16, category: 'housing', name: 'Ауыл шаруашылығы несиесі мекемесі қызметкерлеріне арналған төрт тұрғын үй', note: 'Қаржы және несие саласы мамандарының қызметтік пәтерлері' },
    { id: 17, category: 'housing', name: 'Мемлекеттік банк қызметкерлеріне арналған бір тұрғын үй', note: 'Госбанк басқармасы мамандарының баспанасы' },
    { id: 18, category: 'housing', name: 'Шикізат дайындамалары басқармасының қызметкерлеріне арналған үш тұрғын үй және Басқарма кеңсесі', note: 'Басқарма аппараты мен оның қызметкерлеріне арналған ғимарат' },
  ];

  const galleryItems = [
    {
      title: '1-сурет. Қызылорданың бас құрылыс жоспары',
      source: 'Е. А. Жалмағамбетовтің еңбегінен [4, 51-б]',
      desc: 'Сәулетші И. В. Рянгин әзірлеген 40 жылдық даму келешегі бар бас жоспар. Нивелирлеу мен түсіру жұмыстарын инженер М. Тынышбаев басқарған.',
      image: '/images/kyzylorda_plan.jpg',
      badge: 'Архитектуралық сызба (1925 ж.)'
    },
    {
      title: '2-сурет. Қызылордадағы Үкімет үйі (Дом правительства)',
      source: '1927 жылғы түпнұсқа архивтік фотосурет',
      desc: 'Қазақ Орталық Атқару Комитеті (ЦИК) мен Халық Комиссарлары Кеңесі орналасқан бас мемлекеттік ғимарат. В. Н. Львов жобасымен салынған.',
      image: '/images/kyzylorda_government.jpg',
      badge: 'Мемлекеттік ғимарат (1927 ж.)'
    },
    {
      title: 'Перовск станциясы (Қызылорда теміржол вокзалы)',
      source: 'Архивтік пошталық ашықхат (Перовск станція подъѣздъ № 2)',
      desc: 'Астананы көшіру кезіндегі қаланың жалғыз электр қуаты бар негізгі логистикалық түйіні. Орынбордан келген пойыздар осы жерге тоқтаған.',
      image: '/images/kyzylorda_station.jpg',
      badge: 'Көлік инфрақұрылымы'
    },
    {
      title: 'Ақмешіт көшелері мен тұрғындарының тұрмысы',
      source: '1920-жылдардағы архивтік сурет',
      desc: '1920 жылғы санақ кезіндегі қаланың 9 993 тұрғыны негізінен ұсақ саудамен айналысқан. Қалада өндірістік кәсіпорындар болмаған.',
      image: '/images/kyzylorda_market.jpg',
      badge: 'Әлеуметтік жағдай'
    },
    {
      title: 'Қызылордадағы алғашқы кірпіш әкімшілік ғимараттар',
      source: '1925–1927 жылдардағы құрылыс шежіресі',
      desc: 'Құрылыс комитеті тұрғызған алғашқы күйдірілген кірпіш нысандар. Былғары синдикаты, банк және байланыс бөлімдеріне арналған.',
      image: '/images/kyzylorda_brick_building.jpg',
      badge: 'Құрылыс нысандары'
    }
  ];

  const filteredObjects = objectFilter === 'all' 
    ? constructedObjects 
    : constructedObjects.filter(o => o.category === objectFilter);

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo via-indigo/95 to-indigo text-ivory rounded-2xl p-6 md:p-10 border-2 border-golden/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-golden/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-terracotta/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-golden/20 text-golden border border-golden/40 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Landmark className="w-4 h-4" /> Тарихи зерттеу • 1925–1929 жылдар
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-ivory mb-4 leading-tight">
            Қызылорданың астаналық кезеңіндегі құрылыс және инфрақұрылым
          </h2>
          <p className="text-ivory/80 text-base md:text-lg leading-relaxed font-medium">
            Қазақ (Қырғыз) АКСР орталығының Орынбордан Ақмешітке (Қызылордаға) көшірілуі, қаланың жаңа астанаға айналу барысы, инженерлік-техникалық мамандардың қызметі мен инфрақұрылымының қалыптасу шежіресі.
          </p>
        </div>

        {/* Quick Nav Tabs */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/10 relative z-10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'overview' 
                ? 'bg-golden text-indigo shadow-lg scale-105' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <BookOpen className="w-4 h-4" /> 1.1. Астанаға көшу және қала жағдайы
          </button>
          <button
            onClick={() => setActiveTab('construction')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'construction' 
                ? 'bg-golden text-indigo shadow-lg scale-105' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Building className="w-4 h-4" /> 1.2. Инженерлік-техникалық мамандар
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'table' 
                ? 'bg-golden text-indigo shadow-lg scale-105' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Layers className="w-4 h-4" /> 1-кесте: Тұрғын үй қоры
          </button>
          <button
            onClick={() => setActiveTab('objects')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'objects' 
                ? 'bg-golden text-indigo shadow-lg scale-105' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> 18 жаңа нысан тізімі
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'gallery' 
                ? 'bg-golden text-indigo shadow-lg scale-105' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Maximize2 className="w-4 h-4" /> Архивтік фотолар мен Сызба
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'sources' 
                ? 'bg-golden text-indigo shadow-lg scale-105' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <FileText className="w-4 h-4" /> Дереккөздер мен әдебиеттер
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {historicalStats.map((stat, idx) => (
          <div key={idx} className="bg-white border-2 border-golden/20 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 bg-parchment rounded-lg">{stat.icon}</span>
            </div>
            <p className="text-xl font-bold font-serif text-indigo mb-1">{stat.value}</p>
            <p className="text-xs font-semibold text-gray-700 leading-tight mb-1">{stat.label}</p>
            <p className="text-[11px] text-gray-400 leading-snug">{stat.note}</p>
          </div>
        ))}
      </div>

      {/* TAB 1: 1.1. Астанаға айналуы және жағдайы */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border-2 border-golden/20 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b border-golden/30 pb-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center font-bold font-serif text-xl">
                1.1
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-indigo">
                  Қызылорданың Қазақ АКСР астанасына айналуы және қаланың сол кезеңдегі жағдайы
                </h3>
                <p className="text-xs text-gray-500 font-medium">1925 жылғы тарихи шешімдер мен қиындықтар</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4 text-gray-800 leading-relaxed font-medium">
                <p className="text-lg first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-terracotta first-letter:float-left first-letter:mr-2">
                  Қазақ (Қырғыз) АКСР-і орталығын Орынбор қаласынан Ақмешіт қаласына көшіру туралы тарихи шешімді 
                  <strong className="text-indigo"> Қырғыз Орталық Атқару Комитеті 1925 жылғы 9 ақпанда</strong> қабылдады [2, 48-б]. 
                  Республиканың әкімшілік орталығын көшіру жөніндегі жауапты міндет Қазақ АКСР Халық Комиссарлары Кеңесіне жүктелді.
                </p>

                <div className="bg-parchment p-5 rounded-xl border-l-4 border-terracotta my-4">
                  <h4 className="font-serif font-bold text-indigo text-base mb-2">Аспандияр Кенжин басқарған Арнайы комиссия</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Ақмешіт қаласын тексеруге арнайы комиссия құрылып, оның төрағасы болып <strong>Аспандияр Кенжин</strong> бекітілді. 
                    Комиссияның дайындық жұмыстарына сол кезең үшін қомақты <strong>200 000 рубль</strong> қаржы бөлінді. 
                    Комиссияға қажетті мамандар мен инженерлерден тұратын техникалық аппарат құруға толық құқық берілді [3, 173-б].
                  </p>
                </div>

                <p>
                  Сол уақытта Ақмешіт шағын уездік орталық болатын. <strong>1920 жылғы халық санағының</strong> мәліметтері бойынша қалада небәрі 
                  <strong> 9 993 адам</strong> тұрған. Тұрғындардың негізгі кәсібі сауда еді. Қалада да, уезде де фабрикалар мен зауыттар мүлдем болмаған.
                </p>

                <p>
                  Ақмешітті астана ету туралы шешім қабылданған кезде 10 мыңға жуық тұрғыны бар қала әбден тозып, қараусыз қалған күйде еді. 
                  Соған қарамастан, комиссия өте қысқа мерзім ішінде <strong>83 мемлекеттік мекемені</strong> және олардың отбасыларымен бірге келген 
                  <strong> 1 306 қызметкерін</strong> орналастыруға тиіс болды. Бұған қоса алдағы уақытта жаңадан келетін қызметкерлер үшін белгілі бір мөлшерде 
                  бос тұрғын үй қорын дайындау міндеті тұрды.
                </p>
              </div>

              {/* Right Sidebar: Infrastructure Challenges */}
              <div className="bg-parchment/60 border-2 border-golden/30 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-indigo text-lg mb-4 flex items-center gap-2 border-b border-golden/30 pb-2">
                    <Activity className="w-5 h-5 text-terracotta" /> 1925 жылғы қала инфрақұрылымы:
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-terracotta mt-1.5 flex-shrink-0"></span>
                      <span><strong>Су құбыры мүлде жоқ:</strong> Тұрғындар күнделікті тіршілікте тек құдық суын пайдаланды.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-terracotta mt-1.5 flex-shrink-0"></span>
                      <span><strong>Электр жарығы жоқ:</strong> Жарық тек теміржол вокзалы орналасқан ауданда ғана болды. Қалған қала керосин шамдарын жақты.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-terracotta mt-1.5 flex-shrink-0"></span>
                      <span><strong>Байланыс тапшылығы:</strong> Бүкіл қала бойынша телефон желісі небәрі <strong>12 абоненттен</strong> тұрды.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-terracotta mt-1.5 flex-shrink-0"></span>
                      <span><strong>Денсаулық сақтау:</strong> Қалада 15 төсектік бір ғана аурухана, екі дәрігер және үш монша қызмет етті.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-terracotta mt-1.5 flex-shrink-0"></span>
                      <span><strong>Тұрғын үй сапасы:</strong> Едендері саз балшықтан жасалған, пештері мен қолайлылығы жоқ құлауға шақ ғимараттар басым болды.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg border border-golden/30 shadow-sm text-xs text-gray-600">
                  <p className="font-bold text-indigo mb-1">Мұрағаттық дерек:</p>
                  «1925 жылға қарай қалада барлығы 941 үй иелігі болды, оның тек 126-сы муниципалдық меншікке өткізілген еді...» [5, 63-б]
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 1.2. Инженерлік-техникалық мамандар */}
      {activeTab === 'construction' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border-2 border-golden/20 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b border-golden/30 pb-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo/10 text-indigo flex items-center justify-center font-bold font-serif text-xl">
                1.2
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-indigo">
                  Қала құрылысы мен инфрақұрылымды дамытудағы инженер-техникалық мамандардың қызметі
                </h3>
                <p className="text-xs text-gray-500 font-medium">Мұхамеджан Тынышбаев, Абылай Серғазиев, И. В. Рянгин және В. Н. Львов</p>
              </div>
            </div>

            <div className="space-y-6 text-gray-800 font-medium leading-relaxed">
              <p className="text-lg">
                Қызылордадағы құрылыс жұмыстарын жүйелі түрде басқару мақсатында <strong className="text-indigo">1925 жылғы 19 маусымда</strong> Халық Комиссарлары Кеңесінің жанынан 
                <strong> Құрылыс комитеті</strong> құрылды. Комитет төрағасы қызметіне <strong>Абылай Серғазиев</strong>, ал оның техникалық мәселелер жөніндегі орынбасары болып қазақтың тұңғыш теміржол қатынасы инженері 
                <strong className="text-terracotta"> Мұхамеджан Тынышбаев</strong> тағайындалды.
              </p>

              {/* Key Figures Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                <div className="bg-parchment p-5 rounded-xl border border-golden/30 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-indigo text-golden flex items-center justify-center font-bold text-xl mb-3">
                      МТ
                    </div>
                    <h4 className="font-serif font-bold text-indigo text-lg mb-1">Мұхамеджан Тынышбаев</h4>
                    <p className="text-xs text-terracotta font-bold uppercase mb-3">Техникалық орынбасар, Бас инженер</p>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Жерді топографиялық түсіру, деңгейлеу (нивелирлеу), жаңа қала құрылысына инженерлік жетекшілік ету және жобаларды қадағалау міндетін мүлтіксіз атқарды.
                    </p>
                  </div>
                </div>

                <div className="bg-parchment p-5 rounded-xl border border-golden/30 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-terracotta text-white flex items-center justify-center font-bold text-xl mb-3">
                      АС
                    </div>
                    <h4 className="font-serif font-bold text-indigo text-lg mb-1">Абылай Серғазиев</h4>
                    <p className="text-xs text-terracotta font-bold uppercase mb-3">Құрылыс комитетінің төрағасы</p>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Халық Комиссарлары Кеңесі жанындағы Құрылыс комитетін басқарып, жаңа астана құрылысының ұйымдастырушылық және қаржылық тетіктерін үйлестірді.
                    </p>
                  </div>
                </div>

                <div className="bg-parchment p-5 rounded-xl border border-golden/30 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-golden text-indigo flex items-center justify-center font-bold text-xl mb-3">
                      ИР
                    </div>
                    <h4 className="font-serif font-bold text-indigo text-lg mb-1">И. В. Рянгин</h4>
                    <p className="text-xs text-terracotta font-bold uppercase mb-3">Суретші-сәулетші, Бас жобалаушы</p>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Қазақ Республикасының жаңа астанасы ретінде алдағы 40 жылдық даму мүмкіндігі есептелген бас қала жоспарын жасап, кварталдарға бөлді.
                    </p>
                  </div>
                </div>

                <div className="bg-parchment p-5 rounded-xl border border-golden/30 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-indigo/80 text-white flex items-center justify-center font-bold text-xl mb-3">
                      ВЛ
                    </div>
                    <h4 className="font-serif font-bold text-indigo text-lg mb-1">В. Н. Львов</h4>
                    <p className="text-xs text-terracotta font-bold uppercase mb-3">Сәулетші, Жобалаушы</p>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      1925–1927 жылдары оның жобалары бойынша шамамен 70 нысан тұрғызылды (Үкімет үйі, Ауыл шаруашылығы банкі, Былғары синдикаты және т.б.).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo/5 border border-indigo/20 p-6 rounded-xl">
                <h4 className="font-serif font-bold text-indigo text-lg mb-3">
                  40 жылдық келешекке арналған бас жоспар
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  И. В. Рянгин жасаған қала жоспары сол заман үшін ерекше жаңашыл болды. Ол Ақмешіттің бұрынғы ретсіз салынған саз көшелерінің орнына кең, түзу көшелер жүйесін, 
                  әкімшілік кварталдарды, жасыл саябақтар аймағын (Сырдария өзені жағалауымен байланыстыра отырып) және теміржол вокзалымен біртұтас байланысатын көлік тораптарын жобалады. 
                  Бұл жоспардың жергілікті жерге дәл орналасуы мен өлшемдерін М. Тынышбаевтың геодезиялық тобы қамтамасыз етті.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 1-кесте. Муниципалдық тұрғын үй қоры */}
      {activeTab === 'table' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border-2 border-golden/20 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 border-b border-golden/30 pb-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-golden/20 text-indigo flex items-center justify-center font-bold font-serif text-xl">
                📊
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-indigo">
                  1-кесте. Қызылорда қаласының муниципалдық тұрғын үй қоры (1925 ж.)
                </h3>
                <p className="text-xs text-gray-500 font-medium">Мұрағаттық есеп деректері [5, 63 б]</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-golden/30 rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-indigo text-white font-serif text-sm">
                    <th className="p-4 border border-indigo/40">Үйлер саны</th>
                    <th className="p-4 border border-indigo/40">Ондағы пәтерлер саны</th>
                    <th className="p-4 border border-indigo/40">Пәтерлердің пайдалы ауданы</th>
                    <th className="p-4 border border-indigo/40">Қосалқы бөлмелердің ауданы (дәліздер, кіреберістер, асүйлер және т.б.)</th>
                    <th className="p-4 border border-indigo/40 bg-terracotta text-white font-bold">Жалпы ауданы</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-golden/20 bg-parchment/40 text-gray-800 text-base font-semibold">
                  <tr className="hover:bg-golden/10 transition-colors">
                    <td className="p-5 border border-golden/20 text-center font-bold text-indigo text-xl">126</td>
                    <td className="p-5 border border-golden/20 text-center font-bold text-indigo text-xl">425</td>
                    <td className="p-5 border border-golden/20 text-center">4 242,3 шаршы сажын</td>
                    <td className="p-5 border border-golden/20 text-center">1 989,5 шаршы сажын</td>
                    <td className="p-5 border border-golden/20 text-center font-bold text-terracotta text-xl bg-terracotta/5">
                      6 231,8 шаршы сажын
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-parchment rounded-xl border border-golden/30 text-sm text-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-terracotta">Ескерту:</span>
                <span>1 шаршы сажын ≈ <strong>4,55 шаршы метрге (м²)</strong> тең.</span>
              </div>
              <div className="text-xs text-gray-500 font-mono">
                Жалпы аудан метрлік өлшемде: ≈ <strong>28 354,7 м²</strong>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl border border-golden/20 shadow-sm">
                <h5 className="font-serif font-bold text-indigo mb-2">Үй басына орташа пәтер:</h5>
                <p className="text-2xl font-bold text-terracotta font-serif">≈ 3.37 пәтер</p>
                <p className="text-xs text-gray-500 mt-1">Көптеген үйлер шағын уездік сипатта болғандықтан, 1–3 бөлмеден аспаған.</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-golden/20 shadow-sm">
                <h5 className="font-serif font-bold text-indigo mb-2">Орташа пәтер ауданы:</h5>
                <p className="text-2xl font-bold text-indigo font-serif">≈ 45.4 м²</p>
                <p className="text-xs text-gray-500 mt-1">Пайдалы тұрғын бөлмелерінің орташа көлемі шағын болды.</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-golden/20 shadow-sm">
                <h5 className="font-serif font-bold text-indigo mb-2">Қосалқы орындар үлесі:</h5>
                <p className="text-2xl font-bold text-golden font-serif">31.9%</p>
                <p className="text-xs text-gray-500 mt-1">Үйлердің үштен бірі дәліздер мен асүйлер сияқты қосалқы аудандарды құраған.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 18 жаңа нысан тізімі */}
      {activeTab === 'objects' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border-2 border-golden/20 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-golden/30 pb-4 mb-6">
              <div>
                <h3 className="text-2xl font-serif font-bold text-indigo">
                  Құрылыс-техникалық комитеті салған 18 негізгі жаңа нысан
                </h3>
                <p className="text-xs text-gray-500 font-medium">Арнайы комиссия мен Құрылыс комитетінің 1925–1927 жылдардағы құрылыс бағдарламасы [5, 65 б]</p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'Барлығы (18)' },
                  { id: 'education', label: 'Білім және ғылым' },
                  { id: 'health', label: 'Денсаулық' },
                  { id: 'housing', label: 'Тұрғын үйлер' },
                  { id: 'finance', label: 'Қаржы және сауда' },
                  { id: 'energy', label: 'Инфрақұрылым' },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setObjectFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      objectFilter === f.id
                        ? 'bg-indigo text-white shadow-sm'
                        : 'bg-parchment text-indigo hover:bg-golden/20'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredObjects.map((item) => (
                <div key={item.id} className="bg-parchment/60 hover:bg-parchment border border-golden/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-lg bg-indigo text-golden font-bold text-sm flex items-center justify-center font-serif">
                        №{item.id}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-golden/30 text-terracotta">
                        {item.category === 'education' && 'Білім / Ғылым'}
                        {item.category === 'health' && 'Денсаулық сақтау'}
                        {item.category === 'housing' && 'Тұрғын үй'}
                        {item.category === 'finance' && 'Қаржы мекемесі'}
                        {item.category === 'energy' && 'Энергетика'}
                        {item.category === 'communication' && 'Байланыс'}
                        {item.category === 'trade' && 'Сауда / Өндіріс'}
                        {item.category === 'culture' && 'Мәдениет / Қызмет'}
                        {item.category === 'infrastructure' && 'Инфрақұрылым'}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-indigo text-base mb-2 group-hover:text-terracotta transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Архивтік фотолар мен Сызба жоспары */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border-2 border-golden/20 p-6 md:p-8 shadow-sm">
            <div className="border-b border-golden/30 pb-4 mb-6">
              <h3 className="text-2xl font-serif font-bold text-indigo">
                Қызылорданың астаналық дәуірінің фотоқұжаттары мен бас сызбасы
              </h3>
              <p className="text-xs text-gray-500 font-medium">Үлкейтіп көру үшін суреттің үстін басыңыз</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedImage(item)}
                  className="bg-parchment rounded-xl border border-golden/30 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative h-64 bg-indigo/10 overflow-hidden">
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-indigo/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm shadow-md">
                      {item.badge}
                    </div>
                    <div className="absolute inset-0 bg-indigo/0 group-hover:bg-indigo/30 transition-colors flex items-center justify-center">
                      <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 drop-shadow-md" />
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-indigo text-lg mb-2 group-hover:text-terracotta transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-700 leading-relaxed mb-3 line-clamp-3">
                        {item.desc}
                      </p>
                    </div>
                    <p className="text-[11px] text-terracotta font-semibold border-t border-golden/20 pt-2 italic">
                      Дереккөз: {item.source}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Дереккөздер мен әдебиеттер */}
      {activeTab === 'sources' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border-2 border-golden/20 p-6 md:p-8 shadow-sm">
            <div className="border-b border-golden/30 pb-4 mb-6">
              <h3 className="text-2xl font-serif font-bold text-indigo flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-terracotta" /> Пайдаланылған тарихи-мұрағаттық дереккөздер мен ғылыми әдебиеттер
              </h3>
              <p className="text-xs text-gray-500 font-medium">Ғылыми мақалалар, архив қорлары және конференция материалдары</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-parchment rounded-xl border-l-4 border-indigo text-gray-800 text-sm leading-relaxed">
                <span className="font-bold text-indigo block text-base mb-1">[2] Азирбекова А. Ж.</span>
                Қызылорда қаласының астаналық кезеңі архив деректерінде // «Дәуірлер тоғысындағы Сыр өңірі: тарих және тағылым» халықаралық ғылыми-тәжірибелік конференциясының материалдар жинағы. – Қызылорда: Қорқыт Ата атындағы Қызылорда университеті, 2025. – 46–54-бб. – 346 б. – ISBN 978-601-285-164-9.
              </div>

              <div className="p-4 bg-parchment rounded-xl border-l-4 border-terracotta text-gray-800 text-sm leading-relaxed">
                <span className="font-bold text-terracotta block text-base mb-1">[3] Қазақстанның жаңа тарихы архив құжаттарында</span>
                Қазақ АКСР Халық Комиссарлары Кеңесі мен Құрылыс комитетінің 1925 жылғы қорлары. 173-б.
              </div>

              <div className="p-4 bg-parchment rounded-xl border-l-4 border-golden text-gray-800 text-sm leading-relaxed">
                <span className="font-bold text-yellow-800 block text-base mb-1">[4] Жалмағамбетов Е. А.</span>
                Қызылорда қаласының тарихи-сәулеттік құрылымы мен бас жоспарының қалыптасуы: монография. – 51-б.
              </div>

              <div className="p-4 bg-parchment rounded-xl border-l-4 border-indigo text-gray-800 text-sm leading-relaxed">
                <span className="font-bold text-indigo block text-base mb-1">[5] Чиликова Е. В.</span>
                Қызылорда - Қызыл астана: республиканың орталығын көшірудің 100 жылдығына // Жаңа архив: ғылыми-әдістемелік журнал. – 2025. – Т. 4. – № 4. – 56–65-бб.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-indigo/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-indigo/80 hover:bg-indigo text-white p-2.5 rounded-full z-20 transition-colors shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full md:w-3/5 bg-black flex items-center justify-center min-h-[350px] p-2">
              <img 
                src={getImageUrl(selectedImage.image)} 
                alt={selectedImage.title} 
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />
            </div>

            <div className="w-full md:w-2/5 p-6 md:p-8 bg-parchment flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="inline-block bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                  {selectedImage.badge}
                </span>
                <h3 className="text-2xl font-serif font-bold text-indigo mb-4 leading-tight">
                  {selectedImage.title}
                </h3>
                <div className="w-16 h-1 bg-golden mb-4"></div>
                <p className="text-gray-800 text-base leading-relaxed font-medium mb-6">
                  {selectedImage.desc}
                </p>
              </div>

              <div className="border-t border-golden/30 pt-4 text-xs text-gray-500 font-mono">
                {selectedImage.source}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KyzylordaCapital;
