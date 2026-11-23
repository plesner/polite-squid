#pragma once

#include <string>

namespace pasqui {

class JsWorkLoop;

enum JsWorkLoopEventType { ERROR = 0, GET_SECTION = 1, COMPLETE = 2 };

class JsWorkLoopEvent {
 public:
  JsWorkLoopEvent(JsWorkLoopEventType event_type) : _event_type(event_type) {}
  virtual ~JsWorkLoopEvent();
  JsWorkLoopEventType event_type() { return _event_type; };
  bool is_complete() { return _event_type == COMPLETE; }
  virtual std::string string_value() { return ""; }

 private:
  JsWorkLoopEventType _event_type;
};

class JsCompleteEvent : public JsWorkLoopEvent {
 public:
  JsCompleteEvent() : JsWorkLoopEvent(COMPLETE) {}
};

class JsErrorEvent : public JsWorkLoopEvent {
 public:
  JsErrorEvent() : JsWorkLoopEvent(ERROR) {}
};

class JsGetSectionEvent : public JsWorkLoopEvent {
 public:
  JsGetSectionEvent(JsWorkLoop* owner, std::string section_name)
      : JsWorkLoopEvent(GET_SECTION),
        _owner(owner),
        _section_name(section_name) {}
  virtual std::string string_value() { return _section_name; }

 private:
  JsWorkLoop* _owner;
  std::string _section_name;
};

class JsWorkLoop {
 public:
  virtual ~JsWorkLoop();
  virtual JsWorkLoopEvent* proceed() = 0;
};

}  // namespace pasqui
