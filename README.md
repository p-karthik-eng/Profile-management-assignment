# Profile Management Application

A full-stack profile management application built with React, TypeScript, and Redux. This application allows users to create, view, update, and delete profile information with data persistence using a mock API server.

## ✨ Features

- **User Profile Management**: Create, view, update, and delete user profiles
- **Form Validation**: Client-side validation for profile data
- **Persistent Storage**: Data persists using localStorage
- **Responsive Design**: Built with Material-UI for a clean, responsive interface
- **Mock API**: Uses json-server for API mocking

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Redux with Redux Thunk for async operations
- **UI Framework**: Material-UI (MUI) v7 with Emotion
- **Routing**: React Router v6
- **API Layer**: Axios for HTTP requests
- **Mock API**: json-server with RESTful endpoints
- **Development Tools**:
  - Vite for fast development and building
  - Redux DevTools for state management debugging
  - TypeScript for type safety

## 🛠️ Installation & Running

### 1. Clone the repository

```bash
git clone https://github.com/p-karthik-eng/profile-assignment.git
cd profile-assignment
```

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
├── components/         # Reusable UI components
│   └── Navbar.tsx     # Navigation bar component
├── pages/             # Page components
│   ├── ProfileForm.tsx  # Form for creating/editing profiles
│   ├── ProfilePage.tsx  # Profile display page
│   └── PageNotFound.tsx # 404 error page
├── store/             # Redux store configuration
│   ├── index.ts       # Store setup and root reducer
│   └── profileSlice.ts # Profile-related actions and reducers
└── utils/             # Utility functions
    ├── api.ts         # API service functions
    └── localStorage.ts # localStorage helpers
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
src/store/          # Redux slices and store setup
src/utils/          # API utilities and localStorage helpers
public/             # Static assets
.db.json            # Mock database for json-server
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


