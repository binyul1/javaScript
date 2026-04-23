import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/apiClient";
import type { IUserDetail } from "../../types/auth-type";

// async redux management

interface IPaginationProps{
    limit?: number,
    skip?: number,
}
//redux middleware
//thunk, saga
export const getAllUsers = createAsyncThunk("user",
    async(payload:IPaginationProps = {limit: 208, skip: 0}) => {
        const response = await axiosInstance.get('/users',{
            params: {
              limit: payload.limit,
              skip: payload.skip,
            }
    });
    console.log({response})
    return response as unknown as { users: Array<IUserDetail>, skip: number, limit: number };
}
)

const UserSlice = createSlice({
    name: "user",
    initialState:{
        allUsers: null,
    } as { allUsers: Array<IUserDetail> | null },
    reducers:{
            // hello(state, action){
            // //can never be async function
            // console.log(state, state.allUsers)
            // console.log(action)  //{type: "user/hello", payload: data}
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllUsers.fulfilled, (state,action)=>{
            state.allUsers = action.payload.users
        });
        builder.addCase(getAllUsers.rejected, (state)=>{
            state.allUsers = null
        });
    }
});

// export const {hello} = UserSlice.actions
export default UserSlice.reducer