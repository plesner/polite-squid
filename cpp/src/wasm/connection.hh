#pragma once

#include <emscripten/bind.h>
#include <emscripten/emscripten.h>
#include <emscripten/val.h>

#include <unordered_map>

#include "../gen/flatbuf/bundle_generated.h"
#include "workloop.hh"

namespace dafi {

class JsEngineConnection {
 public:
  JsEngineConnection() {}
  JsWorkLoop* open();
  std::shared_ptr<std::string> section(const std::string& name);
  void set_manifest(const dafi::flatbuf::BundleManifest* manifest) {
    _manifest = manifest;
  }
  void put_section(std::string name, std::string contents);

 private:
  std::unordered_map<std::string, std::shared_ptr<std::string>> _sections;
  const dafi::flatbuf::BundleManifest* _manifest;
};

}  // namespace dafi
