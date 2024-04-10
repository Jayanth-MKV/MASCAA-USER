import { request } from "@/hooks/network/network";
import { Test } from "@/types/types";

const BASE_URL="test";


export const getAllTests = async () => {
  const data =  await request({
    method: "GET",
    url: `${BASE_URL}/all`,
  });

const p = await data.map((test:{title:string,_id:string})=>{
  return {
    label:test?.title,
    value:test?._id.toString(),
  }
})

return p;
};



export const submitAudio = async (data: any ) => {
  console.log(data)
  const {formData,testId,index,id} = data;
  return await request({
    method: "POST",
    url: `user/submit/audio/${testId}/${index}/${id}`,
    formData,
  });
};

export const submitText = async (data: any ) => {
  console.log(data)
  return await request({
    method: "POST",
    url: `${BASE_URL}/updatetext`,
    data,
  });
};

export const Taketest = async (data: any ) => {
  console.log(data)
  return await request({
    method: "POST",
    url: `${BASE_URL}/taketest`,
    data,
  });
};


export const submitTest = async (data: any ) => {
  console.log(data)
  return await request({
    method: "POST",
    url: `${BASE_URL}/test/${data.id}`,
    data,
  });
};


export const getTestU = async (id:string) => {
  return await request({
    method: "GET",
    url: `${BASE_URL}/user/${id}`,
  });
};






// ------------------------------------------------


  export const getTests = async () => {
    return await request({
      method: "GET",
      url: `${BASE_URL}/instructor/mytests`,
    });
  };



  export const createTest = async (data: Test ) => {
    return await request({
      method: "POST",
      url: `${BASE_URL}/create`,
      data,
    });
  };

  
export const updateTest = async (data: any ) => {
  const d= await request({
    method: "PATCH",
    url: `${BASE_URL}/${data?.id}`,
    data,
  });
  return d;
};


export const getInviteLink = async (data:any) => {
  const d= await request({
    method: "GET",
    url: `${BASE_URL}/invitelink/${data?.id}`,
  });
  return d;
};

  export const getOngTests = async () => {
    return await request({
      method: "GET",
      url: `${BASE_URL}/instructor/mytests/ongoing`,
    });
  };

  export const getTest = async (id:string) => {
    return await request({
      method: "GET",
      url: `${BASE_URL}/instructor/${id}`,
    });
  };


  export const getQues = async (id:string) => {
    try{

      return await request({
        method: "GET",
        url: `/question/all/${id}`,
      });
    }
    catch(e){
      return [];
    }
  };

  export const generateQues = async (data: {testId:string} ) => {
    return await request({
      method: "POST",
      url: `question/fivequestions`,
      data,
    });
  };


  export const updateQues = async (data: any ) => {
    const d= await request({
      method: "PATCH",
      url: `question/${data?.id}`,
      data,
    });
    return d;
  };


  export const getSubQues = async (id:string) => {
    try{

      return await request({
        method: "GET",
        url: `/subquestion/instructor/${id}`,
      });
    }
    catch(e){
      return [];
    }
  };


  export const updateSubQues = async (data: any ) => {
    const d= await request({
      method: "PATCH",
      url: `subquestion/${data?.id}`,
      data,
    });
    return d;
  };