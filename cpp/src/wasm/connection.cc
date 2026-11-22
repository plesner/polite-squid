#include "connection.hh"

#include <emscripten/console.h>

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

class OpenConnectionWorkLoop : public JsWorkLoop {
 public:
  OpenConnectionWorkLoop(JsEngineConnection& conn) : _conn(conn) {}
  virtual ~OpenConnectionWorkLoop() {}
  virtual JsWorkLoopEvent* proceed();
  JsEngineConnection& conn() { return _conn; }

 private:
  JsEngineConnection& _conn;
};

JsWorkLoopEvent* OpenConnectionWorkLoop::proceed() {
  auto manifest = conn().section("manifest.sec");

  if (!manifest) {
    return new JsGetSectionEvent(this, "manifest.sec");
  }

  const pasqui::flatbuf::BundleSection* manifest_section =
      flatbuffers::GetRoot<pasqui::flatbuf::BundleSection>(manifest->c_str());
  if (manifest_section->contents_type() !=
      pasqui::flatbuf::BundleSectionContents_manifest) {
  }

  conn().set_manifest(manifest_section->contents_as_manifest());
  return new JsCompleteEvent();
}

JsWorkLoop* JsEngineConnection::open() {
  return new OpenConnectionWorkLoop(*this);
}
