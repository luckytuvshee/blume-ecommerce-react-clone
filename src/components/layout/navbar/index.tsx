import { useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useWindow } from "../../../hooks";
import { logout } from "../../../actions/auth";
import { useHistory } from "react-router-dom";
import MobileNav from "./MobileNav";
import Basket from "./Basket";
import BasketIcon from "./BasketIcon";
import "./style.scss";

interface Props {
  auth: any;
  baskets: any;
  logout: () => void;
}

const NavBar: React.FC<Props> = ({ auth, baskets, logout }) => {
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);
  const [basketOpen, setBasketOpen] = useState<boolean>(false);
  const menuRef = useRef<any>(null);
  const [width] = useWindow();
  const mobile = width < 992;

  const toggleBasket = () => {
    const basket = document.querySelector(".basket") as HTMLElement;
    basket.classList.toggle("basket-open");

    if (basketOpen) {
      enableScroll();
    } else {
      disableScroll();
    }
    setBasketOpen(!basketOpen);
  };

  const enableScroll = () => {
    document.body.style.position = "relative";
    document.body.style.overflow = "auto";
  };

  const disableScroll = () => {
    document.body.style.position = "fixed";
    document.body.style.overflow = "scroll";
  };

  const toggleMenu = () => {
    if (!menuRef.current) return;

    menuRef.current.classList.toggle("open");

    if (menuRef.current.classList.contains("open")) {
      disableScroll();
    } else {
      enableScroll();
    }
    setOpen(!open);
  };

  return (
    <>
      <div className="navbar">
        {/* nav-left */}
        {mobile ? (
          <div className="nav nav-left">
            <div
              ref={menuRef}
              onClick={() => toggleMenu()}
              className="menu-btn"
            >
              <div className="menu-btn__burger"></div>
            </div>
          </div>
        ) : (
          <div className="nav nav-left">
            <div className="nav-item">
              <Link to="/">shop products</Link>
            </div>
          </div>
        )}

        {/* nav-brand */}
        <div className="nav nav-center">
          <div className="nav-brand">
            <Link to="/">self Care</Link>
          </div>
        </div>

        {/* nav-right */}
        <div className="nav nav-right">
          {!mobile ? (
            auth.isAuthenticated ? (
              <div
                onClick={() => {
                  logout();
                  history.push("/");
                }}
                className="nav-item"
              >
                logout
              </div>
            ) : (
              <div className="nav-item">
                <Link to="/account">account</Link>
              </div>
            )
          ) : (
            <></>
          )}
          <div onClick={() => toggleBasket()} className="nav-icon">
            <BasketIcon />
            <span className="basket-count">{baskets.length}</span>
          </div>
        </div>
        <Basket basketOpen={basketOpen} closeBasket={toggleBasket} />
        {mobile && (
          <MobileNav
            open={open}
            isAuthenticated={auth.isAuthenticated}
            logout={logout}
            history={history}
            toggleMenu={toggleMenu}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
