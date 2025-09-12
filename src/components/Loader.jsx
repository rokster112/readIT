import { PuffLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <PuffLoader size={80} color="#3b3b6b" />
    </div>
  );
}
