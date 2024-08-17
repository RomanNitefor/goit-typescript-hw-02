interface Image {
  url: string;
  alt_description?: string;
}

interface ImageCardProps {
  image: Image;
  onImageClick: (url: string, alt: string) => void;
}

export default function ImageCard({ image, onImageClick }: ImageCardProps) {
  return (
    <div>
      <img
        onClick={() =>
          onImageClick(image.url, image.alt_description || "Image")
        }
        src={image.url}
        alt={image.alt_description || "Image"}
      />
    </div>
  );
}
