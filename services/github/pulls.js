const axios = require('axios');

module.exports = {
    args: 2,
    main: async (args) => {
        let user = args[0];
        let repo = args[1];

        let pulls;
        try {
            pulls = await axios.get(`https://api.github.com/repos/${user}/${repo}/pulls`, {
                headers: {
                    Accept: 'application/vnd.github.v3+json'
                }
            });
        } catch (e) {
            return {
                label: 'pulls',
                text: 'not found',
                color: 'yellow'
            };
        }

        return {
            label: 'pulls',
            text: `${pulls.data.length} open`,
            color: 'blue'
        };
    }
}
