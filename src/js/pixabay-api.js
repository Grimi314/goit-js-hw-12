"use strict";
import axios from "axios";

export const config = {
  params: {
    key: "54150142-86526a32bbcea3c4d6b3084a1",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 150,
  },
};

export async function getImagesByQuery(query, page) {
  config.params.q = query;
  config.params.page = page;

  const getQueryData = await axios.get("https://pixabay.com/api/", config);

  return getQueryData.data;
}
