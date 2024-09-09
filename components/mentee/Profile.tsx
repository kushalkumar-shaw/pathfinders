import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, GraduationCapIcon } from "lucide-react";
import Link from "next/link";

// Mock data for the current mentee
const mentee = {
  id: "1",
  name: "Kushalkumar shaw",
  avatar: "/ava.jpg?height=200&width=200",
  title: "Aspiring Full Stack Developer",
  bio: "Passionate about web development and eager to learn new technologies. Currently focusing on React and Node.js.",
  interests: ["React", "Node.js", "TypeScript", "GraphQL"],
  joinedDate: "May 2023",
  totalSessions: 12,
  learningGoals: [
    "Master React hooks and context API",
    "Build a full-stack application using the MERN stack",
    "Improve problem-solving skills through coding challenges",
  ],
};

// Mock data for recent mentors
const recentMentors = [
  {
    id: "1",
    name: "Dr. Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Senior Software Engineer",
  },
  {
    id: "2",
    name: "Prof. Mike Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "Data Scientist",
  },
  {
    id: "3",
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    title: "UX Designer",
  },
];

// Mock data for upcoming sessions
const upcomingSessions = [
  {
    id: "1",
    mentor: "Dr. Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2023-05-15",
    time: "14:00",
    topic: "React Hooks Deep Dive",
  },
  {
    id: "2",
    mentor: "Prof. Mike Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2023-05-18",
    time: "10:00",
    topic: "Introduction to Data Structures",
  },
  {
    id: "3",
    mentor: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2023-05-20",
    time: "15:30",
    topic: "UX Design Principles",
  },
];

export default function MenteeProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Profile Section */}
        <div className="lg:w-4/5 space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={mentee.avatar} alt={mentee.name} />
                <AvatarFallback>{mentee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-2xl">{mentee.name}</CardTitle>
                <CardDescription>{mentee.title}</CardDescription>
                <div className="flex items-center justify-center sm:justify-start mt-2">
                  <GraduationCapIcon className="w-5 h-5 text-primary" />
                  <span className="ml-2 text-muted-foreground">
                    Joined {mentee.joinedDate}
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start mt-1">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <span className="ml-2 text-muted-foreground">
                    {mentee.totalSessions} sessions completed
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{mentee.bio}</p>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {mentee.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Learning Goals</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {mentee.learningGoals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Sessions Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>
                Your scheduled mentoring sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center space-x-4 border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <Avatar>
                      <AvatarImage src={session.avatar} alt={session.mentor} />
                      <AvatarFallback>
                        {session.mentor.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{session.mentor}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.topic}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {new Date(session.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {session.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href={"/mentor/Jane/booking"}>
                <Button className="w-full">
                  <CalendarIcon className="mr-2 h-4 w-4" /> Schedule New Session
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Mentors Section */}
        <div className="lg:w-1/5">
          <Card>
            <CardHeader>
              <CardTitle>Recent Mentors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMentors.map((mentor) => (
                  <div key={mentor.id} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={mentor.avatar} alt={mentor.name} />
                      <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{mentor.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {mentor.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View All Mentors
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
