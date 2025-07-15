export const PlanTypes = ['FREE', 'BASIC', 'PRO'] as const;
type TypedPlanTypeList = typeof PlanTypes;
export type PlanType = TypedPlanTypeList[number];

export const BillingIntervals = ['NONE', 'MONTHLY', 'ANNUALLY'] as const;
type TypedBillingIntervalList = typeof BillingIntervals;
export type BillingInterval = TypedBillingIntervalList[number];

export type PlanDetails = {
    planType: PlanType;
    billingInterval: BillingInterval;
}
export type PlanMapping = {
    [key: number]: PlanDetails
};

export const PlanMappings: PlanMapping = {
    1: {
        planType: 'FREE',
        billingInterval: 'NONE'
    },
    2: {
        planType: 'BASIC',
        billingInterval: 'MONTHLY'
    },
    3: {
        planType: 'BASIC',
        billingInterval: 'ANNUALLY'
    },
    4: {
        planType: 'PRO',
        billingInterval: 'MONTHLY'
    },
    5: {
        planType: 'PRO',
        billingInterval: 'ANNUALLY'
    },
};

export type LookupKey =
    'FREE'
    | 'BASIC_MONTHLY'
    | 'BASIC_ANNUALLY'
    | 'PRO_MONTHLY'
    | 'PRO_ANNUALLY'

export const findKeyByPlanType = (planType: PlanType, billingInterval: BillingInterval): number | undefined => {
    for (const [key, value] of Object.entries(PlanMappings)) {
        if (value.planType === planType && value.billingInterval === billingInterval) {
            return parseInt(key);
        }
    }
    return undefined;
};

//MODELS
export type Plan = {
    id: number;
    plan_type: PlanType;
    billing_interval: BillingInterval;
    lookup_key: LookupKey;
    price: number;
    discounted_price: number;
    upload_limit_mb: number;
    upload_limit_seconds: number;
    transcribed_seconds_monthly_limit: number;
    export_count_limit: number; // export count limit per transcribed video
    translate_count_limit: number; // translate count limit per transcribed video
    user_templates_count_limit: number; // how many templates can user store
    user_project_limit: number; // how many projects can user store
    user_font_limit: number; // how many fonts can user store
    created_at: Date;
    updated_at: Date;
}

export type User = {
    id: number;
    stripe_customer_id: string | null;
    plan_id: number;
    email: string;
    subscription_cancel_at: Date | null;
    profile_picture_url: string | null;
    ip_addresses: string[];
    hear_from_us: string | null;
    created_at: Date;
    updated_at: Date;
}

export type NotSignedUpUser = {
    id: number;
    ip_address: string | null;
    has_uploaded: boolean;
    has_transcribed: boolean;
    has_exported: boolean;
    browser: string;
    device: string;
    hear_from_us: string | null;
    created_at: Date;
    updated_at: Date;
}

export type IPAddress = {
    ip_address: string;
    country: string;
    city: string;
    extra: any;
    created_at: Date;
    updated_at: Date;
}

export type Usage = {
    id: number;
    user_id: number;
    year: number;
    month: number;
    transcribed_seconds: number;
    created_at: Date;
    updated_at: Date;
}

export type Transcription = {
    request_id: string;
    user_id: number;
    export_count: number;
    translated_languages: string[];
    browser: string;
    device: string;
    created_at: Date;
    updated_at: Date;
}

export type FrontendUser = {
    id: number;
    stripe_customer_id: string | null;
    email: string;
    hear_from_us: string | null;
    subscription_cancel_at: Date | null;
    profile_picture_url: string | null;
    current_plan: Plan;
    usages: Usage[];
    transcriptions: Omit<Transcription, 'device' | 'browser'>[];
    created_at: Date;
    updated_at: Date;
}

export type SaleInfo = {
    is_active: boolean;
    sale_end_date: Date;
}

export interface UserTemplate extends Styling {
    user_id: number;
    created_at: Date;
    updated_at: Date;
}

export type TemplateType = 'Ali' | 'Default';

export interface Styling extends StyleColors {
    id: number;
    name: string;
    font_family: string;
    s3_font_name: string;
    outline_color: string | null;
    bounce_effect: boolean;
    italic: boolean;
    remove_symbols: boolean;
    uppercase: boolean;
    auto_font_size: boolean;
    word_by_word: boolean;
    word_spacing: number;
    auto_move: boolean;
    auto_rotate: boolean;
    fade: boolean;
    template_type: TemplateType;
    multiple_speakers: boolean;
    font_weight: number;
}

