import * as React from 'react';
import DeviceInfo from '../../common/deviceInfo';
import DeviceInfoItemContainer from './deviceInfoItemContainer';
import { getDeviceOnlineStatus, rebootDevice } from '../services/deviceServices';
import { TAKE_DEVICE_SCREENSHOT_API_ENDPOINT } from '../../common/api/apiEndpoints';

interface DeviceInfoListProps {
    deviceInfos: Array<DeviceInfo>;
}

export default class DeviceInfoList extends React.Component<DeviceInfoListProps> {

    public render(): React.ReactNode {
        const deviceInfoItemContainers = this.props.deviceInfos
            .map(deviceInfo =>
                <DeviceInfoItemContainer
                    key={deviceInfo.address}
                    address={deviceInfo.address}
                    getDeviceOnlineStatus={getDeviceOnlineStatus}
                    name={deviceInfo.name}
                    screenshotBaseUrl={TAKE_DEVICE_SCREENSHOT_API_ENDPOINT
                        .replace(':address', encodeURIComponent(deviceInfo.address))}
                    reboot={rebootDevice}
                />
            );
        return (<div className="device-info-list">{deviceInfoItemContainers}</div>);
    }

}
