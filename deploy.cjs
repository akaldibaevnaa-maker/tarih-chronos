const git = require('isomorphic-git');
const fs = require('fs');
const http = require('isomorphic-git/http/node');

const dir = process.cwd() + '/dist';

async function main() {
  console.log('Initializing gh-pages branch in dist...');
  await git.init({ fs, dir });

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

  await git.commit({
    fs,
    dir,
    author: {
      name: 'akaldibaevnaa-maker',
      email: 'akaldibaevnaa-maker@users.noreply.github.com',
    },
    message: 'Deploy to gh-pages'
  });

  await git.addRemote({
    fs,
    dir,
    remote: 'origin',
    url: 'https://github.com/akaldibaevnaa-maker/tarih-chronos'
  });

  console.log('Pushing gh-pages...');
  await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'master', 
    remoteRef: 'refs/heads/gh-pages',
    force: true,
    onAuth: () => ({ username: process.env.GH_TOKEN, password: '' })
  });
  
  console.log('Deploy complete!');
}

main().catch(console.error);
