import Navbar from "../Navbar/Navbar";
import SlideChange from "../SlideChange/SlideChange";
import Invite from "../Invite/Invite";
import User from "../Users/User";
import Login from "../Login/Login";

const Index = () => {
  return (
    <div>
      <div className="mt-3">
        <Navbar />
      </div>
      <div className="flex justify-between ml-8 mr-8 mt-11 mb-2">
        <div>
          <SlideChange />
        </div>
        <div>
          <User />
        </div>
        <div>
          <Invite />
        </div>
      </div>
      <div>
        <Login />
      </div>
    </div>
  );
};

export default Index;
