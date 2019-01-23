var fs = require('fs');

const htmlString = fs.readFileSync('./obama-contingency-plans.html').toString();

// This is the date you want a Wayback snapshot from (note that month is 0-based, while the rest are not)
const waybackDate = new Date(2016, 0, 1);
const waybackTimestamp = `${waybackDate.getFullYear()}${waybackDate.getMonth() + 1}${waybackDate.getDate()}`;

// Figure out the URLs
const urls = [];
const urlExpression = /<a href="([^"]+)"/g;
var match;
while (match = urlExpression.exec(htmlString)) {
  urls.push(match[1]);
  console.log(urls);
  // List of URLs for snapshots in Wayback
  const waybackUrls = urls.map(url => `https://web.archive.org/web/${waybackTimestamp}/${url}`);
  console.log(waybackUrls);
}
