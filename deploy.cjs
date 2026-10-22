const git = require('isomorphic-git');
const fs = require('fs');
const http = require('isomorphic-git/http/node');
const { execSync } = require('child_process');

const dir = process.cwd() + '/dist';

async function main() {
  let token = process.env.GH_TOKEN;
  if (!token) {
    try {
      token = execSync('gh auth token').toString().trim();
    } catch (e) {}
  }

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

  try {
    await git.commit({
      fs,
      dir,
      author: {
        name: 'akaldibaevnaa-maker',
        email: 'akaldibaevnaa-maker@users.noreply.github.com',
      },
      message: 'Deploy updated 1928 Kyzylorda Engineers project to gh-pages'
    });
  } catch (e) {
    console.log('Commit note:', e.message);
  }

  try {
    await git.addRemote({
      fs,
      dir,
      remote: 'origin',
      url: 'https://github.com/akaldibaevnaa-maker/tarih-chronos'
    });
  } catch (e) {
    console.log('Remote note:', e.message);
  }

  console.log('Pushing gh-pages to GitHub...');
  await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'master', 
    remoteRef: 'refs/heads/gh-pages',
    force: true,
    onAuth: () => ({ username: token, password: '' })
  });
  
  console.log('Deploy complete! Live at: https://akaldibaevnaa-maker.github.io/tarih-chronos/');
}

main().catch(console.error);

