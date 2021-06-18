const fs = require('fs');
const ethers = require('ethers');
const privateKeyToAddress = require('ethereum-private-key-to-address');
var providers = ethers.providers;

const readJson = (file) => {
	return JSON.parse(fs.readFileSync(file));
};
const writeJson = (file, json) => {
	fs.writeFileSync(file, JSON.stringify(json));
};
const existsFile = (file) => {
	return fs.existsSync(file);
};

function getValidBalance(privateKey) {
    var publicAddress = getPublicAddress(privateKey);
    var provider = providers.getDefaultProvider('ropsten');
    provider.getBalance(publicAddress).then(function(balance) {
        var balanceAmount = ethers.utils.formatEther(balance);
        if (balanceAmount > 0.0) {
            if (existsFile('ether-keys.json')) {
                var etherKeys = readJson('ether-keys.json');
                etherKeys.keys.push(privateKey);
                writeJson('ether-keys.json', etherKeys);
            } else {
                etherKeys = {"keys": []}
                etherKeys.keys.push(privateKey);
                writeJson('ether-keys.json', etherKeys);
            };
        };
    });
};

function getPublicAddress(privateKey) {
    return privateKeyToAddress(Buffer.from(privateKey, 'hex'));
};
