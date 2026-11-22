BINDIR=out
ENGINE_CORE_BINDIR=$(BINDIR)/engine-core
ENGINE_CORE=projects/engine-core
ENGINE_NPM=projects/engine-npm
WEB=projects/web
ENGINE_WASM_ROOT=$(ENGINE_NPM)/src/wasm

cmake:
	mkdir -p $(ENGINE_CORE_BINDIR)
	cd $(ENGINE_CORE_BINDIR) && emcmake cmake ../../$(ENGINE_CORE)

.PHONY: cmake build-engine-core build-cpp build-web
build-engine-core: cmake
	$(MAKE) -C $(ENGINE_CORE_BINDIR)

$(ENGINE_WASM_ROOT)/engine.mjs: build-engine-core
	mkdir -p $(ENGINE_WASM_ROOT)
	cp $(ENGINE_CORE_BINDIR)/engine.mjs $(ENGINE_CORE_BINDIR)/engine.wasm $(ENGINE_WASM_ROOT)/
	cp $(ENGINE_CORE_BINDIR)/engine.d.ts $(ENGINE_WASM_ROOT)/engine.d.mts

build-cpp: build-engine-core

build-web: $(ENGINE_WASM_ROOT)/engine.mjs
	cd $(ENGINE_NPM) && npm run build
	cd $(WEB) && npm run build
