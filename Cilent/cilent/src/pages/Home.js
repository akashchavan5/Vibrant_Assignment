import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      Navigate.push("/login");
    } else {
      setUser(user);
    }
  }, [Navigate]);

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user?.name}</td>
            <td>{new Date(user?.dateOfBirth).toLocaleDateString()}</td>
            <td>{user?.email}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
