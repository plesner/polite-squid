package pasqui.ctfs

import com.google.flatbuffers.FlatBufferBuilder
import pasqui.flat.Extensions.finishSection
import pasqui.flat.FlatOffset
import pasqui.flatbuf.BundleSection

object CtfsSection:

  def attribMask(attribs: Int*): Int =
    attribs.map(1 << _).sum

trait CtfsSection:

  def path: String

  def writeSection(buf: FlatBufferBuilder): FlatOffset[BundleSection]

  def toByteArray: Array[Byte] =
    val buf = new FlatBufferBuilder()
    buf.finishSection(writeSection(buf))
    buf.sizedByteArray()
