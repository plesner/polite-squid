#include <emscripten/bind.h>
#include <emscripten/emscripten.h>
#include <emscripten/val.h>

#include "connection.hh"

using namespace dafi;
using namespace emscripten;

EMSCRIPTEN_BINDINGS(module) {
  enum_<JsWorkLoopEventType>("WorkLoopEventType")
      .value("COMPLETE", COMPLETE)
      .value("GET_SECTION", GET_SECTION);
  class_<JsEngineConnection>("EngineConnection")
      .constructor()
      .function("open", &JsEngineConnection::open,
                return_value_policy::take_ownership())
      .function("putSection", &JsEngineConnection::put_section);
  class_<JsWorkLoop>("WorkLoop")
      .function("proceed", &JsWorkLoop::proceed,
                return_value_policy::take_ownership());
  class_<JsWorkLoopEvent>("WorkLoopEvent")
      .function("eventType", &JsWorkLoopEvent::event_type)
      .function("isComplete", &JsWorkLoopEvent::is_complete)
      .function("stringValue", &JsWorkLoopEvent::string_value);
}
