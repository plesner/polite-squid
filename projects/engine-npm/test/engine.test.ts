import assert from "node:assert/strict";
import test from "node:test";
import { createEngineFactory } from "@posqui/engine";

test("creates an engine connection without opening it", async () => {
  const factory = await createEngineFactory();
  let sectionReads = 0;
  const engine = factory.createEngine({
    async readSection() {
      sectionReads += 1;
      return undefined;
    },
  });

  try {
    assert.equal(engine.conn.isDeleted(), false);
    assert.equal(sectionReads, 0);
  } finally {
    engine.conn.delete();
  }
});
