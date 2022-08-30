import * as React from 'react';
import DeviceInfoItem from './deviceInfoItem';

interface DeviceInfoItemContainerProps {
    address: string;
    getDeviceOnlineStatus(address: string): Promise<boolean>;
    name: string;
    reboot(address: string): Promise<void>;
    screenshotBaseUrl: string;
}

interface DeviceInfoItemContainerState {
    isOnline: boolean;
    screenshotUrl?: string;
}

export default class DeviceInfoItemContainer extends React.Component<
    DeviceInfoItemContainerProps, DeviceInfoItemContainerState
> {
    private onlineStatusUpdateInterval?: NodeJS.Timeout;
    private screenshotUpdateInterval?: NodeJS.Timeout;

    constructor(props: DeviceInfoItemContainerProps) {
        super(props);
        this.state = {
            isOnline: false,
            screenshotUrl: undefined
        };
    }

    public componentDidMount() {
        this.onlineStatusUpdateInterval = setInterval(() => this.updateOnlineStatus(), 1000);
        this.screenshotUpdateInterval = setInterval(() => this.updateScreenshotUrl(), 2000);
    }

    public componentWillUnmount() {
        if (this.onlineStatusUpdateInterval !== undefined) {
            clearInterval(this.onlineStatusUpdateInterval);
        }
        if (this.screenshotUpdateInterval !== undefined) {
            clearInterval(this.screenshotUpdateInterval);
        }
    }

    public render(): React.ReactNode {
        const { address, name } = this.props;
        return (
            <div className="device-info-item-container">
                <DeviceInfoItem
                    name={name || address}
                    isOnline={this.state.isOnline}
                    screenshotUrl={this.state.screenshotUrl}
                    reboot={() => this.reboot()}
                    address={address} />
            </div>
        );
    }

    private async reboot(): Promise<void> {
        try {
            await this.props.reboot(this.props.address);
        } catch (error) {
            console.log(error)
        }
    }

    private async updateOnlineStatus() {
        try {
            const isDeviceOnline = await this.props.getDeviceOnlineStatus(this.props.address);
            this.setState({ isOnline: isDeviceOnline });
        } catch (error) {
            this.setState({ isOnline: false });
        }
    }

    private async updateScreenshotUrl() {
        try {
            const screenshotUniqueUrl = `${this.props.screenshotBaseUrl}?timestamp=${Date.now()}`;
            this.setState({ screenshotUrl: screenshotUniqueUrl });
        } catch (error) {
            this.setState({ screenshotUrl: undefined });
        }
    }

}
