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
import { Progress } from "@/components/ui/progress";
import {
  CalendarIcon,
  MessageCircleIcon,
  BookIcon,
  BarChartIcon,
  GraduationCapIcon,
} from "lucide-react";

export default function MenteeDashboard() {
  return (
    <div className="container mx-auto p-4 px-4 sm:px-14 space-y-6">
      <h1 className="text-3xl font-bold">Mentee Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Completed Sessions"
          value="8"
          icon={<CalendarIcon className="h-4 w-4" />}
        />
        <StatCard
          title="Hours of Mentorship"
          value="16"
          icon={<ClockIcon className="h-4 w-4" />}
        />
        <StatCard
          title="Skills Improved"
          value="5"
          icon={<GraduationCapIcon className="h-4 w-4" />}
        />
        <StatCard
          title="Upcoming Sessions"
          value="3"
          icon={<CalendarIcon className="h-4 w-4" />}
        />
      </div>

      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningProgress.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-500">
                    {skill.progress}%
                  </span>
                </div>
                <Progress value={skill.progress} className="w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
                      src={session.mentorAvatar}
                      alt={session.mentorName}
                    />
                    <AvatarFallback>
                      {session.mentorName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{session.mentorName}</p>
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
            <Link href="/mentee/schedule">View All Sessions</Link>
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
            <Link href="/mentee/messages">View All Messages</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickActionCard
          title="Book Session"
          description="Schedule a new mentoring session"
          icon={<CalendarIcon className="h-6 w-6" />}
          href="/mentee/book-session"
        />
        <QuickActionCard
          title="Learning Resources"
          description="Access study materials and guides"
          icon={<BookIcon className="h-6 w-6" />}
          href="/mentee/resources"
        />
        <QuickActionCard
          title="Send Message"
          description="Communicate with your mentors"
          icon={<MessageCircleIcon className="h-6 w-6" />}
          href="/mentee/messages"
        />
        <QuickActionCard
          title="View Progress"
          description="Check your learning statistics"
          icon={<BarChartIcon className="h-6 w-6" />}
          href="/mentee/progress"
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

// Mock data for learning progress
const learningProgress = [
  { name: "React", progress: 75 },
  { name: "Node.js", progress: 60 },
  { name: "TypeScript", progress: 40 },
  { name: "GraphQL", progress: 25 },
];

// Mock data for upcoming sessions
const upcomingSessions = [
  {
    mentorName: "Dr. Jane Smith",
    mentorAvatar: "/placeholder.svg?height=40&width=40",
    topic: "Advanced React Patterns",
    date: "May 15, 2023",
    time: "2:00 PM",
  },
  {
    mentorName: "Prof. Mike Johnson",
    mentorAvatar: "/placeholder.svg?height=40&width=40",
    topic: "Node.js Best Practices",
    date: "May 17, 2023",
    time: "10:00 AM",
  },
  {
    mentorName: "Sarah Williams",
    mentorAvatar: "/placeholder.svg?height=40&width=40",
    topic: "TypeScript Deep Dive",
    date: "May 20, 2023",
    time: "3:30 PM",
  },
];

// Mock data for recent messages
const recentMessages = [
  {
    name: "Dr. Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Great progress on your last assignment!",
    time: "2h ago",
  },
  {
    name: "Prof. Mike Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Don't forget to review the materials for our next session.",
    time: "5h ago",
  },
  {
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "I've shared some additional resources on TypeScript.",
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
