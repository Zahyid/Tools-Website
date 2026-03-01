import React from 'react';
import { FileText, Cpu, Zap, ShieldCheck } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Zap size={24} />,
            title: "Lightning Fast",
            description: "Optimized processing algorithms ensure your files are converted in milliseconds.",
            color: "var(--warm-gradient)"
        },
        {
            icon: <ShieldCheck size={24} />,
            title: "Bank-Grade Security",
            description: "Files are processed locally when possible, or encrypted end-to-end.",
            color: "var(--secondary-gradient)"
        },
        {
            icon: <FileText size={24} />,
            title: "Format Integrity",
            description: "Maintains original document styling, tables, and layouts flawlessly.",
            color: "var(--primary-gradient)"
        },
        {
            icon: <Cpu size={24} />,
            title: "AI-Powered Parsing",
            description: "Advanced heuristics to handle complex document structures effortlessly.",
            color: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)"
        }
    ];

    return (
        <section id="features" className="features-section container">
            <div className="features-header">
                <h2 className="section-title">Engineered for <span className="text-gradient">Excellence</span></h2>
                <p className="section-subtitle">
                    We've built the most reliable conversion engine so you never have to
                    worry about formatting errors again.
                </p>
            </div>

            <div className="features-grid">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card glass-panel group">
                        <div
                            className="feature-icon-wrapper"
                            style={{ background: feature.color }}
                        >
                            {feature.icon}
                        </div>
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-description">{feature.description}</p>
                    </div>
                ))}
            </div>

            <style>{`
        .features-section {
          padding: 6rem 2rem;
          position: relative;
        }

        .features-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          padding: 2.5rem 2rem;
          transition: var(--transition-smooth);
          border: 1px solid var(--glass-border);
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at top right, rgba(255,255,255,0.05) 0%, transparent 60%);
          opacity: 0;
          transition: var(--transition-smooth);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: white;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-title {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .feature-description {
          color: var(--text-muted);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .features-section {
            padding: 4rem 1.5rem;
          }
          .section-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
        </section>
    );
};

export default Features;
