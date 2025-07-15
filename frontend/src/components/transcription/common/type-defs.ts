import {RequestPayload} from '@hendrikytt/api-contracts';

export type RequestPayloadNumberKey = keyof {
    [K in keyof RequestPayload as RequestPayload[K] extends number ? K : never]: RequestPayload[K]
};

export type RequestPayloadBooleanKey = keyof {
    [K in keyof RequestPayload as RequestPayload[K] extends boolean ? K : never]: RequestPayload[K]
};

export type RequestPayloadStringOrNullKey = keyof {
    [K in keyof RequestPayload as RequestPayload[K] extends string | null ? K : never]: RequestPayload[K]
};

export type RequestPayloadStringKey = keyof {
    [K in keyof RequestPayload as RequestPayload[K] extends string ? K : never]: RequestPayload[K]
};