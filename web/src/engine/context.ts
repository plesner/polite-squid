import { createContext } from "react";
import type { EngineFactory } from "@atob/engine";

export const EngineContext = createContext<EngineFactory>(null!);
