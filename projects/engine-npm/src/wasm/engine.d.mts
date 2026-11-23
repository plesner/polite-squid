// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
interface WasmModule {
}

type EmbindString = ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
export interface ClassHandle {
  isAliasOf(other: ClassHandle): boolean;
  delete(): void;
  deleteLater(): this;
  isDeleted(): boolean;
  // @ts-ignore - If targeting lower than ESNext, this symbol might not exist.
  [Symbol.dispose](): void;
  clone(): this;
}
export interface WorkLoopEventTypeValue<T extends number> {
  value: T;
}
export type WorkLoopEventType = WorkLoopEventTypeValue<0>|WorkLoopEventTypeValue<2>|WorkLoopEventTypeValue<1>;

export interface EngineConnection extends ClassHandle {
  putSection(_0: EmbindString, _1: EmbindString): void;
  open(): WorkLoop | null;
}

export interface WorkLoop extends ClassHandle {
  proceed(): WorkLoopEvent | null;
}

export interface WorkLoopEvent extends ClassHandle {
  eventType(): WorkLoopEventType;
  isComplete(): boolean;
  stringValue(): string;
}

interface EmbindModule {
  WorkLoopEventType: {ERROR: WorkLoopEventTypeValue<0>, COMPLETE: WorkLoopEventTypeValue<2>, GET_SECTION: WorkLoopEventTypeValue<1>};
  EngineConnection: {
    new(): EngineConnection;
  };
  WorkLoop: {};
  WorkLoopEvent: {};
}

export type MainModule = WasmModule & EmbindModule;
export default function MainModuleFactory (options?: unknown): Promise<MainModule>;
