var fs = require('fs');

// Run with --json to get a JSON array instead of newline-delimited list
const outputJson = process.argv.includes('--json');

const htmlString = fs.readFileSync('./obama-contingency-plans.html').toString();

// This is the date you want a Wayback snapshot from (note that month is 0-based, while the rest are not)
const waybackDate = new Date(2016, 0, 1);
const waybackTimestamp =
  waybackDate.getFullYear().toString().padStart(4, '0') +
  (waybackDate.getMonth() + 1).toString().padStart(2, '0') +
  waybackDate.getDate().toString().padStart(2, '0');

// Parse out the URLs
const urls = [];
const urlExpression = /<a[^>]*\shref="([^"]+)"/g;
var match;
while (match = urlExpression.exec(htmlString)) {
  urls.push(match[1]);
}

// Convert URLs to Wayback Memento URLs
const waybackUrls = urls.map(url => `https://web.archive.org/web/${waybackTimestamp}/${url}`);

if (outputJson) {
  console.log(JSON.stringify(waybackUrls));
}
else {
  waybackUrls.forEach(url => console.log(url));
}
