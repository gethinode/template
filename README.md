# Hinode - Template

<!-- Tagline -->
<p align="center">
    <b>A clean documentation and blog theme for your Hugo site based on Bootstrap 5</b>
    <br />
</p>

<!-- Badges -->
<p align="center">
    <a href="https://gohugo.io">
        <img src="https://img.shields.io/badge/generator-hugo-brightgreen" alt="Hugo website">
    </a>
    <a href="https://app.netlify.com/sites/gethinode-template/deploys">
        <img src="https://img.shields.io/netlify/bbe29d40-f246-44fc-ac33-3c48e4776a11" alt="Netlify Status">
    </a>
    <a href="https://stats.uptimerobot.com/xyGVYhLJmV">
        <img src="https://img.shields.io/uptimerobot/status/m793642596-ec67b9245f33e4f365f0da66" alt="UptimeRobot Status">
    </a>
    <a href="https://github.com/gethinode/template/commits/main">
        <img src="https://img.shields.io/github/last-commit/gethinode/template.svg" alt="Last commit">
    </a>
    <a href="https://github.com/gethinode/template/issues">
        <img src="https://img.shields.io/github/issues/gethinode/template.svg" alt="Issues">
    </a>
    <a href="https://github.com/gethinode/template/pulls">
        <img src="https://img.shields.io/github/issues-pr-raw/gethinode/template.svg" alt="Pulls">
    </a>
    <a href="https://github.com/gethinode/template/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/gethinode/template" alt="License">
    </a>
</p>

## About

![Logo](https://raw.githubusercontent.com/gethinode/hinode/main/static/img/logo.png)

Hinode is a clean blog theme for [Hugo][hugo], an open-source static site generator. Use this template if you would like to **take advantage of automation features**, provided by npm and GitHub actions. Visit the [docs][docs] for an alternative installation that uses Hugo only.

## Prerequisites

Hinode is a theme that uses [Hugo modules][hugo_modules] to install and maintain various components. The Hinode template requires the following software to be installed on your local machine. The Hugo binary itself is embedded as an npm binary.

- [Git][git_download]
- [Go binary][golang_download]
- [Node.js][nodejs] (it includes npm)

## Installation

1. **Create a new repository**

    Click the button `Use this template` to initialize a new repository based on this template (log in to GitHub if needed).

2. **Clone a local copy**

    ```bash
    git clone https://github.com/owner/my-hinode-site && cd my-hinode-site # replace "owner/my-hinode-site"
    ```

3. **Install the npm packages and hugo modules**

    ```bash
    npm install && npm run mod:update
    ```

You can now run `npm run start` to start a local development server.

## Using pnpm (optional)

This template uses **npm** by default. If you prefer [pnpm](https://pnpm.io) — faster installs, a shared package store, a 24-hour supply-chain quarantine, and stricter dependency isolation — switch with the following steps.

1. Replace the lockfile:

   ```bash
   pnpm import          # seed pnpm-lock.yaml from package-lock.json
   rm package-lock.json
   ```

2. Pin pnpm in `package.json` (use your installed pnpm version):

   ```json
   "packageManager": "pnpm@10.0.0"
   ```

3. Add a `.npmrc` for the supply-chain quarantine:

   ```ini
   # Reject any version published less than 24h ago.
   minimum-release-age=1440
   ```

4. Add `pnpm-workspace.yaml`:

   ```yaml
   allowBuilds:
     hugo-extended: true # downloads the platform-specific Hugo binary
   minimumReleaseAgeExclude:
     - "@gethinode/*"
   ```

5. Restore PostCSS compatibility. Hugo needs an npm-format `postcss` bin shim, which pnpm does not create. Add `cmd-shim` and a postinstall step:

   ```bash
   pnpm add -D cmd-shim
   ```

   Create `scripts/fix-postcss-bin.cjs`:

   ```js
   const fs = require('fs');
   const path = require('path');
   const cmdShim = require('cmd-shim');

   const entry = path.join('node_modules', 'postcss-cli', 'index.js');
   const target = path.join('node_modules', '.bin', 'postcss');
   if (fs.existsSync(entry)) {
     fs.mkdirSync(path.dirname(target), { recursive: true });
     cmdShim(entry, target).catch((e) => {
       console.error('fix-postcss-bin:', e.message);
       process.exit(1);
     });
   }
   ```

   Then add to your `package.json` scripts: `"postinstall": "node scripts/fix-postcss-bin.cjs"`.

6. Install and build:

   ```bash
   pnpm install
   pnpm run build
   ```

To run CI on pnpm too, change `package-manager: npm` to `package-manager: pnpm` in the workflow callers under `.github/workflows/`.

<!-- MARKDOWN LINKS -->
[docs]: https://gethinode.com/docs
[git_download]: https://git-scm.com
[golang_download]: https://go.dev/dl/
[hugo]: https://gohugo.io
[hugo_modules]: https://gohugo.io/hugo-modules/
[npm]: https://www.npmjs.com
[nodejs]: https://nodejs.org
[repository]: https://github.com/gethinode/hinode.git
[repository_template]: https://github.com/gethinode/template.git
