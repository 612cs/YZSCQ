export async function exportSvgToPngBlob(svgMarkup: string, width: number, height: number) {
  const svgBlob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)

  try {
    const image = await loadImage(url)
    const canvas = document.createElement('canvas')
    const maxEdge = Math.max(width, height)
    const targetSize = 2400
    const ratio = Math.min(
      8,
      Math.max(window.devicePixelRatio || 2, Math.ceil(targetSize / maxEdge)),
    )
    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('Canvas context 初始化失败')
    }

    canvas.width = width * ratio
    canvas.height = height * ratio
    context.scale(ratio, ratio)
    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = 'high'
    context.clearRect(0, 0, width, height)
    context.drawImage(image, 0, 0, width, height)

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('PNG 导出失败'))
          return
        }

        resolve(blob)
      }, 'image/png')
    })
  } finally {
    URL.revokeObjectURL(url)
  }
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('SVG 图片加载失败'))
    image.src = src
  })
}
