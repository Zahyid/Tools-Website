import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { ConversionFormat, VALID_CONVERSIONS, FORMAT_LABELS } from '../utils/types';

interface FormatSelectorProps {
    fromFormat: ConversionFormat;
    toFormat: ConversionFormat;
    onFromChange: (format: ConversionFormat) => void;
    onToChange: (format: ConversionFormat) => void;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({
    fromFormat,
    toFormat,
    onFromChange,
    onToChange
}) => {
    const [fromOpen, setFromOpen] = React.useState(false);
    const [toOpen, setToOpen] = React.useState(false);

    // Close dropdowns when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => {
            setFromOpen(false);
            setToOpen(false);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleFromChange = (format: ConversionFormat) => {
        onFromChange(format);
        // Auto-select first valid 'to' format if current is invalid
        if (!VALID_CONVERSIONS[format].includes(toFormat)) {
            onToChange(VALID_CONVERSIONS[format][0]);
        }
        setFromOpen(false);
    };

    const handleToChange = (format: ConversionFormat) => {
        onToChange(format);
        setToOpen(false);
    };

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const validToFormats = VALID_CONVERSIONS[fromFormat] || [];

    return (
        <div className="format-selector-wrapper">
            <div className="format-group" onClick={stopPropagation}>
                <span className="format-label">From:</span>
                <div className="dropdown" onClick={() => { setFromOpen(!fromOpen); setToOpen(false); }}>
                    <div className="dropdown-trigger">
                        <span>{FORMAT_LABELS[fromFormat]}</span>
                        <ChevronDown size={18} className={`chevron ${fromOpen ? 'up' : ''}`} />
                    </div>

                    {fromOpen && (
                        <div className="dropdown-menu">
                            {(Object.keys(FORMAT_LABELS) as ConversionFormat[]).map(format => (
                                <div
                                    key={format}
                                    className={`dropdown-item ${fromFormat === format ? 'active' : ''}`}
                                    onClick={() => handleFromChange(format)}
                                >
                                    {FORMAT_LABELS[format]}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="format-divider">
                <ArrowRight size={24} className="text-gradient" />
            </div>

            <div className="format-group" onClick={stopPropagation}>
                <span className="format-label">To:</span>
                <div className="dropdown" onClick={() => { setToOpen(!toOpen); setFromOpen(false); }}>
                    <div className="dropdown-trigger">
                        <span>{FORMAT_LABELS[toFormat]}</span>
                        <ChevronDown size={18} className={`chevron ${toOpen ? 'up' : ''}`} />
                    </div>

                    {toOpen && (
                        <div className="dropdown-menu">
                            {validToFormats.map(format => (
                                <div
                                    key={format}
                                    className={`dropdown-item ${toFormat === format ? 'active' : ''}`}
                                    onClick={() => handleToChange(format)}
                                >
                                    {FORMAT_LABELS[format]}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        .format-selector-wrapper {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          background: rgba(0, 0, 0, 0.2);
          padding: 1rem 1.5rem;
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.2);
        }

        .format-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .format-label {
          color: var(--text-muted);
          font-weight: 500;
          font-size: 0.95rem;
        }

        .dropdown {
          position: relative;
          flex: 1;
        }

        .dropdown-trigger {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 0.8rem 1.2rem;
          border-radius: 12px;
          cursor: pointer;
          transition: var(--transition-fast);
          font-weight: 600;
        }

        .dropdown-trigger:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .chevron {
          transition: transform 0.3s ease;
          color: var(--text-muted);
        }

        .chevron.up {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          width: 100%;
          background: rgba(15, 17, 26, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 0.5rem;
          z-index: 50;
          max-height: 250px;
          overflow-y: auto;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          animation: menuFadeIn 0.2s ease-out;
        }

        @keyframes menuFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-item {
          padding: 0.8rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: var(--transition-fast);
          color: var(--text-muted);
        }

        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .dropdown-item.active {
          background: var(--primary-gradient);
          color: white;
          font-weight: 500;
        }

        /* Custom scrollbar for dropdown */
        .dropdown-menu::-webkit-scrollbar {
          width: 6px;
        }
        .dropdown-menu::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        @media (max-width: 640px) {
          .format-selector-wrapper {
            flex-direction: column;
            gap: 1rem;
          }
          .format-divider {
            transform: rotate(90deg);
          }
          .format-group {
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default FormatSelector;
