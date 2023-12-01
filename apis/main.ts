// eslint-disable-next-line import/prefer-default-export
export const getmainData = async () => {
  const res = await fetch('https://dummyjson.com/todos/1', {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
};
