import contributionsToImage, {
  supportedImageFormats,
} from '../../lib/contributionsToImage'
import { getContributions } from '../../lib/data/contributions'
import ApiError from '../../lib/utils/ApiError'
import { type NextRequest } from 'next/server'

function assertSupportedImageFormat(
  imageFormat: string,
): asserts imageFormat is keyof typeof supportedImageFormats {
  if (!(imageFormat in supportedImageFormats)) {
    throw new ApiError(
      `imageFormat ${imageFormat} not supported, supported formats: ${Object.keys(
        supportedImageFormats,
      ).join(', ')}`,
      400,
    )
  }
}

function checkColorTheme(colorTheme: string): asserts colorTheme is 'aapzu' {
  if (!(['aapzu', 'original'] as const).includes(colorTheme as never)) {
    throw new ApiError(
      `colorTheme ${colorTheme} not supported, supported themes: aapzu, original`,
      400,
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { imageNameWithUsername: string } },
) {
  const searchParams = request.nextUrl.searchParams
  const colorTheme = searchParams.get('colorTheme') ?? 'aapzu'
  const [username, imageFormat] = params.imageNameWithUsername.split('.')
  try {
    checkColorTheme(colorTheme)
    assertSupportedImageFormat(imageFormat)
    const res = await getContributions(username)
    if ('errors' in res) {
      throw new ApiError(res.errors[0].message, 400)
    }
    const imageBuffer = await contributionsToImage(res, imageFormat, colorTheme)
    return new Response(imageBuffer, {
      headers: {
        'Content-type': supportedImageFormats[imageFormat],
        'Cache-Control': 'max-age=0, s-maxage=86400',
      },
    })
  } catch (e: unknown) {
    const { status, message } = e as ApiError
    console.error(e)
    return new Response(message ?? 'Something went wrong', {
      status: status ?? 500,
    })
  }
}
