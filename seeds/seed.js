const NetworkInfo = require('../Models/NetworkInfo');
const mongo = require('mongoose');
require('dotenv').config();
//mongodb+srv://noodlescriptervpn:QNajBzYsdRBU8Vcz@vpn-connector.tixzpgq.mongodb.net/?retryWrites=true&w=majority
//mongodb://admin:pass123@localhost:27017/vpn-connector
mongo.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const addDummyInfo = async () => {
    await NetworkInfo.deleteMany({});
    const network = new NetworkInfo({
        networkid: '163e3f05a0',
        fullname: 'Hamim Alam',
        device: 'MAC OS',
        email: 'test@gmail.com'
    });

    await network.save();
}

addDummyInfo().then(() => {mongo.connection.close()})