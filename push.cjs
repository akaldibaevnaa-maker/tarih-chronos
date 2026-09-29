const git = require('isomorphic-git');
const fs = require('fs');
const http = require('isomorphic-git/http/node');

const dir = process.cwd();

async function main() {
  console.log('Initializing git repo...');
  await git.init({ fs, dir });

  console.log('Adding files (this might take a few seconds)...');
  const paths = await git.statusMatrix({ fs, dir });
  
  for (const [filepath, head, workdir, stage] of paths) {
    if (workdir !== head) {
      if (workdir === 0) {
        await git.remove({ fs, dir, filepath });
      } else {
        await git.add({ fs, dir, filepath });
      }
    }
  }

  console.log('Committing...');
  await git.commit({
    fs,
    dir,
    author: {
      name: 'akaldibaevnaa-maker',
      email: 'akaldibaevnaa-maker@users.noreply.github.com',
    },
    message: 'Initial commit'
  });

  console.log('Adding remote...');
  await git.addRemote({
    fs,
    dir,
    remote: 'origin',
    url: 'https://github.com/akaldibaevnaa-maker/tarih-chronos'
  });

  console.log('Pushing to GitHub...');

  await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'master',
    onAuth: () => ({ username: process.env.GH_TOKEN, password: '' })
  });
  
  console.log('Push complete!');
}

main().catch(console.error);
