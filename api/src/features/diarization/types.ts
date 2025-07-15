import {DiarizationContent} from '@hendrikytt/api-contracts';

export type BaseResp = {
    jobId: string;
    status: string;
}

export interface PyannoteResp extends BaseResp {
    message: string;
}

export interface WebHookResp extends BaseResp {
    output: {
        diarization: DiarizationContent[];
    }
}