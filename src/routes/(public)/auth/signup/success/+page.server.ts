export const load = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  // Get the value of a specific parameter
  const paramValue = searchParams.get('id');

  // Do something with the parameter value

  return {
    id: paramValue
  }
};
