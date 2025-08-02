import React, { useEffect } from 'react';
import { Globe, Facebook, Twitter, Instagram } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center -ml-12">
              <div 
                className="p-2 bg-white rounded-lg cursor-pointer"
                onClick={() => navigate('/')}
              >
                <img 
                  src="/handwritten-guitar-music-shop-logo-vector-12262917.webp" 
                  alt="Guitar Shop Logo"
                  className="h-20 w-80 object-contain"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-600" />
              <span className="text-gray-600 text-sm">{t('language')}:</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  language === 'en'
                    ? 'bg-orange-600 text-white font-semibold'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                {t('english')}
              </button>
              <button
                onClick={() => setLanguage('al')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  language === 'al'
                    ? 'bg-orange-600 text-white font-semibold'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                {t('albanian')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col items-center mb-4">
                <div className="p-2 bg-white rounded-lg mb-2">
                  <img 
                    src="/handwritten-guitar-music-shop-logo-vector-12262917.webp" 
                    alt="Guitar Shop Logo"
                    className="h-14 w-72 object-contain"
                  />
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4 text-center">
                Your trusted destination for premium guitars and musical instruments. We offer the finest selection of acoustic, electric, and bass guitars from world-renowned brands.
              </p>
              <div className="flex space-x-4 justify-center">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                  <Facebook className="h-4 w-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                  <Twitter className="h-4 w-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                  <Instagram className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Support</a></li>
              </ul>
            </div>

           
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Electric Guitars</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Acoustic Guitars</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Bass Guitars</a></li>
                <li><a href="#" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Accessories</a></li>
              </ul>
            </div>
          </div>

          
          <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2024 {t('guitar.shop')}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};