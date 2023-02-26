const createPOSTObject = async (url, formdata = null) => {
  const requestURL =
    'http://ec2-13-209-21-247.ap-northeast-2.compute.amazonaws.com:5000/' + url;
  const response = await fetch(requestURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formdata,
  });
  return response;
};

const createImagePOSTObject = async (url, formdata = null) => {
  const requestURL =
    'http://ec2-13-209-21-247.ap-northeast-2.compute.amazonaws.com:5000/' + url;
  const response = await fetch(requestURL, {
    method: 'POST',
    headers: {
      Accept: 'multipart/form-data',
    },
    body: formdata,
  });
  return response;
};

export {createPOSTObject, createImagePOSTObject};
