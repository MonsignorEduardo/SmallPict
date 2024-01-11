import { createSignal } from "solid-js";
import { call } from "wasm-imagemagick";

interface Props {
  file: File;
}

export default function Convert(props: Props) {
  const [count, setCount] = createSignal(0);

  const doConvert = async (file: File) => {
    console.log(file);
    let pdfFile = await fetch(URL.createObjectURL(file));
    let pdfContent = new Uint8Array(await pdfFile.arrayBuffer());
    let pdfObj = { name: "srcFile.png", pdfContent };
    const command = [
      "convert",
      "srcFile.png",
      "-rotate",
      "90",
      "-resize",
      "200%",
      "out.png",
    ];
    const result = await call([pdfObj], command);

    console.log(result);
    // is there any errors ?
    if (result.exitCode !== 0)
      return alert("There was an error: " + result.stderr.join("\n"));

    // response can be multiple files (example split) here we know we just have one
    const outputImage = result.processedFiles[0];

    // render the output image into an existing <img> element
    const outputImageDOM = document.getElementById("outputImage");
    outputImageDOM.src = URL.createObjectURL(outputImage.blob);
    outputImageDOM.alt = outputImage.name;
  };

  return (
    <button
      class="w-[200px] rounded-full bg-gray-100 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem]"
      onClick={() => setCount(count() + 1)}
    >
      Clicks: {count()}
    </button>
  );
}
