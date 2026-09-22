import { axiosInstance } from "../../utils/axios.js";
import { setBookingDetails, setBookingRequest, setBookings } from "./booking-slice.js";

export const fetchBookingDetails = (bookingId) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/v1/rent/booking/${bookingId}`);
        dispatch(setBookingDetails(response.data.data));
    } catch (error) {
        console.error("Error fetching booking details:", error);
    }
}

export const fetchUserBookings = ()=> async (dispatch) => {
    try {
        dispatch(setBookingRequest());
        const response = await axiosInstance.get("/v1/rent/booking");
        dispatch(setBookings(response.data.data.bookings));
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        dispatch(setBookings([]));
    }
}