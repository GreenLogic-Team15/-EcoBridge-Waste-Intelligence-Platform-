export const WASTE_DATA = [
  { name: "Jan", amount: 400 },
  { name: "Feb", amount: 300 },
  { name: "Mar", amount: 550 },
  { name: "Apr", amount: 450 },
  { name: "May", amount: 600 },
  { name: "Jun", amount: 350 },
];

export const SEGREGATION_DATA = [
  { name: "Mon", score: 85 },
  { name: "Tue", score: 70 },
  { name: "Wed", score: 90 },
  { name: "Thu", score: 65 },
  { name: "Fri", score: 80 },
];

export const RECENT_ACTIVITIES = [
  {
    id: 1,
    user: "John Doe",
    activity: "Waste Entry",
    status: "Successful",
    date: "2026-02-20",
  },
  {
    id: 2,
    user: "Sarah Smith",
    activity: "Pickup Request",
    status: "Pending",
    date: "2026-02-20",
  },
  {
    id: 3,
    user: "Mike Johnson",
    activity: "Waste Entry",
    status: "Successful",
    date: "2026-02-19",
  },
  {
    id: 4,
    user: "EcoFarm A",
    activity: "Pickup Request",
    status: "Successful",
    date: "2026-02-18",
  },
];

export const PICKUP_REQUESTS = [
  {
    id: 1,
    title: "Orange Peels",
    type: "Organic",
    date: "Feb 16, 2:00 pm",
    location: "EcoFarms #0022",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1596451190630-186aff535bf2?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 2,
    title: "Left-over Soaps",
    type: "Hazardous",
    date: "Feb 20, 2:00 pm",
    location: "Balogun & Co. #0022",
    status: "Scheduled",
    image:
      "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 3,
    title: "Plastic Bottles",
    type: "Recyclable",
    date: "Feb 8, 2:00 pm",
    location: "Berg Jeans #0022",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=200&h=200",
  },
  {
    id: 4,
    title: "Aluminium Cans",
    type: "Recyclable",
    date: "Feb 16, 8:00 am",
    location: "AJ Steel Collectors #0026",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200&h=200",
  },
];

export const NOTIFICATIONS = [
  {
    id: 1,
    title: "Pickup Scheduled for Tomorrow",
    time: "31 Feb 15:00 pm",
    desc: "Your waste pickup is scheduled for 9:00AM tomorrow.",
    type: "info",
  },
  {
    id: 2,
    title: "Waste Segregation Reminder",
    time: "01 Mar 16:00 pm",
    desc: "Please ensure proper segregation of recyclables and non-recyclables.",
    type: "warning",
  },
  {
    id: 3,
    title: "Environmental Impact Notification",
    time: "31 Feb 15:00 pm",
    desc: "You have saved 50kg of CO2 this month!",
    type: "success",
  },
];
