import Immutable from 'seamless-immutable';
import { responseHandler, getErrorMessage } from '../common/responseHandler';

const initState = Immutable({
    status: 'stopped'
});

const BASE_URL = 'http://localhost:8003';

export const proxy = {
    state: initState,
    reducers: {
        updateStatus(state: any, status: string) {
            return state.merge({
                status
            })
        }
    },
    effects: (dispatch:any) => ({
        async startProxyAsync() {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/proxy/start`, {method: 'PUT'})
                .then(res => res.json())
                .then(res => responseHandler(res))
                .then(() =>  dispatch.proxy.updateStatus('started'))
                .catch(res => dispatch.notification.error('Proxy Start Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());

        },
        async stopProxyAsync() {
            dispatch.spinner.show();
            return fetch(`${BASE_URL}/proxy/stop`, {method: 'PUT'})
                .then(res => res.json())
                .then(res => responseHandler(res))
                .then(() =>  dispatch.proxy.updateStatus('stopped'))
                .catch(res => dispatch.notification.error('Proxy Stop Failed', getErrorMessage(res)))
                .finally(() => dispatch.spinner.hide());

        },
        async restartProxyAsync() {
            return dispatch.proxy.stopProxyAsync().then(() => dispatch.proxy.startProxyAsync());
        }
    })
};
