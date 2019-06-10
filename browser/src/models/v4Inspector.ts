import Immutable from 'seamless-immutable';

import { responseHandler, getErrorMessage } from '../common/responseHandler';

export interface InspectUrlModel {
    name: string;
    pattern: string;
    enabled: boolean;
}

export interface AppRedirectMappingModel {
    appId: string;
    redirectUrl: string;
    enabled: boolean;
}

const initState = Immutable({
    inspectUrls: [],
    appRedirectMapping: []
});

const BASE_URL = 'http://localhost:8003';

export const v4Inspector = {
    state: initState,
    reducers: {
        updateInspectUrls(state: any, inspectUrls: InspectUrlModel[]) {
            return state.merge({inspectUrls});
        },
        updateAppRedirectMapping(state: any, appRedirectMapping: AppRedirectMappingModel[]) {
            return state.merge({appRedirectMapping});
        }
    },
    effects: (dispatch: any) => ({
        async getV4InspectorConfigAsync() {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/rules/v4-inspector/config`)
                .then(res =>res.json())
                .then(res => responseHandler(res))
                .then(res => {
                    dispatch.v4Inspector.updateInspectUrls(res.data.inspectUrls);
                    dispatch.v4Inspector.updateAppRedirectMapping(res.data.appRedirectMapping);
                })
                .catch(res => dispatch.notification.error('Get V4 Inspector Config Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());
        }
    })
};
