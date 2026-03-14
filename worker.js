import indexHtml from "./index.html";

import bootloaderBin from "./firmware/Torn_Dashboard_ESP32_TFT_4Inch.ino.bootloader.bin";
import partitionsBin from "./firmware/Torn_Dashboard_ESP32_TFT_4Inch.ino.partitions.bin";
import bootApp0Bin from "./firmware/boot_app0.bin";
import firmwareBin from "./firmware/Torn_Dashboard_ESP32_TFT_4Inch.ino.bin";

const manifest = {
  name: "ESP32-S3 Torn Dashboard",
  version: "1.0.0",
  builds: [
    {
      chipFamily: "ESP32-S3",
      parts: [
        { path: "/firmware/Torn_Dashboard_ESP32_TFT_4Inch.ino.bootloader.bin", offset: 0 },
        { path: "/firmware/Torn_Dashboard_ESP32_TFT_4Inch.ino.partitions.bin", offset: 32768 },
        { path: "/firmware/boot_app0.bin", offset: 57344 },
        { path: "/firmware/Torn_Dashboard_ESP32_TFT_4Inch.ino.bin", offset: 65536 }
      ]
    }
  ]
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(indexHtml, {
        headers: {
          "content-type": "text/html; charset=UTF-8",
          "cache-control": "no-store"
        }
      });
    }

    if (url.pathname === "/manifest.json") {
      return new Response(JSON.stringify(manifest), {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          "cache-control": "no-store"
        }
      });
    }

    if (url.pathname === "/firmware/Torn_Dashboard_ESP32_TFT_4Inch.ino.bootloader.bin") {
      return new Response(bootloaderBin, {
        headers: {
          "content-type": "application/octet-stream",
          "cache-control": "no-store"
        }
      });
    }

    if (url.pathname === "/firmware/Torn_Dashboard_ESP32_TFT_4Inch.ino.partitions.bin") {
      return new Response(partitionsBin, {
        headers: {
          "content-type": "application/octet-stream",
          "cache-control": "no-store"
        }
      });
    }

    if (url.pathname === "/firmware/boot_app0.bin") {
      return new Response(bootApp0Bin, {
        headers: {
          "content-type": "application/octet-stream",
          "cache-control": "no-store"
        }
      });
    }

    if (url.pathname === "/firmware/Torn_Dashboard_ESP32_TFT_4Inch.ino.bin") {
      return new Response(firmwareBin, {
        headers: {
          "content-type": "application/octet-stream",
          "cache-control": "no-store"
        }
      });
    }

    return new Response("Not found", { status: 404 });
  }
};