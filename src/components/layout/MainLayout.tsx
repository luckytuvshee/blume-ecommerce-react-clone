import { connect } from "react-redux";
import NavBar from "./navbar";
import "./style.scss";

interface Props {
  children: any;
  basket: any;
}

const MainLayout: React.FC<Props> = ({ children, basket: { baskets } }) => {
  return (
    <div className="layout">
      <NavBar baskets={baskets} />
      <div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  basket: state.basket,
});

export default connect(mapStateToProps, {})(MainLayout);
