import { useRef, useState } from "react";
import { connect } from "react-redux";
import { useWindow } from "../../../../hooks";
import { logout } from "../../../../actions/auth";
import { useHistory } from "react-router-dom";
import MobileNav from "./MobileNav";
import "./style.scss";

interface Props {
  auth: any;
  logout: () => void;
}

const NavBar: React.FC<Props> = ({ auth, logout }) => {
  const history = useHistory();
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<any>(null);
  const [width] = useWindow();
  const mobile = width < 992;

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
          <div
            style={{ justifyContent: "flex-start" }}
            className="nav nav-left"
          >
            <div
              ref={menuRef}
              onClick={() => toggleMenu()}
              className="menu-btn"
            >
              <div className="menu-btn__burger"></div>
            </div>
          </div>
        ) : (
          <div
            style={{ justifyContent: "flex-start" }}
            className="nav nav-left"
          >
            <div onClick={() => history.push("/")} className="nav-item">
              shop products
            </div>
            <div
              style={{
                display:
                  auth &&
                  auth.user &&
                  auth.isAuthenticated &&
                  auth.user.is_admin
                    ? "flex"
                    : "none",
              }}
              onClick={() => history.push("/admin")}
              className="nav-item"
            >
              admin
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
        <div style={{ justifyContent: "flex-end" }} className="nav nav-right">
          {!mobile ? (
            auth.isAuthenticated ? (
              <>
                <div style={{ color: "#001e42" }}>
                  {auth.user && auth.user.email}
                </div>
                <div
                  onClick={() => {
                    logout();
                    history.push("/");
                  }}
                  className="nav-item"
                >
                  logout
                </div>
              </>
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
        </div>
        {mobile && (
          <MobileNav
            open={open}
            isAuthenticated={auth.isAuthenticated}
            user={auth.user}
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
