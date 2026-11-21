import assert from "node:assert/strict";
import test from "node:test";
import { Uint8ArrayReader, Uint8ArrayWriter, ZipWriter } from "@zip.js/zip.js";
import { CtfsEngineBridge, EngineFactory } from "../dist/index.js";

test("CTFS bridge reads named ZIP sections", async () => {
  const zip = new ZipWriter(new Uint8ArrayWriter());
  await zip.add("sections/example", new Uint8ArrayReader(new Uint8Array([1, 2, 3])));
  const bridge = await new CtfsEngineBridge(await zip.close()).init();

  assert.deepEqual(await bridge.readSection("sections/example"), new Uint8Array([1, 2, 3]));
  assert.equal(await bridge.readSection("missing"), undefined);
});

test("factory creates an engine that supplies requested sections", async () => {
  const section = new Uint8Array([4, 5]);
  const complete = {};
  const getSection = {};
  const deleted = [];
  let received;
  const events = [
    { eventType: () => getSection, stringValue: () => "example", delete: () => deleted.push("request") },
    { eventType: () => complete, delete: () => deleted.push("complete") },
  ];
  const loop = { proceed: () => events.shift(), delete: () => deleted.push("loop") };
  class Connection {
    open() { return loop; }
    putSection(name, contents) { received = [name, contents]; }
  }
  const factory = new EngineFactory({
    EngineConnection: Connection,
    WorkLoopEventType: { COMPLETE: complete, GET_SECTION: getSection },
  });
  const engine = factory.createEngine({ readSection: async () => section });
  await engine.open();

  assert.deepEqual(received, ["example", section]);
  assert.deepEqual(deleted, ["request", "complete", "loop"]);
});
