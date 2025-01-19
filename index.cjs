const core = require('@actions/core');
const github = require('@actions/github');
const fetch = await import('node-fetch');

try {
    const issue = github.context.payload.issue;

    if (issue.labels.some(label => label.name === 'motivate')) {
        fetch('https://favqs.com/api/qotd')
         .then(response => response.json())
         .then(data => console.log(`Motivational message: "${data.quote.body}" - ${data.quote.author}`))     
    }
    else {
        console.log('No motivational label found.');
    }

} catch (error) {
    core.setFailed(error.message);
}