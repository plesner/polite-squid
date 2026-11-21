BINDIR=out
CPP_BINDIR=$(BINDIR)/cpp
ENGINE_WASM=$(CPP_BINDIR)/engine.wasm
ENGINE_WASM_ROOT=engine/src/wasm

cmake:
	mkdir -p $(CPP_BINDIR)
	cd $(CPP_BINDIR) && emcmake cmake ../../cpp

.PHONY: $(CPP_BINDIR)/engine.wasm
$(CPP_BINDIR)/engine.wasm:
	make -C $(CPP_BINDIR)

$(ENGINE_WASM_ROOT)/engine.wasm: $(CPP_BINDIR)/engine.wasm
	mkdir -p $(ENGINE_WASM_ROOT)
	cp $(CPP_BINDIR)/engine.mjs $(CPP_BINDIR)/engine.wasm $(ENGINE_WASM_ROOT)/
	cp $(CPP_BINDIR)/engine.d.ts $(ENGINE_WASM_ROOT)/engine.d.mts

.PHONY: build-cpp
build-cpp: $(CPP_BINDIR)/engine.wasm

.PHONY: build-web
build-web: $(ENGINE_WASM_ROOT)/engine.wasm
	cd engine && npm run build
	cd web && npm run build
