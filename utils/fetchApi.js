import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
      'X-RapidAPI-Key': 'e70115af47mshc1d394be6b39b3ap1c6294jsn9284e88ab69f',
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    },
  });

  return data;
}

export const postContact = async (contactdata) => {
  const data = await axios.post(("http://localhost:3000/api/post-contact"), {
    ...contactdata
  });
  return data?.data?.contact;
}

export const signIn = async (signindata) => {
  const data = await axios.post(("https://flaw-less-bricks.vercel.app/api/login"), {
    ...signindata
  });
  console.log(data.data)
  return data?.data;
}


export const signUp = async (signupdata) => {
  const data = await axios.post(("https://flaw-less-bricks.vercel.app/api/signup"), {
    ...signupdata
  });
  console.log(data.data)
  return data?.data;
}

