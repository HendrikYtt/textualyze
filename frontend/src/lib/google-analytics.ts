import {PlanType} from '@hendrikytt/api-contracts';

export const GA_ID = 'G-RRZKHJWVRT';

export const GA_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');
`;

export const GA_LINK = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

export type GAEvent =
	'Choose-your-file'
	| 'Submit-file'
	| 'Delete-file'
	| 'Transcribe-another'
	| 'Logout'
	| PlanType
	| `${PlanType}_confirm`

export const handleGAEvent = (event: GAEvent) => {
	if (window.gtag) {
		window.gtag('event', event, {
			'event_category': 'user_activity',
			'event_action': event,
			'event_label': event
		});
	}

};