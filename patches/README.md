# Hugo installer patch

Hugo 0.170.0 merged Extended into the standard edition. This patch makes
`hugo-extended@0.170.0` select the standard archive for Hugo 0.170.0 and later,
including when `HUGO_OVERRIDE_VERSION` selects a newer release. Earlier versions
still default to Extended where available. The wrapper continues to check the
downloaded binary against Hugo’s release checksums.

The npm dependency uses a local tarball so the fix runs during the dependency’s
own installation. Once an upstream wrapper release handles both editions, use
that registry release and remove this directory.

Run the following from the repository root to reproduce the checked-in tarball
with npm 11.

```bash
(
  set -e
  hugo_wrapper_repo=$PWD
  hugo_wrapper_tmp=$(mktemp -d)
  trap 'rm -rf "$hugo_wrapper_tmp"' EXIT
  cd "$hugo_wrapper_tmp"
  curl -fsSL https://registry.npmjs.org/hugo-extended/-/hugo-extended-0.170.0.tgz -o upstream.tgz
  shasum -a 512 -c <<'CHECKSUM'
12ccfefd2e9ce670af3f9b7a8619b5d89ec336fb05cf22386ebdcb90a681b16e72922fc6e2cebac1ffdbfa87bcd0cc2b72f08f7f559a7d32c578413d2b449b98  upstream.tgz
CHECKSUM
  tar -xzf upstream.tgz
  cd package
  git apply --unidiff-zero "$hugo_wrapper_repo/patches/hugo-extended@0.170.0.patch"
  npm pack --ignore-scripts --pack-destination "$hugo_wrapper_tmp"
  cmp "$hugo_wrapper_tmp/hugo-extended-0.170.0.tgz" "$hugo_wrapper_repo/patches/hugo-extended-0.170.0.tgz"
)
```

[Hugo 0.170.0 release notes](https://github.com/gohugoio/hugo/releases/tag/v0.170.0)
