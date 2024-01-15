// @deno-types="npm:@jsquash/webp/decode"
import decode, {
  init as initDecodeWebp,
} from "https://cdn.jsdelivr.net/npm/@jsquash/webp@1.4.0/decode.js/+esm";

// @deno-types="npm:@jsquash/webp/encode"
import encode, {
  init as initWebpEncode,
} from "https://cdn.jsdelivr.net/npm/@jsquash/webp@1.4.0/encode.js/+esm";

async function getWebpDecoder() {
  const DEC_WASM = await WebAssembly.compileStreaming(
    fetch("https://cdn.jsdelivr.net/npm/@jsquash/webp@1.4.0/codec/dec/webp_dec.wasm"),
  );
  await initDecodeWebp(DEC_WASM);
  return decode;
}

async function getWebpEncoder() {
  const ENC_WASM = await WebAssembly.compileStreaming(
    fetch("https://cdn.jsdelivr.net/npm/@jsquash/webp@1.4.0/codec/enc/webp_enc.wasm"),
  );
  await initWebpEncode(ENC_WASM);
  return encode;
}

export { getWebpDecoder, getWebpEncoder };
