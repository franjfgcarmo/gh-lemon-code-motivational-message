import { setFailed } from '@actions/core';
import { context } from '@actions/github';
import { get } from 'axios';



try {
    const issue = context.payload.issue;

    if (issue.labels.some(label => label.name === 'motivate')) {
        get('https://favqs.com/api/qotd').then(response => {
            const quote = response.data.quote.body;
            const author = response.data.quote.author;
            console.log(`Motivational message: "${quote}" - ${author}`);
        }).catch(error => {
            setFailed(error.message);
        });    
    }
    else {
        console.log('No motivational label found.');
    }

} catch (error) {
    setFailed(error.message);
}