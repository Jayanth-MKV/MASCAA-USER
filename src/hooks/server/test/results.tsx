import { request } from "@/hooks/network/network";

const BASE_URL = "submission";


export const getTestSubmissions = async (id: string) => {
  // console.log("id",id)
  return await request({
    method: "GET",
    url: `${BASE_URL}/all/${id}`,
  });
};

export const getSubResults = async (id: string) => {
  // console.log("id",id)
  return await request({
    method: "GET",
    url: `evaluation/submission/${id}/results`,
  });
};

export const RevalSubResults = async ({id}:{id: string}) => {
  // console.log("id",id)
  return await request({
    method: "GET",
    url: `evaluation/submission/${id}/results/reload`,
  });
};

export const createSubmission = async (data: any ) => {
  return await request({
    method: "POST",
    url: `${BASE_URL}/`,
    data,
  });
};

export const reloadAudioEmotion = async (data: any ) => {
  return await request({
    method: "POST",
    url: `evaluation/audio/reload`,
    data,
  });
};

export const reloadTextEmotion = async (data: any ) => {
  return await request({
    method: "POST",
    url: `evaluation/text/reload`,
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



export const getSubQues = async ({id}:{id: string}) => {
  // console.log("id",id)
  return await request({
    method: "GET",
    url: `subquestion/user/${id}`,
  });
};


export const getAudio = async (data: any ) => {
  return await request({
    method: "POST",
    url: `user/getaudiofile`,
    data,
  });
};