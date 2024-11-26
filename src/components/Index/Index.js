import { useSelector } from "react-redux";
import { useRef } from "react";
import Navbar from "../Navbar/Navbar";
import SlideChange from "../SlideChange/SlideChange";
import Invite from "../Invite/Invite";
import User from "../Users/User";
import Login from "../Login/Login";

const Index = () => {
  const auth = useSelector((state) => state.auth.logged);
  const bottomRef = useRef(null);
  return (
    <div>
      <div className="mt-3">
        <Navbar bottomRef={bottomRef} />
      </div>
      <div className="flex justify-between ml-8 mr-8 mt-11 mb-2">
        <div>
          <SlideChange />
        </div>
        {auth ? (
          <div>
            <User />
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen text-4xl font-bold text-gray-700">
            Kindly login or signup
          </div>
        )}
        <div>
          <Invite />
        </div>
      </div>
      <div ref={bottomRef}>{auth ? "" : <Login />}</div>
    </div>
  );
};

export default Index;
