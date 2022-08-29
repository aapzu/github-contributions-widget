import { Resvg } from '@resvg/resvg-js'
import { optimize } from 'svgo'
import path from 'path'

export const optimizeSvg = async (svgString: string) => {
  const optimizeResult = await optimize(svgString)
  if ('data' in optimizeResult) {
    return optimizeResult.data
  } else {
    throw optimizeResult.modernError
  }
}

export const svgToPng = async (svgString: string) => {
  const optimizedSvg = await optimizeSvg(svgString)
  const resvg = new Resvg(optimizedSvg, {
    font: {
      fontDirs: [path.resolve(__dirname, '../../public/fonts')],
      defaultFontFamily: 'Roboto Mono',
      loadSystemFonts: false,
    },
    dpi: 2000,
  })
  return resvg.render().asPng()
}
