import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { once } from "node:events";
const reserve = createServer();
reserve.listen(0, "127.0.0.1");
await once(reserve, "listening");
const port = reserve.address().port;
await new Promise((resolve) => reserve.close(resolve));
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", String(port), "-H", "127.0.0.1"],
  {
    cwd: process.cwd(),
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  },
);
let logs = "";
server.stdout.on("data", (chunk) => {
  logs += chunk;
});
server.stderr.on("data", (chunk) => {
  logs += chunk;
});
const base = `http://127.0.0.1:${port}`;
const routes = {
  "/": "Opportunity.Within reach.",
  "/about": "Possibility begins with practical support.",
  "/programmes": "Turning care into action.",
  "/programmes/education": "A fairer start in education.",
  "/programmes/healthcare": "Care, closer to the community.",
  "/programmes/youth-development": "Helping young people take their next step.",
  "/programmes/women-empowerment": "More opportunity for women.",
  "/impact": "Every number begins with a person.",
  "/stories": "The work. The people. The possibilities.",
  "/stories/education": "Removing barriers. Building confidence.",
  "/stories/healthcare": "An outreach built around people.",
  "/opportunities": "Your contribution can open a door.",
  "/get-involved": "Your contribution can open a door.",
  "/support": "A practical way to show your support.",
  "/contact": "Let’s start a conversation.",
  "/privacy": "A considered approach to your information.",
  "/admin": "Your website, your voice.",
};
try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw new Error(`Next.js exited before startup.\n${logs}`);
    try {
      const response = await fetch(base, { signal: AbortSignal.timeout(2000) });
      ready = response.status === 200;
    } catch {}
    if (ready) break;
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  assert.ok(ready, `Next.js did not become ready.\n${logs}`);
  const anchors = new Set();
  const assets = new Set([
    "/images/kassim.jpg",
    "/images/health.webp",
    "/images/outreach.jpg",
    "/favicon.svg",
  ]);
  for (const [path, heading] of Object.entries(routes)) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, `${path} must open`);
    const html = await response.text();
    const actual = html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1]?.replace(/<[^>]+>/g, "");
    assert.equal(actual, heading, `${path} must render its own content`);
    assert.ok(!html.includes("Page not found"), `${path} must have a real page`);
    for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g))
      if (match[1].startsWith("/")) anchors.add(match[1].split("?")[0].split("#")[0]);
    for (const match of html.matchAll(/(?:src|href)="(\/_next\/static\/[^"?]+)(?:\?[^\"]*)?"/g))
      assets.add(match[1]);
    console.log("PASS", path);
  }
  for (const href of anchors) assert.ok(href in routes, `Internal link has no route: ${href}`);
  for (const path of assets) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, `${path} must load`);
    assert.ok((await response.arrayBuffer()).byteLength > 0);
  }
  assert.equal((await fetch(base + "/not-a-real-page")).status, 404);
  console.log(
    `Verified ${Object.keys(routes).length} pages, ${anchors.size} internal destinations, ${assets.size} image/style/script assets and the 404 page.`,
  );
} finally {
  if (server.exitCode === null) {
    const closed = once(server, "exit");
    server.kill("SIGTERM");
    await closed;
  }
}
