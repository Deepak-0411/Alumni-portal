import { useState } from "react";
import styles from "./Docs.module.css";
import { Link } from "react-router-dom";

const credentials = {
  superAdmin: {
    email: "admin@college.edu",
    password: "Admin@1234",
    loginPath: "/alumni/superAdmin/login",
    dashboardPath: "/alumni/superAdmin",
  },
  subAdmin: {
    email: "faculty@college.edu",
    password: "Faculty@1234",
    loginPath: "/alumni/sub-admin/login",
    dashboardPath: "/alumni/sub-admin",
  },
  user: {
    email: "faculty@college.edu",
    password: "Faculty@1234",
    loginPath: "/alumni/login",
    dashboardPath: "/alumni/user",
  },
};

const flowSteps = [
  {
    title: "Visit the portal",
    desc: "Land on the public home page. Browse public content, view contact information, or proceed to register.",
    path: "/alumni/home",
    note: null,
  },
  {
    title: "Register an account",
    desc: "Fill out the registration form. After submitting, the request enters a pending state — login is not possible yet.",
    path: "/alumni/register",
    note: "Account inactive until approved",
  },
  {
    title: "Check request status",
    desc: "Visit the status page to see whether the registration has been reviewed or is still pending.",
    path: "/alumni/checkStatus",
    note: null,
  },
  {
    title: "Sub-admin reviews",
    desc: "A sub-admin reviews and approves the request. On approval, the system sends login credentials by email.",
    path: "/alumni/sub-admin/verify-users",
    note: "Email with ID and password is sent",
  },
  {
    title: "First login",
    desc: "Log in with the credentials received by email. A password change is prompted on first login.",
    path: "/alumni/login",
    note: null,
  },
  {
    title: "Get membership card",
    desc: "After logging in, the user lands on the membership card page and can purchase their alumni card.",
    path: "/alumni/user/membershipCard",
    note: null,
  },
  {
    title: "Access the portal",
    desc: "Full access to events, profile management, password changes, and contact options.",
    path: "/alumni/user/",
    note: null,
  },
];
const roles = [
  {
    role: "User",
    access: [
      "Membership card and payment",
      "Browse and register for events",
      "Edit profile",
      "Change password",
      "Contact the university",
    ],
  },
  {
    role: "Sub-Admin",
    access: [
      "Review pending registrations",
      "Approve or reject alumni",
      "View active users",
      "View approved alumni list",
    ],
  },
  {
    role: "Super Admin",
    access: [
      "Manage all alumni records",
      "Enable or disable any account",
      "Manage sub-admins",
      "Create and manage events",
      "View finance and payments",
    ],
  },
];
const publicRoutes = [
  { path: "/alumni/home", label: "Home", access: "public" },
  { path: "/alumni/login", label: "User login", access: "public" },
  {
    path: "/alumni/sub-admin/login",
    label: "Sub-admin login",
    access: "public",
  },
  {
    path: "/alumni/superAdmin/login",
    label: "Super admin login",
    access: "public",
  },
  { path: "/alumni/register", label: "Registration form", access: "public" },
  {
    path: "/alumni/checkStatus",
    label: "Check registration status",
    access: "public",
  },
  {
    path: "/alumni/forgetPassword",
    label: "Forgot password",
    access: "public",
  },
  { path: "/alumni/contactUs", label: "Contact page", access: "public" },
];
const userRoutes = [
  {
    path: "/alumni/user/membershipCard",
    label: "Membership card",
    access: "user",
  },
  { path: "/alumni/user/events", label: "Browse events", access: "user" },
  { path: "/alumni/user/profile", label: "Edit profile", access: "user" },
  {
    path: "/alumni/user/changePassword",
    label: "Change password",
    access: "user",
  },
];
const subAdminRoutes = [
  {
    path: "/alumni/sub-admin/verify-users",
    label: "Pending registrations",
    access: "subadmin",
  },
  {
    path: "/alumni/sub-admin/active-users",
    label: "Active users",
    access: "subadmin",
  },
  {
    path: "/alumni/sub-admin/approved-users",
    label: "Approved alumni",
    access: "subadmin",
  },
];

