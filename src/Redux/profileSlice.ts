// src/redux/profileSlice.ts (updated to fix type mismatch in loadProfileAsync)
import { loadFromLocalStorage, saveToLocalStorage, clearLocalStorage } from "../utils/localStorage";
import { loginUser, deleteUser, getProfile } from "../utils/api";
import type { ThunkAction } from "redux-thunk";
import type { RootState } from "./store";

export interface Profile {
  id?: string;
  name: string;
  email: string;
  age?: number;
}

export interface ProfileState {
  data: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: loadFromLocalStorage(),
  loading: false,
  error: null,
};

export const SET_PROFILE = "profile/setProfile";
export const CLEAR_PROFILE = "profile/clearProfile";
export const SET_LOADING = "profile/setLoading";
export const SET_ERROR = "profile/setError";

interface SetProfileAction { type: typeof SET_PROFILE; payload: Profile }
interface ClearProfileAction { type: typeof CLEAR_PROFILE }
interface SetLoadingAction { type: typeof SET_LOADING; payload: boolean }
interface SetErrorAction { type: typeof SET_ERROR; payload: string | null }

export type ProfileAction =
  | SetProfileAction
  | ClearProfileAction
  | SetLoadingAction
  | SetErrorAction;

const profileReducer = (state = initialState, action: ProfileAction): ProfileState => {
  switch (action.type) {
    case SET_PROFILE:
      return { ...state, data: action.payload, error: null };
    case CLEAR_PROFILE:
      return { ...state, data: null, error: null };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default profileReducer;

export const setProfile = (profile: Profile): SetProfileAction => ({ type: SET_PROFILE, payload: profile });
export const clearProfile = (): ClearProfileAction => ({ type: CLEAR_PROFILE });
export const setLoading = (loading: boolean): SetLoadingAction => ({ type: SET_LOADING, payload: loading });
export const setError = (error: string | null): SetErrorAction => ({ type: SET_ERROR, payload: error });

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ProfileAction>;

export const saveProfileAsync = (name: string, profileData: Profile): AppThunk<
  Promise<{ success: boolean; user?: Profile; error?: string }>
> => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const user = await loginUser(name, profileData);
    dispatch(setProfile(user));
    saveToLocalStorage(user);
    dispatch(setLoading(false));
    return { success: true, user };
  } catch (err: any) {
    const errorMessage = err.message || "Failed to save profile";
    dispatch(setError(errorMessage));
    dispatch(setLoading(false));
    return { success: false, error: errorMessage };
  }
};

export const loadProfileAsync = (): AppThunk<
  Promise<{ success: boolean; user?: Profile; error?: string }>
> => async (dispatch, getState) => {
  const { profile } = getState();
  // If local storage already has data, no need to fetch
  if (profile.data) {
    return { success: true, user: profile.data };
  }

  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const user = await getProfile();
    if (user) {
      dispatch(setProfile(user));
      saveToLocalStorage(user);
      dispatch(setLoading(false));
      return { success: true, user };
    } else {
      dispatch(setLoading(false));
      return { success: false, user: undefined, error: "No profile found" };
    }
  } catch (err: any) {
    const errorMessage = err.message || "Failed to load profile";
    dispatch(setError(errorMessage));
    dispatch(setLoading(false));
    return { success: false, user: undefined, error: errorMessage };
  }
};

export const deleteProfileAsync = (userId: string): AppThunk<
  Promise<{ success: boolean; error?: string }>
> => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    await deleteUser(userId);
    dispatch(clearProfile());
    clearLocalStorage();
    dispatch(setLoading(false));
    return { success: true };
  } catch (err: any) {
    const errorMessage = err.message || "Failed to delete profile";
    dispatch(setError(errorMessage));
    dispatch(setLoading(false));
    return { success: false, error: errorMessage };
  }
};