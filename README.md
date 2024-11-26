# 🚀 Role Management System

## 📋 Project Overview

As part of the VRV Security Frontend Assignment, I created a comprehensive web application for tracking and managing roles. The application is designed to streamline workflows across different organizational roles. Only admins are able to edit roles, while managers and users do not have the ability to make such changes.

## 🛠️ Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/geekaryan/vrvassignment.git
cd vrvassignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Project

#### Backend Server

```bash
cd server
npm install
nodemon server.js
```

#### Frontend Application

```bash
npm start
```

## 🖥️ Application Screenshots

### 🏠 Landing Page

![landing](https://github.com/user-attachments/assets/4d0ac1ed-bcab-4887-8c0c-1ed163219af8)


### 🔐 Sign UP Page

![image](https://github.com/user-attachments/assets/22a0911c-4eab-489d-97cd-f3bd27da4e6a)

### 🔐 Login Page

![image](https://github.com/user-attachments/assets/b2561076-c756-4c06-bc79-1136b5f97a9a)

### 🏠 Home Page

![image](https://github.com/user-attachments/assets/5f97f2b1-6650-4ada-a354-676873ee777c)



## ✏️ Edit Functionality

### 👑 Admin Screenshots

![image](https://github.com/user-attachments/assets/affd18eb-a8f3-40d6-95b9-219df83ff72c)


### 👑 Admin Update Functionality

![image](https://github.com/user-attachments/assets/e71f4c82-05a9-42f9-8203-82933d148d68)



### 👥 Manager/User Interface Screenshots

![image](https://github.com/user-attachments/assets/28ba1128-de33-4e65-85c6-f1ab3dd4fc39)


## 🌟 Key Features

- User Authentication
- Role-Based Access Control
- Role Management
- Reporting Dashboard

## 🔒 Environment Variables

Create a `.env` file in the server directory with:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 📦 Tech Stack

- Frontend: React.js
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
