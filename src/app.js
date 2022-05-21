const express = require('express');
const app = express();
const morgan = require('morgan')
const JiraApi = require('jira-client');
const { checkMerged, findIssueFromMr } = require("./utils/checkers");
const { GetVersionFile } = require("./utils/versionParser");
const responses = require('./utils/responses')
const config = require('./configs/config');

app.use(morgan('combined'))
app.use(express.json())

app.all('/', async (req, res) => {
    if (!checkMerged(req)) {
		res.status(responses.notMR.status).json(responses.notMR).end();
		return false;
	}
	let repository = req.body['repository']['name']
	let title = req.body['object_attributes']['title']	
	let desc = req.body['object_attributes']['description']
	let prjid = req.body['project']['id']
	let mrcommit = req.body['object_attributes']['merge_commit_sha']
	issue = findIssueFromMr(title, desc)
	if (!issue) {
		res.status(responses.badReq.status)
		   .json(responses.badReq)
		   .end();
		return false;
	}
	version = await GetVersionFile(prjid, mrcommit)
	let jira = new JiraApi({
		protocol: config.services.jira.protocol,
		host: config.services.jira.host,
		port: config.services.jira.port,
		username: config.services.jira.username,
		password: config.services.jira.password,
		apiVersion: config.services.jira.apiVersion,
		strictSSL: config.services.jira.strictSSL
	});
	jira.addComment(issue, 'Merged in ' + repository + ' version ' + version)
		.then(result => {
			console.debug('Issue ' + issue + ' commented ok: ' + result.body);
			res.json(responses.success)
			   .status(responses.success.response.status)
			   .end()
			return true
		})
		.catch(result => {
			console.error('Comment error ' + result);
			error = responses.commentMR(result);
			res.json(error)
			   .status(error.response.status)
			   .end();
			return false
		})
	
});

app.listen(config.services.server.port, () => {
	  console.log(`App listening on port ${config.services.server.port}`)
});

module.exports.app = app;