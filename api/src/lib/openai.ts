import OpenAI from 'openai';

// export const openai = new OpenAI({apiKey: '<YOUR_KEY>'});
// export let emojiAssigner: OpenAI.Beta.Assistants.Assistant;
//
// const init = async () => {
// 	emojiAssigner = await openai.beta.assistants.retrieve('asst_82EKbY6vRvrE7u8sLOavAyKw');
// };
//
// init();

export const openai = new OpenAI({apiKey: '<YOUR_KEY>', baseURL: 'https://api.lemonfox.ai/v1'});