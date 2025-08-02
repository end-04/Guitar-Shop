import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { client } from './apollo/client';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/Layout';
import { BrandsPage } from './pages/Brands';
import { ModelsPage } from './pages/Models';
import { GuitarDetailsPage } from './pages/GuitarDetails';

function App() {
  return (
    <ApolloProvider client={client}>
      <LanguageProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<BrandsPage />} />
              <Route path="/models/:brandId" element={<ModelsPage />} />
              <Route path="/guitar/:brandId/:modelId" element={<GuitarDetailsPage />} />
            </Routes>
          </Layout>
        </Router>
      </LanguageProvider>
    </ApolloProvider>
  );
}

export default App;