import Web3 from "web3";
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';  // Import the cors package

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());  // This allows all origins
// Web3 and contract setup
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545/"));
const contractAddress = "0x30f6E7509531267a5FDd15a221778B94a493d550";
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_phone",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_time",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_doctor",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_reason",
				"type": "string"
			}
		],
		"name": "addAppointment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_specialization",
				"type": "string"
			}
		],
		"name": "addDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "doctor",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "time",
				"type": "string"
			}
		],
		"name": "AppointmentAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "specialization",
				"type": "string"
			}
		],
		"name": "DoctorAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "doctors",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "specialization",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllDoctorNames",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllDoctors",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "specialization",
						"type": "string"
					}
				],
				"internalType": "struct AppointmentManager.Doctor[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_doctor",
				"type": "string"
			}
		],
		"name": "getAppointmentsByDoctor",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "phone",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "time",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "doctor",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "reason",
						"type": "string"
					}
				],
				"internalType": "struct AppointmentManager.Appointment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "getDoctorDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "specialization",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let defaultAccount;

const initWeb3 = async () => {
  const accounts = await web3.eth.getAccounts();
  defaultAccount = accounts[0];
  web3.eth.defaultAccount = defaultAccount;
  console.log(`Default account set to ${defaultAccount}`);
};

const myContract = new web3.eth.Contract(abi, contractAddress, {
  from: web3.eth.defaultAccount,
});

initWeb3();

// Route to handle GET requests
app.get("/", (req, res) => {
  res.send("Hello, World!");
});


app.post('/addDoctor', async (req, res) => {
  const { name, specialization } = req.body;

  try {
      // Placeholder for transaction details
      const tx = myContract.methods
      .addDoctor(name, specialization)
      .send({ from: defaultAccount, gas: 5000000 });
      
      // Note: Use a method to sign and send transaction in real applications
      // This example assumes transaction is handled by frontend or a service

      res.json({
          status: 'Doctor added successfully',
          // transactionHash: receipt.transactionHash // placeholder
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
});


// API to get details of all doctors
app.get('/getAllDoctors', async (req, res) => {
  try {
      const doctors = await myContract.methods.getAllDoctors().call();
      res.json(doctors);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
});


// Route to handle booking an appointment
app.post("/book-appointment", async (req, res) => {
  const data = req.body;
  const { id, name, email, phone, time, doctor, reason } = data;

  try {
    await myContract.methods
      .addAppointment(id, name, email, phone, time, doctor, reason)
      .send({ from: defaultAccount, gas: 5000000 }); // Specify a higher gas limit

    res.status(200).json({
      message: "Appointment Created Successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({
      message: "Error booking appointment",
      error: error.toString(),
    });
  }
});

// Route to get appointments by doctor
app.get("/appointments/:doctor", async (req, res) => {
  const doctor = req.params.doctor;

  try {
    const appointments = await myContract.methods
      .getAppointmentsByDoctor(doctor)
      .call();

    res.status(200).json({
      message: "Appointments retrieved successfully",
      data: appointments,
    });
  } catch (error) {
    console.error("Error retrieving appointments:", error);
    res.status(500).json({
      message: "Error retrieving appointments",
      error: error.toString(),
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
