#include "open_connection.hh"

using namespace pasqui;

JsWorkLoopEvent* OpenConnectionLoop::proceed() {
  auto manifest = conn().section("manifest.sec");

  if (!manifest) {
    return new JsGetSectionEvent(this, "manifest.sec");
  }

  const pasqui::flatbuf::BundleSection* manifest_section =
      flatbuffers::GetRoot<pasqui::flatbuf::BundleSection>(manifest->c_str());
  if (manifest_section->contents_type() !=
      pasqui::flatbuf::BundleSectionContents_manifest) {
    return new JsErrorEvent();
  }

  conn().set_manifest(manifest_section->contents_as_manifest());
  return new JsCompleteEvent();
}
