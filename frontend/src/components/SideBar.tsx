// src/components/Sidebar.tsx
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const Sidebar: React.FC = () => {
  const { user } = useAuth()

  return (
    <Nav className="flex-column bg-dark-subtle" style={{ width: "300px", height: "calc(100vh - 56px)", padding: "1rem" }}>
      {
        user?.role !== 'admin' ? (
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
          </Nav.Item>
        ) : (
          <Nav.Item>
            <Nav.Link as={Link} to="/admin">
              Dashboard Admin
            </Nav.Link>
          </Nav.Item>
        )
      }
    </Nav>
  );
};

export default Sidebar;