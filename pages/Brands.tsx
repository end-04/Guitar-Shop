import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Music } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { GET_BRANDS } from '../apollo/queries';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export const BrandsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data, loading, error, refetch } = useQuery(GET_BRANDS);

  if (loading) return <LoadingSpinner message={t('loading.brands')} />;
  if (error) return <ErrorMessage message={t('error.brands')} onRetry={() => refetch()} />;

  const brands = data?.findAllBrands ?? [];

  
  const brandsToShow = brands.slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      
      
      <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[28rem] mb-16 bg-white shadow-lg">
        
        <div
          className="flex flex-col justify-center px-8 lg:pl-16 lg:pr-8 w-full lg:w-3/5 relative overflow-hidden min-h-[20rem] lg:min-h-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          
          <div className="absolute inset-0 bg-black bg-opacity-60" style={{
            backdropFilter: 'grayscale(100%) brightness(0.3)'
          }}></div>

          
          <div className="relative z-10 max-w-2xl py-8 lg:py-0">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-white mb-4 lg:mb-6 leading-tight drop-shadow-2xl">
              {t('browse.top.quality')} <span className="text-orange-500">{t('guitars')}</span> {t('online')}
            </h1>
            <p className="text-base lg:text-lg text-gray-200 font-medium leading-relaxed mb-6 lg:mb-8 drop-shadow-lg">
              {t('hero.description.brands')}
            </p>
            <div className="h-1 w-24 bg-orange-500 rounded-full shadow-lg"></div>
          </div>
        </div>

        
        <div className="hidden lg:block w-2/5 h-full relative overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Guitar Brands"
            className="h-full w-full object-cover object-center"
          />
          
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black opacity-10"></div>
        </div>
      </div>

     
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-5xl font-bold text-black mb-4">
          {t('featuring.the')} <span className="text-orange-600">{t('best.brands')}</span>
        </h2>
        <p className="text-xl text-black">{t('select.preferred.brand')}</p>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {brandsToShow.map((brand: any, idx: number) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col items-center justify-center cursor-pointer bg-transparent"
              onClick={() => navigate(`/models/${brand.id}`)}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="aspect-video flex items-center justify-center overflow-hidden relative w-full">
                <img
                  src={brand.image || 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={brand.name}
                  className="h-80 w-80 object-contain group-hover:scale-110 transition-transform duration-700"
                  style={{ objectFit: 'contain', objectPosition: 'center', transform: 'scale(0.85)' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};