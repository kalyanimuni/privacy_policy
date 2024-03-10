import React, { useState } from "react";
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, useTheme } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Context/Firebase";
import { tokens } from "../../theme";


const AddUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    date: '',
    department: '',
    status: '',
    phone_no: '',
    role: ''
  });

  const handleCreateUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addUserToFirestore(user.uid);

      console.log("User created:", user);
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  const addUserToFirestore = async (userId) => {
    try {
      await db.collection("customUser").doc(userId).set({
        email: email,
      });
      console.log("User data added to Firestore successfully");
    } catch (error) {
      console.error("Error adding user data to Firestore:", error);
    }
  };

  return (
    <form onSubmit={handleCreateUser} autoComplete="off">
      <Box
        display="grid"
        gridTemplateColumns='repeat(2, 1fr)'
        gridTemplateRows="repeat(5, 1fr)"
        justifyContent="center"
        alignItems="center"
        gap="20px"
        m={2}
        mb='110px'
      >
        <Box
          gridArea="1 / 1 / 2 / 2"
        >
          <InputLabel>Name</InputLabel>
          <TextField
            // label="Name"
            variant="outlined"
            value={formData.name}
            fullWidth
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </Box>
        <Box
          gridArea="1 / 2 / 2 / 3"
        >
          <InputLabel>Role</InputLabel>
          <Select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
            fullWidth
          >
            <MenuItem value={10}>Agent</MenuItem>
            <MenuItem value={20}>Admin</MenuItem>
            <MenuItem value={30}>Super Admin</MenuItem>
          </Select>
        </Box>
        <Box
          gridArea="2 / 1 / 3 / 3"
        >
          <InputLabel>Email Address</InputLabel>
          <TextField
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            autoComplete="off"
            fullWidth
            required

          />
        </Box>
        <Box
          gridArea="3 / 1 / 4 / 3"
        >
          <InputLabel>Password</InputLabel>
          <TextField
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            autoComplete="off"
            fullWidth
            required

          />
        </Box>
        <Box
          gridArea="4 / 1 / 5 / 2"
        >
          <InputLabel>Department</InputLabel>
          <Select
            value={formData.department}
            label="Department"
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            fullWidth
          >
            <MenuItem value={10}>Water</MenuItem>
            <MenuItem value={20}>ELectricity</MenuItem>
            <MenuItem value={30}>Clean City</MenuItem>
          </Select>
        </Box>
        <Box
          gridArea="4 / 2 / 5 / 3"
        >
          <InputLabel>Phone No.</InputLabel>
          <TextField
            variant="outlined"
            value={formData.phone_no}
            type="number"
            fullWidth
            onChange={(e) => setFormData({ ...formData, phone_no: e.target.value })}
          />
        </Box>
        <Box
          gridArea="5 / 1 / 6 / 3"
          display="flex"
          justifyContent="center"
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.secondary[200],
              fontWeight: "700",
              fontSize: "20px",
              color: colors.primary[500],
              paddingy: '10px',
              paddingX: "30px"
            }}
            type="submit"
          >
            Create User
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default AddUser;
