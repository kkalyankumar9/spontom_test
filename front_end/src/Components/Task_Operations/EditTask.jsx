import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskdata, updateTask } from '../../Redux/Task/action';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
} from '@chakra-ui/react';

const EditPatient = () => {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const patientData = useSelector((store) => store.TaskReducer.patientData);

  const [taskData, setTaskData] = useState({
    name: "",
    patient_image: "",
    age: "",
    gender: "",
    email: "",
    address: "",
    phone_no: "",
    timestamp: "",
    heartRate: "",
    temperature: "",
    medicalHistory: "",
    medications: "",
  });

  useEffect(() => {
    const existingTask = patientData.data?.find((task) => task._id === taskId);

    if (existingTask) {
      setTaskData(existingTask);
    }
  }, [taskId, patientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = () => {
    dispatch(updateTask(taskId, taskData))
      .then(() => {
        alert('Data updated');
        dispatch(getTaskdata());
      })
      .catch((error) => {
        console.error(error);
        alert('Error updating data');
      });
  };

  return (
    <Box  shadow="md" pt={"10%"}  m={"auto"} w={"40%"} justifyItems={"center"} alignItems={"center"}>
      <Heading mb={4}>Edit Patient</Heading>
      <VStack spacing={4} align="stretch" p={8}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={taskData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Patient Image</FormLabel>
          <Input
            type="text"
            name="patient_image"
            value={taskData.patient_image}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Age</FormLabel>
          <Input
            type="text"
            name="age"
            value={taskData.age}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Input
            type="text"
            name="gender"
            value={taskData.gender}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            name="email"
            value={taskData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            name="address"
            value={taskData.address}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="text"
            name="phone_no"
            value={taskData.phone_no}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Timestamp</FormLabel>
          <Input
            type="text"
            name="timestamp"
            value={taskData.timestamp}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Heart Rate</FormLabel>
          <Input
            type="text"
            name="heartRate"
            value={taskData.heartRate}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Temperature</FormLabel>
          <Input
            type="text"
            name="temperature"
            value={taskData.temperature}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Medical History</FormLabel>
          <Input
            type="text"
            name="medicalHistory"
            value={taskData.medicalHistory}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Medications</FormLabel>
          <Input
            type="text"
            name="medications"
            value={taskData.medications}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleUpdate}>
          Update Patient
        </Button>
      </VStack>
    </Box>
  );
};

export default EditPatient;
