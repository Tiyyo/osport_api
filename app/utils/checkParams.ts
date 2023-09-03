// utiiity function to check if the params are valid and return a number

function checkParams(params: any) {
  const parsedParams = parseInt(params, 10);

  if (Number.isNaN(parsedParams)) {
    throw new Error('Invalid params : params must be a number');
  }
  return parsedParams;
}

export default checkParams;
