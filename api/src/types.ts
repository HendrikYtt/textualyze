export type AuthenticationSession = {
    id: string;
    email: string;
    oob_code: string;
    expires_at: Date;
    created_at: Date;
};

export interface MailInterface {
    from?: string;
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    text?: string;
    html: string;
}

export type TestEmail = {
    email: string;
};

export type InitialWordObject = {
    word: string;
    start: number;
    end: number;
    score: number;
    speaker: string;
}

export type InitialSegment = {
    id: number;
    text: string;
    start: number;
    end: number;
    language: string;
    speaker: string;
    words: InitialWordObject[];
}

export type InitialSegmentsV2 = {
    task: 'transcribe' | 'translate';
    language: string;
    duration: number;
    text: string;
    segments: InitialSegment[];
}