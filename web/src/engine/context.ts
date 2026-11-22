import { createContext } from "react";
import type { EngineFactory } from "@posqui/engine";

export const EngineContext = createContext<EngineFactory>(null!);
