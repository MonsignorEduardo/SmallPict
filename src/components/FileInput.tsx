import { Setter } from "solid-js";

interface Props {
  setPhoto: Setter<File | undefined>;
}

export default function FileInput(props: Props) {
  return (
    <input
      type="file"
      class="file-input file-input-bordered file-input-primary w-full max-w-xs"
      id="input"
      onInput={(e) => {
        const files = e.currentTarget.files;
        if (files && files.length >= 1) {
          const file = files[0];
          props.setPhoto(file);
        }
      }}
    />
  );
}
