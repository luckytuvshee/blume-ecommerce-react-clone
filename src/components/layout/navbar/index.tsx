import { useRef, useState } from "react";
import { useWindow } from "../../../hooks";
import MobileNav from "./MobileNav";
import Basket from "./Basket";
import BasketIcon from "./BasketIcon";
import "./style.scss";

const NavBar = () => {
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
      enableScroll();
    } else {
      disableScroll();
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
            <div className="nav-item">shop products</div>
          </div>
        )}

        {/* nav-brand */}
        <div className="nav nav-center">
          <div className="nav-brand">self Care</div>
        </div>

        {/* nav-right */}
        <div className="nav nav-right">
          {!mobile && <div className="nav-item">account</div>}
          <div onClick={() => toggleBasket()} className="nav-icon">
            <BasketIcon />
            <span className="basket-count">20</span>
          </div>
        </div>
        <Basket basketOpen={basketOpen} closeBasket={toggleBasket} />
        {mobile && <MobileNav open={open} />}
      </div>
    </>
  );
};

export default NavBar;
