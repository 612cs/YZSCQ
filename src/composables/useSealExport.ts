import { exportSvgToPngBlob } from '@/components/seal/SealCanvasExporter'
import type { SealRenderResult } from '@/types/seal'
import { downloadBlob } from '@/utils/download'
import { formatTimestamp } from '@/utils/format'

export function useSealExport() {
  const exportPng = async (
    renderResult: SealRenderResult,
    companyName: string,
    templateName: string,
  ) => {
    const blob = await exportSvgToPngBlob(
      renderResult.svgMarkup,
      renderResult.width,
      renderResult.height,
    )
    const filename = `${companyName}_${templateName}_${formatTimestamp()}.png`

    downloadBlob(blob, filename)
  }

  return {
    exportPng,
  }
}
