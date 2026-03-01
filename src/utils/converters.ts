import { ConversionFormat, FileData } from './types';
import Papa from 'papaparse';
import jsPDF from 'jspdf';

// --- Utility Functions ---

const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const getFileNameWithoutExtension = (filename: string) => {
    return filename.split('.').slice(0, -1).join('.');
};

const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
};

const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
};

// --- Actual Browser Conversions ---

export const convertCsvToJson = async (fileData: FileData): Promise<string> => {
    const text = await readFileAsText(fileData.file);
    return new Promise((resolve, reject) => {
        Papa.parse(text, {
            header: true,
            complete: (results) => {
                const jsonStr = JSON.stringify(results.data, null, 2);
                const blob = new Blob([jsonStr], { type: 'application/json' });
                const newName = `${getFileNameWithoutExtension(fileData.file.name)}.json`;
                downloadFile(blob, newName);
                resolve(newName);
            },
            error: (error: any) => reject(error)
        });
    });
};

export const convertCsvToHtml = async (fileData: FileData): Promise<string> => {
    const text = await readFileAsText(fileData.file);
    return new Promise((resolve, reject) => {
        Papa.parse(text, {
            header: true,
            complete: (results) => {
                const data = results.data as any[];
                if (data.length === 0) return resolve('');

                const headers = Object.keys(data[0]);

                let htmlStr = `
<!DOCTYPE html>
<html>
<head>
  <style>
    table { border-collapse: collapse; width: 100%; font-family: sans-serif; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <table>
    <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>
      ${data.map(row => `<tr>${headers.map(h => `<td>${row[h] || ''}</td>`).join('')}</tr>`).join('')}
    </tbody>
  </table>
</body>
</html>`;

                const blob = new Blob([htmlStr], { type: 'text/html' });
                const newName = `${getFileNameWithoutExtension(fileData.file.name)}.html`;
                downloadFile(blob, newName);
                resolve(newName);
            },
            error: (error: any) => reject(error)
        });
    });
};

export const convertImageToPdf = async (fileData: FileData): Promise<string> => {
    const dataUrl = await readFileAsDataURL(fileData.file);

    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            // Create PDF based on image orientation
            const orientation = img.width > img.height ? 'l' : 'p';
            const pdf = new jsPDF({
                orientation,
                unit: 'px',
                format: [img.width, img.height]
            });

            pdf.addImage(dataUrl, 'JPEG', 0, 0, img.width, img.height);
            const newName = `${getFileNameWithoutExtension(fileData.file.name)}.pdf`;
            pdf.save(newName);
            resolve(newName);
        };
        img.src = dataUrl;
    });
};

// --- Mocked Conversions for Premium Server-Side Processing ---

export const mockServerConversion = async (
    fileData: FileData,
    toFormat: ConversionFormat,
    onProgress: (progress: number) => void
): Promise<string> => {
    return new Promise((resolve) => {
        let progress = 0;

        // Simulate upload phase
        const uploadInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 40) {
                clearInterval(uploadInterval);

                // Simulate processing phase
                const processInterval = setInterval(() => {
                    progress += Math.random() * 5;
                    if (progress >= 95) {
                        clearInterval(processInterval);
                        progress = 100;
                        onProgress(progress);

                        // Resolve after a small delay to show 100%
                        setTimeout(() => {
                            const newName = `${getFileNameWithoutExtension(fileData.file.name)}.${toFormat}`;
                            // Simulate downloading the "converted" file
                            const blob = new Blob(['Mock converted content'], { type: 'text/plain' });
                            downloadFile(blob, newName);
                            resolve(newName);
                        }, 800);
                    } else {
                        onProgress(Math.min(95, progress));
                    }
                }, 300);
            } else {
                onProgress(progress);
            }
        }, 200);
    });
};

// --- Main Facade ---

export const processConversion = async (
    fileData: FileData,
    fromFormat: ConversionFormat,
    toFormat: ConversionFormat,
    onProgress: (progress: number) => void
): Promise<string> => {
    const conversionKey = `${fromFormat}-${toFormat}`;

    try {
        // Attempt actual browser conversions if supported
        if (conversionKey === 'csv-json') {
            onProgress(50);
            const res = await convertCsvToJson(fileData);
            onProgress(100);
            return res;
        }
        else if (conversionKey === 'csv-html') {
            onProgress(50);
            const res = await convertCsvToHtml(fileData);
            onProgress(100);
            return res;
        }
        else if (conversionKey === 'image-pdf') {
            onProgress(50);
            const res = await convertImageToPdf(fileData);
            onProgress(100);
            return res;
        }

        // Fallback to simulated server-side processing for complex formats (PDF to Word, etc.)
        return mockServerConversion(fileData, toFormat, onProgress);

    } catch (error) {
        console.error("Conversion failed:", error);
        throw error;
    }
};
