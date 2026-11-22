BINDIR=out
ENGINE_CORE_BINDIR=$(BINDIR)/engine-core
ENGINE_CORE=projects/engine-core
ENGINE_NPM=projects/engine-npm
WEB=projects/web
ENGINE_WASM_ROOT=$(ENGINE_NPM)/src/wasm
FLATBUFS_ROOT ?= /usr/bin
FLATBUF_FILES=$(wildcard data/*.fbs)

.PHONY: cmake
cmake:
	mkdir -p $(ENGINE_CORE_BINDIR)
	cd $(ENGINE_CORE_BINDIR) && emcmake cmake ../../$(ENGINE_CORE)

.PHONY: clean
clean:
	rm -rf $(BINDIR)

.PHONY: build-engine-core
build-engine-core: cmake
	$(MAKE) -C $(ENGINE_CORE_BINDIR)

$(ENGINE_WASM_ROOT)/engine.mjs: build-engine-core
	mkdir -p $(ENGINE_WASM_ROOT)
	cp $(ENGINE_CORE_BINDIR)/engine.mjs $(ENGINE_CORE_BINDIR)/engine.wasm $(ENGINE_WASM_ROOT)/
	cp $(ENGINE_CORE_BINDIR)/engine.d.ts $(ENGINE_WASM_ROOT)/engine.d.mts

.PHONY: build-web
build-web: $(ENGINE_WASM_ROOT)/engine.mjs
	cd $(ENGINE_NPM) && npm run build
	cd $(WEB) && npm run build

.PHONY: web-dev
web-dev:
	cd $(WEB) && npm run dev

.PHONY: test-scala
test-scala:
	cd projects/scala && sbt test

.PHONY: test
test: test-scala

.PHONY: all
all: test-scala build-web

.PHONY: generate-flatbufs
generate-flatbufs: generate-flatbufs-cpp generate-flatbufs-web generate-flatbufs-scala

generate-flatbufs-cpp: $(FLATBUF_FILES)
	rm -rf projects/engine-core/src/gen/flatbuf
	$(FLATBUFS_ROOT)/flatc -o projects/engine-core/src/gen/flatbuf --cpp $(FLATBUF_FILES)

generate-flatbufs-web: $(FLATBUF_FILES)
	rm -rf projects/web/src/gen/flatbuf
	$(FLATBUFS_ROOT)/flatc -o projects/web/src/gen/flatbuf --ts $(FLATBUF_FILES) --gen-all

generate-flatbufs-scala: $(FLATBUF_FILES)
	rm -rf projects/scala/src/main/java/
	$(FLATBUFS_ROOT)/flatc -o projects/scala/src/main/java/ --java $(FLATBUF_FILES)
