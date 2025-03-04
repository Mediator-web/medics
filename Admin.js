document.addEventListener('DOMContentLoaded', () => {
    const viewRequestsButton = document.getElementById('viewRequestsButton');
    const viewUsersButton = document.getElementById('viewUsersButton');
    const viewAppointmentsButton = document.getElementById('viewAppointmentsButton');
    const scheduleAppointmentButton = document.getElementById('scheduleAppointmentButton');
    const requestsSection = document.getElementById('requestsSection');
    const usersSection = document.getElementById('usersSection');
    const appointmentsSection = document.getElementById('appointmentsSection');
    const scheduleAppointmentSection = document.getElementById('scheduleAppointmentSection');

    // Load and display all requests
    const loadAllRequests = () => {
        const requestsTable = document.getElementById('requestsTable').getElementsByTagName('tbody')[0];
        let requests = [];
        try {
            requests = JSON.parse(localStorage.getItem('requests')) || [];
        } catch (error) {
            console.error('Error parsing requests data:', error);
        }

        requestsTable.innerHTML = ''; // Clear existing rows

        if (requests.length === 0) {
            const row = requestsTable.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 6; // Adjust to match the number of columns
            cell.textContent = 'No requests submitted yet.';
        } else {
            requests.forEach((request, index) => {
                const row = requestsTable.insertRow();
                row.insertCell(0).textContent = request.date;
                row.insertCell(1).textContent = request.doctorType;
                row.insertCell(2).textContent = request.message;
                row.insertCell(3).textContent = request.email;  // Display the requester's email
                row.insertCell(4).textContent = request.approved ? 'Approved' : 'Pending';

                const actionsCell = row.insertCell(5);
                actionsCell.innerHTML = request.approved
                    ? `<button class="delete-button" onclick="deleteRequest(${index})">Delete</button>`
                    : `<button class="approve-button" onclick="approveRequest(${index})">Approve</button>`;
            });
        }
    };

    // Load and display users
    const loadUsers = () => {
        const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
        let users = [];
        try {
            users = JSON.parse(localStorage.getItem('users')) || [];
        } catch (error) {
            console.error('Error parsing users data:', error);
        }
        usersTable.innerHTML = ''; // Clear existing rows

        if (users.length === 0) {
            const row = usersTable.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 3;
            cell.textContent = 'No registered users found.';
        } else {
            users.forEach((user, index) => {
                const row = usersTable.insertRow();
                row.insertCell(0).textContent = user.firstName;
                row.insertCell(1).textContent = user.lastName;
                row.insertCell(2).textContent = user.email;

                const actionsCell = row.insertCell(3);
                actionsCell.innerHTML = `
                    <button class="delete-button" onclick="deleteUser(${index})">Delete</button>
                `;
            });
        }
    };

    // Load and display appointments
    const loadAppointments = () => {
        const appointmentsTable = document.getElementById('appointmentsTable').getElementsByTagName('tbody')[0];
        let appointments = [];
        try {
            appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        } catch (error) {
            console.error('Error parsing appointments data:', error);
        }

        const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
        const userAppointments = appointments.filter(appointment => appointment.patientEmail === loggedInUserEmail);

        appointmentsTable.innerHTML = ''; // Clear existing rows

        if (userAppointments.length === 0) {
            const row = appointmentsTable.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 5; // Adjusted to match the number of columns
            cell.textContent = 'You have no appointments.';
        } else {
            userAppointments.forEach((appointment, index) => {
                const row = appointmentsTable.insertRow();
                row.insertCell(0).textContent = appointment.date;
                row.insertCell(1).textContent = appointment.time;
                row.insertCell(2).textContent = appointment.doctorType;
                row.insertCell(3).textContent = appointment.patientEmail;
                row.insertCell(4).textContent = appointment.location;

                const actionsCell = row.insertCell(5);
                actionsCell.innerHTML = `
                    <button class="delete-button" onclick="deleteAppointment(${index})">Delete</button>
                `;
            });
        }
    };

    // Handle section visibility
    const handleSectionVisibility = (showSection) => {
        requestsSection.style.display = 'none';
        usersSection.style.display = 'none';
        appointmentsSection.style.display = 'none';
        scheduleAppointmentSection.style.display = 'none';

        if (showSection === 'requests') {
            requestsSection.style.display = 'block';
            loadAllRequests(); // Load all requests for everyone
        } else if (showSection === 'users') {
            usersSection.style.display = 'block';
            loadUsers();
        } else if (showSection === 'appointments') {
            appointmentsSection.style.display = 'block';
            loadAppointments();
        } else if (showSection === 'schedule') {
            scheduleAppointmentSection.style.display = 'block';
        }
    };

    // Event listeners for buttons
    viewRequestsButton.addEventListener('click', () => handleSectionVisibility('requests'));
    viewUsersButton.addEventListener('click', () => handleSectionVisibility('users'));
    viewAppointmentsButton.addEventListener('click', () => handleSectionVisibility('appointments'));
    scheduleAppointmentButton.addEventListener('click', () => handleSectionVisibility('schedule'));

    // Delete a request
    window.deleteRequest = (index) => {
        let requests = [];
        try {
            requests = JSON.parse(localStorage.getItem('requests')) || [];
        } catch (error) {
            console.error('Error parsing requests data:', error);
        }
        requests.splice(index, 1);
        localStorage.setItem('requests', JSON.stringify(requests));
        loadAllRequests(); // Refresh the list
    };

    // Approve a request
    window.approveRequest = (index) => {
        let requests = [];
        try {
            requests = JSON.parse(localStorage.getItem('requests')) || [];
        } catch (error) {
            console.error('Error parsing requests data:', error);
        }
        if (requests[index]) {
            requests[index].approved = true; // Set approved to true
            localStorage.setItem('requests', JSON.stringify(requests));
            loadAllRequests(); // Refresh the list
        } else {
            console.error(`No request found at index ${index}`);
        }
    };

    // Delete a user
    window.deleteUser = (index) => {
        let users = [];
        try {
            users = JSON.parse(localStorage.getItem('users')) || [];
        } catch (error) {
            console.error('Error parsing users data:', error);
        }
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers(); // Refresh the list
    };

    // Delete an appointment
    window.deleteAppointment = (index) => {
        let appointments = [];
        try {
            appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        } catch (error) {
            console.error('Error parsing appointments data:', error);
        }
        appointments.splice(index, 1);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAppointments(); // Refresh the list
    };

    // Schedule a new appointment
    document.getElementById('appointmentForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;
        const doctorType = document.getElementById('doctorType').value;
        const patientEmail = document.getElementById('patientEmail').value;
        const location = document.getElementById('location').value;

        const newAppointment = { date, time, doctorType, patientEmail, location };

        let appointments = [];
        try {
            appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        } catch (error) {
            console.error('Error parsing appointments data:', error);
        }
        appointments.push(newAppointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        alert('Appointment scheduled successfully!');
        document.getElementById('appointmentForm').reset();
        loadAppointments(); // Refresh the list of appointments
    });

   
    // Add new request form submission logic
    document.getElementById('requestForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const date = document.getElementById('requestDate').value;
        const doctorType = document.getElementById('doctorType').value;
        const message = document.getElementById('message').value;
        const email = localStorage.getItem('loggedInUserEmail'); // Assume the logged-in user's email

        const newRequest = { date, doctorType, message, email, approved: false }; // Set approved to false initially

        let requests = [];
        try {
            requests = JSON.parse(localStorage.getItem('requests')) || [];
        } catch (error) {
            console.error('Error parsing requests data:', error);
        }
        requests.push(newRequest);
        localStorage.setItem('requests', JSON.stringify(requests));

        alert('Request submitted successfully!');
        document.getElementById('requestForm').reset();
        loadRequests(); // Refresh the requests list
    });
});
