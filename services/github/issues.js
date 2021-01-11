const axios = require('axios');

module.exports = {
    args: 2,
    main: async (args) => {
        let user = args[0];
        let repo = args[1];

        let issues;
        try {
            issues = await axios.get(`https://api.github.com/repos/${user}/${repo}/issues`, {
                headers: {
                    Accept: 'application/vnd.github.v3+json'
                }
            });
        } catch (e) {
            return {
                label: 'issues',
                text: 'not found',
                color: 'yellow'
            };
        }

        let open = 0;

        issues.data.forEach(issue => {
            if (issue.open) open++;
        });

        return {
            label: 'issues',
            text: `${open} open`,
            color: 'blue'
        };
    }
}