const superAdminRoutes = [
  {
    path: "/alumni/superAdmin/alumni",
    label: "Manage alumni records",
    access: "superadmin",
  },
  {
    path: "/alumni/superAdmin/events",
    label: "Create and manage events",
    access: "superadmin",
  },
  {
    path: "/alumni/superAdmin/finance",
    label: "Payment records",
    access: "superadmin",
  },
  {
    path: "/alumni/superAdmin/subAdmin",
    label: "Manage sub-admins",
    access: "superadmin",
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={handleCopy} className={styles.copyBtn}>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CredentialCard({ role, data }) {
  return (
    <div className={styles.credCard}>
      <div className={styles.credHeader}>
        <span className={styles.credRole}>{role}</span>
        <Link to={data.loginPath} className={styles.credLoginLink}>
          Go to Login
        </Link>
      </div>
      <div className={styles.credRow}>
        <span className={styles.credLabel}>Email</span>
        <span className={styles.credValue}>{data.email}</span>
        <CopyButton text={data.email} />
      </div>
      <div className={styles.credRow}>
        <span className={styles.credLabel}>Password</span>
        <span className={styles.credValue}>{data.password}</span>
        <CopyButton text={data.password} />
      </div>
      <Link to={data.dashboardPath} className={styles.credDashLink}>
        Open Dashboard
      </Link>
    </div>
  );
}
function PathChip({ path }) {
  return (
    <span className="inline-block font-mono text-xs bg-slate-200 text-slate-600 rounded px-2 py-0.5">
      {path}
    </span>
  );
}
function Routes({ title, routes }) {
  return (
    <div>
      <div className={styles.routeGroupLabel}>{title}</div>
      <div className={styles.routeList}>
        {routes.map((r) => (
          <Link key={r.path} to={r.path} className={styles.routeItem}>
            <span className={styles.routeLabel}>{r.label}</span>
            <span className={styles.routePath}>{r.path}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Docs() {
  return (
    <div className={styles.main}>
      <div className={styles.scrollContainer}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <p className={styles.tag}>Documentation</p>
            <h1 className={styles.title}>Alumni Portal</h1>
            <p className={styles.subtitle}>
              A complete guide to navigating the portal — covering how
              registration works, what each role can do, and how to access the
              admin and sub-admin panels.
            </p>
          </div>

          <div className={styles.divider} />

          {/* Quick Access */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Quick Access</h2>
            <p className={styles.sectionDesc}>
              Use the credentials below to log in and explore each role. All
              accounts are pre-configured with sample data.
            </p>
            <div className={styles.credGrid}>
              <CredentialCard role="SuperAdmin" data={credentials.superAdmin} />
              <CredentialCard role="SubAdmin" data={credentials.subAdmin} />
              <CredentialCard role="User" data={credentials.user} />
            </div>
          </section>

          <div className={styles.divider} />

          {/* How It Works */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionDesc}>
              The system follows a structured workflow from setup to reporting.
            </p>
            {/* <div className={styles.flowList}>
              {flowSteps.map((step) => (
                <div key={step.step} className={styles.flowItem}>
                  <div className={styles.flowLeft}>
                    <span className={styles.flowStep}>{step.step}</span>
                    <span
                      style={{
                        background:
                          step.actor === "Admin" ? "#dbeafe" : "#dcfce7",
                        color: step.actor === "Admin" ? "#1d4ed8" : "#15803d",
                      }}
                      className={styles.flowActor}
                    >
                      {step.actor}
                    </span>
                  </div>
                  <div className={styles.flowRight}>
                    <div className={styles.flowTitle}>{step.title}</div>
                    <div className={styles.flowDesc}>{step.description}</div>
                  </div>
                </div>
              ))}
            </div> */}
            {/* work flow */}
            <div className="relative">
              {flowSteps.map((step, i) => (
                <div key={i} className="flex gap-4 relative">
                  {/* Left column */}
                  <div className="flex flex-col items-center shrink-0 w-8">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center shrink-0 z-10">
                      {i + 1}
                    </div>
                    {i < flowSteps.length - 1 && (
                      <div className="w-px flex-1 bg-slate-200 my-1" />
                    )}
                  </div>

                  {/* Body */}
                  <div className="pb-7 flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 mb-0.5">
                      {step.title}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed mb-1.5">
                      {step.desc}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <PathChip path={step.path} />
                      {step.note && (
                        <span className="text-xs bg-blue-100 text-blue-700 border border-blue-100 rounded px-2 py-0.5">
                          {step.note}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className={styles.divider} />

          {/* Roles and access */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Roles and access</h2>
            <div className={styles.methodGrid}>
              {roles.map((r) => {
                return (
                  <div key={r.role} className={styles.methodCard}>
                    <div className={styles.methodName}>{r.role}</div>
                    <div className=" bg-white">
                      <ul className="space-y-2">
                        {r.access.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-slate-600"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className={styles.divider} />

          {/* Routes Reference */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Pages and Routes</h2>
            <p className={styles.sectionDesc}>
              Below is a reference of all accessible pages in the application.
            </p>
            <div className={styles.routesGrid}>
              <Routes title="Public" routes={publicRoutes} />
              <Routes title="User" routes={userRoutes} />
              <Routes title="Sub Admin" routes={subAdminRoutes} />
              <Routes title="Super Admin" routes={superAdminRoutes} />
            </div>
          </section>

          <div className={styles.divider} />

          {/* Footer note */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Built by{" "}
              <a
                href="https://github.com/Deepak-0411"
                className={styles.footerLink}
                target="_blank"
                rel="noreferrer"
              >
                Deepak-0411
              </a>
              . Source on{" "}
              <a
                href="https://github.com/Deepak-0411/Alumni-portal"
                className={styles.footerLink}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
