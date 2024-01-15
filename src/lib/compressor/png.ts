// @deno-types="npm:@jsquash/png/decode"
import decode, {
  init as initPngDecode,
} from "https://cdn.jsdelivr.net/npm/@jsquash/png@3.0.0/decode.js/+esm";

// @deno-types="npm:@jsquash/png/encode"
import encode, {
  init as initPngEncode,
} from "https://cdn.jsdelivr.net/npm/@jsquash/png@3.0.0/encode.js/+esm";

async function getPngDecoder() {
  const DEC_WASM = await WebAssembly.compileStreaming(
    fetch("https://unpkg.com/@jsquash/png@3.0.0/codec/pkg/squoosh_png_bg.wasm"),
  );
  await initPngDecode(DEC_WASM);
  return decode;
}

async function getPngEncoder() {
  const ENC_WASM = await WebAssembly.compileStreaming(
    fetch("https://unpkg.com/@jsquash/png@3.0.0/codec/pkg/squoosh_png_bg.wasm"),
  );
  await initPngEncode(ENC_WASM);
  return encode;
}

export { getPngDecoder, getPngEncoder };
