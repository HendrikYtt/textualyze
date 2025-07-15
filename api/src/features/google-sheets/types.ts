export interface UserCounts {
    period: string;
    userCount: number;
}

export interface Revenue {
    month: string;
    monthlyRevenue: number;
    cumulativeRevenue: number;
}

export type UserActions = {
    start_date: string;
    end_date: string;
    upload_count: string;
    transcription_count: string;
    video_export_count: string;
    translated_languages_count: string;
}