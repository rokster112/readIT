import linkedIn from "../assets/LinkedIn-logo.png";
import github from "../assets/github.png";

export default function Footer() {
  //! Still need to get the GitHub link to the repo
  return (
    <div className="text-[#CF1818] font-semibold h-24 flex flex-row items-center gap-10 justify-center bg-gray-900">
      <div className="h-full flex flex-col items-center">
        <p>Rokas Arlauskas</p>
        <a
          href="https://www.linkedin.com/in/rokas-arlauskas/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="h-12 w-12" src={linkedIn} />
        </a>
      </div>
      <div className="h-full flex flex-col items-center">
        <p>Source Code</p>
        <a
          href="https://github.com/rokster112/readIT"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-12 w-12"
            src={github}
            href={"https://github.com/rokster112/readIT"}
          />
        </a>
      </div>
    </div>
  );
}
