import { request } from "@/hooks/network/network";

const BASE_URL = "auth";

export const loginUser = async (data: any) => {
  console.log(data);
  const res = await request({
    method: "POST",
    url: `${BASE_URL}/slogin`,
    data,
  });
  // console.log(res);
  return res;
};

export const registerUser = async (data: any) => {
  return await request({
    method: "POST",
    url: `${BASE_URL}/sregister`,
    data,
  });
};



export const checkEmail = async (data: any) => {
  return await request({
    method: "POST",
    url: `${BASE_URL}/check-email`,
    data,
  });
};

export const checkRoll = async (data: any) => {
  return await request({
    method: "POST",
    url: `${BASE_URL}/check-roll`,
    data,
  });
};




