export const FB_PIXEL_ID = window.REACT_PUBLIC_FACEBOOK_PIXEL_ID || process.env.REACT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageview = () => {
	window.fbq('track', 'PageView');
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options = {}) => {
	window.fbq('track', name, options);
};

export const META_PIXEL_SCRIPT = `
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', ${FB_PIXEL_ID});
  fbq('track', 'PageView');
  window.metaPixelLoaded = true;  // Add this line
`;