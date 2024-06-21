const grpc = require('grpc');

const proto = grpc.load('proto/auth.proto');
const server = new grpc.Server();

const numbers = [
    '1234567890', '2345678901', '3456789012', '4567890123', '5678901234',
    '6789012345', '7890123456', '8901234567', '9012345678', '0123456789',
    '1234567800', '2345678900'
];

server.addService(proto.auth.AuthService.service, {
    varify(call, callback) {
        if (call.request.number.length === 10) {
            if (numbers.includes(call.request.number)) {
                callback(null, { exists: true });
            } else {
                callback(null, { exists: false });
            }
        } else {
            callback(new Error('Invalid mobile number length'));
        }
    },
});

server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());

server.start();
console.log('grpc server running on port:', '0.0.0.0:50050');
