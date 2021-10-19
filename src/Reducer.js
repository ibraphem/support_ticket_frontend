import Cookie from "universal-cookie";

  const cookie = new Cookie();
  const access_token = cookie.get("access_token");
  const name = cookie.get("name");
  const role = cookie.get("role");
  const user_id = cookie.get("user_id");

export const initialState = {
  token: access_token,
  user: name,
  role: role,
  user_id: user_id
};

const reducer = (state, action) => {
    switch(action.type) {
        case "SIGN_USER_OUT":
            return {
                ...state,
                token: null,
                user: null ,
                role: null,
                user_id: null
            }
         case "SIGN_USER_IN":
            return {
                ...state,
                token: action.item.access_token,
                user: action.item.name,
                role: action.item.role,
                user_id: action.item.user_id
            }
    default:
      return state;
    }
     
}

export default reducer;

