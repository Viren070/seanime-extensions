>[!WARNING]
> The extensions provided here have migrated to the official [AIOStreams](https://github.com/Viren070/AIOStreams) repository. When configuring AIOStreams, there will be manifest URLs you can install to Seanime there. 

# Seanime AIOStreams Extensions

Bridge [AIOStreams](https://github.com/Viren070/AIOStreams) into Seanime with installable extensions.

`AIOStreams` is a Stremio addon wrapper. In practice, streams returned by Stremio addons are usually either:

- **P2P**
- **Direct URL** (including debrid/usenet-resolved streams)

Seanime supports multiple extension types, and each one has different tradeoffs. This repo provides two options so users can pick what matches their setup.

This repository currently ships two extensions:

- `aiostreams-plugin` (recommended for most users)
- `aiostreams-torrent-provider` (torrent-focused fallback)

---

## Install in Seanime

In Seanime:

1. Go to **Extensions**
2. Click **Add Extensions**
3. Paste a URL in **Install from URL**

### Extension URLs

- Plugin:
  ```
  https://github.com/Viren070/seanime-extensions/releases/latest/download/aiostreams-plugin.json
  ```
- Torrent Provider:
  ```
  https://github.com/Viren070/seanime-extensions/releases/latest/download/aiostreams-torrent-provider.json
  ```

---

## Which extension should I use?

### 1) AIOStreams Plugin — recommended for most users

Use this when you want to preserve more of AIOStreams behavior/formatting and work with URL-based streams.

Install URL:

```
https://github.com/Viren070/seanime-extensions/releases/latest/download/aiostreams-plugin.json
```

What it adds:

- A dedicated AIOStreams results panel with rich cards, retaining AIOStreams formatting and sorting
- Lookup/details overlay with:
  - lookup IDs (including Stremio ID)
  - timing/cache info
  - stats and errors
- Entry points into the panel from Seanime UI:
  - anime details button
  - episode context menu
  - episode grid menu (3-dot)

Why this exists:

- Keeps AIOStreams-controlled result ordering/behavior more intact
- Allows all URL-based sources (e.g. usenet/debrid streams via configured services and addons)
- Works with Seanime tracking while using a separate result UI

Limitation:

- Plugin playback is effectively **URL-driven**.
- Raw torrent/P2P streams cannot be played via this method.

Best for:

- Users who primarily rely on URL/debrid/usenet streams from AIOStreams.
- Users who want the best in-app AIOStreams experience.

### 2) AIOStreams Torrent Provider

Use this when you want native Seanime torrent-provider integration.

Install URL:

```
https://github.com/Viren070/seanime-extensions/releases/latest/download/aiostreams-torrent-provider.json
```

What it adds:

- Seanime anime torrent provider backed by AIOStreams search
- AIOStreams returns raw torrent hashes only.

How it behaves in Seanime:

- Seanime handles torrent streaming/debrid itself
- Seanime currently supports **Torbox** and **Real-Debrid** for debrid services.

Tradeoffs vs plugin:

- URL-based streams from AIOStreams (for example usenet-resolved URLs) are not possible to play via this method.
- AIOStreams sorting/formatting is not fully retained because Seanime applies its own provider/result handling
- Seanime debrid handling is single-service oriented compared to AIOStreams’ multi-service aggregation behavior

Best for:

- Users who want native torrent provider behavior inside Seanime.
- Users who only need torrents and want to offload debrid handling to Seanime or don't use debrid at all.

---

## Development

### Project layout

- `src/lib/`: shared helpers/clients
- `src/extensions/<extension-id>/`: extension source (folder name must match `manifest.json` `id`)
- `dist/<extension-id>/`: generated build output

### Build

- Install dependencies: `pnpm install`
- Build all extensions: `pnpm build`

The build script:

- auto-discovers extension folders in `src/extensions`
- bundles each `main.ts`
- emits `dist/<id>/manifest.json` with embedded `payload`
- sets `manifestURI` to:
  - `https://github.com/Viren070/seanime-extensions/releases/latest/download/<id>.json`

### Typecheck

- All: `pnpm run typecheck`
- Per extension:
  - `pnpm run typecheck:plugin`
  - `pnpm run typecheck:torrent`

```

```
