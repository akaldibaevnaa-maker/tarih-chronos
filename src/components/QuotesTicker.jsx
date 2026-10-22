import React from 'react';
import { Quote, Sparkles } from 'lucide-react';

const quotes = [
  {
    author: 'Мұхамеджан Тынышбаев',
    role: 'Тұңғыш қазақ теміржолшы-инженері, Алаш қайраткері',
    text: 'Тарихты білмей, келешекті болжау мүмкін емес. Инженерлік ой мен адал еңбек – ұлт өркендеуінің басты тірегі!'
  },
  {
    author: 'Әлихан Бөкейхан',
    role: 'Алашорда үкіметінің төрағасы',
    text: 'Ұлтына, жұртына қызмет ету білімнен емес, мінезден. Тірі болсам, қазаққа қызмет қылмай қоймаймын!'
  },
  {
    author: 'Ахмет Байтұрсынұлы',
    role: 'Ұлт ұстазы, қоғам қайраткері',
    text: 'Білімді болуға оқу керек, бай болуға кәсіп керек, мықты болуға бірлік керек!'
  },
  {
    author: 'Мұстафа Шоқай',
    role: 'Мемлекет және қоғам қайраткері',
    text: 'Жаңа қала салу – жаңа мемлекеттің, тәуелсіз ұлттық болашақтың берік іргетасын қалау.'
  },
  {
    author: 'Міржақып Дулатұлы',
    role: 'Алаш арысы, ақын, қайраткер',
    text: 'Өз қамын ғана ойлаған өрге баспайды, ел қамын ойлаған ер атанады!'
  },
  {
    author: 'Аспандияр Кенжин',
    role: 'Қызылорда астанасын көшіру комиссиясының төрағасы',
    text: 'Астана құрылысы – қазақ даласының мәдени, шаруашылық және инфрақұрылымдық жаңа дәуірінің бастамасы.'
  },
  {
    author: '1928 жылғы сот мұрағаты',
    role: '«Советская степь» газеті және №31 Іс дерегі',
    text: '1928 жылғы Қызылорда инженерлер ісі – ұлт зиялыларының қажырлы еңбегі мен астаналық сәулеттің шынайы шежіресі.'
  }
];

const QuotesTicker = () => {
  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-amber-950 rounded-2xl shadow-md border-2 border-amber-300 overflow-hidden my-4 relative">
      <div className="flex items-center">
        {/* Left Fixed Badge */}
        <div className="flex-shrink-0 z-20 bg-gradient-to-r from-amber-700 to-amber-800 text-white px-4 py-3 flex items-center gap-2 font-serif font-bold text-xs uppercase tracking-wider shadow-md">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          <span className="hidden sm:inline">Тарихи тағылым:</span>
          <span>Дәйексөздер</span>
        </div>

        {/* Animated Infinite Ticker Container */}
        <div className="overflow-hidden flex-1 py-2.5 relative">
          <div className="animate-marquee flex items-center">
            {/* First sequence */}
            {quotes.map((q, idx) => (
              <div
                key={`q1-${idx}`}
                className="inline-flex items-center mx-6 text-sm font-medium text-amber-950 hover:text-indigo-950 transition-colors cursor-pointer group"
              >
                <Quote className="w-3.5 h-3.5 text-amber-800 mr-2 flex-shrink-0 opacity-70 group-hover:scale-110 transition-transform" />
                <span className="font-bold font-serif text-amber-900 group-hover:underline mr-1.5">
                  {q.author}:
                </span>
                <span className="italic text-gray-900 font-normal">
                  «{q.text}»
                </span>
                <span className="mx-4 text-amber-600 font-bold">•</span>
              </div>
            ))}

            {/* Duplicate sequence for seamless loop */}
            {quotes.map((q, idx) => (
              <div
                key={`q2-${idx}`}
                className="inline-flex items-center mx-6 text-sm font-medium text-amber-950 hover:text-indigo-950 transition-colors cursor-pointer group"
              >
                <Quote className="w-3.5 h-3.5 text-amber-800 mr-2 flex-shrink-0 opacity-70 group-hover:scale-110 transition-transform" />
                <span className="font-bold font-serif text-amber-900 group-hover:underline mr-1.5">
                  {q.author}:
                </span>
                <span className="italic text-gray-900 font-normal">
                  «{q.text}»
                </span>
                <span className="mx-4 text-amber-600 font-bold">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotesTicker;
