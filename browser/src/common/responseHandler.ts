export const responseHandler = (res:any) => {
    if(res.error) {
        throw new Error(res.error);
    }
    return res;
};

export const getErrorMessage = (res: any) => {
    return res.message;
};
