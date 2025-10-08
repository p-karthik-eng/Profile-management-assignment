import { loadFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import { loginUser } from "../utils/api";
import type { Dispatch } from "redux";

export interface Profile {
  id?: string;
  name: string;
  email: string;
  age?: number;
}

interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: loadFromLocalStorage(),
  loading: false,
  error: null,
};

// Action Types
export const SET_PROFILE = "profile/setProfile";
export const CLEAR_PROFILE = "profile/clearProfile";
export const SET_LOADING = "profile/setLoading";
export const SET_ERROR = "profile/setError";

// Action Creators
export const setProfile = (profile: Profile) => ({
  type: SET_PROFILE,
  payload: profile,
});

export const clearProfile = () => ({
  type: CLEAR_PROFILE,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error: string | null) => ({
  type: SET_ERROR,
  payload: error,
});

// Thunk Action for saving profile
export const saveProfileAsync = (name: string, profileData: Profile) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      const user = await loginUser(name, profileData);
      dispatch(setProfile(user));
      saveToLocalStorage(user);
      dispatch(setLoading(false));
      return { success: true, user };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to save profile";
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
      return { success: false, error: errorMessage };
    }
  };
};

// Thunk Action for deleting profile
export const deleteProfileAsync = (userId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      const { deleteUser } = await import("../utils/api");
      await deleteUser(userId);
      
      dispatch(clearProfile());
      const { clearLocalStorage } = await import("../utils/localStorage");
      clearLocalStorage();
      
      dispatch(setLoading(false));
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to delete profile";
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
      return { success: false, error: errorMessage };
    }
  };
};

// Reducer
const profileReducer = (state = initialState, action: any): ProfileState => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        data: null,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;