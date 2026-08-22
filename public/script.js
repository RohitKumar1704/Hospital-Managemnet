const patientName = document.getElementById("patientName");
const patientAge = document.getElementById("patientAge");
const patientDisease = document.getElementById("patientDisease");
const addPatientBtn = document.getElementById("addPatientBtn");

const doctorName = document.getElementById("doctorName");
const doctorSpecialization = document.getElementById("doctorSpecialization");
const addDoctorBtn = document.getElementById("addDoctorBtn");

const patientsContainer = document.getElementById("patientsContainer");
const doctorsContainer = document.getElementById("doctorsContainer");

// Load data when page opens
window.onload = () => {
    loadPatients();
    loadDoctors();
};

// --------------------
// Patients
// --------------------

addPatientBtn.addEventListener("click", addPatient);

async function loadPatients() {
    try {
        const response = await fetch("/patients");
        const patients = await response.json();

        patientsContainer.innerHTML = "";

        if (patients.length === 0) {
            patientsContainer.innerHTML = "<p>No patients available.</p>";
            return;
        }

        patients.forEach(patient => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${patient.name}</h3>
                <p><strong>Age:</strong> ${patient.age}</p>
                <p><strong>Disease:</strong> ${patient.disease}</p>

                <button class="delete-btn"
                    onclick="deletePatient(${patient.id})">
                    Delete
                </button>
            `;

            patientsContainer.appendChild(card);
        });

    } catch (error) {
        console.log(error);
    }
}

async function addPatient() {

    const name = patientName.value.trim();
    const age = patientAge.value.trim();
    const disease = patientDisease.value.trim();

    if (name === "" || age === "" || disease === "") {
        alert("Please fill all patient details.");
        return;
    }

    const patient = {
        name,
        age,
        disease
    };

    try {

        await fetch("/patients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patient)
        });

        patientName.value = "";
        patientAge.value = "";
        patientDisease.value = "";

        loadPatients();

    } catch (error) {
        console.log(error);
    }
}

async function deletePatient(id) {

    try {

        await fetch(`/patients/${id}`, {
            method: "DELETE"
        });

        loadPatients();

    } catch (error) {
        console.log(error);
    }
}

// --------------------
// Doctors
// --------------------

addDoctorBtn.addEventListener("click", addDoctor);

async function loadDoctors() {

    try {

        const response = await fetch("/doctors");
        const doctors = await response.json();

        doctorsContainer.innerHTML = "";

        if (doctors.length === 0) {
            doctorsContainer.innerHTML = "<p>No doctors available.</p>";
            return;
        }

        doctors.forEach(doctor => {

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${doctor.name}</h3>
                <p><strong>Specialization:</strong> ${doctor.specialization}</p>

                <button class="delete-btn"
                    onclick="deleteDoctor(${doctor.id})">
                    Delete
                </button>
            `;

            doctorsContainer.appendChild(card);

        });

    } catch (error) {
        console.log(error);
    }
}

async function addDoctor() {

    const name = doctorName.value.trim();
    const specialization = doctorSpecialization.value.trim();

    if (name === "" || specialization === "") {
        alert("Please fill all doctor details.");
        return;
    }

    const doctor = {
        name,
        specialization
    };

    try {

        await fetch("/doctors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(doctor)
        });

        doctorName.value = "";
        doctorSpecialization.value = "";

        loadDoctors();

    } catch (error) {
        console.log(error);
    }
}

async function deleteDoctor(id) {

    try {

        await fetch(`/doctors/${id}`, {
            method: "DELETE"
        });

        loadDoctors();

    } catch (error) {
        console.log(error);
    }
}

