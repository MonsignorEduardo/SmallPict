import { match } from "ts-pattern";

// @deno-types="npm:@jsquash/jpeg/decode"
import decodeJpeg, {
  init as initDecodeJpeg,
} from "https://unpkg.com/@jsquash/jpeg@1.4.0/decode.js?module";

// @deno-types="npm:@jsquash/jpeg/encode"
import encodeJpeg, {
  init as initJpegEncode,
} from "https://unpkg.com/@jsquash/jpeg@1.4.0/encode.js?module";

async function getDecodeJpeg() {
  const JPEG_DEC_WASM = await WebAssembly.compileStreaming(
    fetch("https://unpkg.com/@jsquash/jpeg@1.4.0/codec/dec/mozjpeg_dec.wasm"),
  );
  await initDecodeJpeg(JPEG_DEC_WASM);
  return decodeJpeg;
}

async function getJpegDecoder() {
  const JPEG_ENC_WASM = await WebAssembly.compileStreaming(
    fetch("https://unpkg.com/@jsquash/jpeg@1.4.0/codec/enc/mozjpeg_enc.wasm"),
  );
  await initJpegEncode(JPEG_ENC_WASM);
  return encodeJpeg;
}

type EncoderDecoderOptions = { input: "jpeg"; output: "jpeg" };
export async function getEncoderDecoder(
  options: EncoderDecoderOptions,
) {
  const decode = match(options["input"])
    .with("jpeg", getDecodeJpeg)
    .exhaustive();

  const encode = match(options["input"])
    .with("jpeg", getJpegDecoder)
    .exhaustive();

  return await Promise.all([decode, encode]);
}
