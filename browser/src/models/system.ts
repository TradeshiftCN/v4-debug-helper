import Immutable from 'seamless-immutable';

import { responseHandler, getErrorMessage } from '../common/responseHandler';

export class SystemConfig {
    proxyPort: Number;
    mockServerEnabled: boolean;
    v4InspectorEnabled: boolean;

    constructor({proxyPort = 8001, mockServerEnabled = false, v4InspectorEnabled = false}) {
        this.proxyPort = proxyPort;
        this.mockServerEnabled = mockServerEnabled;
        this.v4InspectorEnabled = v4InspectorEnabled;
    }

}

const initState = Immutable(new SystemConfig({}));
const BASE_URL = 'http://localhost:8003';

export const system = {
    state: initState,
    reducers: {
        updateConfig(state: any, config: SystemConfig) {
            return state.merge(config)
        }
    },
    effects: (dispatch: any) => ({
        async getSystemConfigAsync() {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/system/config`)
                .then(res => res.json())
                .then(res => responseHandler(res))
                .then(res => dispatch.system.updateConfig(new SystemConfig({
                    proxyPort: res.data.proxyPort,
                    mockServerEnabled: res.data.rules.builtin['mock-server'].enabled,
                    v4InspectorEnabled: res.data.rules.builtin['v4-inspector'].enabled
                })))
                .catch(res => dispatch.notification.error('Get System Config Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());

        },
        async toggleV4InspectorAsync(enabled: boolean, rootState: any) {
            const oldState = rootState.system;
            return await dispatch.system.updateSystemConfigAsync(new SystemConfig({
                proxyPort: oldState.proxyPort,
                v4InspectorEnabled: enabled,
                mockServerEnabled: oldState.mockServerEnabled
            }));
        },
        async toggleMockServerAsync(enabled: boolean, rootState: any) {
            const oldState = rootState.system;
            return await dispatch.system.updateSystemConfigAsync(new SystemConfig({
                proxyPort: oldState.proxyPort,
                v4InspectorEnabled: oldState.v4InspectorEnabled,
                mockServerEnabled: enabled
            }));
        },
        async updateSystemConfigAsync(systemConfig: SystemConfig) {
            const body = {
                proxyPort: systemConfig.proxyPort,
                rules: {
                    builtin: {
                        'mock-server': {
                            enabled: systemConfig.mockServerEnabled
                        },
                        'v4-inspector': {
                            enabled: systemConfig.v4InspectorEnabled
                        }
                    }
                }
            };

            dispatch.spinner.show();
            return fetch(`${BASE_URL}/system/config`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => responseHandler(res))
                .then(res => dispatch.system.getSystemConfigAsync())
                .catch(res => dispatch.notification.error('Update System Config Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());
        },
    })
};
