import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MessageCircleIcon,
  UserIcon,
  BookIcon,
  BarChartIcon,
} from "lucide-react";

export default function MentorDashboard() {
  return (
    <div className="container mx-auto p-4 px-4 sm:px-14 space-y-6">
      <h1 className="text-3xl font-bold">Mentor Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Mentees"
          value="12"
          icon={<UserIcon className="h-4 w-4" />}
        />
        <StatCard
          title="Upcoming Sessions"
          value="5"
          icon={<CalendarIcon className="h-4 w-4" />}
        />
        <StatCard
          title="Hours Mentored"
          value="48"
          icon={<ClockIcon className="h-4 w-4" />}
        />
        <StatCard
          title="Avg. Rating"
          value="4.8"
          icon={<StarIcon className="h-4 w-4" />}
        />
      </div>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2 last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={session.menteeAvatar}
                      alt={session.menteeName}
                    />
                    <AvatarFallback>
                      {session.menteeName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{session.menteeName}</p>
                    <p className="text-sm text-gray-500">{session.topic}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{session.date}</p>
                  <p className="text-sm text-gray-500">{session.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4" variant="outline" asChild>
            <Link href="/mentor/schedule">View All Sessions</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMessages.map((message, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 border-b pb-2 last:border-b-0"
              >
                <Avatar>
                  <AvatarImage src={message.avatar} alt={message.name} />
                  <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{message.name}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {message.message}
                  </p>
                </div>
                <Badge variant="secondary">{message.time}</Badge>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4" variant="outline" asChild>
            <Link href="/mentor/messages">View All Messages</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          title="Schedule Session"
          description="Set up a new mentoring session"
          icon={<CalendarIcon className="h-6 w-6" />}
          href="/mentor/schedule"
        />
        <QuickActionCard
          title="Review Materials"
          description="Check mentee submitted materials"
          icon={<BookIcon className="h-6 w-6" />}
          href="/mentor/materials"
        />
        <QuickActionCard
          title="Send Message"
          description="Communicate with your mentees"
          icon={<MessageCircleIcon className="h-6 w-6" />}
          href="/mentor/messages"
        />
        <QuickActionCard
          title="View Analytics"
          description="Check your mentoring statistics"
          icon={<BarChartIcon className="h-6 w-6" />}
          href="/mentor/analytics"
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function QuickActionCard({
  title,
  description,
  icon,
  href,
}: QuickActionCardProps) {
  return (
    <Card className="hover:bg-accent transition-colors">
      <CardHeader>
        <div className="flex items-center space-x-4">
          {icon}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="secondary" className="w-full" asChild>
          <Link href={href}>Go</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

// Mock data for upcoming sessions
const upcomingSessions = [
  {
    menteeName: "Alice Johnson",
    menteeAvatar: "/placeholder.svg?height=40&width=40",
    topic: "React Hooks",
    date: "May 15, 2023",
    time: "2:00 PM",
  },
  {
    menteeName: "Bob Smith",
    menteeAvatar: "/placeholder.svg?height=40&width=40",
    topic: "State Management",
    date: "May 17, 2023",
    time: "10:00 AM",
  },
  {
    menteeName: "Carol Williams",
    menteeAvatar: "/placeholder.svg?height=40&width=40",
    topic: "API Integration",
    date: "May 20, 2023",
    time: "3:30 PM",
  },
];

// Mock data for recent messages
const recentMessages = [
  {
    name: "David Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Thanks for the great session!",
    time: "2h ago",
  },
  {
    name: "Eva Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Can we reschedule our next meeting?",
    time: "5h ago",
  },
  {
    name: "Frank Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "I've completed the assignment you gave me.",
    time: "1d ago",
  },
];

// Additional icons
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
