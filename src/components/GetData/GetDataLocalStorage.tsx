import { useEffect } from "react";
import useBooksAPI from "../../hooks/useBooksAPI";
import { Book } from "../../services";

function GetDataLocalStorage() {
  // Lấy dữ liệu mới nhất từ API
  const newBooks: Book[] | null = useBooksAPI("new");

  // Lưu dữ liệu mới nhất vào localStorage khi có
  useEffect(() => {
    // Kiểm tra xem localStorage đã có dữ liệu về newBooks chưa
    const savedNewBooks = JSON.parse(localStorage.getItem("newBooks") || "[]");
    if (!savedNewBooks.length && newBooks) {
      localStorage.setItem("newBooks", JSON.stringify(newBooks));
    }
  }, [newBooks]);

  // Lấy dữ liệu đã lưu từ localStorage (nếu có)
  const savedNewBooks: Book[] = JSON.parse(
    localStorage.getItem("newBooks") || "[]"
  );

  // Hiển thị dữ liệu
  return (
    <div>
      <h2>New Books</h2>
      {savedNewBooks.length > 0 ? (
        <ul>
          {savedNewBooks.map((book, index) => (
            <li key={index}>
              <h3>{book.title}</h3>
              <p>{book.subtitle}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GetDataLocalStorage;
