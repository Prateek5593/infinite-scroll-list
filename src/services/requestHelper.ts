import axios from "axios";

const HEADERS = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "app-id": process.env.REACT_APP_API_KEY,
  },
};

const fetchData = async <T>(url: string): Promise<T> => {
  const sendDate = new Date().getTime();

  return new Promise(async (resolve) => {
    let result = await axios(url, HEADERS).then((result) => {
      return result.data;
    });
    const receivedDate = new Date().getTime();
    const time = Math.max((receivedDate - sendDate), 0)
    setTimeout(() => {
        resolve(result)
    }, time);
  });
};

export default fetchData;
