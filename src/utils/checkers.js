function checkMerged(req) {
	if (req.get('x-gitlab-event') == 'Merge Request Hook'
		&& req.get('x-gitlab-token') == 'asdasqqw41w1faw'
		&& req.body['object_attributes']['state'] == 'merged') {
		console.debug('request looks like merge request hook');
		return true;
	} else {
		return false;
	}
}
exports.checkMerged = checkMerged;

function findIssueFromMr(title, desc) {
	var issue = '';
	var re = /[A-Z]+-[0-9]+/;
	if (re.test(title)) {
		issue = title.match(re)[0];
	} else if (re.test(desc)) {
		issue = desc.match(re)[0];
	} else {
		console.error('cant find issue from MR');
		return false;
	}
	console.log('finded issue ' + issue + ' from MR');
	return issue;
}
exports.findIssueFromMr = findIssueFromMr;
