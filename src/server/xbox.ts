import { readFileSync } from 'fs';

export default class Xbox {

    public isOnline = true;

    public takeScreenshot(): Buffer {
        if (!this.isOnline) {
            return Buffer.from('');
        }
        return readFileSync(__dirname + '/../../images/xbox.jpg');
    }

    public reboot(): Promise<void> {
        if (!this.isOnline) {
            return Promise.resolve();
        }
        this.isOnline = false;
        return new Promise(resolve => setTimeout(() => {
            this.isOnline = true;
            resolve();
        }, 4000));
    }
}
