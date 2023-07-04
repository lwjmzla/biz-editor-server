module.exports = {
  git: {
    tagName: 'v${version}', // !package.json的version
    commitMessage: 'release: v${version}',
    requireCleanWorkingDir: false,
    requireBranch: 'master', // !要求在master分支操作
  },
  hooks: {
    "before:init": ["git pull"]
  },
  npm: {
    publish: false, // !是否发布到npm
  },
  prompt: {
    ghRelease: false,
    glRelease: false,
    publish: false,
  },
  plugins: {
    '@release-it/conventional-changelog': {
        preset: 'angular',
        infile: 'CHANGELOG.md',
    },
  },
}