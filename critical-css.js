const path = require('path');
const colors = require('colors/safe');
const penthouse = require('penthouse');
const fs = require('fs');

const {
    PROJECT_ROOT,
    criticalCSS: {baseUrl, entrypoints, outputDir},
} = require('./config.js');
const assetPaths = require(path.resolve(PROJECT_ROOT, 'dist/assets.json'));

function extractCriticalCss(url, name) {
    return penthouse({
        url: `${baseUrl}${url}`,
        css: `${PROJECT_ROOT}/dist/${assetPaths.main.css}`,
    }).then((criticalCss) => {
        fs.writeFileSync(`${outputDir}${name}.css`, criticalCss);
    });
}

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

Promise.all(Object.keys(entrypoints).map((key) => extractCriticalCss(entrypoints[key], key)))
    .then(() => {
        /* eslint-disable no-console */
        console.log(colors.green(`Critical CSS generated from: ${assetPaths.main.css}`));
    })
    .catch((e) => {
        console.log(colors.red('Error generating Critical CSS:'));
        console.log(colors.red(e));
        /* eslint-enable no-console */
    });