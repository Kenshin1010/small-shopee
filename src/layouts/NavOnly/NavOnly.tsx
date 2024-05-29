import Nav from "../components/Nav/Nav";

type NavOnlyProps = {
  children: React.ReactElement;
};

function NavOnly({ children }: NavOnlyProps) {
  return (
    <div className="NavOnly">
      <Nav />
      <div className="container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
export default NavOnly;
