import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../Redux/Task/action";
import Navbar from "../Navbar";

const Addtask = () => {
  const initialData = {
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
  };

  const [taskAdd, setTaskAdd] = useState(initialData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTaskAdd((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(taskAdd))
      .then(() => {
        alert("Data added successfully");
        // You can redirect to another page or handle success as needed
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  return (
    <>
      <Navbar />
  
      <VStack align="center" justify="center"  h="full" mt={"100px"} >

        <form onSubmit={handleSubmit} style={{ width: "300px" }}  >
          <FormControl mb="4" >
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              id="name"
              placeholder="Name"
              name="name"
              value={taskAdd.name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="patient_image">Patient Image</FormLabel>
            <Input
              type="text"
              id="patient_image"
              placeholder="Patient Image URL"
              name="patient_image"
              value={taskAdd.patient_image}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="age">Age</FormLabel>
            <Input
              type="text"
              id="age"
              placeholder="Age"
              name="age"
              value={taskAdd.age}
              onChange={handleChange}
              maxLength={3}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="gender">Gender</FormLabel>
            <Input
              type="text"
              id="gender"
              placeholder="Gender"
              name="gender"
              value={taskAdd.gender}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="text"
              id="email"
              placeholder="Email"
              name="email"
              value={taskAdd.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              type="text"
              id="address"
              placeholder="Address"
              name="address"
              value={taskAdd.address}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="phone_no">Phone Number</FormLabel>
            <Input
              type="text"
              id="phone_no"
              placeholder="Phone Number"
              name="phone_no"
              value={taskAdd.phone_no}
              onChange={handleChange}
              maxLength={10}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="timestamp">Timestamp</FormLabel>
            <Input
              type="text"
              id="timestamp"
              placeholder="Timestamp"
              name="timestamp"
              value={taskAdd.timestamp}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="heartRate">Heart Rate</FormLabel>
            <Input
              type="text"
              id="heartRate"
              placeholder="Heart Rate"
              name="heartRate"
              value={taskAdd.heartRate}
              onChange={handleChange}
              maxLength={4}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="temperature">Temperature</FormLabel>
            <Input
              type="text"
              id="temperature"
              placeholder="Temperature"
              name="temperature"
              value={taskAdd.temperature}
              onChange={handleChange}
              maxLength={10}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="medicalHistory">Medical History</FormLabel>
            <Input
              type="text"
              id="medicalHistory"
              placeholder="Medical History"
              name="medicalHistory"
              value={taskAdd.medicalHistory}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="medications">Medications</FormLabel>
            <Input
              type="text"
              id="medications"
              placeholder="Medications"
              name="medications"
              value={taskAdd.medications}
              onChange={handleChange}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            _hover={{ bg: "blue.700" }}
            size="md"
            rounded="md"
          >
            Add
          </Button>
        </form>
      </VStack>
 
    </>
  );
};

export default Addtask;
