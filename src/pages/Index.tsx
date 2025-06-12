
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductSlider from '../components/ProductSlider';
import Reviews from '../components/Reviews';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import ChatbotWidget from '../components/ChatbotWidget';

const Index = () => {
  const [mode, setMode] = useState<'tour' | 'rent'>('tour');

  // Auto-switch hero mode every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMode(prevMode => prevMode === 'tour' ? 'rent' : 'tour');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <Header onModeChange={setMode} currentMode={mode} />
      <Hero mode={mode} />
      <ProductSlider mode={mode} />
      <Reviews />
      <ContactForm />
      <Footer />
      <BackToTop />
      <ChatbotWidget />
    </div>
  );
};

export default Index;
