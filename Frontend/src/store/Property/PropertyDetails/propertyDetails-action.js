import { propertyDetailsAction } from "./propertyDetalis-slice";
import { axiosInstance } from "../../../utils/axios";

export const getPropertyDetails = (id) => async (dispatch) => {
    try {
        dispatch(propertyDetailsAction.getListRequest());

        const response = await axiosInstance.get(`/v1/rent/listing/${id}`);

        if (!response) {
            throw new Error("No response from server");
        }

        const payload =
            response.data?.data ||
            response.data?.property ||
            response.data ||
            {};

        dispatch(propertyDetailsAction.getPropertyDetails(payload));
    } catch (error) {
        dispatch(propertyDetailsAction.getErrors(error.response?.data?.error || error.message));
    }
};