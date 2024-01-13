import { useComputed, useSignal } from "@preact/signals";
import { asset, IS_BROWSER } from "$fresh/runtime.ts";
import { useComputedAsync } from "../hooks/useComputedAync.ts";
import { getEncoderDecoder } from "../lib/ecoding.ts";

export default function Photo() {
  if (!IS_BROWSER) return null;

  const unCompressedPhotoFile = useSignal<File | undefined>(undefined);

  const unCompressedPhotoUrl = useComputed(() => {
    return unCompressedPhotoFile.value
      ? URL.createObjectURL(unCompressedPhotoFile.value)
      : undefined;
  });

  const compressedPhotoUrl = useComputedAsync(async () => {
    if (unCompressedPhotoFile.value == undefined) return;

    const [decode, encode] = await getEncoderDecoder({
      input: "jpeg",
      output: "jpeg",
    });
    const buffer = await unCompressedPhotoFile.value.arrayBuffer();
    console.log("buffer: ", buffer);
    const imageData = await decode(buffer);
    const encoded = await encode(imageData);
    const blob = new Blob([encoded], { type: "image/png" });
    return URL.createObjectURL(blob);
  }, [unCompressedPhotoFile]);

  return (
    <div class="flex flex-col">
      <div class="flex flex-row justify-center grow gap-3 mb-2">
        <button class="btn">Button</button>

        {unCompressedPhotoUrl.value && (
          <img
            src={unCompressedPhotoUrl}
            alt=""
          />
        )}
        {compressedPhotoUrl.value && (
          <img
            src={compressedPhotoUrl}
            alt=""
          />
        )}
      </div>
      <div>
        <input
          type="file"
          class="file-input file-input-bordered file-input-primary w-full max-w-xs"
          id="input"
          onInput={(e) => {
            const files = e.currentTarget.files;
            if (files && files.length >= 1) {
              const file = files[0];
              unCompressedPhotoFile.value = file;
            }
          }}
        />
      </div>
    </div>
  );
}
