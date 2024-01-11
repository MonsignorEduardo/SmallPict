import { useComputed, useSignal } from "@preact/signals";

export default function Photo() {
  const unCompressedPhotoFile = useSignal<File | undefined>(undefined);

  const unCompressedPhotoUrl = useComputed(() => {
    return unCompressedPhotoFile.value
      ? URL.createObjectURL(unCompressedPhotoFile.value)
      : undefined;
  });

  return (
    <div class="flex flex-col">
      <div class="flex flex-row justify-center grow gap-3 mb-2">
        {unCompressedPhotoUrl.value && (
          <>
            <img src={unCompressedPhotoUrl} alt="" />
            <img src={unCompressedPhotoUrl} alt="" />
          </>
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
