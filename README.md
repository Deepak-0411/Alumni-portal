# Alumni Portal

This is the official Alumni Portal for Gautam Buddha University (GBU), designed to connect alumni, faculty, and administrators. The platform provides role-based access for alumni, sub-admins (faculty/staff), and a super-admin, each with a dedicated dashboard and functionalities.

## Key Features

The portal is structured around three main user roles, each with a specific set of permissions and features.

### Public Features

- **Homepage:** A public-facing page showcasing university news, notable alumni, and upcoming events.
- **Alumni Registration:** A comprehensive form for alumni to register, with submissions entering a verification queue.
- **Status Check:** Allows prospective members to check the status of their registration request using their email.
- **Secure Login:** Separate login portals for Alumni, Sub-Admins, and Super-Admins.
- **Password Recovery:** A "Forgot Password" flow for alumni to reset their credentials via email.

### Alumni Features (User Role)

- **Personalized Dashboard:** Access to a user-specific dashboard after logging in.
- **Profile Management:** View and edit personal information, contact details, social media links, and upload a profile picture.
- **Membership Card:** View a digital, lifetime membership card. New, verified users are prompted for a one-time payment to acquire the card.
- **Event Viewing:** Browse a list of current and upcoming alumni events.
- **Secure Actions:** Change password and log out securely.

### Sub-Admin Features (Faculty/Staff Role)

- **Verification Dashboard:** A dedicated interface to manage alumni registrations.
- **Review & Approve/Reject:** View pending applications, review submitted details and documents, and approve or reject them. Rejection requires a reason which is communicated to the applicant.
- **User Lists:** View lists of all active, approved, and pending users.

### Super-Admin Features

- **Comprehensive Admin Panel:** Full control over all aspects of the portal.
- **Alumni Management:** View all alumni records and enable or disable any user account.
- **Sub-Admin Management:** Create new sub-admin accounts, assign them to specific schools, and manage their status (enable/disable).
- **Event Management:** Create, view, and delete alumni events.
- **Financial Overview:** View a log of all successful financial transactions from membership payments.

## Roles & Access Control

The application implements a robust role-based access control system:

| Role            | Access & Capabilities                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| **User**        | View and edit their own profile, get a membership card (after payment), view events, and change their password.  |
| **Sub-Admin**   | Review pending registrations, approve/reject alumni applications, and view lists of active and approved users.   |
| **Super Admin** | Full administrative access: manage all alumni and sub-admin accounts, create events, and view financial records. |

## Live Documentation & Testing

The portal includes a self-documenting feature accessible via the "Docs" button on the UI. This provides a complete guide to the application's workflow, roles, and routes. You can use the following pre-configured credentials to explore each role's dashboard and functionalities:

| Role            | Username/Email        | Password       | Direct Login Link             |
| --------------- | --------------------- | -------------- | ----------------------------- |
| **Super Admin** | `admin@college.edu`   | `Admin@1234`   | [/alumni/superAdmin/login](#) |
| **Sub-Admin**   | `faculty@college.edu` | `Faculty@1234` | [/alumni/sub-admin/login](#)  |
| **User**        | `faculty@college.edu` | `Faculty@1234` | [/alumni/login](#)            |

## Technology Stack

- **Frontend:** React, Vite
- **Routing:** React Router v7
- **Styling:** Tailwind CSS, CSS Modules
- **Data Fetching & State Management:** TanStack Query (React Query) v5
- **HTTP Client:** Axios
- **UI Components:** Swiper.js, React Icons, React Toastify

## Local Development

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/deepak-0411/Alumni-portal.git
    cd Alumni-portal
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Backend URL:**
    The project is configured to connect to a backend service. The base URL is hardcoded in `src/utility/baseURL.js`. For local development, you may need to update this file to point to your local backend instance.

    ```javascript
    // src/utility/baseURL.js
    export default "http://localhost:your_backend_port/";
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Project Architecture

The codebase is organized to be modular and scalable, with a clear separation of concerns.

- `src/pages/`: Contains top-level components for each page, organized into subdirectories based on user roles (`admin`, `subAdmin`, `user`, `public`).
- `src/components/`: A collection of reusable UI components used throughout the application (e.g., `Table`, `DataCard`, `Input`).
- `src/routes/`: Defines the application's routing structure using React Router. It includes protected route guards (`guards/ProtectedRoute.jsx`) to manage access based on user authentication and role.
- `src/layouts/`: Provides consistent page layouts for different sections of the app, such as `AdminLayout` for admin panels and `UserLayout` for public and user-facing pages.
- `src/apis/`: Manages all API interactions, including the Axios instance configuration and custom React Query hooks for efficient data fetching, caching, and state management.
- `src/hooks/`: Contains custom React hooks for shared logic like form validation (`useFormValidation`), API call status toggling (`useToggle`), and debouncing input (`useDebouncedValue`).
- `src/auth/`: Components dedicated to authentication, including registration and a flexible login component used across all roles.
