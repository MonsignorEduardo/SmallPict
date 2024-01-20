import { Signal } from "@preact/signals";

interface FileInputProps {
  image: Signal<File | undefined>;
}

export default function FileInput({ image }: FileInputProps) {
  return (
    <input
      class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      id="picture"
      type="file"
      accept="image/png, image/jpeg, image/webp"
      onInput={(e) => {
        const files = e.currentTarget.files;
        if (files && files.length >= 1) {
          const file = files[0];
          image.value = file;
        }
      }}
    />
  );
}
