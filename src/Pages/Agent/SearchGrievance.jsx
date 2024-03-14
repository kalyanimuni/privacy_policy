import React from "react";
import { useState } from "react";
import "./CreateGrievance.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Context/Firebase";
import { Modal, Button, useTheme, Box, Typography } from '@mui/material';
import { tokens } from "../../theme";

const getStatusWithDate = (status) => {
  let statusText = '';
  let statusDate = '';

  if (status.Completed) {
    statusText = "Completed";
    statusDate = status.Completed_date;
  } else if (status.In_Progress) {
    statusText = "In Progress";
    statusDate = status.In_Progress_date;
  } else if (status.Initiated) {
    statusText = "Initiated";
    statusDate = status.Initiated_date;
  } else if (status.Reject) {
    statusText = "Rejected";
    statusDate = status.Reject_date;
  }

  return <><b>Status:</b> {statusText}, <b>Date:</b> {statusDate}</>;
};

const SearchGrievance = () => {
  const [uid, setUid] = useState('');
  const [grievanceData, setGrievanceData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const grievanceQuery = query(collection(db, 'grievances'), where('complaintId', '==', uid));
    const querySnapshot = await getDocs(grievanceQuery);
    querySnapshot.forEach((doc) => {
      setGrievanceData(doc.data());
      setShowModal(true);
    });
  };


  return (
    <div className="main2" style={{ height: '86vh' }}>
      <div className="search">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="search_main">
                <div className="search_card">
                  <div className="search_card_title">
                    <h2>Search Your Grievance</h2>
                  </div>
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group search_form pb-2">
                      <label>Ticket Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Ticket Number"
                        value={uid}
                        onChange={(e) => setUid(e.target.value)}
                        required
                      />
                    </div>
                    <div className="submit_btn">
                      <button type="submit">Search</button>
                    </div>
                  </form>
                  <Modal open={showModal} onClose={() => setShowModal(false)}>
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)', width: "50%", height: '50%',
                      display: 'flex', flexDirection: "column",
                      padding: '10px',
                      background: colors.text[900],
                      color: colors.text[500],
                      borderRadius: '10px'
                    }}>
                      <Typography
                        variant="h2"
                        color={colors.text[500]}
                        textAlign="center"
                      >
                        Grievance Details
                      </Typography>
                      {grievanceData && (
                        <Box
                          display="grid"
                          gap="10px"
                        >
                          <Typography
                            variant="h4"
                            color={colors.text[500]}
                          >
                            <b>Grievance No.:</b> {grievanceData.complaintId}
                          </Typography>
                          <Typography
                            variant="h4"
                            color={colors.text[500]}
                          >
                            <b>UID:</b> {grievanceData.uid}
                          </Typography>
                          <Typography
                            variant="h4"
                            color={colors.text[500]}
                          >
                            <b>Description:</b> {grievanceData.description}
                          </Typography>
                          <Typography
                            variant="h4"
                            color={colors.text[500]}
                          >
                            {getStatusWithDate(grievanceData.status)}
                          </Typography>
                          <Typography
                            variant="h4"
                            color={colors.text[500]}
                          >
                            <b>Subject Type:</b> {grievanceData.subject_type}
                          </Typography>
                        </Box>
                      )}
                      <Button sx={{ color: colors.text[500] }} onClick={() => setShowModal(false)}>
                        Close
                      </Button>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchGrievance;
