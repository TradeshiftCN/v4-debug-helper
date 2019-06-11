import Immutable from 'seamless-immutable';

import { responseHandler, getErrorMessage } from '../common/responseHandler';

export interface MockRequestModel {
    method: string;
    urlPattern: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'
}

export interface MockResponseModel {
    statusCode: number;
    header: Map<string, string>;
    body: any;
}

export interface MockRuleModel {
    name: string;
    request: MockRequestModel;
    response: MockResponseModel;
    enabled: boolean;
}

const initState = Immutable({
    rules: []
});

const BASE_URL = 'http://localhost:8003';

export const mockServer = {
    state: initState,
    reducers: {
        updateMockServerConfig(state: any, rules: MockRuleModel[]){
          return  state.merge({rules});
        }
    },
    effects: (dispatch: any) => ({
        async getMockServerConfigAsync() {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/rules/mock-server/config`)
                .then(res =>res.json())
                .then(res => responseHandler(res))
                .then(res => dispatch.mockServer.updateMockServerConfig(res.data))
                .catch(res => dispatch.notification.error('Get Mock Server Config Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());
        },
        async addMockServerSync(newModel: MockRuleModel) {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/rules/mock-server/mock`, {
                method: 'POST',
                body: JSON.stringify(newModel),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => responseHandler(res))
                .then(res => dispatch.mockServer.getMockServerConfigAsync())
                .catch(res => dispatch.notification.error('Add Mock Server Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());
        },
        async updateMockServerSync(newModel: MockRuleModel) {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/rules/mock-server/mock/${newModel.name}`, {
                method: 'PUT',
                body: JSON.stringify(newModel),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => responseHandler(res))
                .then(res => dispatch.mockServer.getMockServerConfigAsync())
                .catch(res => dispatch.notification.error('Update Mock Server Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());
        },
        async deleteMockServerSync(name:string) {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/rules/mock-server/mock/${name}`, {
                method: 'DELETE'
            }).then(res => res.json())
                .then(res => responseHandler(res))
                .then(res => dispatch.mockServer.getMockServerConfigAsync())
                .catch(res => dispatch.notification.error('DELETE Mock Server Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());
        }
    })
};
