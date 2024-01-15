import { useComputed, useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Effect } from "effect";

import { useComputedAsync } from "~/hooks/useComputedAsync.ts";
import { compress } from "~/lib/imagemagick.ts";

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
    const imageType = unCompressedPhotoFile.value.type;

    // Check if the image type is supported
    const supportedImageTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!supportedImageTypes.includes(imageType)) {
      console.error("Unsupported image type");
      return;
    }
    const compressed = await Effect.runPromise(compress(unCompressedPhotoFile.value, 85));
    const blob = new Blob([compressed], { type: "image/jpeg" });
    return URL.createObjectURL(blob);
  }, [unCompressedPhotoFile]);

  return (
    <div class="flex flex-col">
      {unCompressedPhotoFile.value == undefined
        ? (
          <>
            <h1 class="text-5xl font-bold">Hello there</h1>
            <p class="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
              exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <input
              type="file"
              class="file-input file-input-bordered file-input-primary w-full max-w-xs"
              id="input"
              accept="image/png, image/jpeg, image/webp"
              onInput={(e) => {
                const files = e.currentTarget.files;
                if (files && files.length >= 1) {
                  const file = files[0];
                  unCompressedPhotoFile.value = file;
                }
              }}
            />
          </>
        )
        : (
          <div class="flex flex-row justify-center grow gap-3 mb-2">
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
        )}
    </div>
  );
}
