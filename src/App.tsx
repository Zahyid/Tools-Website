import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Converter from './components/Converter';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Hero />
        <Converter />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
