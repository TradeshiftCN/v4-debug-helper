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
        updateV4InspectorConfig(state: any, inspectUrls: InspectUrlModel[], appRedirectMapping: AppRedirectMappingModel[]){
          return  state.merge({inspectUrls, appRedirectMapping});
        }
    },
    effects: (dispatch: any) => ({
        async getV4InspectorConfigAsync() {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/rules/v4-inspector/config`)
                .then(res =>res.json())
                .then(res => responseHandler(res))
                .then(res => dispatch.v4Inspector.updateV4InspectorConfig(res.data.inspectUrls, res.data.appRedirectMapping))
                .catch(res => dispatch.notification.error('Get V4 Inspector Config Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());
        },
        async addInspectUrlsSync(newModel: InspectUrlModel) {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/rules/v4-inspector/hack-url`, {
                method: 'POST',
                body: JSON.stringify(newModel),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => responseHandler(res))
                .then(res => dispatch.v4Inspector.getV4InspectorConfigAsync())
                .catch(res => dispatch.notification.error('Add V4 Inspector Url Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());
        },
        async updateInspectUrlSync(newModel: InspectUrlModel) {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/rules/v4-inspector/hack-url/${newModel.name}`, {
                method: 'PUT',
                body: JSON.stringify(newModel),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => responseHandler(res))
                .then(res => dispatch.v4Inspector.getV4InspectorConfigAsync())
                .catch(res => dispatch.notification.error('Update V4 Inspector Url Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());
        },
        async deleteInspectUrlSync(name:string) {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/rules/v4-inspector/hack-url/${name}`, {
                method: 'DELETE'
            }).then(res => res.json())
                .then(res => responseHandler(res))
                .then(res => dispatch.v4Inspector.getV4InspectorConfigAsync())
                .catch(res => dispatch.notification.error('DELETE V4 Inspector Url Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());
        },
        async addAppMappingSync(newModel: AppRedirectMappingModel) {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/rules/v4-inspector/app-mapping`, {
                method: 'POST',
                body: JSON.stringify(newModel),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => responseHandler(res))
                .then(res => dispatch.v4Inspector.getV4InspectorConfigAsync())
                .catch(res => dispatch.notification.error('Add App Redirect Mapping Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());
        },
        async updateAppMappingSync(newModel: AppRedirectMappingModel) {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/rules/v4-inspector/app-mapping/${newModel.appId}`, {
                method: 'PUT',
                body: JSON.stringify(newModel),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => responseHandler(res))
                .then(res => dispatch.v4Inspector.getV4InspectorConfigAsync())
                .catch(res => dispatch.notification.error('Update App Redirect Mapping Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());
        },
        async deleteAppMappingSync(appId:string) {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/rules/v4-inspector/app-mapping/${appId}`, {
                method: 'DELETE'
            }).then(res => res.json())
                .then(res => responseHandler(res))
                .then(res => dispatch.v4Inspector.getV4InspectorConfigAsync())
                .catch(res => dispatch.notification.error('DELETE App Redirect Mapping Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());
        }
    })
};
