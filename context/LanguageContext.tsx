import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'al';

interface Translations {
  en: Record<string, string>;
  al: Record<string, string>;
}

const translations: Translations = {
  en: {
    
    'guitar.shop': 'Guitar Shop',
    'premium.guitars': 'Premium Guitars & Instruments',
    
    
    'guitar.brands': 'Guitar Brands',
    'browse.top.quality': 'Browse top quality',
    'guitars': 'Guitars',
    'online': 'online',
    'featuring.the': 'Featuring the',
    'best.brands': 'Best Brands',
    'check.out.the': 'Check out the',
    'selection': 'Selection',
    'select.preferred.brand': 'Select your preferred brand and explore our exquisite collection',
    'hero.description.brands': 'Discover premium guitar brands from around the world. Each instrument represents decades of craftsmanship and musical excellence.',
    'explore.brands': 'Browse top quality Guitars Online',
    'view.guitars': 'View Guitars',
    'loading.brands': 'Loading brands...',
    'error.brands': 'Error loading brands',
    
    
    'discover.guitar.models': 'Discover',
    'guitar.models.collection': 'Guitar Models',
    'browse.extensive.collection': 'Browse through our extensive collection of guitar models. Each instrument is carefully crafted with unique specifications and features for every playing style.',
    
    'all.types': 'All Types',
    'electric.guitar': 'Electric Guitar',
    'acoustic.guitar': 'Acoustic Guitar',
    'bass.guitar': 'Bass Guitar',
    'classical.guitar': 'Classical Guitar',
    'search.by.name': 'Search by name',
    'loading.models': 'Loading models...',
    'no.models': 'No models found',
    'error.models': 'Error loading models',
    'load.more': 'Load More',
    'back.to.brands': 'Back to Brands',
    
    
    'guitar.details': 'Guitar Details',
    'specifications': 'Specifications',
    'musicians': 'Musicians',
    'body': 'Body',
    'neck': 'Neck',
    'fretboard': 'Fretboard',
    'pickups': 'Pickups',
    'bridge': 'Bridge',
    'tuners': 'Tuners',
    'strings': 'Strings',
    'scale': 'Scale Length',
    'weight': 'Weight',
    'loading.details': 'Loading guitar details...',
    'error.details': 'Error loading guitar details',
    'back.to.models': 'Back to Models',
    'price': 'Price',
    
    
    'language': 'Language',
    'english': 'English',
    'albanian': 'Shqip',
    
   
    'pagination.prev': 'Previous',
    'pagination.next': 'Next',
    
    
    'specs': 'Specs',
    'no.description': 'No description available',
    'famous.musicians': 'Famous Musicians',
    'type': 'Type',
    'year': 'Year',
    'unknown': 'Unknown',
    'back': 'Back',
    'view.details': 'View Details',
  },
  al: {
    
    'guitar.shop': 'Dyqani i Gitareve',
    'premium.guitars': 'Gitare dhe Instrumente Premium',
    
    
    'guitar.brands': 'Brendet e Gitareve',
    'browse.top.quality': 'Shfletoni',
    'guitars': 'Gitaret',
    'online': 'me cilësi më të lartë',
    'featuring.the': 'Duke prezantuar',
    'best.brands': 'Brendet më të Mira',
    'check.out.the': 'Shikoni',
    'selection': 'Përzgjedhjen',
    'select.preferred.brand': 'Zgjidhni brendin tuaj të preferuar dhe eksploroni koleksionin tonë të shkëlqyer',
    'hero.description.brands': 'Zbuloni markat premium të gitareve nga e gjithë bota. Çdo instrument përfaqëson dekada zejtarie dhe përsosmërie muzikore.',
    'explore.brands': 'Shfletoni Gitare me Cilësi të Lartë Online',
    'view.guitars': 'Shiko Gitaret',
    'loading.brands': 'Duke ngarkuar brendet...',
    'error.brands': 'Gabim gjatë ngarkimit të brendeve',
    
    
    'discover.guitar.models': 'Zbuloni',
    'guitar.models.collection': 'Modelet e Gitareve',
    'browse.extensive.collection': 'Shfletoni koleksionin tonë të gjerë të modeleve të gitareve. Çdo instrument është punuar me kujdes me specifikime dhe karakteristika unike për çdo stil lojë.',
    
    'all.types': 'Tipet',
    'electric.guitar': 'Gitare Elektrike',
    'acoustic.guitar': 'Gitare Akustike',
    'bass.guitar': 'Gitare Bas',
    'classical.guitar': 'Gitare Klasike',
    'search.by.name': 'Kërko sipas emrit',
    'loading.models': 'Duke ngarkuar modelet...',
    'no.models': 'Nuk u gjetën modele',
    'error.models': 'Gabim gjatë ngarkimit të modeleve',
    'load.more': 'Shfaq më shumë',
    'back.to.brands': 'Kthehu te Brendet',
    
    
    'guitar.details': 'Detajet e Gitares',
    'specifications': 'Specifikimet',
    'musicians': 'Muzikantë',
    'body': 'Trupi',
    'neck': 'Qafa',
    'fretboard': 'Pjesa e pragjeve',
    'pickups': 'Pickups',
    'bridge': 'Ura',
    'tuners': 'Stimerët',
    'strings': 'Teli',
    'scale': 'Gjatësia e Shkallës',
    'weight': 'Pesha',
    'loading.details': 'Duke ngarkuar detajet e gitares...',
    'error.details': 'Gabim gjatë ngarkimit të detajeve të gitares',
    'back.to.models': 'Kthehu te Modelet',
    'price': 'Çmimi',
    
    
    'language': 'Gjuha',
    'english': 'English',
    'albanian': 'Shqip',
    
    
    'pagination.prev': 'Prapa',
    'pagination.next': 'Para',
    
    
    'specs': 'Specifikime',
    'no.description': 'Nuk ka përshkrim',
    'famous.musicians': 'Muzikantë të njohur',
    'type': 'Tipi',
    'year': 'Viti',
    'unknown': 'I panjohur',
    'back': 'Kthehu',
    'view.details': 'Shiko Detajet',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('guitar-shop-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'al')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('guitar-shop-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};