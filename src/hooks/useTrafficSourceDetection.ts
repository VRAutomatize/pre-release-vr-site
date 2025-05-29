
import { useCallback, useEffect, useState } from 'react';

export const useTrafficSourceDetection = () => {
  const [trafficSource, setTrafficSource] = useState<string>('unknown');

  const detectTrafficSource = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer;
    
    // Check UTM parameters first
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    
    if (utmMedium === 'cpc' || utmMedium === 'ppc' || utmSource?.includes('google_ads')) {
      return 'paid_google_ads';
    }
    
    if (utmMedium === 'social' || utmSource?.includes('facebook') || utmSource?.includes('instagram')) {
      return 'paid_social';
    }
    
    if (utmMedium === 'email') {
      return 'email_marketing';
    }
    
    // Analyze referrer
    if (!referrer || referrer === '') {
      return 'direct';
    }
    
    const referrerDomain = new URL(referrer).hostname.toLowerCase();
    
    if (referrerDomain.includes('google.') && !utmMedium) {
      return 'organic_google';
    }
    
    if (referrerDomain.includes('facebook.') || referrerDomain.includes('instagram.')) {
      return 'organic_social';
    }
    
    if (referrerDomain.includes('linkedin.') || referrerDomain.includes('twitter.') || referrerDomain.includes('youtube.')) {
      return 'organic_social';
    }
    
    return 'referral';
  }, []);

  useEffect(() => {
    const source = detectTrafficSource();
    setTrafficSource(source);
  }, [detectTrafficSource]);

  return {
    trafficSource,
    detectTrafficSource
  };
};
