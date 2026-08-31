const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const owner = process.env.GITHUB_USERNAME;
function assertConfig() { if (!process.env.GITHUB_TOKEN || !owner) throw new Error('GitHub environment variables are not configured'); }
module.exports = { octokit, owner, assertConfig };
