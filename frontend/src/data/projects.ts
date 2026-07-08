export interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  createdAt: string;
}

export const projects: Project[] = [
  {
    _id: "1",
    title: "Nexus Financial Portal",
    category: "Web Application",
    description: "<p>A comprehensive fintech dashboard built for real-time transaction monitoring and analytics. The system handles thousands of concurrent users with sub-second latency.</p><p>Key features include live fraud detection, automated reporting, and multi-currency support with a focus on East African payment integrations.</p>",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    link: "https://stripe.com",
    createdAt: "2024-01-15"
  },
  {
    _id: "2",
    title: "MediCore Health System",
    category: "System Architecture",
    description: "<p>An enterprise-grade hospital management system connecting patients, doctors, and laboratories. Built with HIPAA-compliant data handling and offline-first capabilities.</p><p>The platform reduced patient wait times by 40% through intelligent queue management and automated appointment scheduling.</p>",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    link: "https://www.oracle.com/health/",
    createdAt: "2024-03-22"
  },
  {
    _id: "3",
    title: "Luxe Fashion Brand",
    category: "UI/UX Design",
    description: "<p>A complete digital brand overhaul for a luxury fashion house entering the African market. The design captures elegance while optimizing for mobile commerce.</p><p>The result was a 280% increase in online engagement and a seamless checkout experience across 12 countries.</p>",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    link: "https://www.louisvuitton.com",
    createdAt: "2024-05-10"
  },
  {
    _id: "4",
    title: "AgriTech Supply Chain",
    category: "System Branding",
    description: "<p>End-to-end logistics platform connecting smallholder farmers to urban markets. Features real-time GPS tracking, quality grading, and automated payout systems.</p><p>The platform processes over KES 50M in monthly transactions with a 99.9% uptime record.</p>",
    image: "https://images.unsplash.com/photo-1574943320219-553f4c8b?w=800&q=80",
    link: "https://twiga.com",
    createdAt: "2024-06-18"
  },
  {
    _id: "5",
    title: "EduLearn Platform",
    category: "Web Application",
    description: "<p>A scalable e-learning platform serving 50,000+ students across Kenya. Includes live classes, assignment grading, and AI-powered tutoring assistance.</p><p>The platform achieved a 92% course completion rate through gamification and peer-learning features.</p>",
    image: "https://images.unsplash.com/photo-1501504905252-47305?w=800&q=80",
    link: "https://www.coursera.org",
    createdAt: "2024-07-05"
  },
  {
    _id: "6",
    title: "GreenEnergy Dashboard",
    category: "System Architecture",
    description: "<p>IoT-enabled monitoring system for solar micro-grids across rural Kenya. Provides real-time energy production data, fault detection, and maintenance scheduling.</p><p>The dashboard reduced downtime by 65% and improved energy delivery predictions.</p>",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
    link: "https://www.se.com/ww/en/work/solutions/for-business/energy-management/",
    createdAt: "2024-08-12"
  }
];
