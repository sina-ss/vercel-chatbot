import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="https://eyesp.live"
      className="rounded-[2rem] mr-auto border-neutral-50 border-[1px] my-7 px-6 py-3 text-neutral-50 text-center"
    >
      <h1>EYESP.LIVE</h1>
    </Link>
  );
};

export default Logo;
