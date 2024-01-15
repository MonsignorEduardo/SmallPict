import { match } from "ts-pattern";
import { Effect, pipe } from "effect";
import { getJpegDecoder } from "~/lib/compressor/jpeg.ts";
import { getWebpDecoder } from "~/lib/compressor/webp.ts";
import { getPngDecoder, getPngEncoder } from "~/lib/compressor/png.ts";

type EncoderDecoderOptions = {
  input: string | "image/jpeg" | "image/webp" | "image/png";
  output: "jpeg" | "webp" | "png";
};

const getDecoder = (type: "image/jpeg" | "image/webp" | "image/png") => {
  return Effect.tryPromise(async () => {
    const decode = match(type)
      .with("image/jpeg", getJpegDecoder)
      .with("image/webp", getWebpDecoder)
      .with("image/png", getPngDecoder)
      .exhaustive();
    return await decode;
  });
};

const getEncoder = () => Effect.tryPromise(() => getPngEncoder());

// const decode = (file: File,) => {

export const compress = (file: File, lvl: number) => {
  const imageType = file.type;
  console.log("imageType", imageType);
  return pipe(
    Effect.all([getDecoder(imageType as "image/jpeg" | "image/webp" | "image/png"), getEncoder()]),
    Effect.tap(([decoder, encoder]) => {
      console.log("hola", decoder, encoder);
    }),
    Effect.andThen(async ([decoder, encoder]) => {
      const bytes = await file.arrayBuffer();
      const image = await decoder(bytes);
      console.log("image decoder", image);
      const compressed = await encoder(image);
      return compressed;
    }),
  );
};
