import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import './CreateGrievance.css';
import { Link } from 'react-router-dom';
import { db, storage } from '../../Context/Firebase';
import { uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokens } from '../../theme';
import { useTheme, Typography } from '@mui/material';
import { SuccessModal } from '../../components/Modal';
import { ref, getDownloadURL } from 'firebase/storage';


const CreateGrievance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModal, setOpenModal] = useState(false);
  const [subdepartments, setSubdepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [submissionData, setSubmissionData] = useState({
    uid: '',
    submissionTime: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    complaintId: '',
    date: '',
    department: '',
    description: '',
    location: '',
    medias: [],
    status: {
      Completed: "",
      Completed_date: '',
      In_Progress: "",
      In_Progress_date: "",
      Initiated: "",
      Initiated_date: "",
      Reject: "",
      Reject_date: ""
    },
    subject_type: '',
    title: '',
    updated_at: '',
    ward: '',
    priority: '',
    phone_no: '',
    uid: ''
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('https://www.kalyanimunicipality.org/process_department_api.php');
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data = await response.json();
        setDepartments(data.result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchSubdepartments = async () => {
      if (selectedDepartment) {
        try {
          const response = await fetch('https://www.kalyanimunicipality.org/process_Subdepartment_api.php');
          if (!response.ok) {
            throw new Error('Failed to fetch subdepartments');
          }
          const data = await response.json();
          const filteredSubdepartments = data.result.filter(subDept => subDept.department_id === selectedDepartment.id);
          setSubdepartments(filteredSubdepartments);
        } catch (error) {
          console.error('Error fetching subdepartments:', error);
        }
      }
    };

    fetchSubdepartments();
  }, [selectedDepartment]);


  const handleDepartmentChange = (e) => {
    const selectedDeptId = e.target.value;
    const selectedDept = departments.find(dept => dept.id === selectedDeptId);
    setSelectedDepartment(selectedDept);
    const department = selectedDept.name
    setFormData({ ...formData, department: department });

  };

  const handleSubdepartmentChange = (e) => {
    const selectedSubDeptId = e.target.value;
    setFormData({ ...formData, subject_type: selectedSubDeptId });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileName = file.name;
    setFormData({ ...formData, medias: [...formData.medias, fileName] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(2);
    const firstLetterOfDepartment = formData.department.charAt(0).toUpperCase();
    const randomGrievanceNo = Math.floor(100000 + Math.random() * 900000);

    const uid = `MHY/${firstLetterOfDepartment}/${year}/${randomGrievanceNo}`;

    try {
      const mediasUrls = await Promise.all(formData.medias.map(async (file) => {
        const storageRef = ref(storage, `grievances/${uid}/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      }));
      console.log(mediasUrls)

      const docRef = await addDoc(collection(db, 'grievances'), {
        ...formData,
        updated_at: currentDate.toLocaleString(),
        date: currentDate.toLocaleString(),
        status: {
          Completed: "",
          Completed_date: '',
          In_Progress: "",
          In_Progress_date: "",
          Initiated: "",
          Initiated_date: '',
          Reject: "",
          Reject_date: ""
        },
        complaintId: uid,
        medias: mediasUrls,
      });
      setSubmissionData({
        uid: uid,
        submissionTime: currentDate.toLocaleString()
      });

      setOpenModal(true);

      setFormData({
        name: '',
        address: '',
        complaintId: '',
        date: '',
        department: '',
        description: '',
        location: '',
        medias: [],
        status: '',
        subject_type: '',
        title: '',
        updated_at: '',
        ward: '',
        priority: '',
        phone_no: '',
        uid: ''
      });
      toast.success('Your Grievance Id is: ' + uid);
    }
    catch (error) {
      console.error('Error adding grievance: ', error);
      toast.error('Error adding grievance');
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (loading) {
    return <div>Loading departments...</div>;
  }


  return (
    <div className='main'>
      <div className="cont">
        <form onSubmit={handleSubmit}>
          <div style={{ backgroundColor: colors.text[900] }} className="container create_contant_box">
            {/* <Typography variant="h2" color={colors.text[500]} textAlign="center" >Grievance Launch Window</Typography> */}
            <h2 className="create_heading_title text-center" >Grievance Launch Window</h2>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label>Name</label>
                  <input style={{ backgroundColor: colors.text[900], color: colors.text[500] }} required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" className="form-control" placeholder="Name" />
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label>Address</label>
                  <input style={{ backgroundColor: colors.text[900], color: colors.text[500] }} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} type="text" className="form-control" placeholder="Address" />
                </div>
              </div>
              {/* ggggg */}
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label>Department </label>
                  <select style={{ backgroundColor: colors.text[900], color: colors.text[500] }} required onChange={handleDepartmentChange} className="form-control">
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label>Subject Type </label>
                  <select style={{ backgroundColor: colors.text[900], color: colors.text[500] }} required value={formData.subject_type} onChange={handleSubdepartmentChange} className="form-control">
                    <option value="">Select Type</option>
                    {subdepartments.map(subDept => (
                      <option key={subDept.id} value={subDept.name}>{subDept.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label >Location</label>
                  <input style={{ backgroundColor: colors.text[900], color: colors.text[500] }} value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} type="text" className="form-control" placeholder="Location" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label >Ward No</label>
                  <input style={{ backgroundColor: colors.text[900], color: colors.text[500] }} value={formData.ward} onChange={(e) => setFormData({ ...formData, ward: e.target.value })} type="text" className="form-control" placeholder="Word No" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label >Phone No</label>
                  <input style={{ backgroundColor: colors.text[900], color: colors.text[500] }} value={formData.phone_no} onChange={(e) => setFormData({ ...formData, phone_no: e.target.value })} type="number" className="form-control" placeholder="Phone No" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label >Title</label>
                  <input style={{ backgroundColor: colors.text[900], color: colors.text[500] }} required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" className="form-control" placeholder="Title" />
                </div>
              </div>
              {/* Repeat the same structure for other input fields */}
              <div className="col-lg-12 col-md-12 col-12">
                <div className="form-group ">
                  <label>Description</label>
                  <br />
                  <textarea style={{ backgroundColor: colors.text[900], color: colors.text[500], width: '100%', borderRadius: '5px' }} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="create_ticket_textarea" placeholder="Description"></textarea>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label htmlFor="file" className="form-label">
                    <div>Choose File Here</div>
                    <input style={{ backgroundColor: colors.text[900], color: colors.text[500] }} onChange={handleFileChange} type="file" className="form-control file" />
                  </label>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label>Priority</label>
                  <select style={{ backgroundColor: colors.text[900], color: colors.text[500] }} required value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} className="form-control">
                    <option>Select Priority</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-12 text-center mt-2 mb-2">
              <div className="create_ticket_button">
                <button type='submit' style={{ backgroundColor: 'rgb(73, 236, 23)' }}>Create Grievances</button>
                <Link to="/search">
                  <button style={{ backgroundColor: 'rgb(73, 236, 23)', marginLeft: '25px' }}>History</button>
                </Link>
              </div>
            </div>
          </div>
        </form>

      </div>
      <SuccessModal
        open={openModal}
        handleClose={handleCloseModal}
        uid={submissionData.uid}
        submissionTime={submissionData.submissionTime}
      />
    </div>
  )
}

export default CreateGrievance
