import Immutable from 'seamless-immutable';


const initState = Immutable({
    message: 'loading',
    show: false
});

export const spinner = {
    state: initState,
    reducers: {
        show(state: any, message = 'loading') {
            return state.merge({
                show: true,
                message
            })
        },
        hide(state: any) {
            return initState
        }
    }
};
