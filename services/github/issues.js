const axios = require('axios');

module.exports = {
    args: 2,
    main: async (args) => {
        let user = args[0];
        let repo = args[1];

        console.log(`https://api.github.com/repos/${user}/${repo}/issues`);

        let issues;
        try {
            issues = await axios.get(`https://api.github.com/repos/${user}/${repo}/issues`, {
                headers: {
                    Accept: 'application/vnd.github.v3+json'
                }
            });
        } catch (e) {
            return;
        }

        let open = 0, closed = 0;

        issues.data.forEach(issue => {
            if (issue.open) open++;
            else closed++;
        });

        return {
            label: 'issues',
            text: `${open} open, ${closed} closed`,
            color: 'blue'
        };
    }
}
