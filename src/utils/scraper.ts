import axios from "axios";
import { yahoo } from "./consts.js";

export const getData = async (): Promise<string> => {
  const { data } = await axios.get(`${yahoo}/nfl/teams/`);
  return data;
};
