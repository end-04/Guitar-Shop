import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MODELS, SEARCH_MODELS, GET_BRANDS } from '../apollo/queries';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useLanguage } from '../context/LanguageContext';
import { Search, Filter, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ModelsPage: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(0);

  const shouldSearch = search.trim().length > 0;

  const { data: brandsData } = useQuery(GET_BRANDS);
  const currentBrand = brandsData?.findAllBrands?.find((brand: any) => brand.id === brandId);

  const { data: modelsData, loading: modelsLoading, error: modelsError, refetch: refetchModels } = useQuery(GET_MODELS, {
    variables: {
      id: brandId,
      sortBy: { field: "name", order: "ASC" }, 
    },
    skip: shouldSearch,
  });

  const { data: searchData, loading: searchLoading, error: searchError, refetch: refetchSearch } = useQuery(SEARCH_MODELS, {
    variables: {
      brandId: brandId || '',
      name: search,
    },
    skip: !shouldSearch,
  });

  const loading = shouldSearch ? searchLoading : modelsLoading;
  const error = shouldSearch ? searchError : modelsError;
  const rawModels = shouldSearch ? (searchData?.searchModels ?? []) : (modelsData?.findBrandModels ?? []);
  
  
  const validModels = rawModels.filter((model: any) => {
    
    return model.image && 
           model.image.trim() !== '' && 
           !model.image.includes('pexels.com') &&
           model.image !== 'https://images.pexels.com/photos/164936/pexels-photo-164936.jpeg?auto=compress&cs=tinysrgb&w=400';
  });
  

  const models = typeFilter === 'all' 
    ? validModels 
    : validModels.filter((model: any) => model.type?.toLowerCase() === typeFilter);

  
  const modelsPerPage = 6; 
  const totalModels = models.length;
  const totalPages = Math.ceil(totalModels / modelsPerPage);
  const startIndex = currentPage * modelsPerPage;
  const endIndex = startIndex + modelsPerPage;
  const currentModels = models.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const handleRefetch = () => {
    if (shouldSearch) {
      refetchSearch();
    } else {
      refetchModels();
    }
  };

  useEffect(() => {
    if (shouldSearch) {
      refetchSearch();
    } else {
      refetchModels({
        sortBy: { field: "name", order: "ASC" }, 
      });
    }
  }, [search, shouldSearch, refetchModels, refetchSearch]); 

  
  useEffect(() => {
    setCurrentPage(0);
  }, [search, typeFilter]);

  if (loading) return <LoadingSpinner message={t('loading.models')} />;
  if (error) {
    return (
      <ErrorMessage
        message={`${t('error.models')}: ${error.message}`}
        onRetry={handleRefetch}
      />
    );
  }

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
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 lg:mb-6 leading-tight drop-shadow-2xl">
              {t('discover.guitar.models')} <span className="text-orange-500">{t('guitar.models.collection')}</span>
            </h1>
            <p className="text-base lg:text-lg text-gray-200 font-medium leading-relaxed mb-6 lg:mb-8 drop-shadow-lg">
              {t('browse.extensive.collection')}
            </p>
            <div className="h-1 w-24 bg-orange-500 rounded-full shadow-lg"></div>
          </div>
        </div>

        
        <div className="w-full lg:w-2/5 h-64 lg:h-full flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-500">
          {currentBrand ? (
            <div className="text-center p-4">
              <img
                src={
                  currentBrand.name?.toLowerCase() === 'gretsch' 
                    ? 'https://logoeps.com/wp-content/uploads/2013/12/gretsch-vector-logo.png'
                    : currentBrand.image || 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400'
                }
                alt={currentBrand.name}
                className="h-28 lg:h-48 w-auto object-contain mx-auto drop-shadow-lg"
                style={{ 
                  maxWidth: '280px',
                  filter: currentBrand.name?.toLowerCase() === 'gretsch' 
                    ? 'brightness(0) invert(1) drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' 
                    : 'brightness(0) saturate(100%) drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                }}
              />
            </div>
          ) : (
            <div className="text-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-2xl lg:text-4xl">🎸</span>
              </div>
            </div>
          )}
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors order-1 sm:order-none"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('back.to.brands')}
          </button>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black text-center flex-1 order-2 sm:order-none">
            {t('check.out.the')} <span className="text-orange-600">{t('selection')}</span>
          </h2>
          
          <div className="w-full sm:w-auto order-3 sm:order-none sm:opacity-0 sm:pointer-events-none">
            <div className="w-full sm:w-32"></div>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="border-none outline-none bg-transparent text-gray-700"
            >
              <option value="all">{t('all.types')}</option>
              <option value="electric">{t('electric.guitar')}</option>
              <option value="acoustic">{t('acoustic.guitar')}</option>
              <option value="bass">{t('bass.guitar')}</option>
              <option value="classical">{t('classical.guitar')}</option>
            </select>
          </div>
          
         
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder={t('search.by.name')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border-none outline-none bg-transparent text-gray-700 w-48"
            />
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {currentModels.map((model: any, idx: number) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col items-center cursor-pointer"
              onClick={() => navigate(`/guitar/${brandId}/${model.id}`)}
            >
              <div className="bg-white rounded-lg p-6 mb-4 w-full flex items-center justify-center">
                <img
                  src={model.image}
                  alt={model.name}
                  className="h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {model.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {(() => {
                    const type = model.type?.toLowerCase();
                    
                    if (type === 'bass') return 'Bass Guitar';
                    if (type === 'electric') return 'Electric Guitar';
                    if (type === 'acoustic') return 'Acoustic Guitar';
                    if (type === 'classical') return 'Classical Guitar';
                    
                    
                    const name = model.name?.toLowerCase() || '';
                    if (name.includes('bass')) return 'Bass Guitar';
                    if (name.includes('acoustic')) return 'Acoustic Guitar';
                    if (name.includes('classical')) return 'Classical Guitar';
                    
                    
                    return model.type ? `${model.type} Guitar` : 'Electric Guitar';
                  })()}
                </p>
                {model.price && (
                  <p className="text-gray-600">
                    ${model.price}.00
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-4 mt-12">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              {t('pagination.prev')}
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`px-3 py-1 rounded transition-colors ${
                    index === currentPage
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {t('pagination.next')}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        
        {totalModels > 0 && (
          <div className="text-center text-sm text-gray-500 mt-4">
            Showing {startIndex + 1}-{Math.min(endIndex, totalModels)} of {totalModels} models
          </div>
        )}

        
        {models.length === 0 && !loading && (
          <div className="flex justify-center mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">
                {shouldSearch ? `No models found for "${search}"` : 
                 typeFilter !== 'all' ? `No ${typeFilter} guitars available for this brand` :
                 'No models available for this brand'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};