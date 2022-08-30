import { resolve } from 'path';
import * as express from 'express';
import * as serveStatic from 'serve-static';
import PlayStation from './playStation';
import Xbox from './xbox';
import DeviceInfo from '../common/deviceInfo';

const DIST_FOLDER_PATH = resolve(__dirname + '/../../dist');

const DEVICES = {
    '10.198.162.1': new Xbox(),
    '10.198.162.2': new Xbox(),
    '10.198.162.3': new PlayStation()
};

express()
    .get('/devices', (request: express.Request, response: express.Response) => {
        response.end(JSON.stringify([
            {
                address: '10.198.162.1',
                name: 'Xbox One'
            },
            {
                address: '10.198.162.2',
                name: 'Xbox Series'
            },
            {
                address: '10.198.162.3',
                name: 'PlayStation 5'
            }
        ] as Array<DeviceInfo>));
    })
    .get('/device/:address/online', (request: express.Request, response: express.Response) => {
        const address = request.params['address'];
        if (address === '10.198.162.1') {
            const xbox = DEVICES['10.198.162.1'];
            response.end(JSON.stringify(xbox.isOnline));
        } else if (address === '10.198.162.2') {
            const xbox = DEVICES['10.198.162.2'];
            response.end(JSON.stringify(xbox.isOnline));
        } else if (address === '10.198.162.3') {
            const playStation = DEVICES['10.198.162.3'];
            response.end(JSON.stringify(playStation.isOnline));
        } else {
            response.end(JSON.stringify(false));
        }
    })
    .get('/device/:address/screenshot', (request: express.Request, response: express.Response) => {
        const address = request.params['address'];
        if (address === '10.198.162.1') {
            const xbox = DEVICES['10.198.162.1'];
            const imageBuffer = xbox.takeScreenshot();
            response.end(imageBuffer);
        } else if (address === '10.198.162.2') {
            const xbox = DEVICES['10.198.162.2'];
            const imageBuffer = xbox.takeScreenshot();
            response.end(imageBuffer);
        } else {
            response.end();
        }
    })
    .get('/device/:address/reboot', async (request: express.Request, response: express.Response) => {
        const address = request.params['address'];
        if (address === '10.198.162.1') {
            const xbox = DEVICES['10.198.162.1'];
            await xbox.reboot();
            response.end();
        } else if (address === '10.198.162.2') {
            const xbox = DEVICES['10.198.162.2'];
            await xbox.reboot();
            response.end();
        } else if (address === '10.198.162.3') {
            const playStation = DEVICES['10.198.162.3'];
            await playStation.reboot();
            response.end();
        } else {
            response.end();
        }
    })
    .use(serveStatic(DIST_FOLDER_PATH))
    .listen(80);
