import createModule from "./wasm/engine.mjs";
import type { MainModule, EngineConnection, WorkLoop } from "./wasm/engine.mjs";
import { ZipReader, Uint8ArrayReader, type FileEntry, Uint8ArrayWriter } from "@zip.js/zip.js";

export interface EngineBridge {
  readSection(v: string): Promise<Uint8Array | undefined>;
};

export class CtfsEngineBridge implements EngineBridge {

  bundle: Uint8Array
  sections: Map<string, Uint8Array>

  constructor(bundle: Uint8Array) {
    this.bundle = bundle
    this.sections = new Map<string, Uint8Array>()
  }

  async init(): Promise<CtfsEngineBridge> {
    const zipFileReader = new ZipReader(new Uint8ArrayReader(this.bundle));
    const entries = await zipFileReader.getEntries();
    for (const entry of entries) {
      if (!entry.directory) {
        const contents = await (entry as FileEntry).getData(new Uint8ArrayWriter())
        this.sections.set(entry.filename, contents)
      }
    }
    zipFileReader.close();
    return this;
  }

  async readSection(v: string): Promise<Uint8Array | undefined> {
    return this.sections.get(v)
  }

}

export class EngineFactory {
  wasm: MainModule;

  constructor(wasm: MainModule) {
    this.wasm = wasm;
  }

  createEngine(bridge: EngineBridge): Engine {
    return new Engine(this.wasm, new this.wasm.EngineConnection(), bridge);
  }
}

export class Engine {
  wasm: MainModule
  conn: EngineConnection
  bridge: EngineBridge

  constructor(wasm: MainModule, conn: EngineConnection, bridge: EngineBridge) {
    this.wasm = wasm
    this.conn = conn
    this.bridge = bridge
  }

  open(): Promise<void> {
    return this.runWorkLoop(this.conn.open()!);
  }

  private async runWorkLoop(loop: WorkLoop): Promise<void> {
    console.log("Running work loop:", loop);
    var keepGoing = true
    var loopsRemaining = 100
    while (keepGoing && loopsRemaining > 0) {
      loopsRemaining -= 1;
      const nextEvent = loop.proceed()!;
      const eventType = nextEvent.eventType();
      if (eventType == this.wasm.WorkLoopEventType.COMPLETE) {
        console.log("  Received complete event:", nextEvent);
        keepGoing = false;
      } else if (eventType == this.wasm.WorkLoopEventType.GET_SECTION) {
        const sectionName = nextEvent.stringValue();
        console.log(`  Received get section event for ${sectionName}:`, nextEvent);
        const contents = await this.bridge.readSection(sectionName);
        this.conn.putSection(sectionName, contents!);
      }
      nextEvent.delete();
    }
    console.log("Deleting work loop:", loop);
    loop.delete();
  }

}

export async function createEngineFactory() {
  const wasm = await createModule();
  return new EngineFactory(wasm);
}
