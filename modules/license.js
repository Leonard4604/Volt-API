const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const API_KEY = '...'

const license = {
    retrieve: async (key) => {
        try {
            const license = await fetch(`https://api.hyper.co/v6/licenses/${key}`, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            }).then(res => res.json());
            return license;
        } catch {
            return false;
        }
    },
    bind: async (key, hwid) => {
        return fetch(`https://api.hyper.co/v6/licenses/${key}/metadata`, {
            method: 'PATCH',
            headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                metadata: { hwid }
            })
        })
    },
    reset: async (key) => {
        return fetch(`https://api.hyper.co/v6/licenses/${key}/metadata`, {
            method: 'PATCH',
            headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            metadata: { hwid: null }
            })
        })
    },
    validate: async function (key) {
        const license = await this.retrieve(key)
        if (license) {
            if (license.status === 'active') {
              if (license.user.discord) {
                return [true, `${license.user.discord.username}#${license.user.discord.discriminator}`]
              }
              else if (!license.user.discord) {
                return [true, license.user.username]
              }
            }
            return [false, false]
        }
        return [false, false]
    }
}

module.exports = license