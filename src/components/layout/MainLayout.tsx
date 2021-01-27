import NavBar from "./navbar";
import "./style.scss";

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className="layout">
      <NavBar />
      <div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
