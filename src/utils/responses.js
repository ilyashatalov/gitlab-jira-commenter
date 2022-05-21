const responses = {
	success: {
		"response": {
			"status": 200,
			"result": "success"
		}
	},
	noIssue: {
		"response": {
			"status": 400,
			"code": 2,
			"error": "cant find issue in title or description"
		}
	},
	notMR: {
		"response": {
			"status": 400,
			"code": 1,
			"error": "it doesnt look like merge request"
		}
	},
	commentMR: (error) => {
		return {
			"response": {
				"status": 502,
				"code": 3,
				"error": "Error when jira commening: " + error
			}
		};
	}
};

module.exports = responses