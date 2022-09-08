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
       const device = (DEVICES as any)[address];
        if (device){
        response.end(JSON.stringify(device.isOnine));
}
else {
    response.end(JSON.stringify(false));
}
    })

    .get('/device/:address/screenshot', (request: express.Request, response: express.Response) => {
       const address = request.params['address'];
       const device = (DEVICES as any)[address];
        if (device){
          const imageBuffer = device.takeScreenshot();
          response.end(imageBuffer);
        } else {
          response.end();
        }
      })

    .get('/device/:address/reboot', async (request: express.Request, response: express.Response) => {
        const address = request.params['address'];
        const device = (DEVICES as any)[address];
        if (device){
          await device.reboot();
        }
        response.end();
      })
    .use(serveStatic(DIST_FOLDER_PATH))
    .listen(80);
