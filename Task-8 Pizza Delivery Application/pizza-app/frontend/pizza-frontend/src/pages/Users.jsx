import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>👥 Registered Users</h1>

      <div style={styles.grid}>

        {users.map((user) => (

          <div key={user._id} style={styles.card}>

            <div style={styles.avatar}>
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            <h3 style={styles.name}>{user.name}</h3>

            <p style={styles.email}>{user.email}</p>

            <span style={{
              ...styles.role,
              background: user.role === "admin" ? "#ff4d4f" : "#52c41a"
            }}>
              {user.role}
            </span>

          </div>

        ))}

      </div>

    </div>

  );
}

const styles = {

  container:{
    minHeight:"100vh",
    padding:"40px",
    background:"linear-gradient(135deg,#667eea,#764ba2)"
  },

  title:{
    textAlign:"center",
    color:"#fff",
    marginBottom:"40px",
    fontSize:"32px"
  },

  grid:{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
    gap:"25px"
  },

  card:{
    background:"#fff",
    padding:"25px",
    borderRadius:"15px",
    textAlign:"center",
    boxShadow:"0 10px 25px rgba(0,0,0,0.2)",
    transition:"0.3s"
  },

  avatar:{
    width:"70px",
    height:"70px",
    borderRadius:"50%",
    background:"#1890ff",
    color:"#fff",
    fontSize:"28px",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    margin:"auto",
    marginBottom:"10px"
  },

  name:{
    margin:"10px 0",
    color:"#333"
  },

  email:{
    fontSize:"14px",
    color:"#777"
  },

  role:{
    display:"inline-block",
    marginTop:"10px",
    padding:"5px 12px",
    borderRadius:"20px",
    color:"#fff",
    fontSize:"12px"
  }

};

export default Users;