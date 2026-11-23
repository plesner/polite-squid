#pragma once

#include "../connection.hh"
#include "../workloop.hh"

namespace pasqui {

class OpenConnectionLoop : public JsWorkLoop {
 public:
  OpenConnectionLoop(JsEngineConnection& conn) : _conn(conn) {}
  virtual ~OpenConnectionLoop() {}
  virtual JsWorkLoopEvent* proceed();
  JsEngineConnection& conn() { return _conn; }

 private:
  JsEngineConnection& _conn;
};

} // namespace pasqui
