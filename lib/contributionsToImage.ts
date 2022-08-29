import path from 'path'
import ejs from 'ejs'
import { ContributionsResponse } from './types'
import tinygradient from 'tinygradient'
import ApiError from './utils/ApiError'
import { optimizeSvg, svgToPng } from './utils/convertImage'

export const supportedImageFormats = {
  svg: 'image/svg',
  png: 'image/png',
} as const

const svgTemplatePath = path.resolve(
  __dirname,
  '../templates/contributions.ejs',
)

const colorGetter = (maxNum: number) => {
  const gradient = tinygradient(['#001d3d', '#0069CC'])
    .rgb(maxNum + 1)
    .map((c) => c.toString())
  return (num: number) => gradient[num]
}

const contributionsToImage = async (
  contributions: ContributionsResponse,
  imageFormat: keyof typeof supportedImageFormats,
) => {
  const flattenedContributions =
    contributions.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week) => week.contributionDays,
    )
  const maxContributions = Math.max(
    ...flattenedContributions.map((c) => c.contributionCount),
  )
  const svgString = await ejs.renderFile(
    svgTemplatePath,
    {
      contributions: flattenedContributions,
      width: 1020,
      getColor: colorGetter(maxContributions),
      name: contributions.data.user.name,
      fontColor: '#ED254E',
      font: 'Roboto Mono',
    },
    {},
  )
  const optimizedSvg = await optimizeSvg(svgString)
  if (imageFormat === 'png') {
    return svgToPng(optimizedSvg)
  } else if (imageFormat === 'svg') {
    return Buffer.from(optimizedSvg, 'utf-8')
  } else {
    throw new ApiError(`Invalid image format: ${imageFormat}`, 400)
  }
}

export default contributionsToImage
