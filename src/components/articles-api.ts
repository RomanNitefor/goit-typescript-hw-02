import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const API_KEY = "gLvNzQe8Y1RXwJBRQsJvw2vTmnsC8eXAwYmArd1eC8U";

interface Image {
  id: string;
  url: string;
  alt_description?: string;
}

interface ApiResponse {
  results: Array<{
    id: string;
    urls: {
      small: string;
    };
    alt_description?: string;
  }>;
}

export const fetchImages = async (
  topic: string,
  currentPage: number
): Promise<Image[]> => {
  try {
    const res = await axios.get<ApiResponse>(`search/photos`, {
      params: {
        query: topic,
        page: currentPage,
        per_page: 10,
      },
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
    });

    return res.data.results.map((image) => ({
      id: image.id,
      url: image.urls.small,
      alt_description: image.alt_description,
    }));
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
