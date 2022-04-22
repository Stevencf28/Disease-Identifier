import React, { useState, forwardRef } from 'react';
import { 
  BrowserRouter,
  Routes,
  Route } from 'react-router-dom'
import './App.css';
import Motivation from './components/Motivation';
import PatientList from './components/PatientList';
import MyActions from './components/MyActions';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Diagnosis from './components/Diagnosis'
import NursePatientActions from './components/NursePatientActions';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import Header from './components/extras/Header';
import Footer from './components/extras/Footer';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [sbSeverity, setSbSeverity] = useState('success');
  const [sbMsg, setSbMsg] = useState('');
  const [openSb, setOpenSb] = useState(false);
  const showSnackBar = (options) => {
    if (options) {
      setSbSeverity(options.severity);
      setSbMsg(options.message);
      setOpenSb(true);
    }
  }

  const handleSbClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSb(false);
  };

  return (
    <>
    <BrowserRouter>
      <Header/>
      <div>
        <Routes>
          <Route path="/" element={<Home showSnackBar={showSnackBar}/>} />
          <Route path="/register" element={<Registration />} />
          <Route path="/patientActions" element={<NursePatientActions showSnackBar={showSnackBar} />}></Route>
        </Routes>

        <Snackbar
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          open={openSb}
          onClose={handleSbClose}
          autoHideDuration={5000}                
        >
          <Alert severity={sbSeverity} onClose={handleSbClose}>{sbMsg}</Alert>
        </Snackbar>

      </div>
      <Footer/>
    </BrowserRouter>
    </>

  );
}

export default App;
