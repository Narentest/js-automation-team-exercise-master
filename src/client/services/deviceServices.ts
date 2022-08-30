import Axios from 'axios';
import { GET_DEVICE_INFOS_API_ENDPOINT, GET_DEVICE_ONLINE_STATUS_API_ENDPOINT, REBOOT_DEVICE_API_ENDPOINT, TAKE_DEVICE_SCREENSHOT_API_ENDPOINT } from '../../common/api/apiEndpoints';
import DeviceInfo from '../../common/deviceInfo';

export async function getDeviceInfos(): Promise<Array<DeviceInfo>> {
    const response = await Axios.get(GET_DEVICE_INFOS_API_ENDPOINT);
    return response.data;
}

export async function getDeviceOnlineStatus(address: string): Promise<boolean> {
    const urlEncodedDeviceId = encodeURIComponent(address);
    const requestUrl = GET_DEVICE_ONLINE_STATUS_API_ENDPOINT
        .replace(':address', urlEncodedDeviceId);
    const response = await Axios.get(requestUrl);
    return response.data;
}

export function rebootDevice(address: string): Promise<void> {
    console.log('Reboot device', address)
    const urlEncodedDeviceId = encodeURIComponent(address);
    const requestUrl = REBOOT_DEVICE_API_ENDPOINT
        .replace(':address', urlEncodedDeviceId);
    return Axios.get(requestUrl);
}
