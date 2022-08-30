import * as React from 'react';
import DeviceInfo from '../../common/deviceInfo';
import { getDeviceInfos } from '../services/deviceServices';
import DeviceInfoList from './deviceInfoList';

interface DeviceInfoListContainerState {
    deviceInfos: Array<DeviceInfo>;
    hasServerError: boolean;
}

export default class DeviceInfoListContainer extends React.Component<{}, DeviceInfoListContainerState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            deviceInfos: [],
            hasServerError: false
        };
    }

    public componentDidMount(): void {
        this.updateDeviceInfos();
    }

    public render(): React.ReactNode {
        if (this.state.hasServerError) {
            return (<div className="device-info-list">Server offline or not reachable</div>);
        }
        const { deviceInfos: deviceInfos } = this.state;
        if (!deviceInfos || deviceInfos.length === 0) {
            return (<div className="device-info-list">No devices registered</div>);
        }
        return <DeviceInfoList deviceInfos={deviceInfos} />;
    }

    private async updateDeviceInfos(): Promise<void> {
        let deviceInfos = new Array<DeviceInfo>();
        try {
            deviceInfos = await getDeviceInfos();
            this.setState({ hasServerError: false });
        } catch (error) {
            this.setState({ hasServerError: true });
        } finally {
            this.setState({ deviceInfos });
        }
    }

}
