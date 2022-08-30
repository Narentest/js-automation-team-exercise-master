export default class PlayStation {

    public isOnline = true;

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
