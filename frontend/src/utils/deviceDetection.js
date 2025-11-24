export const isLowEndDevice = () => {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent || '';
    const isMobile = /Mobi|Android/i.test(ua);
    const cores = navigator.hardwareConcurrency || 4;
    const highDPR = typeof window !== 'undefined' && (window.devicePixelRatio || 1) > 2;
    return isMobile || cores <= 2 || highDPR;
};
