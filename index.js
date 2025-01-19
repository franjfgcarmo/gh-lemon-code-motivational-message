const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function run() {
    try {
        const issue = github.context.payload.issue;
    
        if (issue.labels.some(label => label.name === 'motivate')) {
            const response = await axios.get('https://favqs.com/api/qotd');
            const quote = response.data.quote.body;
            const author = response.data.quote.author;
            console.log(`Motivational message: "${quote}" - ${author}`);
        }
        else {
            console.log('No motivational label found.');
        }
    
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
