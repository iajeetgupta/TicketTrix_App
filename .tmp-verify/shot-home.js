const { chromium } = require('playwright');

const BASE = 'http://localhost:8098';
const OUT = 'C:\\Users\\akars\\AppData\\Local\\Temp\\claude\\c--Users-akars-Desktop-TicketTrix-App\\19771f09-a2a3-48a4-ac71-a978f9b21274\\scratchpad\\shots2';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(BASE + '/', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}\\phone-home.png` });
  console.log('OK phone home');
  await browser.close();
})();
