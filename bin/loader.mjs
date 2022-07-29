import {
    createRequire
} from 'module';
import fs from 'fs';
import path from 'path';
x();
(async function() {
    const FgReset = "\x1b[0m";
    const FgRed = "\x1b[31m";
    const FgGreen = "\x1b[32m";
    const FgYellow = "\x1b[33m";
    const FgBlue = "\x1b[34m";
    async function loadPackages() {
        const require = createRequire(import.meta.url);
        function getDirectories(srcpath) {
            return fs.readdirSync(srcpath).filter(file => {
                return fs.statSync(path.join(srcpath, file)).isDirectory()
            })
        }
        if (fs.existsSync('./packages/index.js')) {
            require('./../packages/index.js')
        } else {
            await import('./../packages/index.mjs');
        }
    }
    await loadPackages();
    console.log(`${FgYellow}[INFO]${FgReset} Starting packages...`);
    let successful = !0;
    for (let h of mp.events.getAllOf('packagesLoaded')) {
        try {
            h()
        } catch (e) {
            successful = !1;
            console.error(`${FgRed}[ERROR]${FgReset} ${e.stack}`)
        }
    }
    console.log(successful ? `${FgGreen}[DONE]${FgReset} Server packages have been started.` : `${FgRed}[ERROR]${FgReset} Some packages have not managed to launch successfully, check the logs above.`);
    mp.events.remove('packagesLoaded');
    mp.events.initialized = !0
})()