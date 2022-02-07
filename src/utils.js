const { context } = require('@actions/github');

function buildSlackAttachments({ status, color, tag, projectName, actor, repoUrl }) {
  const { owner, repo } = context.repo;
  repoUrl = repoUrl || `https://github.com/${owner}/${repo}`;

  var statuses = status.split('|').join('\n');

  return [
    {
      color,
      fields: [
        {
          title: 'Deployment',
          value: `<${repoUrl} | ${projectName || repo}>`,
          short: true,
        },
        {
          title: 'Tag',
          value: `<${repoUrl}/commit/${tag} | ${tag}>`,
          short: true,
        },
        {
          title: 'User',
          value: actor || context.actor,
          short: true,
        },
        {
          title: '<https://github.com/${owner}/${repo}/actions/runs/${process.env.GITHUB_RUN_ID}|Status>',
          value: `${statuses}`,
          short: true,
        },
      ],
      footer_icon: 'https://github.githubassets.com/favicon.ico',
      footer: `<https://github.com/${owner}/${repo} | ${owner}/${repo}>`,
      ts: Math.floor(Date.now() / 1000),
    },
  ];
}

module.exports.buildSlackAttachments = buildSlackAttachments;

function formatChannelName(channel) {
  return channel.replace(/[#@]/g, '');
}

module.exports.formatChannelName = formatChannelName;
