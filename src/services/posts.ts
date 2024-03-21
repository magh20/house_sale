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

export const getPost = async (arg: any) => {
  try {
    const response: any = await header(`http://localhost:3000`).get(`/posts`, {
      params: arg,
    });

    return response;
  } catch (e) {
    return console.log(e);
  }
};

export const getPosts = async (arg: any) => {
  try {
    const response: any = await header(`http://localhost:3000`).get(`/posts`, {
      params: arg,
    });

    return response;
  } catch (e) {
    return console.log(e);
  }
};

export const postRegister = async (arg: any) => {
  try {
    const response: any = await header(`http://localhost:3000`).post(
      `/posts`,
      arg
    );

    return response;
  } catch (e) {
    return console.log(e);
  }
};

export const postEdit = async (id: string, arg: any) => {
  try {
    const response: any = await header(`http://localhost:3000`).put(
      `/posts/${id}`,
      arg
    );

    return response;
  } catch (e) {
    return console.log(e);
  }
};

export const postDelete = async (id: string) => {
  try {
    const response: any = await header(`http://localhost:3000`).delete(
      `/posts/${id}`
    );

    return response;
  } catch (e) {
    return console.log(e);
  }
};
