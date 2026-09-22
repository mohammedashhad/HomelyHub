import {createSlice} from "@reduxjs/toolkit";

const propertySlice = createSlice({
    name:"property",
    initialState:{
        properties:[],
        totalProperties: 0,
        searchParams:{},
        error:null,
        loding:false
    },
    reducers:{
        getRequest(state){
            state.loding=true;
        },
        getProperties(state,action){
            state.properties=action.payload.properties || action.payload.data || [];
            state.totalProperties=action.payload.totalProperties || action.payload.all_properties || 0;
            state.loding=false
        },
        updateSearchParams:(state,action)=>{
            state.searchParams=Object.keys(action.payload || {}).length === 0 ? {} :{
                ...state.searchParams,
                ...action.payload
            }
        },
        getErrors(state,action){
            state.error=action.payload
            state.loding=false
        }
    }
})

export const propertyAction=propertySlice.actions

export default propertySlice