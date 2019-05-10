class Response{
    constructor({status = 200, data = {}, error}){
        this.status = status;
        this.data = data;
        this.error = error;
    }
}

module.exports = Response;
