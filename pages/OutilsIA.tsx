import React from 'react';

const outils = [
  {
    name: 'ChatGPT',
    url: 'https://chatgpt.com/',
    logo: '/logos/chatgpt.png',
  },
  {
    name: 'Gemini',
    url: 'https://gemini.google.com/app?utm_source=app_launcher&utm_medium=owned&utm_campaign=base_all',
    logo: '/logos/gemini.png',
  },
  {
    name: 'Notebook LM',
    url: 'https://notebooklm.google/',
    logo: '/logos/notebooklm.png',
  },
  {
    name: 'Perplexity',
    url: 'https://www.perplexity.ai/?login-source=oneTapHome&login-new=false',
    logo: '/logos/perplexity.png',
  },
];

export const OutilsIA: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">Outils IA</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {outils.map((outil) => (
        <a
          key={outil.name}
          href={outil.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow p-6 min-h-[160px] transition hover:scale-105 hover:shadow-lg"
        >
          <img src={outil.logo} alt={outil.name} className="mb-4 w-16 h-16 object-contain" />
          <span className="text-lg font-bold text-primary dark:text-secondary mb-2">{outil.name}</span>
          <span className="text-xs text-gray-500">Accéder</span>
        </a>
      ))}
    </div>
  </div>
);
