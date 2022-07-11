import axios from "axios";
import { GetState, SetState } from "zustand";
import { BASE_URL } from "../../utils";
import { MyState } from "./useStore";

export interface UserSlice {
  allUsers: any;
  fetchAllUsers: () => void;
}

const createAllUsersSlice = (
  set: SetState<MyState>,
  get: GetState<MyState>
) => ({
  allUsers: [],
  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);
    set({ allUsers: response.data });
  },
});

export default createAllUsersSlice;
