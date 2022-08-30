import * as React from 'react';

interface DeviceInfoItemProps {
    address: string;
    isOnline?: boolean;
    name: string;
    reboot(): void;
    screenshotUrl?: string;
}

export default class DeviceInfoItem extends React.Component<DeviceInfoItemProps> {

    public render(): React.ReactNode {
        const { address, name, screenshotUrl } = this.props;
        return (
            <div className="device-info-item">
                <div className="device-info-name">{name}</div>
                { screenshotUrl && <img className="device-info-item-screenshot" height="150px" width="300px"
                    src={screenshotUrl}/> }
                <div className="device-info-address">{address}</div>
                <div className={this.props.isOnline ? 'device-info-item-online' : 'device-info-item-offline'}>●</div>
                <button onClick={this.props.reboot}>Reboot</button>
            </div>
        );
    }

}
