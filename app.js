const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('result.json');

request('https://firstsiteguide.com/about-us/', (err, response, html) => {
    if (!err && response.statusCode == 200) {
        const $ = cheerio.load(html);

        let pObj = {}
        $("p").each(function(index) {
            pObj[index] = $(this).text();
            console.log(index + ": " + $(this).text());
        });

        writeStream.write(JSON.stringify(pObj));
    }
});