const autoprefixer = require('autoprefixer')({})
const cssnano = require('cssnano')({
  preset: 'advanced'
})
const whitelister = require('purgecss-whitelister')
const purgeImport = require('@fullhuman/postcss-purgecss')
const purgeCSSPlugin = purgeImport.purgeCSSPlugin || purgeImport.default || purgeImport
const purgecss = purgeCSSPlugin({
  content: ['./hugo_stats.json'],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])]
  },
  dynamicAttributes: ['data-bs-theme', 'data-bs-theme-animate'],
  safelist: ['was-validated',
    ...whitelister([
      './assets/scss/theme/fonts.scss',
      './assets/scss/theme/theme.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/common/_styles.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_clipboard.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_command.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_nav.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_navbar.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_search.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_sidebar.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_syntax.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_syntax-dark.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_syntax-light.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_table.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/theme/fonts.scss',
      './_vendor/github.com/gethinode/hinode/component-library/components/list/list.scss',
      './_vendor/github.com/gethinode/mod-cookieyes/v2/assets/scss/cookieyes.scss',
      './_vendor/github.com/gethinode/mod-flexsearch/v2/assets/scss/modules/flexsearch/flexsearch.scss',
      './_vendor/github.com/gethinode/mod-katex/dist/katex.scss',
      './_vendor/github.com/gethinode/mod-leaflet/dist/leaflet.scss',
      './_vendor/github.com/gethinode/mod-mermaid/v3/assets/scss/mermaid.scss',
      './_vendor/github.com/gethinode/mod-simple-datatables/v2/dist/simple-datatables.scss',
      './_vendor/github.com/twbs/bootstrap/scss/_carousel.scss',
      './_vendor/github.com/twbs/bootstrap/scss/_dropdown.scss',
      './_vendor/github.com/twbs/bootstrap/scss/_modal.scss',
      './_vendor/github.com/twbs/bootstrap/scss/_reboot.scss',
      './_vendor/github.com/twbs/bootstrap/scss/_tooltip.scss',
      './_vendor/github.com/twbs/bootstrap/scss/_transitions.scss',
      './_vendor/github.com/twbs/bootstrap/scss/_utilities.scss'
    ])
  ]
})

module.exports = {
  plugins: [
    autoprefixer,
    cssnano,
    purgecss
  ]
}
