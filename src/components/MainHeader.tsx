import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const MainHeader = () => {
  const isLoggedIn = useSelector(
    (state: { auth: { isLoggedIn: boolean } }) => state.auth.isLoggedIn
  );
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <header className="list-books-title">
      <nav>
        <ul>
          <div className="main-header-left">
            {isLoggedIn && (
              <li>
                <Link to="/">MyReads</Link>
              </li>
            )}
          </div>
          <div className="main-header-right">
            {!isLoggedIn && (
              <li>
                <Link to="/auth">Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to="/search">Search</Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <button onClick={logoutHandler} className="logout-tn">
                  Logout
                </button>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};
export default MainHeader;
