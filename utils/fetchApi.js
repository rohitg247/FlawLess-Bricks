import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';
export const apiUrl = "http://localhost:3000/api"

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
      'X-RapidAPI-Key': '221f487d67msh120f1f160d7068bp1a2895jsn715b5878b865',
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    },
  });

  return data;
}

export const postContact = async (contactdata) => {
  const data = await axios.post((`${apiUrl}/post-contact`), {
    ...contactdata
  });
  return data?.data?.contact;
}

// export const postContact = async (contactdata) => {
//   const data = await axios.post((`${apiUrl}/post-contact`), {
//     ...contactdata
//   });
//   return data?.data?.contact;
// }

export const signIn = async (signindata) => {
  const data = await axios.post((`${apiUrl}/login`), {
    ...signindata
  });
  console.log(data.data)
  return data?.data;
}


export const signUp = async (signupdata) => {
  const data = await axios.post((`${apiUrl}/auth/signup`), {
    ...signupdata
  });
  console.log(data.data)
  return data?.data;
}

