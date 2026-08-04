const { chromium } = require('playwright');

const BASE = 'http://localhost:8098';
const OUT = 'C:\\Users\\akars\\AppData\\Local\\Temp\\claude\\c--Users-akars-Desktop-TicketTrix-App\\19771f09-a2a3-48a4-ac71-a978f9b21274\\scratchpad\\shots';

const routes = [
  { path: '/', name: 'home' },
  { path: '/flights', name: 'flights' },
  { path: '/flights/results?from=New%20Delhi&to=Goa&date=Today', name: 'flights-results' },
  { path: '/hotels', name: 'hotels' },
  { path: '/hotels/results?city=Mumbai', name: 'hotels-results' },
  { path: '/hotels/ht-worli-sky', name: 'hotel-detail' },
  { path: '/bus', name: 'bus' },
  { path: '/bus/results?from=New%20Delhi&to=Manali&date=Today', name: 'bus-results' },
  { path: '/trips', name: 'trips' },
  { path: '/account', name: 'account' },
];

const viewports = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'tablet', width: 820, height: 1180 },
];

(async () => {
  const fs = require('fs');
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const errors = [];

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    page.on('pageerror', (err) => errors.push(`${vp.name} pageerror: ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`${vp.name} console: ${msg.text()}`);
    });

    for (const r of routes) {
      try {
        await page.goto(BASE + r.path, { waitUntil: 'networkidle', timeout: 20000 });
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${OUT}\\${vp.name}-${r.name}.png`, fullPage: false });
        console.log(`OK ${vp.name} ${r.path}`);
      } catch (e) {
        console.log(`FAIL ${vp.name} ${r.path}: ${e.message}`);
      }
    }
    await context.close();
  }

  await browser.close();
  console.log('--- console/page errors ---');
  console.log(errors.length ? errors.join('\n') : 'none');
})();
