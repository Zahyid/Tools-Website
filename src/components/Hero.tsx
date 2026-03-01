import React from 'react';
import { Sparkles } from 'lucide-react';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-badge">
                <Sparkles size={16} className="badge-icon" />
                <span>Next-Gen Format Converter</span>
            </div>

            <h1 className="hero-title">
                Transform Your Files with <br />
                <span className="text-gradient">Absolute Precision</span>
            </h1>

            <p className="hero-subtitle">
                Secure, lightning-fast conversions for PDFs, Documents, Presentations, and Data Formats.
                Experience enterprise-grade processing right in your browser.
            </p>

            <style>{`
        .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 800px;
          margin: 0 auto 4rem;
          padding: 0 2rem;
          z-index: 10;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-muted);
          margin-bottom: 2rem;
          backdrop-filter: var(--blur);
          animation: float 6s ease-in-out infinite;
        }

        .badge-icon {
          color: #a855f7;
        }

        .hero-title {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
          opacity: 0;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1rem;
          }
          .hero-section {
            margin-bottom: 3rem;
          }
        }
      `}</style>
        </section>
    );
};

export default Hero;
