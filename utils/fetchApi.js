import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
      'X-RapidAPI-Key':'221f487d67msh120f1f160d7068bp1a2895jsn715b5878b865',
      'X-RapidAPI-Host':'bayut.p.rapidapi.com'
    },
  });
    
  return data;
}