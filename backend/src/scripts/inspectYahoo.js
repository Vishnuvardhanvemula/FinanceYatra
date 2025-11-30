import * as yahooFinanceModule from 'yahoo-finance2';
import defaultExport from 'yahoo-finance2';

console.log('Default export type:', typeof defaultExport);
console.log('Default export keys:', Object.keys(defaultExport || {}));
console.log('Module exports:', Object.keys(yahooFinanceModule));
console.log('Is default export a class?', defaultExport?.toString().startsWith('class'));
