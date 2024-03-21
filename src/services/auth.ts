import axios from "axios";

export function header(root: string) {
  const url = root;

  return axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const userLogin = async (arg: any) => {
  try {
    const response: any = await header(`http://localhost:3000`).post(
      `/login`,
      arg
    );

    return response;
  } catch (e) {
    return console.log(e);
  }
};

export const userRegister = async (arg: any) => {
  try {
    const response: any = await header(`http://localhost:3000`).post(
      `/users`,
      arg
    );

    return response;
  } catch (e) {
    return console.log(e);
  }
};
