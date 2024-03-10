import { useState, useEffect, useContext } from 'react';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Topbar from './global/Topbar';
import Sidebar from './global/Sidebar';
import Login from './Pages/Login';
import Sidebar2 from './global/Sidebar2';
import CreateGrievance from './Pages/Agent/CreateGrievance';
import SearchGrievance from './Pages/Agent/SearchGrievance';
import SuperAdminDashboard from './Pages/SuperAdmin/Dashboard';
import AdminDashboard from './Pages/Admin/Dashboard';
import SuperAdminGrievance from './Pages/SuperAdmin/Grievances';
import Grievance from './Pages/Admin/Grievances';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Context/Firebase";
import { CustomUserContext } from './Context/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import ForgetPassword from './Pages/ForgetPassword';
import Footer from './global/Footer';
import AddUser from './Pages/SuperAdmin/AddUser';
import ManageUser from './Pages/SuperAdmin/ManageUser';
import Reports from './Pages/SuperAdmin/Reports';
import Email from './Pages/SuperAdmin/Email';
import Profile from './Pages/SuperAdmin/Profile';
import OpenedGrievances from './Pages/SuperAdmin/OpenedGrievances';
import CompletedGrievances from './Pages/SuperAdmin/CompletedGrivences';
import EditPage from './Pages/SuperAdmin/EditPage';
import AdminOpenedGrievances from './Pages/Admin/OpenedGrievances';
import AdminCompletedGrievances from './Pages/Admin/CompletedGrivences';
import AdminGrievances from './Pages/Admin/Grievances';
import EditPage2 from './Pages/Admin/EditPage';


function App() {
  let navigate = useNavigate();
  const [theme, colorMode] = useMode();
  const [token, setToken] = useState(false);
  const [role, setRole] = useState('');
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
    email: '', password: ''
  })
  const { customUserData, loading, error } = useContext(CustomUserContext);
  function getRoleByEmail(email) {
    const user = customUserData.find(item => item.email === email);
    if (user) {
      return user.role;
    } else {
      return null;
    }
  }


  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setToken(foundUser);
    }
  }, []);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  useEffect(() => {
    const User = sessionStorage.getItem("role");
    if (User) {
      const UserRole = JSON.parse(User);
      setRole(UserRole);
    }
  }, []);

  if (role) {
    sessionStorage.setItem("role", JSON.stringify(role));
  }

  useEffect(() => {
    if (sessionStorage.getItem("role")) {
      let data = JSON.parse(sessionStorage.getItem("role"));
      setRole(data);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      setToken(auth.currentUser);
      const user = userCredential.user;
      const role = getRoleByEmail(user.email);
      if (role === 'superadmin') {
        navigate('/superadmin/dashboard');
        setRole('superadmin');
      } else if (role === 'admin') {
        navigate('/admin/dashboard');
        setRole('admin');
      } else if (role === 'agent') {
        navigate('/create_grievance');
        setRole('agent');
      } else {
        toast.error("Please use a valid Email and Password Combination");
      }
      localStorage.setItem("user", JSON.stringify(auth.currentUser));


    } catch (error) {
      toast.error("Please use a valid Email and Password Combination")
      // alert(error)
    }
  }

  // useEffect(() => {
  //   if (user) {
  //     setToken(user);
  //     if (role) {
  //       if (role === 'superadmin') {
  //         navigate('/superadmin/dashboard')
  //       }
  //       else if (role === 'admin') {
  //         navigate('admin/dashboard')
  //       }
  //       else if (role === 'agent') {
  //         navigate('/home')
  //       }
  //       else {
  //         navigate('/')
  //       }
  //     }
  //   }
  // }, [user, setToken, navigate]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/forget_password' element={<ForgetPassword />} />
            <Route path={"/"} element={<Login setUser={setUser} role={role} setToken={setToken} handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />} />
          </Routes>

          {token ? ((role == 'superadmin') ? (
            <Box display="flex" width="100%">
              <Sidebar />
              <Box width="100%">
                <Topbar role={role} token={token} setRole={setRole} setToken={setToken} />
                <Routes>
                  <Route path='/superadmin/dashboard' element={<SuperAdminDashboard />} />
                  <Route exact path='/superadmin/all-grievance' element={<SuperAdminGrievance />} />
                  <Route path="/superadmin/edit/:id" element={<EditPage />} />
                  <Route path='/superadmin/add_user' element={<AddUser />} />
                  <Route path='/superadmin/manage_user' element={<ManageUser />} />
                  <Route path='/superadmin/reports' element={<Reports />} />
                  <Route path='/superadmin/email' element={<Email />} />
                  <Route path='/superadmin/profile' element={<Profile />} />
                  <Route path='/superadmin/opened' element={<OpenedGrievances />} />
                  <Route path='/superadmin/completed' element={<CompletedGrievances />} />

                </Routes>
                <Footer />
              </Box>
            </Box>) : ((role == 'admin') ? (
              <Box display="flex" position="relative" width="100%">
                <Sidebar2 />
                <Box width="100%">
                  <Topbar role={role} token={token} setRole={setRole} setToken={setToken} />

                  <Routes>
                    <Route path='/admin/dashboard' element={<AdminDashboard />} />
                    <Route exact path='/admin/all-grievance' element={<AdminGrievances />} />
                    <Route path="/admin/edit/:id" element={<EditPage2 />} />
                    <Route path='/admin/opened' element={<AdminOpenedGrievances />} />
                    <Route path='/admin/completed' element={<AdminCompletedGrievances />} />
                  </Routes>
                  <Footer />
                </Box>
              </Box>
            ) : ((role == 'agent') ? (
              <Box display="flex" position="relative" width="100%">
                <Box width="100%">
                  <Topbar role={role} token={token} setRole={setRole} setToken={setToken} />
                  <Routes>
                    <Route path='/create_grievance' element={<CreateGrievance />} />
                    <Route path='/search' element={<SearchGrievance />} />
                  </Routes>
                  <Footer />
                </Box>
              </Box>
            ) : '')))
            : ""}
        </ThemeProvider>
        <ToastContainer />
      </ColorModeContext.Provider>
    </>
  )
}

export default App;
