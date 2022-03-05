import axios from "axios";
import { importManager } from "less";
import {
  CREATE_USER_FAILED,
  CREATE_USER_PENDING,
  CREATE_USER_SUCCESS,
} from "./CreateUserActionType";
import URLst from "../../public/constants";

import { errorMessage, authErrorHandler,alluserSuccess } from "../index";

export const createUser = (userData) => {

  return (dispatch, getState) => {
    dispatch({ type: CREATE_USER_PENDING });
    const { token } = getState().auth;
    const { allusers,count } = getState().allusers;

    
    axios
      .post(
        URLst + `api/v1/users`,
        {
          name: userData.firstName + " " + userData.lastName,
          role: userData.role.value,
          url: userData.url,
          phoneNumber: userData.phoneNo,
          email: userData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data.user)
        var newData=[response.data.data.user,...allusers]
        dispatch(alluserSuccess({"rows":newData,"count":count+1}))
        dispatch({
          type: CREATE_USER_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        var errorData;

        if (error.response != null) {
          errorData = error.response.data.message;
        console.log(errorData)

          dispatch(authErrorHandler(errorData, error.response.status));
        } else {
          errorData = error.message;
        console.log(errorData)

          dispatch(errorMessage(errorData));
        }
        dispatch({ type: CREATE_USER_FAILED, payload: error.response });
        console.log(error.response);
      });
 
  };
};
