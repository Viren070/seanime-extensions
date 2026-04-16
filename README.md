# Seanime AIOStreams Extensions Workspace

This workspace is organized to support multiple Seanime extensions that share common logic.

## Structure

- `src/lib/` shared client + reusable helper logic
- `src/extensions/aiostreams-plugin/` plugin source + manifest
- `src/extensions/aiostreams-torrent/` anime torrent provider source + manifest
- `dist/<extension>/` generated single-file bundles + generated manifests

Each extension folder name must match its `manifest.json` `id`.

## Build

1. Install dev dependencies:
   - `npm install`
2. Build all extensions:
   - `npm run build`

After build:

- `dist/aiostreams-plugin/main.js` + `dist/aiostreams-plugin/manifest.json`
- `dist/aiostreams-torrent/main.js` + `dist/aiostreams-torrent/manifest.json`

Generated manifests automatically set:

- `payloadURI` to the absolute path of the built bundle
- `manifestURI` to the absolute path of the generated manifest

## Type checking

- `npm run typecheck`
- Or per extension:
  - `npm run typecheck:torrent`
  - `npm run typecheck:plugin`
