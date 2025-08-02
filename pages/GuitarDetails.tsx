import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MODEL_DETAILS } from '../apollo/queries';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Guitar, ChevronLeft, ChevronRight } from 'lucide-react';

export const GuitarDetailsPage: React.FC = () => {
  const { brandId, modelId } = useParams<{ brandId: string; modelId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'specs' | 'musicians'>('specs');
  const [currentMusicianPage, setCurrentMusicianPage] = useState(0);

  const { data, loading, error, refetch } = useQuery(GET_MODEL_DETAILS, {
    variables: { brandId, modelId },
  });

  const guitar = data?.findUniqueModel;

  
  const musiciansPerPage = 2;
  const totalMusicians = guitar?.musicians?.length || 0;
  const totalPages = Math.ceil(totalMusicians / musiciansPerPage);
  const startIndex = currentMusicianPage * musiciansPerPage;
  const endIndex = startIndex + musiciansPerPage;
  const currentMusicians = guitar?.musicians?.slice(startIndex, endIndex) || [];

  const nextMusicianPage = () => {
    if (currentMusicianPage < totalPages - 1) {
      setCurrentMusicianPage(currentMusicianPage + 1);
    }
  };

  const prevMusicianPage = () => {
    if (currentMusicianPage > 0) {
      setCurrentMusicianPage(currentMusicianPage - 1);
    }
  };

  const goToMusicianPage = (pageIndex: number) => {
    setCurrentMusicianPage(pageIndex);
  };

  if (loading) return <LoadingSpinner message={t('loading.details')} />;
  if (error || !guitar) return <ErrorMessage message={t('error.details')} onRetry={() => refetch()} />;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors shadow-lg"
        >
          <ArrowLeft className="h-5 w-5" />
          {t('back')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="flex items-center justify-center">
            <img
              src={guitar.image || 'https://images.pexels.com/photos/164936/pexels-photo-164936.jpeg?auto=compress&cs=tinysrgb&w=800'}
              alt={guitar.name}
              className="w-full h-auto max-w-md object-contain"
            />
          </div>

          
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{guitar.name}</h1>
            
            {guitar.price && (
              <p className="text-3xl font-bold text-orange-600 mb-6">
                ${guitar.price}
              </p>
            )}

            <div className="mb-6">
              <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full font-semibold">
                {guitar.type?.toUpperCase() || t('type')}
              </span>
            </div>

            {guitar.description && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {guitar.description}
              </p>
            )}

            
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`py-2 px-1 border-b-2 font-medium text-lg ${
                    activeTab === 'specs'
                      ? 'border-orange-600 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t('specifications')}
                </button>
                <button
                  onClick={() => setActiveTab('musicians')}
                  className={`py-2 px-1 border-b-2 font-medium text-lg ${
                    activeTab === 'musicians'
                      ? 'border-orange-600 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t('musicians')}
                </button>
              </nav>
            </div>

            
            {activeTab === 'specs' && (
              <div className="space-y-4">
                {guitar.specs && (
                  <>
                    {guitar.specs.bodyWood && (
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Body Wood:</span>
                        <span className="text-gray-900 text-lg">{guitar.specs.bodyWood}</span>
                      </div>
                    )}
                    {guitar.specs.neckWood && (
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Neck Wood:</span>
                        <span className="text-gray-900 text-lg">{guitar.specs.neckWood}</span>
                      </div>
                    )}
                    {guitar.specs.fingerboardWood && (
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Fingerboard:</span>
                        <span className="text-gray-900 text-lg">{guitar.specs.fingerboardWood}</span>
                      </div>
                    )}
                    {guitar.specs.pickups && (
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Pickups:</span>
                        <span className="text-gray-900 text-lg">{guitar.specs.pickups}</span>
                      </div>
                    )}
                    {guitar.specs.bridge && (
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Bridge:</span>
                        <span className="text-gray-900 text-lg">{guitar.specs.bridge}</span>
                      </div>
                    )}
                    {guitar.specs.scaleLength && (
                      <div className="flex justify-between py-3 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Scale Length:</span>
                        <span className="text-gray-900 text-lg">{guitar.specs.scaleLength}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {activeTab === 'musicians' && (
              <div className="space-y-6">
                {totalMusicians > 0 ? (
                  <>
                    <div className="space-y-4">
                      {currentMusicians.map((musician: any, index: number) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                          {musician.musicianImage && (
                            <img
                              src={musician.musicianImage}
                              alt={musician.name}
                              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-xl text-gray-900">{musician.name}</h4>
                            {musician.bands?.length > 0 && (
                              <p className="text-gray-600 mt-2 text-lg">
                                <span className="font-medium">Bands:</span> {musician.bands.join(', ')}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center space-x-4 mt-6">
                        <button
                          onClick={prevMusicianPage}
                          disabled={currentMusicianPage === 0}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>

                        <div className="flex space-x-2">
                          {Array.from({ length: totalPages }, (_, index) => (
                            <button
                              key={index}
                              onClick={() => goToMusicianPage(index)}
                              className={`w-3 h-3 rounded-full transition-colors ${
                                index === currentMusicianPage
                                  ? 'bg-orange-600'
                                  : 'bg-gray-300 hover:bg-gray-400'
                              }`}
                            />
                          ))}
                        </div>

                        <button
                          onClick={nextMusicianPage}
                          disabled={currentMusicianPage === totalPages - 1}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    
                    <div className="text-center text-sm text-gray-500 mt-4">
                      Showing {startIndex + 1}-{Math.min(endIndex, totalMusicians)} of {totalMusicians} musicians
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Guitar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-lg">No musician information available</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};