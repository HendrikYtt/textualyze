import { useEffect } from 'react';

export const CrispChat = () => {
	useEffect(() => {
		window.$crisp = [];
		window.CRISP_WEBSITE_ID = '0bf399b6-e0cf-4d92-8ea8-fa9979ced003';

		const d = document;
		const s = d.createElement('script');
		s.src = 'https://client.crisp.chat/l.js';
		s.async = Boolean(1);
		d.getElementsByTagName('head')[0].appendChild(s);

		return () => {
			d.getElementsByTagName('head')[0].removeChild(s);
		};
	}, []);

	return null;
};
