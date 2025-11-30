import YahooFinance from 'yahoo-finance2';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
const API_KEY = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

let genAI;
let model;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
}

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

// --- AI Market Analyst Features ---

const MOCK_NEWS = [
    { title: "Tech Stocks Rally as AI Demand Surges", summary: "Major tech companies see record gains driven by artificial intelligence adoption." },
    { title: "Federal Reserve Signals Potential Rate Cuts", summary: "Central bank officials hint at easing monetary policy later this year." },
    { title: "Global Supply Chain Issues Persist", summary: "Manufacturing sectors face delays due to ongoing logistics challenges." },
    { title: "Crypto Markets Show Volatility Amid Regulation Fears", summary: "Bitcoin and Ethereum fluctuate as new regulations are proposed." },
    { title: "Green Energy Investments Hit All-Time High", summary: "Renewable energy sector attracts significant venture capital." }
];

export const getMarketNews = async () => {
    try {
        // Try to fetch general market news using a common index or search
        // 'SPY' (S&P 500 ETF) is a good proxy for general market news
        const result = await yahooFinance.search('SPY', { newsCount: 5 });

        if (result.news && result.news.length > 0) {
            return result.news.map(item => ({
                title: item.title,
                summary: item.type || 'No summary available', // Yahoo finance news object structure varies
                link: item.link,
                publisher: item.publisher,
                publishedAt: item.providerPublishTime
            }));
        }

        return MOCK_NEWS;
    } catch (error) {
        console.warn('Failed to fetch real news, using mock data:', error.message);
        return MOCK_NEWS;
    }
};

export const analyzeMarketSentiment = async () => {
    if (!model) {
        return {
            sentimentScore: 50,
            sentiment: 'Neutral',
            summary: 'AI model not configured. displaying default neutral sentiment.',
            topHeadlines: MOCK_NEWS
        };
    }

    const news = await getMarketNews();

    // Prepare prompt for Gemini
    const newsText = news.map(n => `- ${n.title}`).join('\n');
    const prompt = `
        Analyze the sentiment of the following financial news headlines:
        ${newsText}

        Provide a JSON response with:
        1. "sentimentScore": A number between 0 (Extreme Fear) and 100 (Extreme Greed).
        2. "sentiment": One of "Bullish", "Bearish", "Neutral".
        3. "summary": A 1-sentence summary of the overall market mood.
        4. "analyzedHeadlines": An array of objects, each with "title" (from input) and "sentiment" (Bullish/Bearish/Neutral).

        Return ONLY valid JSON.
    `;

    try {
        const result = await model.generateContent(prompt);
        let text = result.response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const analysis = JSON.parse(text);

        return {
            ...analysis,
            rawNews: news
        };
    } catch (error) {
        console.error('Sentiment analysis failed:', error);
        return {
            sentimentScore: 50,
            sentiment: 'Neutral',
            summary: 'Failed to analyze market sentiment. Showing neutral baseline.',
            analyzedHeadlines: news.map(n => ({ title: n.title, sentiment: 'Neutral' })),
            rawNews: news
        };
    }
};

export default {
    getMarketOverview,
    getMarketNews,
    analyzeMarketSentiment
};
