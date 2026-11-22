package pasqui.steps

import pasqui.gtfs.GtfsArchive
import pasqui.pipeline.{Pipeline, PipelineStep, PipelineStepObject}

object ReadGtfsArchive extends PipelineStepObject[GtfsArchive]:

  def prepare(pipeline: Pipeline): PipelineStep[GtfsArchive] =
    val options = pipeline.step[PipelineOptions]
    () => execute(options.get().gtfsPath)

  private def execute(path: String): GtfsArchive =
    GtfsArchive.open(path)
