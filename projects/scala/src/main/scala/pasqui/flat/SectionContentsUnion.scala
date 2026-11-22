package pasqui.flat

import pasqui.flatbuf.{BundleManifest, BundleSectionContents, StopsSection}

trait SectionContentsUnion

object SectionContentsUnion:

  def manifest(o: FlatOffset[BundleManifest]): FlatUnion[SectionContentsUnion] =
    FlatUnion(BundleSectionContents.manifest, o)

  def stops(o: FlatOffset[StopsSection]): FlatUnion[SectionContentsUnion] =
    FlatUnion(BundleSectionContents.stops, o)
