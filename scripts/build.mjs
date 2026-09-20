import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");

const MODULE_ID = "dnd-heroes-borderlands-translation-pt-br";
const ZIP_NAME = `${MODULE_ID}.zip`;

const REPOSITORY =
  "https://github.com/breno-hof/dnd-heroes-borderlands-translation-pt-br";

const MANIFEST_URL =
  `${REPOSITORY}/releases/latest/download/module.json`;

function getVersion() {
  if (process.env.VERSION) {
    return process.env.VERSION.replace(/^v/, "");
  }

  try {
    const tag = execFileSync(
      "git",
      ["describe", "--tags", "--abbrev=0"],
      {
        cwd: ROOT,
        encoding: "utf8"
      }
    ).trim();

    if (tag) {
      return tag.replace(/^v/, "");
    }
  } catch {
    // Nenhuma tag disponível.
  }

  const packageJson = JSON.parse(
    fs.readFileSync(
      path.join(ROOT, "package.json"),
      "utf8"
    )
  );

  return packageJson.version;
}

function validateVersion(version) {
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
    throw new Error(
      `Versão inválida: "${version}". Use SemVer, por exemplo: 1.0.0`
    );
  }
}

function createManifest(version) {
  return {
    id: MODULE_ID,
    title: "D&D - Heroes of the Borderlands (PT-BR)",
    description:
      "Tradução comunitária para português brasileiro do módulo D&D - Heroes of the Borderlands.",
    version,

    authors: [
      {
        name: "Breno",
        url: "https://github.com/breno-hof"
      }
    ],

    url: REPOSITORY,

    bugs:
      `${REPOSITORY}/issues`,

    changelog:
      `${REPOSITORY}/releases`,

    readme:
      `${REPOSITORY}/blob/main/README.md`,

    license: "LICENSE",

    compatibility: {
      minimum: "12",
      verified: "14"
    },

    relationships: {
      requires: [
        {
          id: "babele",
          type: "module"
        },
        {
          id: "dnd-heroes-borderlands",
          type: "module"
        }
      ]
    },

    esmodules: [
      "scripts/babele.js"
    ],

    languages: [
      {
        lang: "pt-BR",
        name: "Português (Brasil)",
        path: "lang/pt-BR.json"
      }
    ],

    manifest: MANIFEST_URL,

    download:
      `${REPOSITORY}/releases/download/v${version}/${ZIP_NAME}`
  };
}

function copyDirectory(source, destination) {
  fs.cpSync(source, destination, {
    recursive: true
  });
}

function build() {
  const version = getVersion();

  validateVersion(version);

  fs.rmSync(DIST, {
    recursive: true,
    force: true
  });

  const packageDirectory =
    path.join(DIST, MODULE_ID);

  fs.mkdirSync(packageDirectory, {
    recursive: true
  });

  const filesToCopy = [
    "scripts",
    "lang",
    "compendium",
    "README.md",
    "LICENSE"
  ];

  for (const entry of filesToCopy) {
    const source = path.join(ROOT, entry);

    if (!fs.existsSync(source)) {
      continue;
    }

    const destination =
      path.join(packageDirectory, entry);

    const stat = fs.statSync(source);

    if (stat.isDirectory()) {
      copyDirectory(source, destination);
    } else {
      fs.copyFileSync(source, destination);
    }
  }

  const manifest = createManifest(version);

  const manifestPath =
    path.join(packageDirectory, "module.json");

  fs.writeFileSync(
    manifestPath,
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8"
  );

  const rootManifestPath =
    path.join(DIST, "module.json");

  fs.writeFileSync(
    rootManifestPath,
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8"
  );

  const zipPath =
    path.join(DIST, ZIP_NAME);

  execFileSync(
    "zip",
    [
      "-r",
      zipPath,
      MODULE_ID
    ],
    {
      cwd: DIST,
      stdio: "inherit"
    }
  );

  console.log("");
  console.log("========================================");
  console.log(" Build concluído");
  console.log("========================================");
  console.log(`Módulo : ${MODULE_ID}`);
  console.log(`Versão : ${version}`);
  console.log(`ZIP    : ${zipPath}`);
  console.log(`Manifest: ${MANIFEST_URL}`);
  console.log("");
}

build();