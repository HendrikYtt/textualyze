import * as React from 'react';
import {Helmet} from 'react-helmet-async';
import {SEOMetaContent, SEOMetaContents} from './meta';
import {useLocation} from 'react-router-dom';

interface Props {
	path: string;
}

export const SEO: React.FC<Props> = ({ path }) => {
	const location = useLocation();
	const isPricingPage = location.pathname === '/pricing';

	const content: SEOMetaContent | undefined = SEOMetaContents.find((m: SEOMetaContent) => m.path === path);

	const defaultContent: SEOMetaContent = {
		path: 'default',
		title: 'Default Title',
		description: 'Default description',
		keywords: 'default,keywords'
	};

	const finalContent: SEOMetaContent = content || defaultContent;

	return (
		<Helmet>
			{/* Google Tag (gtag.js) */}
			<script async src="https://www.googletagmanager.com/gtag/js?id=G-RRZKHJWVRT"></script>
			<script>
				{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-RRZKHJWVRT');
				    `}
			</script>

			{isPricingPage && (
				<script>
					{`
							function gtag_report_conversion(url) {
							  var callback = function () {
								if (typeof(url) != 'undefined') {
								  window.location = url;
								}
							  };
							  gtag('event', 'conversion', {
								'send_to': 'AW-11475473909/xl2ACP-GgKEZEPWr998q',
								'transaction_id': '',
								'event_callback': callback
							  });
							  return false;
							}
					  `}
				</script>
			)}

			<title>{finalContent.title}</title>
			<meta name="description" content={finalContent.description} />
			<meta name="keywords" content={finalContent.keywords} />
			<link rel="canonical" href={`https://textualyze.com${path}`}/>
		</Helmet>
	);
};
