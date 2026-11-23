#include "connection.hh"

#include "loops/open_connection.hh"

using namespace emscripten;
using namespace pasqui;

std::shared_ptr<std::string> JsEngineConnection::section(
    const std::string& name) {
  auto iter = _sections.find(name);
  if (iter == _sections.end()) {
    return std::shared_ptr<std::string>();
  } else {
    return iter->second;
  }
}

void JsEngineConnection::put_section(std::string name, std::string contents) {
  _sections[name] = std::make_shared<std::string>(contents);
}

JsWorkLoop* JsEngineConnection::open() {
  return new OpenConnectionLoop(*this);
}
