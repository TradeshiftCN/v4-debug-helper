const validate = require('jsonschema').validate;
const Response = require('./response.dto');

const schemaValidator = (schema) => {
    return (req, res, next) => {
        const result = validate(req.body, schema);
        if(result.errors.length > 0){
            res.status(403).send(new Response({
                error: `request body schema invalid, should be ${JSON.stringify(schema)}`
            }));
            return;
        } else {
            next();
        }
    }
};

module.exports = schemaValidator;
