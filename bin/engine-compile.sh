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
  -Icpp/src \
  -I"$FLATBUFS_ROOT/include/" \
  -o engine/src/wasm/engine.mjs \
  --no-entry \
  --emit-tsd engine.d.ts \
  cpp/src/wasm/bindings.cc cpp/src/wasm/workloop.cc cpp/src/wasm/connection.cc

mv engine/src/wasm/engine.d.ts engine/src/wasm/engine.d.mts
