# Profile Management Assignment

A React-based profile management application with CRUD operations, state management using Redux Thunk, and mock API integration.

## 🚀 Tech Stack

- **Frontend**: React with TypeScript
- **State Management**: Redux Toolkit with Redux Thunk
- **UI Framework**: Material-UI (MUI)
- **Routing**: React Router
- **API Mocking**: json-server
- **Development Tools**: Vite, Redux DevTools

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

## 🧑‍💻 Approach & Optimizations

### State Management & Persistence

- Uses **Redux Toolkit** with **Redux Thunk** for handling asynchronous operations and centralized state management.
- Thunks are used for API calls, enabling clean separation of side effects from reducers.
- Profile data is persisted in **localStorage** to survive page reloads, with Redux state being automatically rehydrated on app load.

### API Integration

- CRUD operations for profiles are handled via RESTful API calls to a mock backend (`json-server`).
- API base URL is configurable via environment variables.

### Form Handling & Validation

- Profile form includes validations:
  - Name: Required, min 3 characters.
  - Email: Required, valid email format.
  - Age: Optional, must be numeric if provided.
- Validation errors are shown inline and via Material-UI Snackbar.

### Routing

- Uses **React Router** for navigation between Profile Form, Profile Display, and 404 page.
- Invalid routes redirect to a custom 404 page.

### UI/UX

- Built with **Material-UI (MUI)** for a modern and responsive design.
- Confirmation dialogs and error messages use MUI Dialog components.
- Buttons use icons and color coding for clarity.

### Error Handling

- API and validation errors are gracefully handled and displayed using dialogs and snackbars.
- Handles missing data, failed API calls, and invalid routes without crashing.

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

Feel free to contribute or raise issues on the GitHub repository.
