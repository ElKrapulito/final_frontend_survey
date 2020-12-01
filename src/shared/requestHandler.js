import axios from "axios";
import { mainUrl } from "./urls";

export default () => {
  const request = async (method, action, data, id) => {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    };
    let url;
    let res;
    switch (method) {
      case "GET":
        url = `${mainUrl}/${action}`;
        res = await axios.get(url, { headers });
        break;
      case "EDIT":
        url = `${mainUrl}/${action}/${id}`;
        res = await axios.get(url, { headers });
        break;
      case "POST":
        url = `${mainUrl}/${action}`;
        res = await axios.post(url, data, { headers });
        break;
      case "PUT":
        url = `${mainUrl}/${action}/${id}`;
        res = await axios.put(url, data, { headers });
        break;
      case "DELETE":
        url = `${mainUrl}/${action}/${id}`;
        res = await axios.delete(url, { headers });
        break;
      case "FILE":
        url = `${mainUrl}/${action}/${id}`;
        res = await axios.post(url, data, { headers });
        break;
      default:
        break;
    }
    console.log(url);
    return res;
  };

  return request;
};
