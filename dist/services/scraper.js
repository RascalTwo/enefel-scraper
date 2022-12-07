import axios from "axios";
export const getData = async () => {
    const { data } = await axios.get("https://sports.yahoo.com/nfl/teams/");
    return data;
};
