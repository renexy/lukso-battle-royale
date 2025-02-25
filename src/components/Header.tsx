import logo from "../assets/react.svg";

function Header() {

  return (
    <div className="global-main-grid-layout relative">
      <div className="col-content h-10 w-full items-center justify-end flex">
        <img
          src={logo}
          alt="logo"
          width={56}
          height="auto"
        />
      </div>
    </div>
  );
}

export default Header;
