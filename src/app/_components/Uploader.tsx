"use client";
import { insertMultipleProducts } from "../_lib/actions";

function Uploader() {
  return (
    <div>
      <button
        onClick={() => {
          insertMultipleProducts();
        }}
      >
        Upload
      </button>
    </div>
  );
}

export default Uploader;
