import indexHtml from "./index.html";

const PROJECTS = {
  "4inch": {
    name: "Torn Dashboard 4 Inch TFT",
    owner: "Bronom",
    repo: "Torn_Dashboard_ESP32_TFT_4Inch",
    chip: "ESP32-S3"
  },
  "2_8inch": {
    name: "Torn Dashboard 2.8 Inch TFT",
    owner: "Bronom",
    repo: "Torn_Dashboard_ESP32_TFT",
    chip: "ESP32"
  },
  "eink213": {
    name: "Torn Dashboard E-Ink 2.13",
    owner: "Bronom",
    repo: "Torn_Dashboard_Lilygo_T5_2_13",
    chip: "ESP32"
  }
};

const ASSET_SUFFIX = ".ino.merged.bin";

function getProjectConfig(projectKey) {
  return PROJECTS[projectKey] || PROJECTS["4inch"];
}

function getAssetName(project) {
  return `${project.repo}${ASSET_SUFFIX}`;
}

function getAssetPath(project) {
  return `/${getAssetName(project)}`;
}

function latestAssetUrl(owner, repo, assetName) {
  return `https://github.com/${owner}/${repo}/releases/latest/download/${assetName}`;
}

function buildManifest(projectKey) {
  const project = getProjectConfig(projectKey);

  return {
    name: project.name,
    version: "latest",
    builds: [
      {
        chipFamily: project.chip,
        parts: [
          {
            path: getAssetPath(project),
            offset: 0
          }
        ]
      }
    ]
  };
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const projectKey = url.searchParams.get("project") || "4inch";

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(indexHtml, {
        headers: {
          "content-type": "text/html; charset=UTF-8",
          "cache-control": "no-store"
        }
      });
    }

    if (url.pathname === "/manifest.json") {
      const manifest = buildManifest(projectKey);
      return new Response(JSON.stringify(manifest), {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          "cache-control": "no-store"
        }
      });
    }

    // Match any project's merged firmware path
    for (const key of Object.keys(PROJECTS)) {
      const project = PROJECTS[key];
      const assetPath = getAssetPath(project);

      if (url.pathname === assetPath) {
        const githubUrl = latestAssetUrl(
          project.owner,
          project.repo,
          getAssetName(project)
        );

        const resp = await fetch(githubUrl, {
          redirect: "follow",
          headers: {
            "User-Agent": "Cloudflare-Worker"
          }
        });

        if (!resp.ok) {
          return new Response(`GitHub fetch failed: ${resp.status}`, {
            status: 502
          });
        }

        return new Response(resp.body, {
          headers: {
            "content-type": "application/octet-stream",
            "cache-control": "no-store"
          }
        });
      }
    }

    return new Response("Not found", { status: 404 });
  }
};