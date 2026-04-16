# Seanime AIOStreams Extensions Workspace

This workspace is organized to support multiple Seanime extensions that share common logic.

## Structure

- `src/lib/` shared client + reusable helper logic
- `src/extensions/torrent/` anime torrent provider source + manifest
- `src/extensions/online/` online streaming provider source + manifest
- `src/extensions/custom-source/` custom source scaffold + manifest
- `dist/<extension>/` generated single-file bundles + generated manifests

## Build

1. Install dev dependencies:
   - `npm install`
2. Build all extensions:
   - `npm run build`

After build:

- `dist/torrent/main.js` + `dist/torrent/manifest.json`
- `dist/online/main.js` + `dist/online/manifest.json`
- `dist/custom-source/main.js` + `dist/custom-source/manifest.json`

Generated manifests automatically set:

- `payloadURI` to the absolute path of the built bundle
- `manifestURI` to the absolute path of the generated manifest

## Type checking

- `npm run typecheck`
- Or per extension:
  - `npm run typecheck:torrent`
  - `npm run typecheck:online`
  - `npm run typecheck:custom`
