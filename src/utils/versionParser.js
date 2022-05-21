const https = require('https');
const config = require('../configs/config');

function sendRequest(requestData) {
	return new Promise((resolve, reject) => {
		let req = https.request(requestData, (res) => {
			let data = '';
			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on('end', () => {
				resolve(data);
			});
		});
		req.on('error', (e) => {
			console.error('error while fetching version: ' + e);
			reject(e);
		});
		req.end();
	});
}
exports.sendRequest = sendRequest;

async function GetVersionFile(prjid, commit) {
	const requestData = {
		hostname: config.services.gitlab.apiUrl,
		port: 443,
		path: config.services.gitlab.apiPath + prjid
			+ '/repository/files/.version/raw?ref=' + commit,
		method: 'GET',
		headers: {
			'PRIVATE-TOKEN': config.services.gitlab.privateToken,
		},
	};
	return await sendRequest(requestData);
}
exports.GetVersionFile = GetVersionFile;