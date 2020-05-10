// Place environment variables here...
exports.DB = process.env.DB || 'this_is_the_db_conn_string';
exports.mongoUri = process.env.MONGO_URI || 'mongodb+srv://earmacatulad:5unM1cr0@dotx2db-40mvv.mongodb.net/identity-api?retryWrites=true&w=majority'
exports.jwtSecret = process.env.JWT_TOKEN || 'this_is_the_jwt_token';
exports.APP_NAME = 'NODE-EXPRESS';