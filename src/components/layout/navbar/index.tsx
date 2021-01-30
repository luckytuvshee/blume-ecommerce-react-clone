import { useRef, useState } from "react";
import { connect } from "react-redux";
import { useWindow } from "../../../hooks";
import { logout } from "../../../actions/auth";
import { useHistory } from "react-router-dom";
import MobileNav from "./MobileNav";
import Basket from "./Basket";
import BasketIcon from "./BasketIcon";
import { toggleBasket } from "../../../actions/baskets";
import "./style.scss";

interface Props {
  auth: any;
  basket: any;
  baskets: any;
  logout: () => void;
  toggleBasket: () => void;
}

const NavBar: React.FC<Props> = ({
  auth,
  basket: { basketOpen },
  baskets,
  logout,
  toggleBasket,
}) => {
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<any>(null);
  const [width] = useWindow();
  const mobile = width < 992;

  const basketToggleHandler = () => {
    const basket = document.querySelector(".basket") as HTMLElement;
    basket.classList.toggle("basket-open");

    if (basketOpen) {
      enableScroll();
    } else {
      disableScroll();
    }
    toggleBasket();
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
            <div onClick={() => history.push("/")} className="nav-item">
              shop products
            </div>
          </div>
        )}

        {/* nav-brand */}
        <div className="nav nav-center">
          <div onClick={() => history.push("/")} className="nav-brand">
            self Care
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
              <div
                onClick={() => history.push("/account")}
                className="nav-item"
              >
                account
              </div>
            )
          ) : (
            <></>
          )}
          <div onClick={() => basketToggleHandler()} className="nav-icon">
            <BasketIcon />
            <span className="basket-count">
              {baskets.reduce((acc: any, item: any) => {
                return acc + item.quantity;
              }, 0)}
            </span>
          </div>
        </div>
        <Basket basketOpen={basketOpen} closeBasket={basketToggleHandler} />
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
  basket: state.basket,
});

export default connect(mapStateToProps, { logout, toggleBasket })(NavBar);
