# Patient Appointment Management System

## 📘 Project Overview
This is a simple Patient Appointment Management System built using HTML, CSS, and JavaScript. The system allows patients to submit appointment requests, log in to view their appointments, and provides an admin portal for managing requests.

## 🏗️ Features
- **User Registration & Login:** Patients can register and log in to access their appointment requests.
- **Appointment Requests:** Users can fill out a form to request an appointment with a specific type of doctor.
- **Local Storage Management:** User and request data is stored locally in the browser.
- **Admin Login:** Admins can log in to access a dashboard and manage patient requests.

## 🖼️ Project Structure
```
├── index.html                # Homepage
├── login.html                # Login page for users
├── register.html             # Registration page
├── request.html              # Appointment request form
├── Appointment.html          # View scheduled appointments
├── admin-login.html          # Admin login page
├── admin-dashboard.html      # Admin dashboard
├── login.css                 # Styling for login page
├── request.css               # Styling for request page
├── login.js                  # Handles login logic
├── request.js                # Handles appointment request logic
└── README.md                 # Project documentation (this file)
```

## 🛠️ Technologies Used
- **HTML:** Structure of the web pages.
- **CSS:** Styling and layout.
- **JavaScript:** Form handling, local storage management, and navigation.

## 🚀 Getting Started
1. **Clone the repository:**
```
git clone https://github.com/your-repo/patient-appointment-system.git
```
2. **Navigate to the project folder:**
```
cd patient-appointment-system
```
3. **Open `index.html` in a browser:**
Just double-click the `index.html` file or run a local server.

## 📂 Local Storage Keys
- `users`: Stores registered users as an array of objects.
- `requests`: Stores patient appointment requests.
- `loggedInUserEmail`: Tracks the currently logged-in user's email.

## 👤 Admin Credentials (Demo)
- **Email:** `oc123@gmail.com`
- **Password:** `1111`

## 📩 Future Enhancements
- **Database Integration:** Replace local storage with a real database.
- **Email Notifications:** Send emails upon appointment request submission.
- **Request Status Management:** Add options to approve, reject, or reschedule requests.

## 💡 How to Contribute
1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Commit your changes and push.
4. Open a pull request.

## 📄 License
This project is licensed under the MIT License.

---

