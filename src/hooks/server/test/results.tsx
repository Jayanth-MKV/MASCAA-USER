import { request } from "@/hooks/network/network";

const BASE_URL = "submission";


export const getTestSubmissions = async (id: string) => {
  // console.log("id",id)
  return await request({
    method: "GET",
    url: `${BASE_URL}/all/${id}`,
  });
};

export const createSubmission = async (data: any ) => {
  return await request({
    method: "POST",
    url: `${BASE_URL}/`,
    data,
  });
};


export const getSubmission = async (id: string) => {
  // console.log("id",id)
  return await request({
    method: "GET",
    url: `${BASE_URL}/${id}`,
  });
};