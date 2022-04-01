import axios from "axios";
import config from "../config/config";

const list = async () => {
    try {
        const result = await axios.get(`${config.localDomain}propinsi/`);
        return result.data;
    } catch (error) {
        return await error.message;
    }
};

const addPropinsi = async (payload) => {
    try {
        const result = await axios.post(
            `${config.localDomain}propinsi/`,
            payload
        );
        return result;
    } catch (error) {
        return error;
    }
};

const deleteRow = async (id) => {
    try {
        const result = await axios.delete(`${config.localDomain}propinsi/${id}`);
        return result;
    } catch (error) {
        return error;
    }
};

export default {
    list,
    addPropinsi,
    deleteRow
};
