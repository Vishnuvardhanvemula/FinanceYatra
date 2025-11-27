
import YahooFinance from 'yahoo-finance2';

const testMarket = async () => {
    console.log('Attempting to instantiate YahooFinance...');
    try {
        const yahooFinance = new YahooFinance();
        const result = await yahooFinance.quote('^GSPC');
        console.log('Success:', result);
    } catch (error) {
        console.error('Error with instantiation:', error);

        // Fallback check: maybe it's a named export?
        console.log('Checking named exports...');
        // We can't easily check named exports dynamically in ESM without dynamic import, 
        // but let's just fail here if instantiation works.
    }
};

testMarket();
