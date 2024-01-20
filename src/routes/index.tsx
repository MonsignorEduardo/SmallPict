import { useSignal } from "@preact/signals";

import FileInput from "~/islands/FileInput.tsx";
import ShowImage from "~/islands/ShowImage.tsx";
import CompressButton from "~/islands/CompressButton.tsx";

export default function Home() {
  const image = useSignal<File | undefined>(undefined);

  return (
    <main class="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div class="w-full max-w-sm">
        <div class="space-y-4">
          <h1 class="text-3xl font-bold text-white">Upload Picture</h1>
          <p class="text-gray-400 dark:text-gray-300">
            Upload a picture it will be compressed and saved a JPEG
          </p>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
              for="picture"
            >
              Picture
            </label>
            <FileInput image={image} />

            <ShowImage image={image} />
          </div>
          <CompressButton image={image} />
        </div>
      </div>
    </main>
  );
}
