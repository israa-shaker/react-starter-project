const getTokenFromLocalStorage = localStorage.getItem("my-token");
const initialState = {
  token: getTokenFromLocalStorage,
  isLoggedIn: !!getTokenFromLocalStorage
};

const calculateRemainingTime = (expirationTime: string) => {
  const currentTime = new Date().getTime();
  const expireTime = new Date(expirationTime).getTime();
  const remaingTime = expireTime - currentTime;
  return remaingTime;
};
let logoutTimer: ReturnType<typeof setTimeout>;
const authReducer = (
  state = initialState,
  action: {
    type: string;
    tokenId: string;
    expire: string;
    setTimer: () => void;
  }
) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("my-token", action.tokenId);
      const expirationTime = new Date(
        new Date().getTime() + +action.expire * 1000
      );
      const remainigTime = calculateRemainingTime(expirationTime.toISOString());
      logoutTimer = setTimeout(() => {
        action.setTimer();
      }, remainigTime);
      return { token: action.tokenId, isLoggedIn: !!action.tokenId };
    case "LOGOUT":
      localStorage.removeItem("my-token");
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      return { token: "", isLoggedIn: false };
    default:
      return state;
  }
};
export default authReducer;
