import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Context/Firebase';
import {
    Box, Button, Divider, TextareaAutosize, Typography,
    capitalize, useTheme, Dialog, DialogTitle, DialogContent,
    DialogActions, Select, InputLabel, MenuItem, FormControl, TextField
} from '@mui/material';
import { tokens } from '../../theme';

export default function EditPage() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();
    const [grievanceData, setGrievanceData] = useState(null);
    const [note, setNote] = useState('');
    const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [replyType, setReplyType] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState('');
    const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);


    console.log(grievanceData)
    useEffect(() => {
        const fetchGrievanceData = async () => {
            try {
                const grievanceDoc = await getDoc(doc(db, 'grievances', id));
                if (grievanceDoc.exists()) {
                    let fetchedData = grievanceDoc.data();
                    if (!fetchedData.reply) {
                        fetchedData = { ...fetchedData, reply: [] };
                    }
                    if (!fetchedData.note) {
                        fetchedData = { ...fetchedData, note: [] };
                    }
                    setGrievanceData(fetchedData);
                } else {
                    console.log('Grievance not found');
                }
            } catch (error) {
                console.error('Error fetching grievance data:', error);
            }
        };
        fetchGrievanceData();
        const intervalId = setInterval(fetchGrievanceData, 5000);
        return () => clearInterval(intervalId);
    }, [id]);

    if (!grievanceData) {
        return <div>Loading...</div>;
    }

    const handleAddReply = async () => {
        try {
            const currentDate = new Date().toLocaleString();
            const newReply = { content: replyContent, type: replyType };
            const updatedReplies = [...grievanceData.reply, newReply];
            const updatedData = { ...grievanceData, reply: updatedReplies, updated_at: currentDate };
            await updateDoc(doc(db, 'grievances', id), updatedData);
            alert('Reply added successfully');
            setReplyContent('');
            setReplyType('');
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    const handleAddNote = async () => {
        try {
            const currentDate = new Date().toLocaleString();
            const updatedNotes = [...grievanceData.note, note];
            const updatedData = { ...grievanceData, note: updatedNotes, updated_at: currentDate };
            await updateDoc(doc(db, 'grievances', id), updatedData);
            console.log('Note added successfully');
            setNote('');
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const handleSaveStatus = async () => {
        try {
            const currentDate = new Date().toLocaleString();
            let updatedStatus = { ...grievanceData.status };
            switch (selectedStatus) {
                case "Initiated":
                    updatedStatus.Initiated = "Started";
                    updatedStatus.Initiated_date = currentDate;
                    break;
                case "In_Progress":
                    updatedStatus.In_Progress = "In Progress";
                    updatedStatus.In_Progress_date = currentDate;
                    break;
                case "Completed":
                    updatedStatus.Completed = "Completed";
                    updatedStatus.Completed_date = currentDate;
                    break;
                case "Rejected":
                    updatedStatus.Reject = "Rejected";
                    updatedStatus.Reject_date = currentDate;
                    break;
                default:
                    break;
            }
            const updatedData = { ...grievanceData, status: updatedStatus, updated_at: currentDate };
            await updateDoc(doc(db, 'grievances', id), updatedData);
            console.log('Status updated successfully');
            setIsStatusModalOpen(false); // Close the modal after saving
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleSaveDepartment = async () => {
        try {
            const currentDate = new Date().toLocaleString();
            const updatedData = { ...grievanceData, department: selectedDepartment, updated_at: currentDate };
            await updateDoc(doc(db, 'grievances', id), updatedData);
            console.log('Department updated successfully');
            setIsDepartmentModalOpen(false);
        } catch (error) {
            console.error('Error updating department:', error);
        }
    };

    const handleSavePriority = async () => {
        try {
            const currentDate = new Date().toLocaleString();
            const updatedData = { ...grievanceData, priority: selectedPriority, updated_at: currentDate };
            await updateDoc(doc(db, 'grievances', id), updatedData);
            console.log('Priority updated successfully');
            setIsPriorityModalOpen(false);
        } catch (error) {
            console.error('Error updating Priority:', error);
        }
    };


    const openStatusModal = () => {
        setIsStatusModalOpen(true);
    };

    const closeStatusModal = () => {
        setIsStatusModalOpen(false);
    };

    const openDepartmentModal = () => {
        setIsDepartmentModalOpen(true);
    };

    const closeDepartmentModal = () => {
        setIsDepartmentModalOpen(false);
    };
    const openPriorityModal = () => {
        setIsPriorityModalOpen(true);
    };

    const closePriorityModal = () => {
        setIsPriorityModalOpen(false);
    };

    const openNoteDialog = () => {
        setIsNoteDialogOpen(true);
    };

    const closeNoteDialog = () => {
        setIsNoteDialogOpen(false);
    };

    return (
        <div>
            <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                gridTemplateRows="repeat(6, 1fr)"
                width="100%"
                height="100%"
                p={1}
                gap='10px'
            >
                <Box
                    gridArea='1 / 1 / 3 / 3'
                    display="flex"
                    flexDirection='column'
                    gap='5px'
                    p={2}
                    border='2px solid'
                    borderColor={colors.text[400]}
                    borderRadius="10px"
                >
                    <Typography variant="h7"
                        p={1}
                        borderRadius="5px"
                        width="fit-content"
                        bgcolor={colors.blueAccent[400]}
                        color={colors.primary[500]}
                    >
                        Grievance ID: {grievanceData.complaintId}
                    </Typography>
                    <Typography variant='h2' fontWeight='700' color={colors.text[500]}>
                        {capitalize(grievanceData.name)}
                    </Typography>
                    <Typography variant="h7" color={colors.text[500]}>
                        Description: &nbsp;
                        {grievanceData.description}
                    </Typography>
                    <Typography variant="h7" color={colors.text[500]}>
                        Files: &nbsp;
                        {(grievanceData.medias && grievanceData.medias.length > 0) ? (grievanceData.medias) : "No Files Included"}
                    </Typography>
                    <Divider />
                    <Box
                        display='flex'
                        justifyContent="center"
                        alignItems="center"
                        height='100%'
                        flexDirection='column'
                        gap="15px"
                    >
                        {(grievanceData.reply && grievanceData.reply.length > 0) ?
                            (grievanceData.reply.map((reply, index) => (
                                <Box key={index}>
                                    {(reply.type === 'Rejected') ? (
                                        <Typography variant="h7" p={1} borderRadius="5px" bgcolor={colors.secondary[700]} color={colors.primary[500]}>
                                            {reply.type}
                                        </Typography>
                                    ) : (
                                        (reply.type === 'Opened') ? (
                                            <Typography variant="h7" p={1} borderRadius="5px" bgcolor={colors.secondary[200]} color={colors.primary[500]}>
                                                {reply.type}
                                            </Typography>
                                        ) : ((reply.type === 'Started') ? (
                                            <Typography variant="h7" p={1} borderRadius="5px" bgcolor={colors.secondary[300]} color={colors.primary[500]}>
                                                {reply.type}
                                            </Typography>
                                        ) : ((reply.type === 'Completed') ? (
                                            <Typography variant="h7" p={1} borderRadius="5px" bgcolor={colors.secondary[500]} color={colors.primary[500]}>
                                                {reply.type}
                                            </Typography>
                                        ) : ""))
                                    )}
                                    <Typography variant="h7" color={colors.text[500]}>
                                        &nbsp; {reply.content}
                                    </Typography>
                                </Box>
                            ))) :
                            (<Typography variant='h7' textAlign='center' color={colors.text[500]}>
                                Currently, no replies are available to display
                            </Typography>)
                        }

                    </Box>
                </Box>
                <Box
                    gridArea='3 / 1 / 5 / 3'
                    display="flex"
                    flexDirection='column'
                    p={2}
                    border='2px solid'
                    borderColor={colors.text[400]}
                    borderRadius="10px"
                >
                    <form>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            gap='5px'
                        >
                            <Typography variant="h7" fontWeight='600' color={colors.text[500]}>
                                Your Reply
                            </Typography>

                            <Box >
                                <FormControl sx={{ width: "180px" }}>
                                    <InputLabel id="demo-simple-select-label">Select Reply Type</InputLabel>
                                    <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={replyType}
                                        label="Select Reply Type"
                                        onChange={(e) => setReplyType(e.target.value)}
                                    >
                                        <MenuItem value={'Started'}>Started</MenuItem>
                                        <MenuItem value={'Opened'}>Opened</MenuItem>
                                        <MenuItem value={'Completed'}>Completed</MenuItem>
                                        <MenuItem value={'Rejected'}>Rejected</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box
                            mt={1}
                        >
                            <TextField
                                multiline
                                rows={4}
                                fullWidth
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                required
                                placeholder='Enter your reply...'
                            />
                        </Box>
                        <Box
                            display='flex'
                            justifyContent="end"
                            mt="15px"
                        >
                            <Button variant='standard' onClick={handleAddReply} sx={{ backgroundColor: colors.blueAccent[800], color: colors.primary[500] }}>Submit</Button>
                        </Box>
                    </form>
                </Box>
                <Box
                    gridArea='5 / 1 / 6 / 3'
                    display="flex"
                    flexDirection='column'
                    gap='5px'
                    p={2}
                    border='2px solid'
                    borderColor={colors.text[400]}
                    borderRadius="10px"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                    >
                        <Typography variant="h7" fontWeight='600' color={colors.text[500]}>Notes</Typography>
                        <Button onClick={openNoteDialog} variant='standard' sx={{ backgroundColor: colors.blueAccent[800], color: colors.primary[500] }}>Add Note</Button>
                    </Box>
                    <Divider />
                    <Box
                        display='flex'
                        justifyContent="center"
                        alignItems="center"
                        height='100%'
                    >
                        {(grievanceData.note && grievanceData.note.length > 0) ?
                            (<Typography variant="h7" textAlign='center' color={colors.text[500]}>
                                {grievanceData.note}
                            </Typography>) :
                            (<Typography variant='h7' textAlign='center' color={colors.text[500]}>
                                Currently, no notes are available to display
                            </Typography>)
                        }
                    </Box>
                </Box>
                <Box
                    gridArea='6 / 1 / 7 / 3'
                    display="flex"
                    flexDirection='column'
                    gap='5px'
                    p={2}
                    border='2px solid'
                    borderColor={colors.text[400]}
                    borderRadius="10px"
                >
                    <Typography variant="h7" fontWeight='600' color={colors.text[500]}>History</Typography>
                    <Divider />
                    <Typography variant="h6" fontWeight='600' color={colors.text[500]}>
                        Ticket is created On:
                    </Typography>
                    <Typography variant="h6" color={colors.text[500]}>
                        {grievanceData.date}
                    </Typography>
                </Box>
                <Box
                    gridArea='1 / 3 / 7 / 4'
                    display="flex"
                    flexDirection='column'
                    gap='20px'
                >
                    <Box
                        p={2}
                        border='2px solid'
                        borderColor={colors.text[400]}
                        borderRadius="10px"
                    >
                        <Box
                            display='flex'
                            justifyContent="space-between"
                            alignItems="center"
                            border="2px solid"
                            borderColor={colors.text[200]}
                            borderRadius="5px"
                            p={1}
                        >
                            <Typography variant="h7" color={colors.text[500]}>Status:</Typography>
                            <Box
                                display="flex"
                                flexDirection='column'
                            >
                                <Typography variant="h7"
                                    borderRadius="5px"
                                    textAlign='center'
                                    p={1}
                                    sx={{ backgroundColor: colors.blueAccent[800], color: colors.primary[500] }}
                                >
                                    {(grievanceData.status.Reject) ? (grievanceData.status.Reject) :
                                        ((grievanceData.status.Completed) ? (grievanceData.status.Completed) :
                                            ((grievanceData.status.In_Progress) ? (grievanceData.status.In_Progress) :
                                                ((grievanceData.status.Initiated) ? (grievanceData.status.Initiated) :
                                                    "")))}
                                </Typography>
                                <Button sx={{ color: colors.blueAccent[800] }} onClick={openStatusModal}>Change</Button>
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            justifyContent="space-between"
                            alignItems="center"
                            border="2px solid"
                            borderColor={colors.text[200]}
                            borderRadius="5px"
                            p={1}
                        >
                            <Typography variant="h7" color={colors.text[500]}> Reply Status:</Typography>
                            {(grievanceData.reply && grievanceData.reply.length > 0) ?
                                (<Typography variant="h7"
                                    borderRadius="5px"
                                    p={1}
                                    sx={{ backgroundColor: colors.secondary[500], color: colors.primary[500] }}
                                >
                                    Answered
                                </Typography>)
                                :
                                (<Typography variant="h7"
                                    borderRadius="5px"
                                    p={1}
                                    sx={{ backgroundColor: colors.secondary[800], color: colors.primary[500] }}
                                >
                                    Unanswered
                                </Typography>)}
                        </Box>
                        <Box
                            display='flex'
                            justifyContent="space-between"
                            alignItems="center"
                            border="2px solid"
                            borderColor={colors.text[200]}
                            borderRadius="5px"
                            p={1}
                        >
                            <Typography variant="h7" color={colors.text[500]}> Requester:</Typography>
                            <Typography variant="h7" p={1} color={colors.blueAccent[800]}>{capitalize(grievanceData.name)}</Typography>
                        </Box>
                        <Box
                            display='flex'
                            justifyContent="space-between"
                            alignItems="center"
                            border="2px solid"
                            borderColor={colors.text[200]}
                            borderRadius="5px"
                            p={1}
                        >
                            <Typography variant="h7" color={colors.text[500]}> Department:</Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Typography variant="h7" color={colors.text[500]}>{capitalize(grievanceData.department)}</Typography>
                                <Button onClick={openDepartmentModal} sx={{ color: colors.blueAccent[800] }}>Change</Button>
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            justifyContent="space-between"
                            alignItems="center"
                            border="2px solid"
                            borderColor={colors.text[200]}
                            borderRadius="5px"
                            p={1}
                        >
                            <Typography variant="h7" color={colors.text[500]}> Priority:</Typography>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                {(grievanceData.priority === "High") ?
                                    (<Typography variant="h7"
                                        borderRadius="5px"
                                        p={1}
                                        sx={{ backgroundColor: colors.secondary[800], color: colors.primary[500] }}
                                    >
                                        High
                                    </Typography>)
                                    :
                                    ((grievanceData.priority === "Medium") ? (<Typography variant="h7"
                                        borderRadius="5px"
                                        p={1}
                                        sx={{ backgroundColor: colors.secondary[900], color: colors.primary[500] }}
                                    >
                                        Medium
                                    </Typography>) : ((grievanceData.priority === "Low") ? (<Typography variant="h7"
                                        borderRadius="5px"
                                        p={1}
                                        sx={{ backgroundColor: colors.secondary[200], color: colors.primary[500] }}
                                    >
                                        Low
                                    </Typography>) : ''))}
                                <Button onClick={openPriorityModal} sx={{ color: colors.blueAccent[800] }}>Change</Button>
                            </Box>
                        </Box>
                        <Box
                            display='flex'
                            justifyContent="space-between"
                            alignItems="center"
                            border="2px solid"
                            borderColor={colors.text[200]}
                            borderRadius="5px"
                            p={1}
                        >
                            <Typography variant="h7" color={colors.text[500]}> Updated On:</Typography>
                            <Typography variant="h7" p={1} color={colors.text[500]}>
                                {((grievanceData.updated_at) === (grievanceData.date)) ? "Never Updated" :
                                    (grievanceData.updated_at)
                                }
                            </Typography>
                        </Box>
                        <Box
                            display='flex'
                            justifyContent="space-between"
                            alignItems="center"
                            border="2px solid"
                            borderColor={colors.text[200]}
                            borderRadius="5px"
                            p={1}
                        >
                            <Typography variant="h7" color={colors.text[500]}> Created On:</Typography>
                            <Typography variant="h7" p={1} color={colors.text[500]}>{grievanceData.date}</Typography>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        justifyContent='center'
                    >
                        <Button
                            sx={{ background: colors.blueAccent[800], color: colors.primary[500], py: 1, px: 4, fontSize: '20px' }}
                        >
                            Assign
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Note Modal */}
            <Dialog fullWidth open={isNoteDialogOpen} onClose={closeNoteDialog}>
                <DialogTitle>Add Note</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Enter your note..."
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: colors.text[500] }} onClick={closeNoteDialog}>Cancel</Button>
                    <Button sx={{ color: colors.blueAccent[800] }} onClick={handleAddNote}>Add</Button>
                </DialogActions>
            </Dialog>

            {/* Ststus Modal  */}
            <Dialog fullWidth open={isStatusModalOpen} onClose={closeStatusModal}>
                <DialogTitle>Change Status</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <Select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="Rejected">Rejected</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="In_Progress">In Progress</MenuItem>
                            <MenuItem value="Initiated">Initiated</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: colors.text[500] }} onClick={closeStatusModal}>Cancel</Button>
                    <Button sx={{ color: colors.blueAccent[800] }} onClick={handleSaveStatus}>Save</Button>
                </DialogActions>
            </Dialog>


            {/* Department Modal */}
            <Dialog fullWidth open={isDepartmentModalOpen} onClose={closeDepartmentModal}>
                <DialogTitle>Change Department</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <Select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="Accounts">Accounts</MenuItem>
                            <MenuItem value="Arboriculture">Arboriculture</MenuItem>
                            <MenuItem value="Auditorium">Auditorium</MenuItem>
                            <MenuItem value="Birth & Death">Birth & Death</MenuItem>
                            <MenuItem value="Central Pool">Central Pool</MenuItem>
                            <MenuItem value="Clean City">Clean City</MenuItem>
                            <MenuItem value="DAY-NULM">DAY-NULM</MenuItem>
                            <MenuItem value="Education">Education</MenuItem>
                            <MenuItem value="Electric">Electric</MenuItem>
                            <MenuItem value="Engineering">Engineering</MenuItem>
                            <MenuItem value="Establishment">Establishment</MenuItem>
                            <MenuItem value="Guard">Guard</MenuItem>
                            <MenuItem value="Information Technology">Information Technology</MenuItem>
                            <MenuItem value="JNNURM/HFA/RAY/AMRUT">JNNURM/HFA/RAY/AMRUT</MenuItem>
                            <MenuItem value="Lake Garden">Lake Garden</MenuItem>
                            <MenuItem value="Market">Market</MenuItem>
                            <MenuItem value="Property Assessment">Property Assessment</MenuItem>
                            <MenuItem value="Public Health">Public Health</MenuItem>
                            <MenuItem value="Sanitary">Sanitary</MenuItem>
                            <MenuItem value="Store">Store</MenuItem>
                            <MenuItem value="TOTO">TOTO</MenuItem>
                            <MenuItem value="Trade License">Trade License</MenuItem>
                            <MenuItem value="Water Supply">Water Supply</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: colors.text[500] }} onClick={closeDepartmentModal}>Cancel</Button>
                    <Button sx={{ color: colors.blueAccent[800] }} onClick={handleSaveDepartment}>Save</Button>
                </DialogActions>
            </Dialog>


            {/* Priority Modal */}
            <Dialog fullWidth open={isPriorityModalOpen} onClose={closePriorityModal}>
                <DialogTitle>Change Priority</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <Select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="High">High</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: colors.text[500] }} onClick={closePriorityModal}>Cancel</Button>
                    <Button sx={{ color: colors.blueAccent[800] }} onClick={handleSavePriority}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
