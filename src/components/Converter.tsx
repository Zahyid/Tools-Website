import React, { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import Dropzone from './Dropzone';
import FormatSelector from './FormatSelector';
import { processConversion } from '../utils/converters';
import type { ConversionFormat, FileData } from '../utils/types';
import { isBrowserConvertible } from '../utils/types';

const Converter = () => {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [fromFormat, setFromFormat] = useState<ConversionFormat>('pdf');
  const [toFormat, setToFormat] = useState<ConversionFormat>('word');

  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [downloadName, setDownloadName] = useState<string>('');

  const handleFileSelect = (file: File) => {
    setFileData({ file });

    // Attempt auto-detection of format
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension && ['pdf', 'doc', 'docx', 'csv', 'jpg', 'png', 'txt'].includes(extension)) {
      if (extension === 'docx') setFromFormat('doc');
      else if (extension === 'jpg' || extension === 'png') setFromFormat('image');
      else if (extension === 'txt') setFromFormat('text');
      else setFromFormat(extension as ConversionFormat);
    }
  };

  const handleClear = () => {
    setFileData(null);
    setResult(null);
    setProgress(0);
  };

  const startConversion = async () => {
    if (!fileData) return;

    setIsConverting(true);
    setProgress(0);
    setResult(null);

    try {
      // Small simulated delay for browser UI responsiveness
      await new Promise(r => setTimeout(r, 500));

      const convertedFileName = await processConversion(
        fileData,
        fromFormat,
        toFormat,
        (p) => setProgress(p)
      );

      setProgress(100);
      setDownloadName(convertedFileName);
      setResult('success');
    } catch (error) {
      setResult('error');
      console.error(error);
    } finally {
      setIsConverting(false);
    }
  };

  const isSimulated = !isBrowserConvertible(fromFormat, toFormat);

  return (
    <section id="converter" className="converter-section container">
      <div className="converter-card glass-panel">

        <div className="converter-header">
          <h2>Convert Your Files</h2>
          <p>Secure, fast, and completely free in your browser for supported formats.</p>
        </div>

        {/* Format Selection Row */}
        <FormatSelector
          fromFormat={fromFormat}
          toFormat={toFormat}
          onFromChange={setFromFormat}
          onToChange={setToFormat}
        />

        {/* Dynamic Upload/Status Area */}
        <div className="converter-body">
          {!isConverting && result === null ? (
            <Dropzone
              onFileSelect={handleFileSelect}
              selectedFile={fileData}
              onClear={handleClear}
            />
          ) : isConverting ? (
            <div className="status-area converting">
              <div className="spinner-container">
                <RefreshCw size={48} className="spinner icon-gradient" />
              </div>
              <h3>Converting your file...</h3>
              <p className="status-subtext">
                {isSimulated
                  ? "Processing securely on our premium servers."
                  : "Processing locally in your browser for maximum privacy."}
              </p>

              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="progress-text">{Math.round(progress)}%</span>
            </div>
          ) : result === 'success' ? (
            <div className="status-area success fade-in">
              <div className="status-icon-wrapper success-wrapper">
                <CheckCircle size={48} color="#10b981" />
              </div>
              <h3>Conversion Successful!</h3>
              <p className="status-subtext">Your file ({downloadName}) has been processed and downloaded.</p>
              <button className="btn-glass mt-4" onClick={handleClear}>
                Convert Another File
              </button>
            </div>
          ) : (
            <div className="status-area error fade-in">
              <div className="status-icon-wrapper error-wrapper">
                <AlertCircle size={48} color="#ef4444" />
              </div>
              <h3>Conversion Failed</h3>
              <p className="status-subtext">There was an error processing your file. Please try a different format.</p>
              <button className="btn-glass mt-4" onClick={() => { setResult(null); setProgress(0); }}>
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Action Button */}
        {!isConverting && result === null && (
          <div className="converter-footer">
            <button
              className="btn-primary convert-btn"
              onClick={startConversion}
              disabled={!fileData}
            >
              <span>Convert Now</span>
              <ArrowRight size={20} />
            </button>
            {isSimulated && (
              <p className="premium-badge-text text-gradient-secondary">
                ✨ Pro Feature (Demonstration Mode)
              </p>
            )}
          </div>
        )}

      </div>

      <style>{`
        .converter-section {
          width: 100%;
          max-width: 900px;
          margin-bottom: 4rem;
          position: relative;
          z-index: 20;
        }

        .converter-card {
          padding: 3rem;
          position: relative;
        }

        /* Decorative Background Blob */
        .converter-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -20%;
          width: 140%;
          height: 200%;
          background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 60%);
          z-index: -1;
          pointer-events: none;
        }

        .converter-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .converter-header h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .converter-header p {
          color: var(--text-muted);
        }

        .converter-body {
          min-height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .status-area {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem;
          background: rgba(0,0,0,0.2);
          border-radius: 20px;
          border: 1px solid var(--glass-border);
        }

        .spinner-container {
          margin-bottom: 1.5rem;
        }

        .spinner {
          animation: spin-slow 2s linear infinite;
        }

        .icon-gradient {
          color: #a855f7;
        }

        .status-area h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .status-subtext {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .progress-bar-container {
          width: 100%;
          max-width: 400px;
          height: 8px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--primary-gradient);
          transition: width 0.3s ease;
          border-radius: 4px;
        }

        .progress-text {
          font-weight: 600;
          color: #a855f7;
        }

        .status-icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          background: rgba(255,255,255,0.05);
        }

        .success-wrapper {
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .error-wrapper {
          box-shadow: 0 0 30px rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .converter-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
        }

        .convert-btn {
          width: 100%;
          max-width: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          padding: 1rem 2rem;
        }

        .convert-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: rgba(255,255,255,0.1);
          color: var(--text-muted);
        }

        .convert-btn:disabled::before {
          display: none;
        }

        .premium-badge-text {
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .converter-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section >
  );
};

export default Converter;
