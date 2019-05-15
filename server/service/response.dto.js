class ResponseDto{
    constructor({data, error}){
        this.data = data;
        this.error = error;
    }
}

module.exports = ResponseDto;
