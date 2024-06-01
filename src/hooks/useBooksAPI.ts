import { useEffect, useState } from "react";

function useBooksAPI(endpoint: string) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.itbook.store/1.0/${endpoint}`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [endpoint]);

  return data;
}

export default useBooksAPI;
