import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createEngineFactory, CtfsEngineBridge } from "@posqui/engine";

test("opens an engine connection using a CTFS bundle", async () => {
  const bundle = new Uint8Array(
    await readFile(new URL("../test/resources/sample-feed-1.ctfs.zip", import.meta.url)),
  );
  const bridge = await new CtfsEngineBridge(bundle).init();
  assert.ok(await bridge.readSection("manifest.sec"));

  const sectionReads: string[] = [];
  const readSection = bridge.readSection.bind(bridge);
  bridge.readSection = async (name) => {
    sectionReads.push(name);
    return readSection(name);
  };

  const factory = await createEngineFactory();
  const engine = factory.createEngine(bridge);

  try {
    assert.equal(engine.conn.isDeleted(), false);
    await engine.open();
    assert.deepEqual(sectionReads, ["manifest.sec"]);
  } finally {
    engine.conn.delete();
  }
});
