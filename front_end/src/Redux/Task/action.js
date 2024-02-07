import axios from "axios";
import { ADD_ERROR, ADD_REQUEST, ADD_SUCCESS, DELETE_ERROR, DELETE_REQUEST, DELETE_SUCCESS, GET_ERROR, GET_REQUEST, GET_SUCCESS, UPDATE_ERROR, UPDATE_REQUEST, UPDATE_SUCCESS } from "./actionType";


export const getTaskdata=()=>async(dispatch)=>{
    
    dispatch({type:GET_REQUEST})
    try {
      const response = await axios.get("https://spontom-server.onrender.com/patient/get", {
        headers: { "Authorization": ` ${localStorage.getItem("token")}` }
    });
        dispatch({type:GET_SUCCESS,payload:response})
        
         console.log(response);
       
      } catch (error) {
        dispatch({type:GET_ERROR})
        console.error(error);
      }

}

export const createTask = (newTaskData) => async (dispatch) => {
  dispatch({ type: ADD_REQUEST });
  try {
      const response = await axios.post("https://spontom-server.onrender.com/patient/create", newTaskData, {
          headers: { "Authorization": ` ${localStorage.getItem("token")}` }
      });
      dispatch({ type: ADD_SUCCESS, payload: response.data });

      // After creating a new task, you might want to fetch the updated list of tasks
      dispatch(getTaskdata());

      console.log(response.data);
  } catch (error) {
      dispatch({ type: ADD_ERROR });
      console.error(error);
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch({ type: DELETE_REQUEST });
  try {
      await axios.delete(`https://spontom-server.onrender.com/patient/delete/${taskId}`, {
          headers: { "Authorization": ` ${localStorage.getItem("token")}` }
      });

    
      dispatch({ type: DELETE_SUCCESS, payload: taskId });
  } catch (error) {
      dispatch({ type: DELETE_ERROR });
      console.error(error);
  }
};

export const updateTask = (taskId, updatedTaskData) => async (dispatch) => {
  dispatch({ type: UPDATE_REQUEST });
  try {
    const response = await axios.patch(
      `https://spontom-server.onrender.com/patient/update/${taskId}`,
      updatedTaskData,
      {
        headers: { "Authorization": ` ${localStorage.getItem("token")}` }
      }
    );
    console.log("Updating Task. Task ID:", taskId, "Updated Data:", updatedTaskData);
    dispatch({ type: UPDATE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_ERROR, payload: error.message || "Update failed" });
    console.error(error);
  }
};
