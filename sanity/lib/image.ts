import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

/** Accepts any image source compatible with @sanity/image-url (Image, SanityImageObject, etc.) */
type ImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0]

export const urlFor = (source: ImageSource) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}
