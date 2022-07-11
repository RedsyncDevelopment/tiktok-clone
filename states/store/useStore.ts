import create from "zustand";
import createAllUsersSlice, { UserSlice } from "./createAllUsersSlice";

export type MyState = UserSlice;

const useStore = create<MyState>((set, get) => ({
  ...createAllUsersSlice(set, get),
}));

export default useStore;
