set -e

EMSCRIPTEN_ROOT="${EMSCRIPTEN_ROOT:-}"

if [ -n "$EMSCRIPTEN_ROOT" ]; then
  EMPLUSPLUS="$EMSCRIPTEN_ROOT/em++"
else
  EMPLUSPLUS="em++"
fi

"$EMPLUSPLUS" \
  -lembind \
  -sJSPI \
  -og \
  -Iprojects/engine-core/src \
  -I"$FLATBUFS_ROOT/include/" \
  -o projects/engine-npm/src/wasm/engine.mjs \
  --no-entry \
  --emit-tsd engine.d.ts \
  projects/engine-core/src/wasm/bindings.cc projects/engine-core/src/wasm/workloop.cc projects/engine-core/src/wasm/connection.cc

mv projects/engine-npm/src/wasm/engine.d.ts projects/engine-npm/src/wasm/engine.d.mts
