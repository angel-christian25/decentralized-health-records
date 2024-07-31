// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract AppointmentManager {
    // Structure to represent an appointment
    struct Appointment {
        string id;
        string name;
        string email;
        string phone;
        string time;
        string doctor;
        string reason;
    }
    
    // Mapping from doctor's name to an array of appointments
    mapping(string => Appointment[]) private doctorAppointments;

    // Event to log when a new appointment is added
    event AppointmentAdded(string doctor, string id, string name, string time);

    // Function to add a new appointment
    function addAppointment(
        string memory _id,
        string memory _name,
        string memory _email,
        string memory _phone,
        string memory _time,
        string memory _doctor,
        string memory _reason
    ) public {
        Appointment memory newAppointment = Appointment({
            id: _id,
            name: _name,
            email: _email,
            phone: _phone,
            time: _time,
            doctor: _doctor,
            reason: _reason
        });

        // Add the appointment to the doctor's list
        doctorAppointments[_doctor].push(newAppointment);

        // Emit an event
        emit AppointmentAdded(_doctor, _id, _name, _time);
    }

    function getAppointmentsByDoctor(string memory _doctor) public view returns (Appointment[] memory) {
        return doctorAppointments[_doctor];
    }


// Add Doctor Smart Contract Starts here

    struct Doctor {
        string name;
        string specialization;
    }
    
    // Mapping from doctor's name to Doctor details
    mapping(string => Doctor) public doctors;
    // Array to store the list of all doctor names for easy retrieval
    string[] private doctorNames;

    // Event to log when a new doctor is added
    event DoctorAdded(string name, string specialization);

    // Function to add a new doctor
    function addDoctor(string memory _name, string memory _specialization) public {
        require(bytes(_name).length > 0, "Doctor name cannot be empty");
        require(bytes(_specialization).length > 0, "Specialization cannot be empty");
        require(bytes(doctors[_name].name).length == 0, "Doctor already exists");

        // Create and store the new doctor
        Doctor memory newDoctor = Doctor({
            name: _name,
            specialization: _specialization
        });
        doctors[_name] = newDoctor;
        doctorNames.push(_name);

        // Emit an event
        emit DoctorAdded(_name, _specialization);
    }

    // Function to get the details of a specific doctor by name
    function getDoctorDetails(string memory _name) public view returns (string memory name, string memory specialization) {
        require(bytes(doctors[_name].name).length > 0, "Doctor does not exist");

        Doctor memory doctor = doctors[_name];
        return (doctor.name, doctor.specialization);
    }

    // Function to get the list of all doctor names
    function getAllDoctorNames() public view returns (string[] memory) {
        return doctorNames;
    }

    // Function to get the details of all doctors
    function getAllDoctors() public view returns (Doctor[] memory) {
        Doctor[] memory allDoctors = new Doctor[](doctorNames.length);
        for (uint i = 0; i < doctorNames.length; i++) {
            allDoctors[i] = doctors[doctorNames[i]];
        }
        return allDoctors;
    }

}
