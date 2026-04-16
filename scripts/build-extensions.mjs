import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");

const extensions = [
  {
    key: "torrent",
    entry: path.join(root, "src", "extensions", "torrent", "main.ts"),
    manifest: path.join(root, "src", "extensions", "torrent", "manifest.json"),
    manifestURI:
      "https://zip.viren070.me/raw/seanime-aiostreams-torrent-provider.json",
  },
  // {
  //   key: "custom-source",
  //   entry: path.join(root, "src", "extensions", "custom-source", "main.ts"),
  //   manifest: path.join(
  //     root,
  //     "src",
  //     "extensions",
  //     "custom-source",
  //     "manifest.json",
  //   ),
  // },
  {
    key: "plugin",
    entry: path.join(root, "src", "extensions", "plugin", "main.ts"),
    manifest: path.join(root, "src", "extensions", "plugin", "manifest.json"),
    manifestURI: "https://zip.viren070.me/raw/seanime-aiostreams-plugin.json",
  },
];

function normalizeWinPath(filePath) {
  return filePath.replace(/\\/g, "/");
}

fs.rmSync(distDir, { recursive: true, force: true });

for (const ext of extensions) {
  const outFolder = path.join(distDir, ext.key);
  const outFile = path.join(outFolder, "main.js");
  const outManifest = path.join(outFolder, "manifest.json");

  fs.mkdirSync(outFolder, { recursive: true });

  await build({
    entryPoints: [ext.entry],
    bundle: true,
    outfile: outFile,
    platform: "neutral",
    format: "iife",
    target: ["es2020"],
    legalComments: "none",
    charset: "utf8",
    minify: false,
    logLevel: "info",
  });

  const manifest = JSON.parse(fs.readFileSync(ext.manifest, "utf8"));
  const payloadURI = normalizeWinPath(path.resolve(outFile));
  const payload = fs.readFileSync(outFile, "utf8");
  manifest.payloadURI = undefined;
  manifest.payload = payload;
  manifest.language = "javascript";
  manifest.isDevelopment = false;
  if (ext.manifestURI) {
    manifest.manifestURI = ext.manifestURI;
  }

  fs.writeFileSync(outManifest, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`Built ${ext.key}: ${normalizeWinPath(outFile)}`);
}

console.log("All extensions built.");
