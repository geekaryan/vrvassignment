import Navbar from "../Navbar/Navbar";
import SlideChange from "../SlideChange/SlideChange";
import Invite from "../Invite/Invite";

const Index = () => {
  return (
    <div>
      <div className="mt-3">
        <Navbar />
      </div>
      <div className="flex justify-between ml-8 mr-8 mt-11">
        <div>
          <SlideChange />
        </div>
        <div>middle</div>
        <div>
          <Invite />
        </div>
      </div>
    </div>
  );
};

export default Index;
