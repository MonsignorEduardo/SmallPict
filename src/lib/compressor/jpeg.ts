// @deno-types="npm:@jsquash/jpeg/decode"
import decode, {
  init as initDecodeJpeg,
} from "https://cdn.jsdelivr.net/npm/@jsquash/jpeg@1.4.0/decode.js/+esm";

// @deno-types="npm:@jsquash/jpeg/encode"
import encode, {
  init as initJpegEncode,
} from "https://cdn.jsdelivr.net/npm/@jsquash/jpeg@1.4.0/encode.js/+esm";

async function getJpegDecoder() {
  const JPEG_DEC_WASM = await WebAssembly.compileStreaming(
    fetch("https://cdn.jsdelivr.net/npm/@jsquash/jpeg@1.4.0/codec/dec/mozjpeg_dec.wasm"),
  );
  await initDecodeJpeg(JPEG_DEC_WASM);
  return decode;
}

async function getJpegEncoder() {
  const JPEG_ENC_WASM = await WebAssembly.compileStreaming(
    fetch("https://cdn.jsdelivr.net/npm/@jsquash/jpeg@1.4.0/codec/enc/mozjpeg_enc.wasm"),
  );
  await initJpegEncode(JPEG_ENC_WASM);
  return encode;
}

export { getJpegDecoder, getJpegEncoder };
