import Link from "next/link";

const Header = () => {
  return (
    <header className="py-2 border-b border-gray-100">
      <div className="px-5 mx-auto max-w-7xl">
        <Link href="/">start</Link>
      </div>
    </header>
  );
};

export default Header;
