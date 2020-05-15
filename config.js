const path = require('path');
const PROJECT_ROOT = path.resolve(__dirname, '../');
const glob = require('glob');
/*
 * This function need for create entry points for js-files that
 * takes from folder './src/js/scripts/'
 */
const getScripts = () => {
    return glob.sync('./src/js/scripts/**/*.js').reduce((acc, item) => {
        const path = item.split('/');

        const name = path
            .pop()
            .replace('.', '')
            .replace('js', '');

        if (path.indexOf('pages') > -1) {
            const pagesName = 'pages/' + name;
            acc[pagesName] = item;
        } else {
            acc[name] = item;
        }

        return acc;
    }, {});
};

/*
 * This function need for create entry points for scss-files
 * for different pages takes from folder './src/scss/pages/'
 */
const getStyles = () => {
    return glob.sync('./src/scss/pages/**/*.scss').reduce((acc, item) => {
        const path = item.split('/');

        const name = path
            .pop()
            .replace('.', '')
            .replace('scss', '');

        if (path.indexOf('pages') > -1) {
            const pagesName = 'pages/' + name;
            acc[pagesName] = item;
        }

        return acc;
    }, {});
};

module.exports = {
    PROJECT_ROOT,
    webpack: {
        entrypoints: {
            ...getScripts(),
            ...getStyles(),
            toplist: './src/scss/atf-toplist.scss',
        },
    },
    criticalCSS: {
        baseUrl:
            process.env.NODE_ENV === 'production' ? 'https://www.onlinecasinos.de' : 'https://local.onlinecasinos.de/',
        outputDir: './dist/css/atf/',
        entrypoints: {
            homepage: '/',
        },
    },
};