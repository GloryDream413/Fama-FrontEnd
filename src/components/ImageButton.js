/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";

export default function ImageButton({ imgUrl, onClick, title, sx = "" }) {
  return (
    <div className="hover:bg-[#051b5c47] px-3 py-2 w-full">
      <button
        onClick={onClick}
        className={`flex items-center gap-[17px] w-full max-w-[240px] text-20 mx-auto sm:text-25  ${sx}`}
      >
        <img src={imgUrl} />
        <p>{title}</p>
      </button>
    </div>
  );
}
