import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <span className="logo-text">Convert<span className="text-gradient">ify</span></span>
                    <p className="footer-tagline">
                        Professional file conversion without the compromise. Fast, secure, and beautiful.
                    </p>
                </div>

                <div className="footer-links-group">
                    <div className="footer-col">
                        <h4>Format</h4>
                        <a href="#">PDF to Word</a>
                        <a href="#">Word to PDF</a>
                        <a href="#">CSV to JSON</a>
                        <a href="#">Image to PDF</a>
                    </div>
                    <div className="footer-col">
                        <h4>Company</h4>
                        <a href="#">About</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom border-t border-glass mt-12 py-6 text-center text-sm text-muted">
                <p>&copy; {new Date().getFullYear()} Convertify. All rights reserved.</p>
            </div>

            <style>{`
        .footer {
          background: rgba(8, 9, 15, 0.8);
          backdrop-filter: var(--blur);
          border-top: 1px solid var(--glass-border);
          padding-top: 4rem;
          margin-top: 4rem;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 4rem;
        }

        .footer-brand {
          max-width: 320px;
        }

        .footer-brand .logo-text {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          display: block;
          margin-bottom: 1rem;
        }

        .footer-tagline {
          color: var(--text-muted);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .footer-links-group {
          display: flex;
          gap: 4rem;
        }

        .footer-col h4 {
          color: white;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .footer-col a {
          display: block;
          color: var(--text-muted);
          margin-bottom: 0.8rem;
          text-decoration: none;
          transition: var(--transition-fast);
          font-size: 0.95rem;
        }

        .footer-col a:hover {
          color: white;
          transform: translateX(2px);
        }

        .footer-bottom {
          border-top: 1px solid var(--glass-border);
          margin-top: 3rem;
          padding: 1.5rem 0;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 2.5rem;
          }
          .footer-links-group {
            flex-direction: column;
            gap: 2rem;
          }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
