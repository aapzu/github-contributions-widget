import { Resvg } from '@resvg/resvg-js'
import { optimize } from 'svgo'
import path from 'path'

export const optimizeSvg = async (svgString: string) => {
  const optimizeResult = await optimize(svgString)
  return optimizeResult.data
}

export const svgToPng = async (svgString: string) => {
  const resvg = new Resvg(svgString, {
    font: {
      fontDirs: [path.resolve(process.cwd(), './public/fonts')],
      defaultFontFamily: 'Roboto Mono',
      loadSystemFonts: false,
    },
    dpi: 2000,
  })
  return resvg.render().asPng()
}
