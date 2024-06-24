import httpRequest from "../utils/httpRequest";

export interface Book {
  _id: string;
  title: string;
  subtitle?: string;
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
    const response = await httpRequest.get<{ books: Book[] }>(`/books`);
    return response.data.books;
  } catch (error) {
    console.error("Error getting new books:", error);
    return [];
  }
};
