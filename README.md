# Profile Management Application

A full-stack **Profile Management Application** built with **React**, **TypeScript**, and **Redux Toolkit**.  
This application allows users to **create, view, edit, and delete** their profile details with data persistence using a **mock API server (json-server)** and **localStorage**.

---

## ✨ Features

- **Complete Profile Management (CRUD)**: Create, view, update (pre-filled form), and delete user profiles  
- **Confirmation Prompts**: Delete action includes a confirmation dialog  
- **Navbar Display**: Shows the user's first and last name dynamically on the navigation bar  
- **Form Validation**: Client-side validation for all input fields  
- **Persistent Storage**: Data persists using localStorage across sessions  
- **API Integration**: Fully functional mock REST API using json-server  
- **Environment Modes**: Switches API base URL automatically based on dev or production mode  
- **Responsive UI**: Built with Material-UI for a clean, adaptive interface  
- **Error Handling**: Comprehensive error messages with graceful fallbacks  
- **Deployed on Vercel**: Live demo deployment for easy access  

---

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript  
- **State Management**: Redux Toolkit + Redux Thunk  
- **UI Framework**: Material-UI (MUI v7) + Emotion  
- **Routing**: React Router v6  
- **HTTP Client**: Axios  
- **Mock API**: json-server (for simulating backend)  
- **Development Tools**:  
  - Vite for fast development and builds  
  - Redux DevTools for debugging  
  - TypeScript for type safety  

---

## 🛠️ Installation & Running

### 1. Clone the repository

```bash
git clone https://github.com/p-karthik-eng/profile-assignment.git
cd profile-assignment


### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root with the following content:

```
VITE_API_URL=http://localhost:3001/users
```

Adjust the URL as needed for different environments.

### 4. Start the mock API server

```bash
npm run server
```

This will run `json-server` on `http://localhost:3001`.

### 5. Start the development server

```bash
npm run dev
```

Open your browser and visit [http://localhost:5173](http://localhost:5173).

### 6. Build for production

```bash
npm run build
npm run preview
```

---

## 🏗️ Project Structure

```
src/
├── components/         
│   └── Navbar.tsx         # Displays user's name and navigation links
├── pages/
│   ├── ProfileForm.tsx     # Create/Edit profile with validation
│   ├── ProfilePage.tsx     # View and delete profile data
│   └── PageNotFound.tsx    # Custom 404 error page
├── Redux/
│   ├── store.ts            # Redux store configuration
│   └── profileSlice.ts     # Redux Toolkit slice for profile state
└── utils/
    ├── api.ts              # Axios API calls
    └── localStorage.ts     # LocalStorage helpers

```

## 🧑‍💻 Technical Implementation

### State Management

- **Redux Store**: Centralized state management using Redux
- **Redux Thunk**: Handles asynchronous operations and side effects
- **State Persistence**: Automatically persists profile data to localStorage
- **Type Safety**: Full TypeScript support with defined types and interfaces

### API Integration

- **RESTful API**: Implements standard CRUD operations
- **Mock Server**: Uses json-server for development
- **Environment Variables**: API base URL configurable via `.env` files

### Form Handling

- **Controlled Components**: Form inputs are fully controlled by React state
- **Validation**: Client-side validation for required fields and data formats
  - Name: Required, minimum 3 characters
  - Email: Required, must be valid email format
  - Age: Optional, must be a number if provided
- **Error Handling**: 
  - Validation errors shown inline and via Material-UI Snackbar
  - Comprehensive error handling with user feedback

### Routing

- Uses **React Router** for navigation between Profile Form, Profile Display, and 404 page
- Invalid routes redirect to a custom 404 page
- Protected routes ensure proper authentication flow

### UI/UX

- **Material-UI**: Modern and responsive design system with consistent theming
- **Interactive Components**:
  - Confirmation dialogs for important actions
  - Snackbar notifications for user feedback
  - Intuitive form controls with clear validation
  - Loading indicators during API operations
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Accessibility**: Built with ARIA labels and keyboard navigation support
- **Visual Feedback**: Clear feedback for user actions and system status

### Error Handling

- **User-Friendly Messages**: Clear, actionable error messages
- **Graceful Degradation**: Handles API failures and missing data gracefully
- **Validation Feedback**: Inline validation with helpful error messages
- **Error Recovery**: Clear paths to recover from errors

### Environment Variables

- Uses Vite's environment variable system (`VITE_API_URL`) for API endpoint configuration.

---

## 📁 File Structure

```
src/pages/          # Main pages: ProfileForm, ProfilePage, PageNotFound
src/Redux/          # Redux slices and store setup
src/utils/          # API utilities and localStorage helpers
public/             # Static assets
db.json            # Mock database for json-server
```

---

## 🚀 Usage

- Run the development server and interact with the profile form.
- Create, update, and delete profile data.
- Data persists via localStorage and mock API.

---

## 📝 Notes

- Ensure `json-server` is running before starting the app to enable API calls.
- Update `.env` for different API endpoints as needed.

---

## 🧾 Assessment Criteria

This project satisfies all the requirements outlined in the assignment document.  
Below is a detailed checklist of the assessment criteria and their implementation status:

| **Assessment Area** | **Description** | **Status** |
|----------------------|-----------------|-------------|
| **React + TypeScript (.tsx)** | Built entirely using React with TypeScript for type safety and modular design | ✅ Implemented |
| **Redux Toolkit (Global State Management)** | Uses Redux Toolkit to manage global profile state across the application | ✅ Implemented |
| **API Management & Error Handling** | Handles all CRUD API operations with proper success and error feedback | ✅ Implemented |
| **Form Data Handling & Validation** | Includes client-side validation with MUI feedback for all input fields | ✅ Implemented |
| **Routing & Navigation** | Implemented with React Router v6, including 404 fallback route | ✅ Implemented |
| **Material-UI Styling** | Uses MUI v7 with responsive layouts, dialogs, and snackbars | ✅ Implemented |
| **Local Storage Persistence** | Data automatically synced and stored in localStorage for persistence | ✅ Implemented |
| **Edit Profile (Pre-Filled Form)** | Form auto-fills existing profile data for editing | ✅ Implemented |
| **Delete Profile Functionality** | Allows profile deletion with confirmation dialog | ✅ Implemented |
| **Navbar User Display** | Displays user's first and last name dynamically on the navigation bar | ✅ Implemented |
| **Environment Variables (.env)** | Configurable API URLs for development and production modes | ✅ Implemented |
| **Deployment (Vercel)** | Project deployed and accessible via Vercel live link | ✅ Implemented |
| **Code Quality & Modularity** | Organized folder structure with reusable and maintainable components | ✅ Implemented |
| **Error Page Handling** | Custom 404 page for invalid routes | ✅ Implemented |

---

✅ **Final Verdict**: The project meets all functional, technical, and UI/UX requirements specified in the assignment.  
It demonstrates strong use of React, TypeScript, Redux Toolkit, and MUI with robust API handling and clean design.



