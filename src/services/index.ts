import axios from "axios";
import httpRequest from "../utils/httpRequest";

export interface Book {
  title: string;
  subtitle: string;
  isbn13: number;
  price: string;
  image: string;
  url: string;
}

export const searchBooks = async (query: string): Promise<Book[]> => {
  try {
    const response = await httpRequest.get<{ books: Book[] }>(
      `search/${query}`
    );
    return response.data.books;
  } catch (error) {
    console.error("Error searching books:", error);
    return [];
  }
};

export const getNewBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get<{ books: Book[] }>(
      `https://api.itbook.store/1.0/new`
    );
    return response.data.books;
  } catch (error) {
    console.error("Error getting new books:", error);
    return [];
  }
};

interface BookDetails {
  title: string;
  subtitle: string;
  authors: string;
  publisher: string;
  isbn10: string;
  isbn13: string;
  pages: string;
  year: string;
  rating: string;
  desc: string;
  price: string;
  image: string;
  url: string;
  pdf: { [key: string]: string };
}

export const getBookByISBN = async (
  isbn13: string
): Promise<BookDetails | null> => {
  try {
    const response = await axios.get<BookDetails>(
      `https://api.itbook.store/1.0/books/${isbn13}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting book details:", error);
    return null;
  }
};

// Ví dụ: Tìm kiếm sách với query là "mongodb"
(async () => {
  const books = await searchBooks("mongodb");
  console.log(books);
})();

// Ví dụ: Lấy sách mới nhất
(async () => {
  const newBooks = await getNewBooks();
  console.log(newBooks);
})();

// Ví dụ: Lấy thông tin chi tiết về sách có ISBN là "9781617294136"
(async () => {
  const bookDetails = await getBookByISBN("9781617294136");
  console.log(bookDetails);
})();
