import { Box, Typography, Avatar, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { PieChart, BarChart } from '@mui/x-charts';
import { tokens } from '../../theme';
import StatBox from '../../components/StatBox';
import { IoStatsChart } from "react-icons/io5";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdOutlinePendingActions } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaSuperpowers } from "react-icons/fa6";
import { MdSupportAgent } from "react-icons/md";
import { db } from '../../Context/Firebase';
import { collection, getDocs } from 'firebase/firestore';


const SuperAdminDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalGrievances, setTotalGrievances] = useState(100);
  const [closedCount, setclosedCount] = useState('');
  const [completedCount, setcompletedCount] = useState('');
  const [pendingCount, setpendingCount] = useState('');
  const [totalDepartment, setTotalDepartment] = useState(23);
  const [totalSuperAdmin, setTotalSuperAdmin] = useState(50);
  const [totalAdmin, setTotalAdmin] = useState(50);
  const [totalAgents, setTotalAgents] = useState(50);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const grievancesRef = collection(db, 'grievance');

        // Fetch total grievances count
        const totalGrievancesSnapshot = await getDocs(grievancesRef);
        setTotalGrievances(totalGrievancesSnapshot.size);

        // Fetch pending grievances count
        const pendingGrievancesQuery = query(grievancesRef, where('status.In_Progress', '==', 'In Progress'));
        const pendingGrievancesSnapshot = await getDocs(pendingGrievancesQuery);
        setpendingCount(pendingGrievancesSnapshot.size);

        // Fetch completed grievances count
        const completedGrievancesQuery = query(grievancesRef, where('status.Completed', '==', 'Completed'));
        const completedGrievancesSnapshot = await getDocs(completedGrievancesQuery);
        setcompletedCount(completedGrievancesSnapshot.size);

        // Fetch closed grievances count
        const closedGrievancesQuery = query(grievancesRef, where('status.Reject', '==', 'Rejected'));
        const closedGrievancesSnapshot = await getDocs(closedGrievancesQuery);
        setclosedCount(closedGrievancesSnapshot.size);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { label: 'Technical Support', value: 212 },
    { label: 'Installation Assistance', value: 112 },
    { label: 'General Inquiry', value: 102 },
    { label: 'Feature Request', value: 128 },
    { label: 'User Training', value: 128 },
    { label: 'Security Concern', value: 128 },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-around" gap="30px" p={3} flexWrap="wrap">
        <StatBox value={totalGrievances} title={'Total Grivences'} icon={<IoStatsChart fontSize="40px" />} bgcolor={colors.secondary[500]} bgcolor2={colors.secondary[600]} />
        <StatBox value={closedCount} title={'Closed'} icon={<IoCheckmarkDoneCircle fontSize="40px" />} bgcolor={colors.secondary[100]} bgcolor2={colors.secondary[200]} />
        <StatBox value={completedCount} title={'Completed'} icon={<AiOutlineFileDone fontSize="40px" />} bgcolor={colors.accent[100]} bgcolor2={colors.accent[200]} />
        <StatBox value={pendingCount} title={'Pending'} icon={<MdOutlinePendingActions fontSize="40px" />} bgcolor={colors.secondary[700]} bgcolor2={colors.secondary[800]} />
        <StatBox value={totalDepartment} title={'Departments'} icon={<FcDepartment fontSize="40px" />} bgcolor={colors.primary[800]} bgcolor2={colors.primary[900]} />
        <StatBox value={totalSuperAdmin} title={'Super Admins'} icon={<FaSuperpowers fontSize="40px" />} bgcolor={colors.blueAccent[400]} bgcolor2={colors.blueAccent[500]} />
        <StatBox value={totalAdmin} title={'Admins'} icon={<MdAdminPanelSettings fontSize="40px" />} bgcolor={colors.accent[800]} bgcolor2={colors.accent[900]} />
        <StatBox value={totalAgents} title={'Agents'} icon={<MdSupportAgent fontSize="40px" />} bgcolor={colors.accent[100]} bgcolor2={colors.accent[200]} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
        m="10px"
      // gap="20px"
      >
        <Box
          display="flex"
          flexDirection='column'
          justifyContent="center"
          alignItems="center"
          width="30%"
          height='350px'
          sx={{
            boxShadow: 3,
          }}
          px={3}
          py={1}
          borderRadius="10px"
        >
          <Box
            borderBottom="1px solid"
            width="100%"
            borderColor={colors.text[200]}
            p={2}
          >
            <Typography borderLeft="5px solid" borderColor={colors.accent[500]} px={2} width="100%" textAlign="left" variant="h4" color={colors.text[500]}>
              Grievances by Category
            </Typography>
          </Box>
          <PieChart
            series={[
              {
                paddingAngle: 5,
                innerRadius: 60,
                outerRadius: 80,
                data,
              },
            ]}
            margin={{ right: 5 }}
            width={200}
            height={200}
            legend={{ hidden: true }}
          />
        </Box>
        <Box
          sx={{
            boxShadow: 3,
          }}
          px={3}
          py={1}
          borderRadius="10px"
        >
          <Box
            borderBottom="1px solid"
            width="100%"
            borderColor={colors.text[200]}
            p={2}
          >
            <Typography borderLeft="5px solid" borderColor={colors.accent[500]} px={2} width="100%" textAlign="left" variant="h4" color={colors.text[500]}>
              Grievances by Month
            </Typography>
          </Box>
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'March'] }]}
            series={[{ data: [40, 30, 50] }, { data: [10, 60, 30] }, { data: [20, 50, 60] }]}
            width={450}
            height={255.17}
          />
          <Box
            display="flex"
            justifyContent='center'
            gap={3}
          >
            <Box
              display="flex"
              alignContent="center"
            >
              <Avatar sx={{ bgcolor: colors.blueAccent[700], width: "20px", height: "20px" }} variant="circle">
                &nbsp;
              </Avatar>
              <Typography pl={1} variant="h5" color={colors.text[500]}>Created</Typography>
            </Box>
            <Box
              display="flex"
              alignContent="center"
            >
              <Avatar sx={{ bgcolor: colors.blueAccent[800], width: "20px", height: "20px" }} variant="circle">
                &nbsp;
              </Avatar>
              <Typography pl={1} variant="h5" color={colors.text[500]}>Completed</Typography>
            </Box>
            <Box
              display="flex"
              alignContent="center"
            >
              <Avatar sx={{ bgcolor: colors.blueAccent[900], width: "20px", height: "20px" }} variant="circle">
                &nbsp;
              </Avatar>
              <Typography pl={1} variant="h5" color={colors.text[500]}>Pending</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box >
  );
};

export default SuperAdminDashboard;
