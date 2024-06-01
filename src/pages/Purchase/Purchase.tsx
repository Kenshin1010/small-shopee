import { Link, useLocation } from "react-router-dom";

function Purchase() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");

  if (keyword) {
    const orderKey = `${keyword}_purchased`;
    const orderFromLocalStorage = localStorage.getItem(orderKey);

    if (orderFromLocalStorage) {
      return <Link to={`/purchase?keyword=${orderKey}`}>{orderKey}</Link>;
    } else {
      return <div>No order found for {keyword}</div>;
    }
  } else {
    return (
      <>
        {Object.keys(localStorage).map((key) => {
          if (key.includes("purchased")) {
            return (
              <Link key={key} to={`/purchase?keyword=${key}`}>
                {key}
              </Link>
            );
          }
          return null;
        })}
      </>
    );
  }
}

export default Purchase;
