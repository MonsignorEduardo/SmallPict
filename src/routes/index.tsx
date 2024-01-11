import { createResource, createSignal } from "solid-js";

const getArrayBuffer = async (file: File) => await file.arrayBuffer();

export default function Home() {
  const [photo, setPhoto] = createSignal<File>();
  const [pictureBuffer] = createResource(photo, getArrayBuffer);

  const getPhotoUrl = () => {
    const file = photo();
    if (!file) return;
    return URL.createObjectURL(file);
  }

  return (
    <main class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello there</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div class="flex flex-col">
            <div class="flex flex-row justify-center grow gap-3 mb-2">
              {getPhotoUrl() && (
                <>
                  <img src={getPhotoUrl()} alt="" />
                  <img src={getPhotoUrl()} alt="" />
                </>
              )}

            </div>
            <div>
              <input
                type="file"
                class="file-input file-input-bordered file-input-primary w-full max-w-xs"
                id="input"
                oninput={(e) => {
                  const files = e.currentTarget.files;
                  if (files && files.length >= 1) {
                    const file = files[0];
                    setPhoto(file);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>

  );
}
