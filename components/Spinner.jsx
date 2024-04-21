import spinner from "@/public/spinner.gif";
import Image from "next/image";

const Spinner = () => {
  return (
    <>
      <Image
        className="size-8"
        src={spinner}
        height={20}
        width={20}
        unoptimized
        alt="spinner"
      />
    </>
  );
};

export default Spinner;
