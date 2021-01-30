import NavBar from "./navbar";
import "./style.scss";

interface Props {
  children: any;
}

const MainLayout: React.FC<Props> = ({ children }) => {
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
