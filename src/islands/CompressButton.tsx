import { Signal, useSignal } from "@preact/signals";

import { Effect } from "effect";
import { compress } from "~/lib/imagemagick.ts";

interface CompressButtonProps {
  image: Signal<File | undefined>;
}

export default function CompressButton({ image }: CompressButtonProps) {
  const compressing = useSignal(false);
  const getCompressedBlobAndDownload = async (image: Signal<File | undefined>) => {
    if (image.value == undefined) return;
    const imageType = image.value.type;
    // Check if the image type is supported
    const supportedImageTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!supportedImageTypes.includes(imageType)) {
      console.error("Unsupported image type");
      return;
    }
    compressing.value = true;
    const compressed = await Effect.runPromise(compress(image.value, 85));
    compressing.value = false;
    const blob = new Blob([compressed], { type: "image/jpeg" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    const currentDateTime = new Date();
    a.download = `compressed_${currentDateTime.getTime()}.jpeg`;
    a.click();
    return blob;
  };

  return (
    <button
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-gray-700 text-white"
      type="submit"
      disabled={compressing.value}
      onClick={() => getCompressedBlobAndDownload(image)}
    >
      {compressing.value ? "Compressing..." : "Compress"}
    </button>
  );
}