export interface StyleColors {
    font_color: string;
    background_color: string | null;
    highlight_color: string | null;
}

export interface WordObject extends StyleColors {
    id: string;
    start: number;
    startMs: string;
    end: number;
    endMs: string;
    word: string;
    probability: number;
    linebreak: boolean;
    emoji: string | null;
    emojiUrl: string | null;
    sound: string | null;
    soundVolume: number;
    speaker: string;
}

export interface Segment {
    id: number; // id when you change max words per line
    originalId: number; // id that gets assigned to segment when it initially comes out of worker
    start: number;
    startMs: string;
    end: number;
    endMs: string;
    words: WordObject[];
    text: string;
    translatedText: string;
    fontSize: number | null;
    position: number | null;
}

export type WordTuple = [number, number, string, number];

export interface InitialSegment {
    id: number;
    start: number;
    end: number;
    words: WordTuple[];
    text: string;
    translatedText: string;
    language: string;
}

export type UserProject = {
    request_id: string;
    user_id: number;
    name: string;
    request_payload: RequestPayload;
    untouched_transcription: Segment[];
    longest_segment_length: number;
    current_max_words_per_segment: number;
    screenshot_url: string;
    auto_scroll_script: boolean;
    expiration_date: Date;
    created_at: Date;
    updated_at: Date;
}

export type UploadType = 'local' | 'link';
export type UserUpload = {
    id: number;
    user_id: number;
    request_id: string;
    upload_type: UploadType;
    original_video_url: string | null;
    duration: number;
    size: number;
    width: number;
    height: number;
    browser: string;
    device: string;
    created_at: Date;
    updated_at: Date;
}

export type UserFont = {
    id: number;
    user_id: number;
    original_font_file_name: string;
    s3_font_name: string;
    file_extension: string;
    created_at: Date;
    updated_at: Date;
}

export type DiarizationContent = {
    speaker: string;
    start: number;
    end: number;
}

export type Diarization = {
    request_id: string;
    job_id: string;
    content: DiarizationContent[] | null;
    created_at: Date;
    updated_at: Date;
    is_finished: boolean;
}

export const convertToSegmentedArrayWithMaxWords = (untouchedSegments: Segment[], displayedSegments: Segment[], maxWordsPerSegment: number, translate = false): Segment[] => {
    if (maxWordsPerSegment === 0) {
        return untouchedSegments;
    }

    let idCounter = 1;
    const untouchedSegmentsWithMaxWords: Segment[] = [];
    const untouchedSegmentsCopy: Segment[] = JSON.parse(JSON.stringify(untouchedSegments));
    for (const untouchedSegmentCopy of untouchedSegmentsCopy) {
        let newSegmentWords: WordObject[] = [];
        let segmentWordCount = 0;

        for (const word of untouchedSegmentCopy.words) {
            const transformedWord: WordObject = { ...word, word: word.word.trim() };
            newSegmentWords.push(transformedWord);
            segmentWordCount++;

            // If word count reaches maxWordsPerSegment or end of segment
            if (segmentWordCount === maxWordsPerSegment || untouchedSegmentCopy.words.indexOf(word) === untouchedSegmentCopy.words.length - 1) {
                const segmentText = newSegmentWords
                    .map(word => word.word)
                    .filter(trimmedWord => trimmedWord !== '')
                    .join(' ');

                const segmentStart = newSegmentWords[0].start;
                const segmentEnd = newSegmentWords[newSegmentWords.length - 1].end;

                const wordSegment: Segment = {
                    originalId: untouchedSegmentCopy.originalId,
                    id: idCounter++,
                    start: segmentStart,
                    startMs: secondsToMSFormat(segmentStart),
                    end: segmentEnd,
                    endMs: secondsToMSFormat(segmentEnd),
                    words: newSegmentWords,
                    text: segmentText,
                    translatedText: untouchedSegmentCopy.translatedText.trim(),
                    position: untouchedSegmentCopy.position,
                    fontSize: untouchedSegmentCopy.fontSize
                };

                untouchedSegmentsWithMaxWords.push(wordSegment);
                newSegmentWords = [];
                segmentWordCount = 0;
            }
        }
    }
    return mergeSegments(untouchedSegmentsWithMaxWords, displayedSegments, translate);
};

