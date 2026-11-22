package pasqui.steps

import pasqui.ctfs.CtfsBundle
import pasqui.gtfs.GtfsArchive
import pasqui.pipeline.PipelineBuilder
import pasqui.xport.{ExportBundle, ExportStops, StopEntitySet}

case class PipelineOptions(
    gtfsPath: String,
    buildStopSubdivs: BuildStopSubdivsOptions = BuildStopSubdivsOptions(),
    readStops: ReadStopsOptions = ReadStopsOptions()
)

object Steps:

  def builder(options: PipelineOptions): PipelineBuilder =
    PipelineBuilder()
      .addValue(options)
      .addStep[GtfsArchive](ReadGtfsArchive)
      .addStep[Stops](ReadStops)
      .addStep[StopSubdivs](BuildStopSubdivs)
      .addStep[StopPackages](BuildStopPackages)
      .addStep[CtfsBundle](ExportBundle)
      .addStep[StopEntitySet](ExportStops)
