// export const BACKEND_URL="http://localhost:8000"
// export const FRONTEND_URL="http://localhost:3001"
export const BACKEND_URL="https://mascca-backend.onrender.com"
export const FRONTEND_URL="https://mascaa.eddrix.com"
export const PUBLISH_URL=FRONTEND_URL;
export const BASE_URL=BACKEND_URL
export const FRONTEND_URLI="https://mascaa-instructor.eddrix.com"

export   const steps = [
  {
    selector: '#tour-step-home',
    content: 'Hola ! Home page ❤️   ',
  },
 
  {
    selector: '#tour-step-test',
    content: 'See all the test you took - place for your achievements 🏆  ', 
  },
 
  {
    selector: '#tour-step-available',
    content: 'Check all the available 🆓 free tests   ',
  },
 
  {
    selector: '#tour-step-take',
    content: 'Take tests from here 🛫   ',
  },
 
  {
    selector: '#tour-step-upgrade',
    content: 'Upgrade yourself 💥! Unlimited & Worthy ',
  },
 
]


export const parseJwt = (token:string)=>{
    if (!token) { return; }
    const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export const departments = [
  { label: "Computer Science & Engineering", value: "CSE" },
  { label: "Electronics & Communication Engineering", value: "ECE" },
  { label: "Electrical Engineering", value: "EEE" },
  { label: "Information Technology", value: "IT" },
  { label: "Mechanical Engineering", value: "ME" },
  { label: "Metallurgical Engineering", value: "MET" },
  { label: "Civil Engineering", value: "CE" },
  { label: "Chemical Engineering", value: "CHE" },
  { label: "Biotechnology Engineering", value: "BT" },
]


export const TOPICS = [
  {
    value: "technology",
    label: "Technology",
  },
  {
    value: "computer-science",
    label: "Computer Science",
  },
  {
    value: "mathematics",
    label: "Mathematics",
  },
  {
    value: "physics",
    label: "Physics",
  },
  {
    value: "chemistry",
    label: "Chemistry",
  },
  {
    value: "biology",
    label: "Biology",
  },
  {
    value: "psychology",
    label: "Psychology",
  },
  {
    value: "history",
    label: "History",
  },
  {
    value: "literature",
    label: "Literature",
  },
  {
    value: "economics",
    label: "Economics",
  },
  {
    value: "sociology",
    label: "Sociology",
  },
  {
    value: "engineering",
    label: "Engineering",
  },
  {
    value: "mechanical-engineering",
    label: "Mechanical Engineering",
  },
  {
    value: "electrical-engineering",
    label: "Electrical Engineering",
  },
  {
    value: "civil-engineering",
    label: "Civil Engineering",
  },
  {
    value: "computer-engineering",
    label: "Computer Engineering",
  },
  {
    value: "software-engineering",
    label: "Software Engineering",
  },
  {
    value: "algorithms",
    label: "Algorithms",
  },
  {
    value: "data-structures",
    label: "Data Structures",
  },
  {
    value: "database-management",
    label: "Database Management",
  },
  {
    value: "behavioural",
    label: "Behavioural",
  },
  {
    value: "interview",
    label: "Interview",
  },
];

