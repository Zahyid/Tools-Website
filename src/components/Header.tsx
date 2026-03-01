import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

const Header = () => {
    return (
        <header className="header glass-panel">
            <div className="container header-container">
                <a href="/" className="logo">
                    <div className="logo-icon">
                        <ArrowLeftRight size={24} color="#ffffff" />
                    </div>
                    <span className="logo-text">Convert<span className="text-gradient">ify</span></span>
                </a>

                <nav className="desktop-nav">
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#formats" className="nav-link">Formats</a>
                    <a href="#pro" className="nav-link premium"><span className="text-gradient-secondary">Go Pro</span></a>
                </nav>
            </div>

            <style>{`
        .header {
          position: fixed;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 4rem);
          max-width: 1200px;
          border-radius: 100px;
          z-index: 100;
          padding: 0.8rem 2rem;
        }

        .header-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .logo-icon {
          background: var(--primary-gradient);
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
          transform: rotate(-10deg);
          transition: var(--transition-smooth);
        }

        .logo:hover .logo-icon {
          transform: rotate(0deg) scale(1.05);
        }

        .logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: white;
          letter-spacing: -0.05em;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          color: var(--text-muted);
          font-weight: 500;
          font-size: 0.95rem;
          transition: var(--transition-fast);
          position: relative;
        }

        .nav-link:hover {
          color: white;
        }

        .nav-link:not(.premium)::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background: var(--primary-gradient);
          transition: var(--transition-fast);
          border-radius: 2px;
        }

        .nav-link:not(.premium):hover::after {
          width: 100%;
        }

        .nav-link.premium {
          padding: 0.5rem 1rem;
          border: 1px solid var(--glass-border);
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-link.premium:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .header {
            width: calc(100% - 2rem);
            padding: 0.6rem 1.5rem;
          }
        }
      `}</style>
        </header>
    );
};

export default Header;
