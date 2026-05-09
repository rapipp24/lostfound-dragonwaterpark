type ImageFallbackProps = {
  src: string;
  alt: string;
};

export default function ImageFallback({
  src,
  alt,
}: ImageFallbackProps) {
  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        e.currentTarget.src =
          "https://placehold.co/600x400?text=No+Image";
      }}
      className="w-full h-full object-cover"
    />
  );
}