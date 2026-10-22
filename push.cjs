const git = require('isomorphic-git');
const fs = require('fs');
const http = require('isomorphic-git/http/node');
const { execSync } = require('child_process');

const dir = process.cwd();

async function main() {
  let token = process.env.GH_TOKEN;
  if (!token) {
    try {
      token = execSync('gh auth token').toString().trim();
    } catch (e) {}
  }

  console.log('Initializing git repo in root...');
  await git.init({ fs, dir });

  console.log('Checking status...');
  const paths = await git.statusMatrix({ fs, dir });
  
  for (const [filepath, head, workdir, stage] of paths) {
    if (filepath.startsWith('node_modules') || filepath.startsWith('dist')) continue;
    if (workdir !== head) {
      if (workdir === 0) {
        await git.remove({ fs, dir, filepath });
      } else {
        await git.add({ fs, dir, filepath });
      }
    }
  }

  console.log('Committing source files...');
  try {
    await git.commit({
      fs,
      dir,
      author: {
        name: 'akaldibaevnaa-maker',
        email: 'akaldibaevnaa-maker@users.noreply.github.com',
      },
      message: 'Update 1928 Kyzylorda Engineers project: bright theme, quotes ticker, and passport'
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

  console.log('Pushing to GitHub master...');
  await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'master',
    force: true,
    onAuth: () => ({ username: token, password: '' })
  });
  
  console.log('Source push complete!');
}

main().catch(console.error);

