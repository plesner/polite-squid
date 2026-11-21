# @atob/engine

The engine package contains the WebAssembly module, its generated bindings, and
the TypeScript API (`Engine`, `EngineFactory`, `createEngineFactory`,
`EngineBridge`, and `CtfsEngineBridge`). It has no React dependency.

Install and build it with `npm install` in this directory. `npm test` builds and
tests the wrapper; `npm pack` builds a distributable npm package containing the
JavaScript, declarations, and WebAssembly binary. The generated WebAssembly
currently requires a runtime with JSPI support.

Regenerate the WebAssembly files with `make build-cpp` and `make build-web`
from the repository root (after configuring the CMake build with `make cmake`).
