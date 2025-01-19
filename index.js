const core = require('@actions/core');
const github = require('@actions/github');
const https = require('https');

try {
    const issue = github.context.payload.issue;

    if (issue.labels.some(label => label.name === 'motivate')) {
        https.get('https://favqs.com/api/qotd', (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
            data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
            const response = JSON.parse(data);
            const quote = response.quote.body;
            const author = response.quote.author;
            console.log(`Motivational message: "${quote}" - ${author}`);
            });

        }).on("error", (err) => {
            console.error("Error: " + err.message);
        });
    }
    else {
        console.log('No motivational label found.');
    }

} catch (error) {
    core.setFailed(error.message);
}