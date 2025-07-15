import {log} from './log';

export const access_token = 'EAAQgXzGHY0cBOycEWkiSMkqeQF4pSgupgZAXk5qF464ahpXbvvCALGjdjEsnTfCc34QViKD72g1iQ66HeY1BjoaGOa2MmZAHMZApkHXTMZBdJpgjfMlFi80ZCoi5XSNdrKrXEWF24TKBPdXcjexbGHWzGZCZBURBi3TWKZAWPJFSpv1XQMoASoYRbnlJesDi2kwIqgZDZD';
export const pixel_id = '7929960480391397';
// const api = bizSdk.FacebookAdsApi.init(access_token);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const executeEventRequest = async (eventRequest: any) => {
	try {
		const response = await eventRequest.execute();
		log.info('Meta Response: ', response);
	} catch (err) {
		log.error('Meta error: ', err);
	}
};

