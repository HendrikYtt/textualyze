//SOCKETS
//Payload structure
import {SaleInfo, Segment} from "./index";

export type UploadCancelMessage = {
    room: string;
    data: string;
};

export type RenderMessage = {
    renderUrl: string;
};

export type ProgressMessage = {
    percentage: number;
};

export type ErrorMessage = {
    error: string;
};

export type UploadReadyMessage = {
    adjustedFileDuration: number;
    adjustedFileSize: number;
    adjustedWidth: number;
    adjustedHeight: number;
    compressedHeight: number;
    compressedWidth: number;
    projectScreenshotUrl: string;
};

export type DownloadedFileFromUrlMessage = {
    title: string;
    duration: number;
    size: number;
    originalWidth: number;
    originalHeight: number;
    adjustedWidth: number;
    adjustedHeight: number;
    compressedWidth: number;
    compressedHeight: number;
    projectScreenshotUrl: string;
}

export type TranscribeReadyMessage = {
    longestSegmentLength: number;
    originalSegments: Segment[];
    modifiedSegments: Segment[];
    language: string;
}

export type SocketEvent =
    | 'upload-cancel'
    | 'sale-info-update'
    | 'users-update'
    | 'user-projects-update'
    | 'plans-update'
    | 'render-ready'
    | 'render-failed'
    | 'render-progress'
    | 'upload-ready'
    | 'upload-failed'
    | 'transcribe-failed'
    | 'transcribe-ready'
    | 'download-from-url-to-api-progress'
    | 'download-from-url-to-api-ready'
    | 'download-from-url-to-api-failed'
    | 'diarization-finished'
    | 'diarization-failed';

//Event-payload mappings
export type EventPayloads = {
    'upload-cancel': UploadCancelMessage;
    'sale-info-update': SaleInfo;
    'users-update': 'update';
    'user-projects-update': 'update';
    'plans-update': 'update';
    'render-ready': RenderMessage;
    'render-failed': ErrorMessage;
    'render-progress': ProgressMessage;
    'upload-ready': UploadReadyMessage;
    'upload-failed': ErrorMessage;
    'transcribe-failed': ErrorMessage;
    'transcribe-ready': TranscribeReadyMessage;
    'download-from-url-to-api-progress': ProgressMessage;
    'download-from-url-to-api-ready': DownloadedFileFromUrlMessage;
    'download-from-url-to-api-failed': ErrorMessage;
    'diarization-finished': 'update';
    'diarization-failed': 'update';
};