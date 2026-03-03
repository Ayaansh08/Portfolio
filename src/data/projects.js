const projects = [
  {
    id: 1,
    title: 'Carbonix',
    description: 'Full-stack ESG and stock analytics dashboard with live market data, sentiment insights, and sustainability-focused investment analytics.',
    stack: ['Node.js', 'FastAPI', 'React.js', 'Alpha Vantage API'],
    link: 'https://github.com/Ayaansh08',
    status: 'DEPLOYED',
    note: 'Backend hosted on free tier — may take up to 2 min to wake after inactivity.',
  },
  {
    id: 2,
    title: 'Delhi Pollution Dashboard',
    description: 'Ward-level AQI monitoring platform for Delhi with XGBoost forecasting, real-time data filtering, and interactive pollution trend visualization.',
    stack: ['React', 'FastAPI', 'XGBoost', 'Pandas', 'NumPy'],
    link: 'https://delhi-pollution.vercel.app/',
    status: 'DEPLOYED',
    team: true,
    note: 'Backend hosted on free tier — may take up to 2 min to wake after inactivity.',
  },
  {
    id: 3,
    title: 'AI Virtual Mouse',
    description: 'Gesture-based virtual mouse using computer vision for touch-free cursor control. Real-time hand tracking optimized for accuracy under varying conditions.',
    stack: ['Python', 'OpenCV', 'Flask', 'Autopy'],
    status: 'ACTIVE',
  },
]

export default projects