export const mergeSegments = (untouchedSegmentsWithMaxWords: Segment[], displayedSegments: Segment[], translate: boolean): Segment[] => {
    const untouchedSegments = JSON.parse(JSON.stringify(untouchedSegmentsWithMaxWords)) as Segment[];

    untouchedSegments.forEach((untouchedSegment, index) => {
        untouchedSegment.words.forEach((originalWord, baseIndex) => {
            displayedSegments.forEach(displayedSegment => {
                displayedSegment.words.forEach(displayedWord => {
                    if (originalWord.id === displayedWord.id) {
                        // if no match found for words in untouched one, then those are not updated
                        untouchedSegment.words[baseIndex] = displayedWord;
                    }
                });
            });
        });

        untouchedSegment.text = untouchedSegment.words.map(w => w.word).join(' ');
        if (translate) {
            untouchedSegment.translatedText = displayedSegments[index].translatedText;
        }
    });

    return untouchedSegments;
};

export const secondsToMSFormat = (seconds: number) => {
    const totalSeconds = Math.floor(seconds);
    const hundredths = Math.round((seconds - totalSeconds) * 100);

    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    const formattedMins = mins.toString().padStart(2, '0');
    const formattedSecs = secs.toString().padStart(2, '0');
    const formattedHundredths = hundredths.toString().padStart(2, '0');

    return `${formattedMins}:${formattedSecs}.${formattedHundredths}`;
};

export const getExportedFileName = (fileName: string, fileExtension: string) => {
    const currentDate = new Date();
    const allowedRegexInverse = /[^0-9a-zA-Z-!_.*'()/:&$@=;+,?]/g;
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const formattedDate = currentDate.toLocaleString('en-GB', options)
        .replace(/,/g, '')
        .replace(/ /g, '_')
        .replace(/:/g, '-')
        .replace(allowedRegexInverse, '');

    const safeFileName = fileName
        .trim()
        .replace(/ /g, '_')
        .replace(allowedRegexInverse, '');

    return `${safeFileName}_${formattedDate}.${fileExtension}`;
}

//HTTP
//RESPONSES
export type AuthenticateResponse = {
    access_token: string;
}

export type SubscribeResponse = {
    url: string;
}

export type MessageResponse = {
    message: string;
}

export type TranslateResponse = {
    text: string;
}

//REQUESTS
export type ProcessingAction = 'Transcribe' | 'Translate' | '';
export type FontType = 'Default fonts' | 'Your fonts';
export type RequestPayload = {
    requestId: string;
    language: string;
    originalFileExtension: string;
    width: number;
    height: number;
    duration: number;
    size: number;
    position: number;
    fontSize: number;
    displayedTranscription: Segment[];
    processingAction: ProcessingAction;
    isAudioFile: boolean;
    s3VideoLink: string;
    s3FontLink: string;
    fontType: FontType;
    fontFileExtension: string;
    adjustedHeight: number;
    adjustedWidth: number;
    xOffset: number;
    yOffset: number;
    adjustedStartTime: number;
    adjustedEndTime: number;
    styling: Styling;
    compressedWidth: number;
    compressedHeight: number;
    uploadType: UploadType;
    speakerColors: Record<string, string>;
    targetLanguage: string | null;
    logo: Logo | null;
    showAiDescription: boolean
    aiDescription: string | null;
}

export type Logo = {
    positionX: number; // 0-100
    positionY: number; // 0-100
    opacity: number; // 10-100
    logoType: 'image' | 'text';
    imageUrl: string | null; // not null if type is image
    imageScale: number | null; // 0.1 - 2, not null if type is ‘image’
    compressedImageWidth: number | null; // not null if type is image - for FO
    adjustedImageWidth: number | null; // not null if type is image - for renderer
    compressedImageHeight: number | null; // not null if type is image - for FO
    adjustedImageHeight: number | null; // not null if type is image - for renderer
    textSize: number | null; // 1-10, in rems, not null if type is ‘text’
    textContent: string | null; // not null if type is text
}

export type TranslateRequest = {
    requestId: string;
    text: string;
    sourceLanguage: string;
    targetLanguage: string;
}

export type TranscribeRequest = {
    requestId: string;
    language: string;
    fileDuration: number;
}
