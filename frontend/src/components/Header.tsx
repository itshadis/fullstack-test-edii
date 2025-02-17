import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className="text-end w-100">Selamat Datang, {user?.nama}</Navbar.Brand>
      <Button size="sm" onClick={() => logout()}>Logout</Button>
      </Container>
    </Navbar>
  );
};

export default Header;