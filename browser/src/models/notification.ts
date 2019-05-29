import { notification as antNotification } from 'antd';

export const notification = {
    state: null,
    reducers: {
        error(state: any, title:string, message:string) {
            antNotification.error({
                message: title,
                description: message,
                duration: 0
            });
            return null;
        }
    }
};
