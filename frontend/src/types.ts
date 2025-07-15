export type exportFormat = 'SRT' | 'TXT' | 'VTT';

export interface SelectionOptions {
    label: string;
    value: string;
}

export interface UploadedFile {
    name: string;
    duration: number;
    size: number;
    width: number;
    height: number;
}

export interface AdjustedFileData extends UploadedFile {
    adjustedHeight: number;
    adjustedWidth: number;
    adjustedStartTime: number;
    adjustedEndTime: number;
    xOffset: number;
    yOffset: number;
    compressedWidth: number;
    compressedHeight: number;
}
