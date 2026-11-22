package pasqui.ctfs

import com.google.flatbuffers.FlatBufferBuilder
import pasqui.flat.Extensions.*
import pasqui.flat.{FlatOffset, SectionContentsUnion}
import pasqui.flatbuf.BundleSection

private class CtfsManifest(bundle: CtfsBundle) extends CtfsSection:

  override def path: String = "manifest.sec"

  override def writeSection(
      buf: FlatBufferBuilder
  ): FlatOffset[BundleSection] =
    buf.writeBundleSection(
      contents = SectionContentsUnion.manifest(
        buf.writeBundleManifest(
          description = buf.writeBundleDescription(
            entitySets =
              bundle.entitySets.map(s => s.writeDescription(buf)).toFlatVector
          )
        )
      )
    )

case class CtfsBundle(entitySets: List[CtfsEntitySet]):

  val manifest: CtfsManifest = CtfsManifest(this)

  def buildSections(): List[CtfsSection] =
    manifest :: entitySets.flatMap(s => s.sections)
