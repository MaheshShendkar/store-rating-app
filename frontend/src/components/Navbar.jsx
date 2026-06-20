import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function AppNavbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      className="custom-navbar"
      variant="dark"
    >
      <Container fluid>

        <Navbar.Brand className="brand-logo">
          ⭐ Store Rating App
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">

          <Nav className="me-auto">

            {role === "ADMIN" && (
              <>
                <NavLink
                  to="/admin/dashboard"
                  className="nav-link"
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/admin/users"
                  className="nav-link"
                >
                  Users
                </NavLink>

                <NavLink
                  to="/admin/stores"
                  className="nav-link"
                >
                  Stores
                </NavLink>

                <NavLink
                  to="/admin/add-user"
                  className="nav-link"
                >
                  Add User
                </NavLink>

                <NavLink
                  to="/admin/add-store"
                  className="nav-link"
                >
                  Add Store
                </NavLink>
              </>
            )}

            {role === "USER" && (
              <>
                <NavLink
                  to="/stores"
                  className="nav-link"
                >
                  Stores
                </NavLink>

                <NavLink
                  to="/change-password"
                  className="nav-link"
                >
                  Change Password
                </NavLink>
              </>
            )}

            {role === "STORE_OWNER" && (
              <>
                <NavLink
                  to="/owner/dashboard"
                  className="nav-link"
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/change-password"
                  className="nav-link"
                >
                  Change Password
                </NavLink>
              </>
            )}

          </Nav>

          <div className="d-flex align-items-center gap-3">

            <span className="welcome-text">
              Welcome, {name}
            </span>

            <Badge bg="info" className="role-badge">
              {role}
            </Badge>

            <Button
              variant="danger"
              onClick={handleLogout}
            >
              Logout
            </Button>

          </div>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default AppNavbar;