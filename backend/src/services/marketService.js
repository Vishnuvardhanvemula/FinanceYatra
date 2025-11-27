import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance();

// In-memory cache
let cache = {
    data: null,
    lastUpdated: 0
};

const CACHE_DURATION = 60 * 1000; // 60 seconds

const SYMBOLS = [
    '^NSEI',   // Nifty 50
    '^BSESN',  // Sensex
    '^GSPC',   // S&P 500
    'BTC-USD', // Bitcoin
    'ETH-USD', // Ethereum
    'INR=X'    // USD/INR
];

const SYMBOL_NAMES = {
    '^NSEI': 'Nifty 50',
    '^BSESN': 'Sensex',
    '^GSPC': 'S&P 500',
    'BTC-USD': 'Bitcoin',
    'ETH-USD': 'Ethereum',
    'INR=X': 'USD/INR'
};

export const getMarketOverview = async () => {
    const now = Date.now();

    // Return cached data if valid
    if (cache.data && (now - cache.lastUpdated < CACHE_DURATION)) {
        console.log('📊 Returning cached market data');
        return cache.data;
    }

    console.log('🔄 Fetching fresh market data from Yahoo Finance...');

    try {
        const results = await Promise.all(
            SYMBOLS.map(async (symbol) => {
                try {
                    console.log(`  Fetching ${symbol}...`);
                    const quote = await yahooFinance.quote(symbol);
                    console.log(`  ✅ ${symbol}: $${quote.regularMarketPrice}`);
                    return {
                        symbol: symbol,
                        name: SYMBOL_NAMES[symbol] || quote.shortName || symbol,
                        price: quote.regularMarketPrice || 0,
                        change: quote.regularMarketChange || 0,
                        changePercent: quote.regularMarketChangePercent || 0,
                        currency: quote.currency || 'USD'
                    };
                } catch (err) {
                    console.error(`  ❌ Failed to fetch ${symbol}:`, err.message);
                    return null;
                }
            })
        );

        // Filter out failed requests
        const validResults = results.filter(item => item !== null);
        console.log(`✅ Successfully fetched ${validResults.length}/${SYMBOLS.length} symbols`);

        // Update cache
        cache = {
            data: validResults,
            lastUpdated: now
        };

        return validResults;
    } catch (error) {
        console.error('❌ Error fetching market overview:', error);
        throw new Error('Failed to fetch market data');
    }
};
