import Immutable from 'seamless-immutable';

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
    effects: (dispatch:any) => ({
        async getSystemConfigAsync() {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/system/config`)
                .then(res => res.json())
                .then(res =>  dispatch.system.updateConfig(new SystemConfig({
                    proxyPort: res.data.proxyPort,
                    mockServerEnabled: res.data.rules.builtin['mock-server'].enabled,
                    v4InspectorEnabled: res.data.rules.builtin['v4-inspector'].enabled
                })))
                .finally(() => {
                    setTimeout(() => {
                        dispatch.spinner.hide();
                    }, 1000)
                });

        },
    })
};
