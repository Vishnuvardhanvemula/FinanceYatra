import { useEffect } from 'react';

const useMetaTags = (title, description, image, url) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Remove existing meta tags
    const existingMetaTags = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]');
    existingMetaTags.forEach(tag => tag.remove());

    // Create new meta tags
    const metaTags = [
      // Open Graph tags
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Finance Yatra' },

      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:url', content: url },
    ];

    // Add meta tags to head
    metaTags.forEach(({ property, name, content }) => {
      const meta = document.createElement('meta');
      if (property) meta.setAttribute('property', property);
      if (name) meta.setAttribute('name', name);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    });

    // Cleanup function to restore original title and remove meta tags
    return () => {
      document.title = 'Finance Yatra - Your AI-Powered Finance Learning Platform';
      metaTags.forEach(() => {
        const tags = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]');
        tags.forEach(tag => tag.remove());
      });
    };
  }, [title, description, image, url]);
};

export default useMetaTags;