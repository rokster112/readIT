import linkedIn from "../assets/LinkedIn-logo.png";
import github from "../assets/github.png";

export default function Footer() {
  //! Still need to get the GitHub link to the repo
  return (
    <div className="text-[#CF1818] font-semibold h-24 flex flex-row items-center gap-10 justify-center bg-gray-900">
      <div className="h-full flex flex-col items-center">
        <p>Rokas Arlauskas</p>
        <img className="h-12 w-12" src={linkedIn} />
      </div>
      <div className="h-full flex flex-col items-center">
        <p>Source Code</p>
        <img className="h-12 w-12" src={github} />
      </div>
    </div>
  );
}
