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
  Landmark,
  Award,
  GraduationCap,
  School,
  BadgeCheck
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
    { id: 8, category: 'finance', name: 'Қызметтік құрылыстары мен пәтерлері бар Ауыл шаруашылығы банкінің ғимараты', note: 'Аграрлық секторды несиелеу және қаржыландыру орталығы. Сәулетші В. Н. Львов жобасымен тұрғызылған (1926 ж.).', image: '/images/kyzylorda_selkhozbank_lvov_1926.jpg' },
    { id: 9, category: 'communication', name: 'Қызметтік құрылыстары және төрт тұрғын үйі бар радиостанция ғимараты', note: 'Бүкіл республика аумағына ақпарат тарататын байланыс түйіні' },
    { id: 10, category: 'culture', name: 'Іскерлік клуб ғимараты', note: 'Қоғамдық-мәдени шаралар мен іскерлік кездесулер өтетін орталық' },
    { id: 11, category: 'infrastructure', name: 'Қазақ Орталық Атқару Комитетінің ат қорасына арналған үй-жай', note: 'Көлік құралы ретінде қызметтік жылқылар мен күймелерге арналған кешен' },
    { id: 12, category: 'culture', name: 'Қазақ Орталық Атқару Комитетінің фотографиясына арналған үй-жай', note: 'Тарихи құжаттар мен оқиғаларды фотошежіреге түсіру зертханасы' },
    { id: 13, category: 'trade', name: 'Қызметкерлерге арналған пәтерлері бар Былғары синдикатының ғимараты', note: 'Шикізат өңдеу және жеңіл өнеркәсіпті үйлестіру штабы' },
    { id: 14, category: 'housing', name: 'Мемлекеттік қойманың тұрғын үй ретінде пайдалануға арналған екі үйі', note: 'Жаңадан көшіп келген қызметкерлерді баспанамен қамту' },
    { id: 15, category: 'housing', name: 'Мемлекеттік сауда және Сыртқы сауда мекемелерінің қызметкерлеріне арналған үш тұрғын үй (Жаңа қала особняктері)', note: 'Сыртқы сауда мамандары мен қызметкерлерге салынған тұрғын үйлер (Фрунзе көшесіндегі сақталған особняк үлгісі).', image: '/images/kyzylorda_mansion_frunze_1926.jpg' },
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
    },
    {
      title: 'Астаналық кезеңдегі мектеп және әкімшілік корпусы',
      source: '1925–1927 жж. құрылыс құжаттарынан',
      desc: 'Құрылыс комитеті мен В. Н. Львов жобасы бойынша салынған І және ІІ сатыдағы мектептер мен қызметтік ғимараттардың бірі.',
      image: '/images/kyzylorda_school_admin.jpg',
      badge: 'Білім және әкімшілік'
    },
    {
      title: 'Ақмешіттегі көне базар мен сауда қатарлары',
      source: '1920-жылдардағы этнографиялық-тарихи фотоқұжат',
      desc: '1920 жылғы санақ кезіндегі уездік қаланың сауда қатарлары мен қарапайым шатырлы сауда орындары. Қалада ірі өнеркәсіп болмағандықтан, базар халықтың басты тіршілік көзі еді.',
      image: '/images/kyzylorda_old_bazaar.jpg',
      badge: 'Сауда инфрақұрылымы'
    },
    {
      title: 'Ақмешіт (Перовск) сәулеттік ансамблі мен кешені',
      source: 'Тарихи-архитектуралық архив қоры',
      desc: 'Қала орталығындағы қоршаумен көмкерілген тарихи сәулет ғимараты мен көгалдандырылған аумақ. Жаңа астана жоспарына сәйкес сақталған сәулеттік ескерткіш.',
      image: '/images/kyzylorda_cathedral_view.jpg',
      badge: 'Сәулет ескерткіші'
    },
    {
      title: 'Қызылорданың орталық қалалық саябағы және павильоны',
      source: '1925 жылғы тарихи фототүсірілім',
      desc: 'Сәулетші И. В. Рянгиннің қала бас жоспарында көрсетілген саябақ аймағы мен ағаштан қиылып салынған жазғы клуб-павильоны. Қала тұрғындарының мәдени демалыс орны.',
      image: '/images/kyzylorda_city_park.jpg',
      badge: 'Мәдени демалыс саябағы'
    },
    {
      title: '1925 жылғы 10 наурыздағы №12 тарихи бұйрық',
      source: 'ҚР Орталық мемлекеттік архиві (Ф-2, Оп. 2, Д. 99, Л. 60)',
      desc: 'Арнайы комиссия төрағасы Аспандияр Кенжиннің Орынборға есеп беруге кетерде барлық басшылық өкілеттігі мен қаржылық құқықтарын инженер Мұхамеджан Тынышбаевқа ресми тапсыру туралы түпнұсқа бұйрығы.',
      image: '/images/kyzylorda_prikaz_tynyshpaev.jpg',
      badge: 'Архивтік бұйрық (1925 ж.)'
    },
    {
      title: 'Сәулетші В. Н. Львовтың жобалары мен портреті',
      source: '1925–1927 жж. сәулеттік жобалау қорларынан',
      desc: 'В. Н. Львовтың басшылығымен салынған 70-ке жуық мемлекеттік нысанның (Үкімет үйі, банк, тұрғын үйлер) сәулеттік сызба-қасбеттері мен сәулетшінің өзіндік фотопортреті.',
      image: '/images/kyzylorda_architect_lvov_project.jpg',
      badge: 'Сәулеттік сызбалар'
    },
    {
      title: 'РСФСР СНК-нің Қызылорда құрылысы жөніндегі қаулысы',
      source: '«Совершенно секретно» мұрағаттық құжаты (1926–1927 жж.)',
      desc: 'Қызылорда астаналық құрылысындағы қаржы мен мерзімдерге қатысты мемлекеттік тергеу қорытындысы. Н. Нұрмақов, А. Кенжин, М. Тынышбаевқа қатысты тарихи архив парағы.',
      image: '/images/kyzylorda_secret_resolution.jpg',
      badge: 'Құпия мұрағат құжаты'
    },
    {
      title: 'Қызылорда Жастар театры ғимараты (Астаналық дәуір сәулеті)',
      source: 'Зерттеушілердің далалық фото-тіркеуі (2025–2026 жж.)',
      desc: 'Астаналық кезеңнен бүгінгі күнге дейін сақталған тарихи сәулет ескерткіші. 1925–1927 жылдары салынған қызыл кірпіш ғимарат қазір Жастар театры ретінде мәдени қызмет атқарады.',
      image: '/images/kyzylorda_youth_theatre.jpg',
      badge: 'Бүгінгі сақталған мұра'
    },
    {
      title: '1925 жылғы астаналық кезеңнің тарихи тұрғын үй кешені',
      source: 'Далалық зерттеу материалдары (Қызылорда қаласы)',
      desc: 'Астананы көшіру кезінде мемлекеттік қызметкерлер мен мамандар үшін салынған, өзіндік сәулеттік нақышы сақталған қазіргі тарихи ғимараттың алдындағы зерттеуші көрінісі.',
      image: '/images/kyzylorda_modern_heritage1.jpg',
      badge: 'Тарихи ғимарат (Зерттеу)'
    },
    {
      title: 'Теміржолшылар клубы (1924 ж.) — Мемориалдық тақта',
      source: 'Мемлекеттік қорғаудағы тарихи ескерткіш тақтасы',
      desc: '1924 жылы бой көтерген тарихи «Теміржолшылар клубы ғимараты». Бүгінде Қызылорда қалалық Жастар театры орналасқан, мемлекет қорғауындағы республикалық мәні бар сәулет ескерткіші.',
      image: '/images/kyzylorda_railway_club_monument.jpg',
      badge: 'Мемориалдық тақта (1924 ж.)'
    },
    {
      title: 'ҚазОАК №14 Хаттамасы: М. Тынышбаевтың қала жоспарын бекітуі',
      source: 'Қазақ Орталық Атқару Комитеті президиумы (1 қараша 1925 ж.)',
      desc: 'М. Тынышбаевтың баяндамасы бойынша Қызылорданың Регуляциялық бас жоспарын бекіту, теміржол артынан арнайы жұмысшылар кварталын бақтармен қамтамасыз етіп салу туралы тарихи қаулы.',
      image: '/images/kyzylorda_protocol14_tynyshbaev.jpg',
      badge: 'ҚазОАК Хаттамасы (1925 ж.)'
    },
    {
      title: '1500 қызметкерді орналастыру және Үлкен театр жобасы',
      source: '1925 жылғы тарихи есеп-қисап құжаты (39-бет)',
      desc: 'Көшіп келетін 1500 қызметкерге адам басына 1 шаршы сажыннан бөлме есептеу, банктер, 700-800 орындық театр, 100 сажындық монша және Мәскеумен радиотелеграф байланысын құру құжаты.',
      image: '/images/kyzylorda_budget_sazhen_calculation.jpg',
      badge: 'Тұрғын үй мен Театр есебі'
    },
    {
      title: 'СНК №14 Хаттамасы: А. Кенжин баяндамасы және Ағаш отырғызу мерекесі',
      source: 'Қазақ АКСР Халық Комиссарлары Кеңесі (17 наурыз 1925 ж.)',
      desc: 'Аспандияр Кенжиннің жаңа астана құрылысы жөніндегі баяндамасы: жаңа қаланың кварталдарын бөлу, арықтар жүйесін тарту, көгалдандыру және қалада «Ағаш отырғызу мерекесін» өткізу туралы шешімі.',
      image: '/images/kyzylorda_snk_protocol14_kenzhin.jpg',
      badge: 'СНК Хаттамасы (1925 ж.)'
    },
    {
      title: 'Қызылорданың тарихи қалалық моншасы (Бас қасбет)',
      source: 'ХХ ғасырдың тарихи сәулет ескерткіші',
      desc: '1925 жылғы астана құрылысы жоспарында белгіленген «100 сажындық монша» және қаланың коммуналдық инфрақұрылымының маңызды нысаны. Қызыл кірпіштен қаланған өзіндік сәулеттік нақышы бүгінге дейін сақталған.',
      image: '/images/kyzylorda_city_bathhouse_facade.jpg',
      badge: 'Сәулет ескерткіші'
    },
    {
      title: 'Қалалық монша — Мемориалдық тақта мен көне шамдал',
      source: 'Мемлекеттік тізілімдегі тарихи-мәдени нысан',
      desc: 'Ғимарат қабырғасындағы мемлекеттік қорғау тақтасы: «ҚАЛАЛЫҚ МОНША, ХХ ғ.». ХХ ғасыр басындағы қалалық инженерлік желі мен көше сәулеті элементтерінің көрінісі.',
      image: '/images/kyzylorda_city_bathhouse_plaque.jpg',
      badge: 'Мемориалдық тақта'
    },
    {
      title: 'Қалалық моншаның аулалық қасбеті мен кірпіш өрімі',
      source: '1920-жылдардағы кірпіш құрылыс техникасы',
      desc: 'Ғимараттың артқы қасбетіндегі мәнерлеп өрілген кірпіш карниздері, фронтоны мен қоршау құрылымы. Астаналық дәуір құрылысшылары мен инженерлерінің сапалы қалау дәстүрі.',
      image: '/images/kyzylorda_city_bathhouse_courtyard.jpg',
      badge: 'Инженерлік сәулет'
    },
    {
      title: 'Жоба жетекшісі Әбдікамал Мырхиев — Тарихи-мәдени мұраны қорғау орталығында',
      source: 'Далалық ғылыми-ізденіс жұмыстары (Қызылорда қаласы)',
      desc: 'Жоба жетекшісі, тарих пәні мұғалімі, педагог-зерттеуші Әбдікамал Мұқамбетқалиұлының Қызылорда облыстық тарихи-мәдени мұраны қорғау орталығының ғимараты алдындағы ғылыми-ізденіс сәті.',
      image: '/images/kyzylorda_researcher_heritage_center.jpg',
      badge: 'Жоба жетекшісі'
    },
    {
      title: 'Қызылорда облыстық тарихи-мәдени мұраны қорғау орталығы',
      source: 'Ресми мемлекеттік мекеме маңдайшасы мен QR-паспорт',
      desc: '«Қызылорда облысының мәдениет, архивтер және құжаттама басқармасының Қызылорда облыстық тарихи-мәдени мұраны қорғау орталығы» КММ. Астаналық дәуірдің тарихи-сәулеттік нысандарын мемлекеттік есепке алу мекемесі.',
      image: '/images/kyzylorda_heritage_center_plaque.jpg',
      badge: 'Мемлекеттік мекеме'
    },
    {
      title: '«Советская степь» газеті (1928 ж.): Қызылорда құрылысшы-инженерлерінің соты мен Үкімі',
      source: '«Советская степь» газеті (1928 жылғы түпнұсқа архивтік басылым)',
      desc: 'РСФСР Жоғарғы Сотының көшпелі сессиясының Теміржолшылар клубында өткен «Строители Кзыл-Орды перед пролетарским судом» сот процесі және 13-ші күні шығарылған тарихи Үкімі. М. Тынышбаев, Будасси, Попков және басқа инженер-техниктерге шығарылған үкім мәтіні.',
      image: '/images/kyzylorda_court_newspaper_1928.jpg',
      badge: 'Тарихи сот процесі (1928 ж.)'
    },
    {
      title: 'Мұрағаттағы ғылыми-ізденіс: Архив құжаттарын цифрлық зерделеу',
      source: 'Мұрағат қорындағы ғылыми-тәжірибелік зерттеу',
      desc: 'Жас зерттеушінің Қызылорда астаналық кезеңі мен «1928 жылғы инженерлер ісіне» қатысты түпнұсқалық мұрағат құжаттарын, есептер мен хаттамаларды компьютерлік базада ғылыми тұрғыдан зерделеу сәті.',
      image: '/images/kyzylorda_student_archive_research.jpg',
      badge: 'Мұрағаттық зерттеу'
    },
    {
      title: 'ҚР Орталық архиві, №31 Іс (1925 ж.): Тұрғын үйлерді қабылдау хаттамалары',
      source: 'Қазақстан Орталық мемлекеттік архиві (Архив №12, Тізімдеме №15)',
      desc: '1925 жылғы 12 шілде мен 1 қараша аралығындағы Қызылордада жаңадан салынған тұрғын үйлер мен пәтерлерді қабылдау жөніндегі Комиссия хаттамаларының мұрағаттық түпнұсқа мұқабасы (49 парақ).',
      image: '/images/kyzylorda_archive_delo31_housing.jpg',
      badge: 'Мұрағаттық іс (1925 ж.)'
    },
    {
      title: 'Қызылорда. Жаңа қала: Фрунзе көшесіндегі особняк (1926 ж.)',
      source: 'Е. Г. Малиновскаяның архивінен',
      desc: '1926 жылы Қызылорданың «Жаңа қала» бөлігінде Фрунзе көшесінде салынған, дөңгелек колонналы кіреберіс ротондасы бар тарихи тұрғын үй ғимараты.',
      image: '/images/kyzylorda_mansion_frunze_1926.jpg',
      badge: 'Тұрғын үй сәулеті (1926 ж.)'
    },
    {
      title: 'Қызылордадағы Ауыл шаруашылығы банкі ғимараты (1926 ж.)',
      source: 'Е. Г. Малиновскаяның архивінен (Сәулетші В. Н. Львов)',
      desc: '1926 жылы сәулетші В. Н. Львовтың жобасымен шығыстық аркалы галерея мен күмбез стилінде салынған Ауыл шаруашылығы банкінің бас ғимараты (18 негізгі нысанның бірі).',
      image: '/images/kyzylorda_selkhozbank_lvov_1926.jpg',
      badge: 'Банк ғимараты (1926 ж.)'
    }
  ];

  const filteredObjects = objectFilter === 'all' 
    ? constructedObjects 
    : constructedObjects.filter(o => o.category === objectFilter);

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Banner - Bright, Radiant, Golden Kazakh Identity */}
      <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white rounded-3xl p-6 md:p-10 border-2 border-amber-300 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white border border-white/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Landmark className="w-4 h-4 text-amber-200" /> 1928 жылғы Қызылордадағы инженерлер ісі
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-4 leading-tight drop-shadow-sm">
              1928 жылғы Қызылордадағы инженерлер ісі
            </h2>
            <p className="text-white/95 text-base md:text-lg leading-relaxed font-medium">
              Қызылорданың астаналық кезеңіндегі (1925–1929 жж.) ауқымды құрылыс пен инфрақұрылымның қалыптасуы, Мұхамеджан Тынышбаев, Аспандияр Кенжин сынды инженер-мамандардың қажырлы қызметі және «инженерлер ісі» аясындағы тарихи архивтік оқиғалар шежіресі.
            </p>
          </div>

          {/* Right Hero Archival Photos Preview Grid (4 key photos) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 relative z-10">
            <div 
              onClick={() => setSelectedImage(galleryItems.find(g => g.image.includes('court_newspaper')) || galleryItems[0])}
              className="group cursor-pointer rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg relative bg-black/20 hover:scale-105 transition-all"
            >
              <img 
                src={getImageUrl('/images/kyzylorda_court_newspaper_1928.jpg')} 
                alt="1928 жылғы Сот үкімі" 
                className="w-full h-28 object-cover group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-yellow-300">1928 ж. Сот үкімі</span>
                <span className="text-[9px] text-white/90 line-clamp-1">«Советская степь» газеті</span>
              </div>
            </div>

            <div 
              onClick={() => setSelectedImage(galleryItems.find(g => g.image.includes('prikaz_tynyshpaev')) || galleryItems[1])}
              className="group cursor-pointer rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg relative bg-black/20 hover:scale-105 transition-all"
            >
              <img 
                src={getImageUrl('/images/kyzylorda_prikaz_tynyshpaev.jpg')} 
                alt="№12 Бұйрық М. Тынышбаев" 
                className="w-full h-28 object-cover group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-yellow-300">№12 Бұйрық (1925 ж.)</span>
                <span className="text-[9px] text-white/90 line-clamp-1">М. Тынышбаевқа өкілеттік</span>
              </div>
            </div>

            <div 
              onClick={() => setSelectedImage(galleryItems.find(g => g.image.includes('government')) || galleryItems[2])}
              className="group cursor-pointer rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg relative bg-black/20 hover:scale-105 transition-all"
            >
              <img 
                src={getImageUrl('/images/kyzylorda_government.jpg')} 
                alt="Үкімет үйі" 
                className="w-full h-28 object-cover group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-yellow-300">Үкімет үйі (1927 ж.)</span>
                <span className="text-[9px] text-white/90 line-clamp-1">Сәулетші В. Н. Львов</span>
              </div>
            </div>

            <div 
              onClick={() => setSelectedImage(galleryItems.find(g => g.image.includes('selkhozbank')) || galleryItems[3])}
              className="group cursor-pointer rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg relative bg-black/20 hover:scale-105 transition-all"
            >
              <img 
                src={getImageUrl('/images/kyzylorda_selkhozbank_lvov_1926.jpg')} 
                alt="Ауыл шаруашылығы банкі" 
                className="w-full h-28 object-cover group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-yellow-300">Ауыл шар. банкі</span>
                <span className="text-[9px] text-white/90 line-clamp-1">1926 ж. салынған сәулет</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Passport Metadata Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/20 relative z-10">
          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/30 flex items-start gap-3 shadow-xs">
            <div className="p-2.5 bg-yellow-400 text-amber-950 rounded-xl flex-shrink-0 font-bold shadow">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-yellow-200 font-bold">Бағыты мен секциясы</p>
              <p className="text-sm font-bold text-white">Қоғамдық-гуманитарлық</p>
              <p className="text-xs text-white/90">Секция: «Өлкетану» • Пәні: Қазақстан тарихы</p>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/30 flex items-start gap-3 shadow-xs">
            <div className="p-2.5 bg-yellow-400 text-amber-950 rounded-xl flex-shrink-0 font-bold shadow">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-yellow-200 font-bold">Орындаушы</p>
              <p className="text-sm font-bold text-white">Мертебе Әмина Ғалымжанқызы</p>
              <p className="text-xs text-white/90">11-сынып оқушысы</p>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/30 flex items-start gap-3 shadow-xs">
            <div className="p-2.5 bg-yellow-400 text-amber-950 rounded-xl flex-shrink-0 font-bold shadow">
              <School className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-yellow-200 font-bold">Жоба жетекшісі</p>
              <p className="text-sm font-bold text-white">Мырхиев Әбдікамал Мұқамбетқалиұлы</p>
              <p className="text-xs text-white/90">Тарих пәні мұғалімі, педагог-зерттеуші</p>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/30 flex items-start gap-3 shadow-xs">
            <div className="p-2.5 bg-yellow-400 text-amber-950 rounded-xl flex-shrink-0 font-bold shadow">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-yellow-200 font-bold">Ғылыми жетекшісі</p>
              <p className="text-sm font-bold text-white">Тайман С. Т.</p>
              <p className="text-xs text-white/90 leading-snug">Қорқыт ата атындағы ҚУ, ГПИ директоры, т.ғ.к., доцент</p>
            </div>
          </div>
        </div>

        {/* Quick Nav Tabs */}
        <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-white/20 relative z-10">
          <button
            onClick={() => setActiveTab('passport')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'passport' 
                ? 'bg-white text-amber-950 shadow-xl scale-105 border border-amber-300' 
                : 'bg-black/20 text-white hover:bg-black/30 border border-white/20'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" /> Ғылыми жоба төлқұжаты
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'overview' 
                ? 'bg-white text-amber-950 shadow-xl scale-105 border border-amber-300' 
                : 'bg-black/20 text-white hover:bg-black/30 border border-white/20'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-500" /> 1.1. Астанаға көшу және қала жағдайы
          </button>
          <button
            onClick={() => setActiveTab('construction')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'construction' 
                ? 'bg-white text-amber-950 shadow-xl scale-105 border border-amber-300' 
                : 'bg-black/20 text-white hover:bg-black/30 border border-white/20'
            }`}
          >
            <Building className="w-4 h-4 text-amber-500" /> 1.2. Инженерлік-техникалық мамандар
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'table' 
                ? 'bg-white text-amber-950 shadow-xl scale-105 border border-amber-300' 
                : 'bg-black/20 text-white hover:bg-black/30 border border-white/20'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-500" /> 1-кесте: Тұрғын үй қоры
          </button>
          <button
            onClick={() => setActiveTab('objects')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'objects' 
                ? 'bg-white text-amber-950 shadow-xl scale-105 border border-amber-300' 
                : 'bg-black/20 text-white hover:bg-black/30 border border-white/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-amber-500" /> 18 жаңа нысан тізімі
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'gallery' 
                ? 'bg-white text-amber-950 shadow-xl scale-105 border border-amber-300' 
                : 'bg-black/20 text-white hover:bg-black/30 border border-white/20'
            }`}
          >
            <Maximize2 className="w-4 h-4 text-amber-500" /> Архивтік фотолар мен Сызба
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'sources' 
                ? 'bg-white text-amber-950 shadow-xl scale-105 border border-amber-300' 
                : 'bg-black/20 text-white hover:bg-black/30 border border-white/20'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-500" /> Дереккөздер мен әдебиеттер
          </button>
        </div>
      </div>

      {/* Stats Cards - Bright and Vibrant */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {historicalStats.map((stat, idx) => (
          <div key={idx} className="bg-gradient-to-br from-amber-50/90 to-orange-50/50 border-2 border-amber-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-md hover:border-amber-400 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 bg-white rounded-xl shadow-2xs border border-amber-100">{stat.icon}</span>
            </div>
            <p className="text-xl font-black font-serif text-amber-950 mb-1">{stat.value}</p>
            <p className="text-xs font-bold text-gray-800 leading-tight mb-1">{stat.label}</p>
            <p className="text-[11px] text-gray-500 leading-snug">{stat.note}</p>
          </div>
        ))}
      </div>

      {/* TAB 0: Ғылыми жоба төлқұжаты (Project Passport) */}
      {activeTab === 'passport' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border-2 border-golden/40 p-6 md:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-golden/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo/5 rounded-full blur-2xl pointer-events-none"></div>

            {/* Official Academic Seal & Title */}
            <div className="text-center max-w-3xl mx-auto border-b-2 border-golden/30 pb-8 mb-8 relative z-10">
              <div className="inline-flex items-center gap-2 bg-indigo/10 text-indigo px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                <Award className="w-4 h-4 text-golden" /> Ғылыми-зерттеу жобасының ресми төлқұжаты
              </div>
              <h3 className="text-2xl md:text-4xl font-serif font-bold text-indigo mb-3 leading-tight">
                «1928 жылғы Қызылордадағы инженерлер ісі»
              </h3>
              <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                Қазақстанның астаналық тарихы, қала құрылысы мен инфрақұрылымы және 1928 жылғы инженер-мамандарға қатысты сот процесі мен архивтік деректерді зерттеу
              </p>

              <div className="flex flex-wrap justify-center gap-2 mt-5">
                <span className="bg-parchment border border-golden/40 text-indigo text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs">
                  <strong>Бағыты:</strong> Қоғамдық-гуманитарлық
                </span>
                <span className="bg-terracotta/10 border border-terracotta/20 text-terracotta text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs">
                  <strong>Секция:</strong> «Өлкетану»
                </span>
                <span className="bg-golden/20 border border-golden/40 text-indigo text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs">
                  <strong>Пәні:</strong> Қазақстан тарихы
                </span>
                <span className="bg-indigo text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs">
                  <strong>Сыныбы:</strong> 11-сынып
                </span>
              </div>
            </div>

            {/* 3 Academic Roles Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
              {/* Student Performer */}
              <div className="bg-gradient-to-b from-parchment/90 to-parchment/40 rounded-2xl border-2 border-golden/30 p-6 flex flex-col justify-between hover:shadow-lg transition-all group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo text-golden flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-full">
                    Зерттеуші-орындаушы
                  </span>
                  <h4 className="font-serif font-bold text-xl text-indigo mt-3 mb-1">
                    Мертебе Әмина Ғалымжанқызы
                  </h4>
                  <p className="text-xs font-semibold text-gray-500 mb-4">
                    11-сынып оқушысы
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    Қызылорданың астаналық кезеңіндегі құрылыс пен инфрақұрылым тарихын, ҚР Орталық архивінің №31 Ісін, 1928 жылғы «Советская степь» газетінің сот материалдарын кешенді зерттеп, жүйелеуші ғылыми зерттеу авторы.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-golden/20 flex items-center justify-between text-[11px] text-gray-600 font-semibold">
                  <span>Статусы: Оқушы-зерттеуші</span>
                  <span className="text-terracotta font-bold">11-сынып</span>
                </div>
              </div>

              {/* Teacher Supervisor */}
              <div className="bg-gradient-to-b from-amber-50 to-orange-50/30 rounded-2xl border-2 border-amber-300 p-6 flex flex-col justify-between hover:shadow-lg transition-all group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    <School className="w-8 h-8" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                    Жоба жетекшісі
                  </span>
                  <h4 className="font-serif font-bold text-xl text-amber-950 mt-3 mb-1">
                    Мырхиев Әбдікамал Мұқамбетқалиұлы
                  </h4>
                  <p className="text-xs font-semibold text-gray-500 mb-4">
                    Тарих пәні мұғалімі, педагог-зерттеуші
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    Педагогика ғылымдарының магистрі, тарих пәні мұғалімі, педагог-зерттеуші. Оқушының өлкетанулық ғылыми-зерттеу ізденісіне, деректанулық талдауына және ғылыми құрылымына әдістемелік жетекшілік етуші.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-amber-200 flex items-center justify-between text-[11px] text-gray-600 font-semibold">
                  <span>Мамандануы: Тарих пәні</span>
                  <span className="text-amber-800 font-bold">Педагог-зерттеуші</span>
                </div>
              </div>

              {/* Scientific Supervisor (University) */}
              <div className="bg-gradient-to-b from-parchment/90 to-parchment/40 rounded-2xl border-2 border-golden/30 p-6 flex flex-col justify-between hover:shadow-lg transition-all group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-terracotta text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    <BadgeCheck className="w-8 h-8" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-golden bg-indigo px-2.5 py-0.5 rounded-full">
                    Ғылыми жетекшісі
                  </span>
                  <h4 className="font-serif font-bold text-xl text-indigo mt-3 mb-1">
                    Тайман Сағат Тайманұлы
                  </h4>
                  <p className="text-xs font-semibold text-gray-500 mb-4">
                    Тарих ғылымдарының кандидаты, доцент
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    Қорқыт ата атындағы Қызылорда университеті, Гуманитарлық педагогикалық институтының директоры. Жобаның академиялық ғылыми сараптамасын, тарихи деректанулық дұрыстығы мен архивтік деректер сабақтастығын қадағалаушы кеңесші.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-golden/20 flex items-center justify-between text-[11px] text-gray-600 font-semibold">
                  <span>Мекеме: Қорқыт ата атындағы ҚУ</span>
                  <span className="text-terracotta font-bold">т.ғ.к., доцент</span>
                </div>
              </div>
            </div>

            {/* Passport Detail Specification Table */}
            <div className="border border-golden/30 rounded-2xl overflow-hidden shadow-sm relative z-10">
              <div className="bg-indigo text-white px-6 py-3.5 font-serif font-bold text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-golden" /> Ғылыми-зерттеу жұмысының құрылымдық паспорты
              </div>
              <div className="divide-y divide-golden/20 bg-parchment/30 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2 hover:bg-white/60 transition-colors">
                  <span className="font-bold text-indigo">Зерттеу тақырыбы:</span>
                  <span className="md:col-span-2 text-gray-800 font-semibold">
                    «1928 жылғы Қызылордадағы инженерлер ісі»
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2 hover:bg-white/60 transition-colors">
                  <span className="font-bold text-indigo">Ғылыми бағыты мен секциясы:</span>
                  <span className="md:col-span-2 text-gray-700 leading-relaxed">
                    Қоғамдық-гуманитарлық бағыт, «Өлкетану» секциясы, Қазақстан тарихы пәні.
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2 hover:bg-white/60 transition-colors">
                  <span className="font-bold text-indigo">Зерттеудің өзектілігі:</span>
                  <span className="md:col-span-2 text-gray-700 leading-relaxed">
                    Қазақ АКСР-і астанасының Орынбордан Ақмешітке (Қызылордаға) көшірілуі (1925 ж.) және осы кезеңдегі мемлекеттік құрылыс пен инфрақұрылымды дамытудағы ұлттық зиялылар мен инженерлік мамандардың қызметін зерделеу. 1928 жылы орын алған саяси астары бар «инженерлер ісінің» тарихи ақиқатын тың архив құжаттары арқылы қалпына келтіру.
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2 hover:bg-white/60 transition-colors">
                  <span className="font-bold text-indigo">Зерттеу мақсаты:</span>
                  <span className="md:col-span-2 text-gray-700 leading-relaxed">
                    Қызылорданың астаналық кезеңіндегі (1925–1929 жж.) құрылыс, тұрғын үй қоры, инфрақұрылымды дамытудағы инженер-техникалық мамандардың (М. Тынышбаев, А. Кенжин, А. Серғазиев, т.б.) рөлін және 1928 жылғы сот процесінің себеп-салдарын архивтік деректер негізінде кешенді түрде зерттеу.
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2 hover:bg-white/60 transition-colors">
                  <span className="font-bold text-indigo">Деректік және архивтік базасы:</span>
                  <span className="md:col-span-2 text-gray-700 leading-relaxed">
                    ҚР Орталық мемлекеттік архиві (ҚР ОМА, №31 Іс — тұрғын үйлерді қабылдау хаттамалары, №12 Бұйрық, ҚазОАК №14 Хаттамасы), «Советская степь» газетінің 1928 жылғы түпнұсқалық сот материалдары мен үкімі, сәулетші В. Н. Львов сызбалары, Е. Г. Малиновскаяның архиві, 28 бірегей фотоқұжат пен мұрағаттық жәдігерлер.
                  </span>
                </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2 hover:bg-white/60 transition-colors">
                  <span className="font-bold text-indigo">Ғылыми жаңалығы мен практикалық маңызы:</span>
                  <span className="md:col-span-2 text-gray-700 leading-relaxed">
                    Зерттеу барысында алғаш рет тың архив деректері, сирек фотосуреттер мен 1928 жылғы сот үкімінің мәтіні цифрлық кешенге біріктіріліп, «1928 жылғы Қызылордадағы инженерлер ісі» тақырыбы бойынша мектеп пен жоғары оқу орындарына арналған электронды тарихи зертхана ретінде практикалық қолданысқа ұсынылды.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

                {/* Primary Source Document Highlights in 1.1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-golden/20">
                  <div 
                    className="bg-white p-4 rounded-xl border border-golden/40 shadow-sm cursor-pointer hover:shadow-md transition-all group"
                    onClick={() => setSelectedImage({
                      title: 'СНК №14 Хаттамасы: А. Кенжин баяндамасы және Ағаш отырғызу мерекесі',
                      source: 'Қазақ АКСР Халық Комиссарлары Кеңесі (17 наурыз 1925 ж.)',
                      desc: 'Аспандияр Кенжиннің жаңа астана құрылысы жөніндегі баяндамасы: жаңа қаланың кварталдарын бөлу, арықтар жүйесін тарту, көгалдандыру және қалада «Ағаш отырғызу мерекесін» өткізу туралы шешімі.',
                      image: '/images/kyzylorda_snk_protocol14_kenzhin.jpg',
                      badge: 'СНК Хаттамасы (1925 ж.)'
                    })}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full uppercase">
                        Архив құжаты (1925 ж.)
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-indigo opacity-60 group-hover:opacity-100" />
                    </div>
                    <div className="h-32 rounded bg-black/5 flex items-center justify-center overflow-hidden mb-2">
                      <img 
                        src={getImageUrl('/images/kyzylorda_snk_protocol14_kenzhin.jpg')} 
                        alt="СНК Хаттамасы" 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                      />
                    </div>
                    <h5 className="font-serif font-bold text-indigo text-xs line-clamp-1 group-hover:text-terracotta">
                      А. Кенжин: Көгалдандыру мен арықтар жүйесі
                    </h5>
                    <p className="text-[11px] text-gray-500 line-clamp-2">
                      «...произвести разбивку кварталов с одновременным проведением арыков, обсадкой деревьями... устроить праздник древонасаждения»
                    </p>
                  </div>

                  <div 
                    className="bg-white p-4 rounded-xl border border-golden/40 shadow-sm cursor-pointer hover:shadow-md transition-all group"
                    onClick={() => setSelectedImage({
                      title: '1500 қызметкерді орналастыру және Үлкен театр жобасы',
                      source: '1925 жылғы тарихи есеп-қисап құжаты (39-бет)',
                      desc: 'Көшіп келетін 1500 қызметкерге адам басына 1 шаршы сажыннан бөлме есептеу, банктер, 700-800 орындық театр, 100 сажындық монша және Мәскеумен байланыс туралы.',
                      image: '/images/kyzylorda_budget_sazhen_calculation.jpg',
                      badge: 'Тұрғын үй мен Театр есебі'
                    })}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-indigo bg-indigo/10 px-2 py-0.5 rounded-full uppercase">
                        Қаржылық-кеңістіктік есеп
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-indigo opacity-60 group-hover:opacity-100" />
                    </div>
                    <div className="h-32 rounded bg-black/5 flex items-center justify-center overflow-hidden mb-2">
                      <img 
                        src={getImageUrl('/images/kyzylorda_budget_sazhen_calculation.jpg')} 
                        alt="Есеп құжаты" 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                      />
                    </div>
                    <h5 className="font-serif font-bold text-indigo text-xs line-clamp-1 group-hover:text-terracotta">
                      1500 қызметкер, 700–800 орындық театр есебі
                    </h5>
                    <p className="text-[11px] text-gray-500 line-clamp-2">
                      «Итого 1445 чел. Округляем до 1500 чел. ...постройка большого театра на 700-800 чел. ...постройка бани 100 кв. саж.»
                    </p>
                  </div>

                  <div 
                    className="bg-white p-4 rounded-xl border border-golden/40 shadow-sm cursor-pointer hover:shadow-md transition-all group"
                    onClick={() => setSelectedImage({
                      title: 'Қызылорданың тарихи қалалық моншасы (Бас қасбет)',
                      source: 'ХХ ғасырдың тарихи сәулет ескерткіші',
                      desc: '1925 жылғы астана құрылысы жоспарында белгіленген «100 сажындық монша» және қаланың коммуналдық инфрақұрылымының маңызды нысаны. Қызыл кірпіштен қаланған өзіндік сәулеттік нақышы бүгінге дейін сақталған.',
                      image: '/images/kyzylorda_city_bathhouse_facade.jpg',
                      badge: 'Сәулет ескерткіші'
                    })}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-golden bg-golden/20 px-2 py-0.5 rounded-full uppercase text-amber-900">
                        Сақталған нысан
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-indigo opacity-60 group-hover:opacity-100" />
                    </div>
                    <div className="h-32 rounded bg-black/5 flex items-center justify-center overflow-hidden mb-2">
                      <img 
                        src={getImageUrl('/images/kyzylorda_city_bathhouse_facade.jpg')} 
                        alt="Қалалық монша" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      />
                    </div>
                    <h5 className="font-serif font-bold text-indigo text-xs line-clamp-1 group-hover:text-terracotta">
                      Тарихи қалалық монша ғимараты
                    </h5>
                    <p className="text-[11px] text-gray-500 line-clamp-2">
                      «...постройка бани 100 кв. саж.» — 1925 жылғы құрылыс жоспарының бүгінге жеткен кірпіш сәулеті
                    </p>
                  </div>
                </div>
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

              {/* Primary Source Document Spotlight (4 Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                <div 
                  className="bg-parchment p-4 rounded-xl border-2 border-golden/40 shadow-sm cursor-pointer hover:shadow-lg transition-all group flex flex-col justify-between"
                  onClick={() => setSelectedImage({
                    title: '1925 жылғы 10 наурыздағы №12 тарихи бұйрық',
                    source: 'ҚР Орталық мемлекеттік архиві (Ф-2, Оп. 2, Д. 99, Л. 60)',
                    desc: 'Аспандияр Кенжиннің инженер Мұхамеджан Тынышбаевқа Ақмешіттегі құрылыс пен қаржыны басқару бойынша толық өкілеттік беру туралы түпнұсқа тарихи бұйрығы.',
                    image: '/images/kyzylorda_prikaz_tynyshpaev.jpg',
                    badge: 'Архивтік бұйрық (Түпнұсқа)'
                  })}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Архив құжаты
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-indigo opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="h-36 overflow-hidden rounded-lg border border-golden/30 mb-2 bg-black/5 flex items-center justify-center">
                      <img 
                        src={getImageUrl('/images/kyzylorda_prikaz_tynyshpaev.jpg')} 
                        alt="№12 Бұйрық" 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h5 className="font-serif font-bold text-indigo text-sm mb-1 group-hover:text-terracotta transition-colors line-clamp-2">
                      №12 бұйрық: М. Тынышбаевқа өкілеттік
                    </h5>
                    <p className="text-[11px] text-gray-600 line-clamp-3">
                      «Заместителем своим во всех делах Комиссии оставляю Члена Комиссии тов. Тынышпаева М. Т. с предоставлением ему полного права...» (10 наурыз 1925 ж.)
                    </p>
                  </div>
                </div>

                <div 
                  className="bg-parchment p-4 rounded-xl border-2 border-golden/40 shadow-sm cursor-pointer hover:shadow-lg transition-all group flex flex-col justify-between"
                  onClick={() => setSelectedImage({
                    title: 'ҚазОАК №14 Хаттамасы: М. Тынышбаевтың қала жоспарын бекітуі',
                    source: 'Қазақ Орталық Атқару Комитеті президиумы (1 қараша 1925 ж.)',
                    desc: 'М. Тынышбаевтың баяндамасы бойынша Қызылорданың Регуляциялық бас жоспарын бекіту, теміржол артынан арнайы жұмысшылар кварталын бақтармен қамтамасыз етіп салу туралы тарихи қаулы.',
                    image: '/images/kyzylorda_protocol14_tynyshbaev.jpg',
                    badge: 'ҚазОАК Хаттамасы (1925 ж.)'
                  })}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-indigo bg-indigo/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Бас жоспарды бекіту
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-indigo opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="h-36 overflow-hidden rounded-lg border border-golden/30 mb-2 bg-black/5 flex items-center justify-center">
                      <img 
                        src={getImageUrl('/images/kyzylorda_protocol14_tynyshbaev.jpg')} 
                        alt="ҚазОАК Хаттамасы" 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h5 className="font-serif font-bold text-indigo text-sm mb-1 group-hover:text-terracotta transition-colors line-clamp-2">
                      ҚазОАК №14 Хаттамасы: Бас жоспар
                    </h5>
                    <p className="text-[11px] text-gray-600 line-clamp-3">
                      М. Тынышбаевтың баяндамасы бойынша Қызылорданың реттеу жоспарын бекіту және жұмысшы кварталдарын саябақтармен жобалау қаулысы.
                    </p>
                  </div>
                </div>

                <div 
                  className="bg-parchment p-4 rounded-xl border-2 border-golden/40 shadow-sm cursor-pointer hover:shadow-lg transition-all group flex flex-col justify-between"
                  onClick={() => setSelectedImage({
                    title: 'Сәулетші В. Н. Львовтың жобалары мен портреті',
                    source: '1925–1927 жж. сәулеттік жобалау қорларынан',
                    desc: 'В. Н. Львов жобалаған мемлекеттік нысандардың (Үкімет үйі, тұрғын үйлер) қасбеттері мен сәулетшінің тарихи фотосы.',
                    image: '/images/kyzylorda_architect_lvov_project.jpg',
                    badge: 'Сәулеттік сызбалар'
                  })}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-golden bg-golden/20 px-2 py-0.5 rounded-full uppercase tracking-wider text-amber-900">
                        Сәулеттік сызбалар
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-indigo opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="h-36 overflow-hidden rounded-lg border border-golden/30 mb-2 bg-black/5 flex items-center justify-center">
                      <img 
                        src={getImageUrl('/images/kyzylorda_architect_lvov_project.jpg')} 
                        alt="В. Н. Львов жобасы" 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h5 className="font-serif font-bold text-indigo text-sm mb-1 group-hover:text-terracotta transition-colors line-clamp-2">
                      В. Н. Львов жобалары мен сызбалары
                    </h5>
                    <p className="text-[11px] text-gray-600 line-clamp-3">
                      Қызылордада 70-ке жуық жаңа нысанды жобалаған архитектордың ғимарат қасбеттері мен түпнұсқа портреті.
                    </p>
                  </div>
                </div>

                <div 
                  className="bg-parchment p-4 rounded-xl border-2 border-golden/40 shadow-sm cursor-pointer hover:shadow-lg transition-all group flex flex-col justify-between"
                  onClick={() => setSelectedImage({
                    title: 'Теміржолшылар клубы (1924 ж.) — Мемориалдық тақта',
                    source: 'Мемлекеттік қорғаудағы тарихи ескерткіш тақтасы',
                    desc: '1924 жылы бой көтерген тарихи «Теміржолшылар клубы ғимараты». 1928 жылы дәл осы ғимаратта РСФСР Жоғарғы Сотының инженерлерге арналған сот процесі өтті. Бүгінде Қызылорда Жастар театры орналасқан.',
                    image: '/images/kyzylorda_railway_club_monument.jpg',
                    badge: 'Мемориалдық тақта (1924 ж.)'
                  })}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        1924 жылғы ескерткіш
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-indigo opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="h-36 overflow-hidden rounded-lg border border-golden/30 mb-2 bg-black/5 flex items-center justify-center">
                      <img 
                        src={getImageUrl('/images/kyzylorda_railway_club_monument.jpg')} 
                        alt="Теміржолшылар клубы" 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h5 className="font-serif font-bold text-indigo text-sm mb-1 group-hover:text-terracotta transition-colors line-clamp-2">
                      Теміржолшылар клубы (Сот өткен орын)
                    </h5>
                    <p className="text-[11px] text-gray-600 line-clamp-3">
                      1928 жылғы инженерлер соты өткен ғимарат. Бүгінгі Жастар театрының қабырғасындағы қорғау тақтасы.
                    </p>
                  </div>
                </div>

                <div 
                  className="bg-parchment p-4 rounded-xl border-2 border-golden/40 shadow-sm cursor-pointer hover:shadow-lg transition-all group flex flex-col justify-between"
                  onClick={() => setSelectedImage({
                    title: '«Советская степь» газеті (1928 ж.): Қызылорда құрылысшы-инженерлерінің соты мен Үкімі',
                    source: '«Советская степь» газеті (1928 жылғы түпнұсқа архивтік басылым)',
                    desc: 'РСФСР Жоғарғы Сотының көшпелі сессиясының Теміржолшылар клубында өткен «Строители Кзыл-Орды перед пролетарским судом» сот процесі және 13-ші күні шығарылған тарихи Үкімі. М. Тынышбаев, Будасси, Попков және басқа инженер-техниктерге шығарылған үкім мәтіні.',
                    image: '/images/kyzylorda_court_newspaper_1928.jpg',
                    badge: 'Тарихи сот процесі (1928 ж.)'
                  })}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        1928 ж. Сот және Үкім
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-indigo opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="h-36 overflow-hidden rounded-lg border border-golden/30 mb-2 bg-black/5 flex items-center justify-center">
                      <img 
                        src={getImageUrl('/images/kyzylorda_court_newspaper_1928.jpg')} 
                        alt="«Советская степь» газеті (1928 ж.)" 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h5 className="font-serif font-bold text-indigo text-sm mb-1 group-hover:text-terracotta transition-colors line-clamp-2">
                      «Советская степь»: Сот пен Үкім мәтіні
                    </h5>
                    <p className="text-[11px] text-gray-600 line-clamp-3">
                      «В Верховном суде. Строители Кзыл-Орды перед пролетарским судом. Приговор: инженеры Танышпаев, Попков...»
                    </p>
                  </div>
                </div>
              </div>

              {/* 1928 Engineers Case Trial Callout */}
              <div className="bg-gradient-to-r from-red-950/5 via-amber-950/5 to-indigo-950/5 border-2 border-terracotta/30 p-6 rounded-2xl my-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div 
                    onClick={() => setSelectedImage({
                      title: '«Советская степь» газеті (1928 ж.): Қызылорда құрылысшы-инженерлерінің соты мен Үкімі',
                      source: '«Советская степь» газеті (1928 жылғы түпнұсқа архивтік басылым)',
                      desc: 'РСФСР Жоғарғы Сотының көшпелі сессиясының Теміржолшылар клубында өткен «Строители Кзыл-Орды перед пролетарским судом» сот процесі және 13-ші күні шығарылған тарихи Үкімі. М. Тынышбаев, Будасси, Попков және басқа инженер-техниктерге шығарылған үкім мәтіні.',
                      image: '/images/kyzylorda_court_newspaper_1928.jpg',
                      badge: 'Тарихи сот процесі (1928 ж.)'
                    })}
                    className="w-full md:w-56 flex-shrink-0 cursor-pointer group"
                  >
                    <div className="h-44 rounded-xl overflow-hidden border border-terracotta/40 bg-black/5 shadow-sm relative">
                      <img 
                        src={getImageUrl('/images/kyzylorda_court_newspaper_1928.jpg')} 
                        alt="Газет түпнұсқасы" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      />
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" /> Үлкейту
                      </span>
                    </div>
                    <p className="text-[11px] text-center text-terracotta font-semibold mt-2 group-hover:underline">
                      «Советская степь» (1928 ж. түпнұсқасы)
                    </p>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta border border-terracotta/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Тарихи құжаттық айғақ • 1928 жыл
                    </div>
                    <h4 className="font-serif font-bold text-indigo text-xl">
                      Қызылордадағы құрылысшы-инженерлер соты және РСФСР Жоғарғы Сотының Үкімі
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">
                      1928 жылы Қызылордадағы <strong>Теміржолшылар клубы</strong> ғимаратында РСФСР Жоғарғы Сотының көшпелі сессиясы (төрағасы Егоров, прокурор Арсеньев) жаңа астана құрылысын жүргізген инженерлер мен техниктердің үстінен саяси астары бар үлкен сот процесін өткізді.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-700">
                      <div className="bg-white/90 p-3.5 rounded-lg border border-golden/30 shadow-xs">
                        <strong className="text-indigo block mb-1">Ақталғандар мен шартты сотталғандар:</strong>
                        Инженерлер Маркушевич пен Баграков — толық ақталды. Инженерлер Ефремов, Богинский, Шлом, техниктер Крисанов, Суханов — 1 жылға шартты кесілді. Инженерлер <strong>Мұхамеджан Тынышбаев</strong> пен Попковқа — 2 жыл шартты жаза берілді.
                      </div>
                      <div className="bg-white/90 p-3.5 rounded-lg border border-golden/30 shadow-xs">
                        <strong className="text-terracotta block mb-1">Бас бостандығынан айырылғандар:</strong>
                        Құрылыс бюросының бастығы инженер Будасси — 4 жылға, бас бухгалтер Осокин мен инженер Гольдгор — 3 жылға, Акаев — 2 жылға қатаң оқшаулау жазасына үкімделді.
                      </div>
                    </div>
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

              {/* Field Research & Preserved Architecture Showcase */}
              <div className="mt-8 pt-6 border-t border-golden/30">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-serif font-bold text-indigo text-xl flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-terracotta" /> Бүгінгі күнге жеткен тарихи сәулет және далалық ғылыми ізденіс
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">Астаналық дәуірдің (1925–1929 жж.) сақталған нысандары мен тарихи-мәдени мұраны қорғау орталығы</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {/* Card 1: City Bathhouse Facade */}
                  <div 
                    onClick={() => setSelectedImage({
                      title: 'Қызылорданың тарихи қалалық моншасы (Бас қасбет)',
                      source: 'ХХ ғасырдың тарихи сәулет ескерткіші',
                      desc: '1925 жылғы астана құрылысы жоспарында белгіленген «100 сажындық монша» және қаланың коммуналдық инфрақұрылымының маңызды нысаны. Қызыл кірпіштен қаланған өзіндік сәулеттік нақышы бүгінге дейін сақталған.',
                      image: '/images/kyzylorda_city_bathhouse_facade.jpg',
                      badge: 'Сәулет ескерткіші'
                    })}
                    className="bg-parchment rounded-xl border-2 border-golden/30 p-3.5 hover:border-terracotta shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 rounded-lg overflow-hidden relative mb-3 bg-black/5">
                        <img 
                          src={getImageUrl('/images/kyzylorda_city_bathhouse_facade.jpg')} 
                          alt="Қалалық монша" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute top-2 left-2 bg-indigo/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          Қалалық монша (ХХ ғ.)
                        </span>
                        <Maximize2 className="absolute bottom-2 right-2 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                      </div>
                      <h5 className="font-serif font-bold text-indigo text-sm group-hover:text-terracotta transition-colors mb-1">
                        Тарихи қалалық моншаның бас қасбеті
                      </h5>
                      <p className="text-[11px] text-gray-600 line-clamp-2">
                        1925 жылғы құрылыс жоспарындағы «100 сажындық монша» нысаны. Қызыл кірпішті классикалық сәулет өнері.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: City Bathhouse Plaque & Lantern */}
                  <div 
                    onClick={() => setSelectedImage({
                      title: 'Қалалық монша — Мемориалдық тақта мен көне шамдал',
                      source: 'Мемлекеттік тізілімдегі тарихи-мәдени нысан',
                      desc: 'Ғимарат қабырғасындағы мемлекеттік қорғау тақтасы: «ҚАЛАЛЫҚ МОНША, ХХ ғ.». ХХ ғасыр басындағы қалалық инженерлік желі мен көше сәулеті элементтерінің көрінісі.',
                      image: '/images/kyzylorda_city_bathhouse_plaque.jpg',
                      badge: 'Мемориалдық тақта'
                    })}
                    className="bg-parchment rounded-xl border-2 border-golden/30 p-3.5 hover:border-terracotta shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 rounded-lg overflow-hidden relative mb-3 bg-black/5">
                        <img 
                          src={getImageUrl('/images/kyzylorda_city_bathhouse_plaque.jpg')} 
                          alt="Мемориалдық тақта" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute top-2 left-2 bg-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          Мемориалдық тақта
                        </span>
                        <Maximize2 className="absolute bottom-2 right-2 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                      </div>
                      <h5 className="font-serif font-bold text-indigo text-sm group-hover:text-terracotta transition-colors mb-1">
                        «Қалалық монша ХХ ғ.» қорғау тақтасы
                      </h5>
                      <p className="text-[11px] text-gray-600 line-clamp-2">
                        Мемлекет қорғауындағы тарихи нысан ресми тақтасы және сол кезең стиліндегі көне шамдал.
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Researcher & Heritage Center */}
                  <div 
                    onClick={() => setSelectedImage({
                      title: 'Жоба жетекшісі Әбдікамал Мырхиев — Тарихи-мәдени мұраны қорғау орталығында',
                      source: 'Далалық ғылыми-ізденіс жұмыстары (Қызылорда қаласы)',
                      desc: 'Жоба жетекшісі, тарих пәні мұғалімі, педагог-зерттеуші Әбдікамал Мұқамбетқалиұлының Қызылорда облыстық тарихи-мәдени мұраны қорғау орталығының ғимараты алдындағы ғылыми-ізденіс сәті.',
                      image: '/images/kyzylorda_researcher_heritage_center.jpg',
                      badge: 'Жоба жетекшісі'
                    })}
                    className="bg-parchment rounded-xl border-2 border-golden/30 p-3.5 hover:border-terracotta shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 rounded-lg overflow-hidden relative mb-3 bg-black/5">
                        <img 
                          src={getImageUrl('/images/kyzylorda_researcher_heritage_center.jpg')} 
                          alt="Жоба жетекшісі Ә. Мырхиев" 
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          Жоба жетекшісі
                        </span>
                        <Maximize2 className="absolute bottom-2 right-2 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                      </div>
                      <h5 className="font-serif font-bold text-indigo text-sm group-hover:text-terracotta transition-colors mb-1">
                        Жоба жетекшісі Ә. Мырхиевтің жұмысы
                      </h5>
                      <p className="text-[11px] text-gray-600 line-clamp-2">
                        Тарихи-мәдени мұраны қорғау орталығының тарихи ғимараты алдындағы ғылыми жетекшілік ізденісі.
                      </p>
                    </div>
                  </div>

                  {/* Card 4: Student Archival Research */}
                  <div 
                    onClick={() => setSelectedImage({
                      title: 'Мұрағаттағы ғылыми-ізденіс: Архив құжаттарын цифрлық зерделеу',
                      source: 'Мұрағат қорындағы ғылыми-тәжірибелік зерттеу',
                      desc: 'Жас зерттеушінің Қызылорда астаналық кезеңі мен «1928 жылғы инженерлер ісіне» қатысты түпнұсқалық мұрағат құжаттарын, есептер мен хаттамаларды компьютерлік базада ғылыми тұрғыдан зерделеу сәті.',
                      image: '/images/kyzylorda_student_archive_research.jpg',
                      badge: 'Мұрағаттық зерттеу'
                    })}
                    className="bg-parchment rounded-xl border-2 border-golden/30 p-3.5 hover:border-terracotta shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 rounded-lg overflow-hidden relative mb-3 bg-black/5">
                        <img 
                          src={getImageUrl('/images/kyzylorda_student_archive_research.jpg')} 
                          alt="Мұрағаттағы ізденіс" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute top-2 left-2 bg-indigo/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          Мұрағаттағы зерттеу
                        </span>
                        <Maximize2 className="absolute bottom-2 right-2 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                      </div>
                      <h5 className="font-serif font-bold text-indigo text-sm group-hover:text-terracotta transition-colors mb-1">
                        Мұрағат құжаттарын цифрлық зерттеу
                      </h5>
                      <p className="text-[11px] text-gray-600 line-clamp-2">
                        Астаналық дәуірдің тарихи құжаттары мен есептерін электронды мұрағат базасынан талдау.
                      </p>
                    </div>
                  </div>
                </div>
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

            {/* Archival Evidence & Preserved Housing Architecture (Delo #31 & 1926 Mansion) */}
            <div className="mt-8 pt-6 border-t border-golden/30">
              <h4 className="font-serif font-bold text-indigo text-xl mb-4 flex items-center gap-2">
                <Home className="w-5 h-5 text-terracotta" /> Тұрғын үй қорын қабылдау құжаттары мен жаңа қала сәулеті (1925–1926 жж.)
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Archive Dossier: Delo 31 */}
                <div 
                  onClick={() => setSelectedImage({
                    title: 'ҚР Орталық архиві, №31 Іс (1925 ж.): Тұрғын үйлерді қабылдау хаттамалары',
                    source: 'Қазақстан Орталық мемлекеттік архиві (Архив №12, Тізімдеме №15)',
                    desc: '1925 жылғы 12 шілде мен 1 қараша аралығындағы Қызылордада жаңадан салынған тұрғын үйлер мен пәтерлерді қабылдау жөніндегі Комиссия хаттамаларының мұрағаттық түпнұсқа мұқабасы (49 парақ).',
                    image: '/images/kyzylorda_archive_delo31_housing.jpg',
                    badge: 'Мұрағаттық іс (1925 ж.)'
                  })}
                  className="bg-parchment rounded-xl border-2 border-golden/30 p-4 hover:border-terracotta shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row gap-4 items-center"
                >
                  <div className="w-full sm:w-40 h-48 rounded-lg overflow-hidden bg-black/5 flex-shrink-0 relative border border-golden/30 flex items-center justify-center">
                    <img 
                      src={getImageUrl('/images/kyzylorda_archive_delo31_housing.jpg')} 
                      alt="№31 Іс мұқабасы" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                    />
                    <Maximize2 className="absolute bottom-2 right-2 w-4 h-4 text-indigo opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <span className="text-[10px] font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full uppercase">
                      Түпнұсқа архив құжаты
                    </span>
                    <h5 className="font-serif font-bold text-indigo text-base group-hover:text-terracotta transition-colors">
                      №31 Іс: Тұрғын үйлер мен пәтерлерді қабылдау хаттамалары
                    </h5>
                    <p className="text-xs text-gray-700 leading-relaxed font-medium">
                      «С протоколами Комиссии по приему строительных домов и квартир. Начато 12/VII-1925 г., кончено 1/XI-1925 г. на 49 листах».
                    </p>
                    <p className="text-[11px] text-gray-500 italic">
                      ҚР Орталық мемлекеттік архиві, Архив №12, Тізімдеме №15, байлам 51.
                    </p>
                  </div>
                </div>

                {/* Historic Mansion on Frunze street */}
                <div 
                  onClick={() => setSelectedImage({
                    title: 'Қызылорда. Жаңа қала: Фрунзе көшесіндегі особняк (1926 ж.)',
                    source: 'Е. Г. Малиновскаяның архивінен',
                    desc: '1926 жылы Қызылорданың «Жаңа қала» бөлігінде Фрунзе көшесінде салынған, дөңгелек колонналы кіреберіс ротондасы бар тарихи тұрғын үй ғимараты.',
                    image: '/images/kyzylorda_mansion_frunze_1926.jpg',
                    badge: 'Тұрғын үй сәулеті (1926 ж.)'
                  })}
                  className="bg-parchment rounded-xl border-2 border-golden/30 p-4 hover:border-terracotta shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row gap-4 items-center"
                >
                  <div className="w-full sm:w-44 h-48 rounded-lg overflow-hidden bg-black/5 flex-shrink-0 relative border border-golden/30 flex items-center justify-center">
                    <img 
                      src={getImageUrl('/images/kyzylorda_mansion_frunze_1926.jpg')} 
                      alt="Фрунзе көшесіндегі үй" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    />
                    <Maximize2 className="absolute bottom-2 right-2 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <span className="text-[10px] font-bold text-indigo bg-indigo/10 px-2 py-0.5 rounded-full uppercase">
                      Жаңа қала сәулеті (1926 ж.)
                    </span>
                    <h5 className="font-serif font-bold text-indigo text-base group-hover:text-terracotta transition-colors">
                      Фрунзе көшесіндегі жеке тұрғын үй (Особняк)
                    </h5>
                    <p className="text-xs text-gray-700 leading-relaxed font-medium">
                      Жаңа астананың басшылары мен жетекші мамандары үшін салынған, дөңгелек колонналы портик-ротондасы бар неоклассикалық тұрғын үй.
                    </p>
                    <p className="text-[11px] text-gray-500 italic">
                      Е. Г. Малиновскаяның архив қорынан.
                    </p>
                  </div>
                </div>
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
                <div 
                  key={item.id} 
                  onClick={() => {
                    if (item.image) {
                      setSelectedImage({
                        title: item.name,
                        source: '1925–1927 жылдардағы архивтік фотоқұжат',
                        desc: item.note,
                        image: item.image,
                        badge: '18 негізгі нысан'
                      });
                    }
                  }}
                  className={`bg-parchment/60 hover:bg-parchment border border-golden/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group ${item.image ? 'cursor-pointer hover:border-terracotta ring-1 ring-golden/40' : ''}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-lg bg-indigo text-golden font-bold text-sm flex items-center justify-center font-serif">
                        №{item.id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {item.image && (
                          <span className="text-[10px] bg-terracotta/10 text-terracotta px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            📷 Тарихи фото
                          </span>
                        )}
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
                    </div>

                    {item.image && (
                      <div className="h-40 rounded-lg overflow-hidden mb-3 bg-black/5 border border-golden/30 relative">
                        <img 
                          src={getImageUrl(item.image)} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                        />
                        <Maximize2 className="absolute bottom-2 right-2 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" />
                      </div>
                    )}

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
