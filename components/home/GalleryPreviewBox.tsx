import Photo from '@/components/gallery/photo'
import { v4 as uuidv4 } from 'uuid'

export default function GalleryPreviewBox() {
  const imgSrc = ['/static/gallery/home12.jpeg']

  return (
    <div className={`card bg-pink-blue-animated sticky right-0 flex-grow overflow-hidden`}>
      <Photo
        id={uuidv4()}
        imagelist={imgSrc}
        alt="Ale"
        className="h-full w-full object-cover"
        width={832}
        height={1216}
      />
    </div>
  )
}
