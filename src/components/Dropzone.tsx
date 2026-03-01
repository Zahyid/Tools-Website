import React from 'react';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { FileData } from '../utils/types';

interface DropzoneProps {
    onFileSelect: (file: File) => void;
    selectedFile: FileData | null;
    onClear: () => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileSelect, selectedFile, onClear }) => {
    const [isDragging, setIsDragging] = React.useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelect(e.target.files[0]);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="dropzone-container">
            {!selectedFile ? (
                <div
                    className={`dropzone-area ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                >
                    <div className="dropzone-content">
                        <div className="dropzone-icon">
                            <UploadCloud size={40} className="icon-pulse" />
                        </div>
                        <h3>Drag & Drop your file here</h3>
                        <p className="text-muted">or click to browse from your computer</p>
                        <div className="dropzone-formats">
                            <span>PDF</span>
                            <span>DOCX</span>
                            <span>CSV</span>
                            <span>Images</span>
                            <span>+ more</span>
                        </div>
                    </div>
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden-input"
                        onChange={handleFileInput}
                    />
                </div>
            ) : (
                <div className="file-preview-card glass-panel">
                    <div className="file-icon">
                        <FileIcon size={32} />
                    </div>
                    <div className="file-details">
                        <h4 className="file-name">{selectedFile.file.name}</h4>
                        <span className="file-size">{formatFileSize(selectedFile.file.size)}</span>
                    </div>
                    <button className="clear-btn" onClick={onClear} aria-label="Remove file">
                        <X size={20} />
                    </button>
                </div>
            )}

            <style>{`
        .dropzone-container {
          width: 100%;
          margin-bottom: 2rem;
        }

        .dropzone-area {
          border: 2px dashed var(--glass-border);
          border-radius: 20px;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.02);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .dropzone-area::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--primary-gradient);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }

        .dropzone-area.dragging {
          border-color: #a855f7;
          background: rgba(168, 85, 247, 0.05);
          transform: scale(1.02);
        }

        .dropzone-area.dragging::before {
          opacity: 0.05;
        }

        .dropzone-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .dropzone-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--glass-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--glass-border);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          margin-bottom: 0.5rem;
          color: #a855f7;
        }

        .icon-pulse {
          animation: drop-pulse 2s infinite ease-in-out;
        }

        @keyframes drop-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .dropzone-area h3 {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .dropzone-formats {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .dropzone-formats span {
          background: rgba(255, 255, 255, 0.05);
          padding: 0.3rem 0.8rem;
          border-radius: 100px;
          font-size: 0.75rem;
          color: var(--text-muted);
          border: 1px solid var(--glass-border);
        }

        .hidden-input {
          display: none;
        }

        .file-preview-card {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          gap: 1.5rem;
          border: 1px solid #a855f7;
          background: rgba(168, 85, 247, 0.05);
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .file-icon {
          background: var(--primary-gradient);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .file-details {
          flex: 1;
          overflow: hidden;
        }

        .file-name {
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .file-size {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .clear-btn {
          color: var(--text-muted);
          transition: var(--transition-fast);
          padding: 0.5rem;
          border-radius: 50%;
        }

        .clear-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
        </div>
    );
};

export default Dropzone;
