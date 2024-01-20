import {
  ColorSpace,
  ImageMagick,
  initializeImageMagick,
  Magick,
  MagickFormat,
  Quantum,
} from "@imagemagick/magick-wasm";
import { Effect, pipe } from "effect";
const wasmLocation = new URL("https://esm.sh/@imagemagick/magick-wasm@0.0.27/dist/magick.wasm");

const compressFile = (picture: Uint8Array, lvl: number) => {
  return Effect.async<never, Error, Uint8Array>((resume) => {
    ImageMagick.read(picture, (image) => {
      image.quality = lvl;
      image.colorSpace = ColorSpace.RGB;
      image.write(MagickFormat.Jpeg, (data) => {
        resume(Effect.succeed(data));
      });
    });
  });
};

const getPictureUint8Array = (file: File) =>
  Effect.tryPromise(() => file.arrayBuffer().then((buffer) => new Uint8Array(buffer)));

export const compress = (file: File, lvl: number) => {
  const imageType = file.type;
  console.log("imageType", imageType);
  return pipe(
    Effect.tryPromise(() => initializeImageMagick(wasmLocation)),
    Effect.tap(() => {
      console.log(Magick.imageMagickVersion);
      console.log("Delegates:", Magick.delegates);
      console.log("Features:", Magick.features);
      console.log("Quantum:", Quantum.depth);
    }),
    Effect.flatMap(() => getPictureUint8Array(file)),
    Effect.flatMap((picture) => compressFile(picture, lvl)),
  );
};
