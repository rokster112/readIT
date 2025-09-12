import { Puff } from "react-loader-spinner";

export default function Loader() {
  return (
    <div
      style={{ translate: "50% 50%" }}
      className="absolute top-[50%] right-[50%] "
    >
      <Puff
        visible={true}
        height="80"
        width="80"
        color="#3b3b6b"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
