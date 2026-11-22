package pasqui.pipeline

trait PipelineStep[T]:
  def execute(): T
