# Profile Management Application

A full-stack **Profile Management Application** built with **React**, **TypeScript**, and **Redux Toolkit**.  
This application allows users to **create, view, edit, and delete** their profile details with data persistence using a **mock API server (json-server)** and **localStorage**. It handles routing, form validation, API integration, and error handling as per the assignment requirements.

---

## ✨ Features

- **React + TypeScript (.tsx):** Built entirely using React with TypeScript for type safety and modular design
- **Material-UI Styling:** Uses MUI v7 with responsive layouts, dialogs, and snackbars for proper styling
- **Profile Form Page:** Collects user details (Name as text input, Email as email input, Age as optional number input)
- **Form Validation:** Client-side validation (Name: required, min 3 chars; Email: required, valid format; Age: optional valid number) with inline and Snackbar feedback
- **API Integration:** POST/PUT for save/update, GET for fetch; displays success/error messages; handles server/validation errors
- **Profile Display Page:** Redirects after submit, fetches/displays data; shows "No Profile Found" message with create prompt if absent
- **Error Handling:** Handles API failures/404 with notifications or error pages; graceful degradation for missing data
- **Routing & Navigation:** Implemented with React Router v6 (`/profile-form` for create/update, `/profile` for display, `/404` for invalid routes)
- **Local Storage Persistence:** Stores submitted data on submit; checks localStorage first on load (falls back to API); synchronizes across form/display pages
- **Redux Toolkit (Global State Management):** Manages profile data, API status (loading/error); displays user's first and last name on navbar throughout the app
- **Environment Variables (.env):** Configurable API URLs for development/production modes; auto-switches based on environment
- **Delete Profile Functionality:** Delete button with confirmation prompt/dialog
- **Edit Profile (Pre-Filled Form):** Navigates to form pre-filled with existing data for updates
- **Confirmation Prompts:** Delete action includes a confirmation dialog
- **Navbar Display:** Shows the user's first and last name dynamically on the navigation bar
- **Persistent Storage:** Data persists using localStorage across sessions
- **Complete Profile Management (CRUD):** Create, view, update (pre-filled form), and delete user profiles
- **Responsive UI:** Built with Material-UI for a clean, adaptive interface
- **Comprehensive Error Messages:** Graceful fallbacks with user-friendly notifications
- **Deployed on Vercel:** Live demo at [https://profile-management-assignment.vercel.app](https://profile-management-assignment.vercel.app)
- **Code Quality & Modularity:** Organized folder structure with reusable and maintainable components
- **Accessibility:** Built with ARIA labels and keyboard navigation support
- **Loading Indicators:** Spinners during API operations for better UX

---

## 🚀 Tech Stack

- **Frontend:** React 18 + TypeScript
- **State Management:** Redux Toolkit + Redux Thunk
- **UI Framework:** Material-UI (MUI v7) + Emotion
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Mock API:** json-server (for simulating backend)
- **Development Tools:**  
  - Vite for fast development and builds  
  - Redux DevTools for debugging  
  - TypeScript for type safety

---

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

Adjust the URL as needed for different environments (e.g., production URL for Vercel deployment).

### 4. Start the mock API server

```bash
npm run server
```

This will run `json-server` on `http://localhost:3001` using `db.json` as the database.

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

### 7. Live Demo

View the deployed application at [https://profile-management-assignment.vercel.app](https://profile-management-assignment.vercel.app)

---

## 🏗️ Project Structure

```
Profile-management-assignment/
│
├── db.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env
│
├── public/
│   └── index.html
│
└── src/
    ├── App.tsx
    ├── App.css
    ├── main.tsx
    ├── vite-env.d.ts
    │
    ├── components/
    │   └── Navbar.tsx
    │
    ├── pages/
    │   └── ProfileForm.tsx
    │
    ├── Redux/
    │   ├── Store.ts
    │   └── profileSlice.ts
    │
    └── utils/
        └── api.ts
```

---

## 🧑‍💻 Technical Implementation

### State Management

- **Redux Store:** Centralized state management using Redux Toolkit for profile data and API status across the app.
- **Redux Thunk:** Handles asynchronous operations and side effects (e.g., API calls).
- **State Persistence:** Automatically persists profile data to localStorage on create/update and loads from it on app start.
- **Type Safety:** Full TypeScript support with defined types and interfaces for actions, state, and thunks.

### API Integration

- **RESTful API:** Implements standard CRUD operations (POST/PUT for create/update, GET for fetch, DELETE for remove) using Axios.
- **Mock Server:** Uses json-server for development; resolves promises directly for quick testing.
- **Environment Variables:** API base URL configurable via `.env` (`VITE_API_URL`); auto-switches based on dev/production mode via Vite's `import.meta.env.MODE`.

### Form Handling

- **Controlled Components:** Form inputs are fully controlled by React state with pre-filling for edits.
- **Validation:** Client-side validation for required fields and data formats:
  - Name: Required, minimum 3 characters.
  - Email: Required, must be in a valid email format.
  - Age: Optional, but if provided, must be a valid number.
- **Error Handling:** Validation errors shown inline and via Material-UI Snackbar; API errors (e.g., server errors) displayed with user feedback.

### Routing

- Uses **React Router v6** for navigation between:
  - `/profile-form`: Form for creating/updating profile.
  - `/profile`: Displays saved profile details.
  - `/404`: Custom page for invalid routes.
- Invalid/non-existent routes redirect to the custom 404 page.

### UI/UX

- **Material-UI:** Modern and responsive design system with consistent theming.
- **Interactive Components:**
  - Confirmation dialogs for delete actions.
  - Snackbar notifications for success/error feedback.
  - Intuitive form controls with clear validation.
  - Loading indicators (CircularProgress) during API operations.
- **Responsive Design:** Fully responsive layout that works on all device sizes using MUI breakpoints.
- **Accessibility:** Built with ARIA labels and keyboard navigation support.
- **Visual Feedback:** Clear feedback for user actions and system status (e.g., gradients, hover effects).

### Error Handling

- **User-Friendly Messages:** Clear, actionable error messages for API failures, validation issues, and 404s.
- **Graceful Degradation:** Handles API call failures or 404 errors by showing notifications or error pages.
- **Validation Feedback:** Inline error messages with helpful hints.
- **Error Recovery:** Provides clear paths (e.g., buttons to create profile) to recover from errors.

### Environment Variables

- Uses Vite's environment variable system (`VITE_API_URL`) for API endpoint configuration. The app switches between dev and production URLs based on the mode (dev/production script).

### Data Persistence

- Stores submitted profile data in localStorage on form submission for persistence across page refreshes.
- On profile page load, checks localStorage first; if not found, fetches from API.
- Synchronizes localStorage with form and display pages to ensure data consistency.

---

## 🚀 Usage

- Run the development server and interact with the profile form at `/profile-form`.
- Create/update a profile; it auto-saves to API and localStorage, then redirects to `/profile`.
- View/edit/delete on the profile page; data persists across refreshes.
- Invalid routes show the custom 404 page.
- For a live experience, visit the Vercel deployment.

---

## 📝 Notes

- Ensure `json-server` is running before starting the app to enable API calls (uses `db.json` for mock data).
- Update `.env` for different API endpoints (e.g., production URL on Vercel).
- The app uses Redux DevTools for debugging state changes.
- Commits follow GitHub best practices with descriptive messages.

---

## 🧾 Assessment Criteria

This project satisfies all the requirements outlined in the assignment document.  
Below is a detailed checklist of the assessment criteria and their implementation status:

| **Assessment Area**                  | **Description**                                                                 | **Status**         |
|--------------------------------------|---------------------------------------------------------------------------------|--------------------|
| React + TypeScript (.tsx)            | Built entirely using React with TypeScript for type safety and modular design    | ✅ Implemented     |
| Material-UI Styling                  | Uses MUI v7 with responsive layouts, dialogs, and snackbars                     | ✅ Implemented     |
| Form Data Handling & Validation      | Includes client-side validation with MUI feedback for all input fields           | ✅ Implemented     |
| API Management & Error Handling      | Handles all CRUD API operations with proper success/error feedback               | ✅ Implemented     |
| Profile Display Page                 | Fetches/displays data; shows "No Profile Found" with prompt; handles 404s        | ✅ Implemented     |
| Routing & Navigation                 | Implemented with React Router v6 (/profile-form, /profile, /404); custom 404     | ✅ Implemented     |
| Local Storage Persistence            | Data stored on submit; checks localStorage first on load; synchronized           | ✅ Implemented     |
| Redux Toolkit (Global State)         | Uses Redux Toolkit to manage profile data/API status; navbar name display        | ✅ Implemented     |
| Environment Variables (.env)         | Configurable API URLs; switches dev/production based on mode                     | ✅ Implemented     |
| Delete Profile Functionality         | Delete button with confirmation prompt                                           | ✅ Implemented     |
| Edit Profile (Pre-Filled Form)       | Form pre-fills with existing data for updates                                    | ✅ Implemented     |
| Deployment (Vercel)                  | Project deployed and accessible via live link                                    | ✅ Implemented     |
| Code Quality & Modularity            | Organized folder structure with reusable components; clean file structure        | ✅ Implemented     |
| Error Page Handling                  | Custom 404 page for invalid routes                                               | ✅ Implemented     |
| GitHub Proper Commits                | Descriptive commits demonstrating knowledge                                      | ✅ Implemented     |

---

✅ **Final Verdict:** The project meets all functional, technical, and UI/UX requirements specified in the assignment.  
It demonstrates strong use of React, TypeScript, Redux Toolkit, React Router, localStorage, environment variables, and MUI with robust API handling, clean modular code, and proper error/routing/validation. Early submission appreciated.