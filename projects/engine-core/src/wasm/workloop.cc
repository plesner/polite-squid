#include "workloop.hh"

#include <emscripten/console.h>

using namespace pasqui;

JsWorkLoop::~JsWorkLoop() {}

JsWorkLoopEvent* JsWorkLoop::proceed() { return new JsCompleteEvent(); }

JsWorkLoopEvent::~JsWorkLoopEvent() {}
