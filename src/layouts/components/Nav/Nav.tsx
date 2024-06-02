import { Link } from "react-router-dom";

function Nav() {
  return (
    <header>
      <Link to={`/addnew`}>Add New Product</Link>
    </header>
  );
}

export default Nav;
