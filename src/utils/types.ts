export type ConversionFormat =
    | 'pdf' | 'doc' | 'word' | 'ppt' | 'excel'
    | 'csv' | 'xml' | 'html' | 'image' | 'text' | 'json';

export interface FileData {
    file: File;
    previewUrl?: string;
}

export interface ConversionJob {
    id: string;
    sourceFile: FileData;
    fromFormat: ConversionFormat;
    toFormat: ConversionFormat;
    status: 'idle' | 'converting' | 'success' | 'error';
    progress: number;
    resultUrl?: string;
    errorMessage?: string;
}

// Map of valid "Convert To" formats based on "Convert From" format
export const VALID_CONVERSIONS: Record<ConversionFormat, ConversionFormat[]> = {
    pdf: ['doc', 'word', 'image', 'text', 'csv'],
    doc: ['pdf', 'ppt'],
    word: ['pdf', 'excel', 'text'],
    ppt: ['doc', 'pdf'],
    excel: ['doc', 'csv', 'pdf'],
    csv: ['pdf', 'xml', 'html', 'json', 'excel'],
    xml: ['csv', 'json'],
    html: ['csv', 'text', 'pdf'],
    image: ['pdf', 'text'],
    text: ['image', 'pdf', 'word', 'html'],
    json: ['csv', 'xml', 'html']
};

export const FORMAT_LABELS: Record<ConversionFormat, string> = {
    pdf: 'PDF',
    doc: 'DOC',
    word: 'Word',
    ppt: 'PPT',
    excel: 'Excel',
    csv: 'CSV',
    xml: 'XML',
    html: 'HTML',
    image: 'Image (PNG/JPG)',
    text: 'Text (TXT)',
    json: 'JSON'
};

// Determines if we can actually convert this in browser, or if it will be a "simulated" premium feature
export const isBrowserConvertible = (from: ConversionFormat, to: ConversionFormat): boolean => {
    const browserDirect = [
        'csv-json', 'json-csv',
        'csv-html',
        'image-pdf',
        // We can simulate reading text to some degree
    ];
    return browserDirect.includes(`${from}-${to}`);
};
