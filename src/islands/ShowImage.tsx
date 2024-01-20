import { Signal } from "@preact/signals";
import { useComputed } from "@preact/signals";

interface ShowImageProps {
  image: Signal<File | Blob | undefined>;
}

export default function ShowImage({ image }: ShowImageProps) {
  const photoUrl = useComputed(() => image.value ? URL.createObjectURL(image.value) : undefined);
  return (
    <img
      src={photoUrl.value ?? "/img/placeholder.svg"}
      alt="Preview of the selected picture"
      class="w-full h-64 object-cover rounded-lg shadow-md"
      width="200"
      height="200"
      style="aspect-ratio: 200 / 200; object-fit: cover;"
    />
  );
}
