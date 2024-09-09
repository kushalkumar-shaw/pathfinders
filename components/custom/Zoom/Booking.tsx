"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { format, addDays, setHours, setMinutes, isBefore } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, ClockIcon } from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  skills: string[];
}

interface TimeSlot {
  start: Date;
  end: Date;
}

interface SessionType {
  id: string;
  name: string;
  duration: number;
  description: string;
}

const sessionTypes: SessionType[] = [
  {
    id: "1",
    name: "1-on-1 Mentoring",
    duration: 30,
    description: "Personal mentoring session",
  },
  {
    id: "2",
    name: "Code Review",
    duration: 45,
    description: "Review and discuss your code",
  },
  {
    id: "3",
    name: "Career Guidance",
    duration: 60,
    description: "Discuss career paths and opportunities",
  },
];

// Mock function to get available time slots
const getAvailableTimeSlots = (date: Date, duration: number): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const start = setMinutes(setHours(date, hour), minute);
      const end = addDays(start, 0);
      end.setMinutes(end.getMinutes() + duration);

      if (isBefore(end, setHours(date, endHour))) {
        slots.push({ start, end });
      }
    }
  }

  // Randomly remove some slots to simulate unavailability
  return slots.filter(() => Math.random() > 0.3);
};

export default function BookSessionPage() {
  const params = useParams();
  const mentorId = params.mentorId as string;
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSessionType, setSelectedSessionType] = useState<SessionType>(
    sessionTypes[0]
  );
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const mentorData: Mentor = {
      id: mentorId,
      name: "Dr. Jane Smith",
      avatar: "/placeholder.svg?height=200&width=200",
      title: "Senior Software Engineer",
      skills: ["React", "Node.js", "GraphQL", "System Design"],
    };
    setMentor(mentorData);
  }, [mentorId]);

  useEffect(() => {
    if (selectedDate && selectedSessionType) {
      const slots = getAvailableTimeSlots(
        selectedDate,
        selectedSessionType.duration
      );
      setAvailableSlots(slots);
      setSelectedSlot(null);
    }
  }, [selectedDate, selectedSessionType]);

  const handleDateChange = (offset: number) => {
    const newDate = addDays(selectedDate, offset);
    if (isBefore(newDate, new Date())) return;
    setSelectedDate(newDate);
  };

  const handleBookSession = () => {
    if (selectedSlot && mentor) {
      // In a real application, you would send this data to your backend
      console.log("Booking session:", {
        mentorId: mentor.id,
        mentorName: mentor.name,
        sessionType: selectedSessionType.name,
        date: format(selectedSlot.start, "yyyy-MM-dd"),
        startTime: format(selectedSlot.start, "HH:mm"),
        endTime: format(selectedSlot.end, "HH:mm"),
      });
      alert("Session booked successfully!");
    }
  };

  if (!mentor) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen px-12">
      <h1 className="text-3xl font-bold mb-6">
        Book a Session with {mentor.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={mentor.avatar} alt={mentor.name} />
              <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-center mt-4">{mentor.name}</CardTitle>
            <CardDescription className="text-center">
              {mentor.title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center">
              {mentor.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Book Your Session</CardTitle>
            <CardDescription>
              Select a date, session type, and time slot
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Button onClick={() => handleDateChange(-1)} variant="outline">
                Previous Day
              </Button>
              <div className="text-center">
                <CalendarIcon className="inline-block mr-2" />
                {format(selectedDate, "MMMM d, yyyy")}
              </div>
              <Button onClick={() => handleDateChange(1)} variant="outline">
                Next Day
              </Button>
            </div>
            <Select
              value={selectedSessionType.id}
              onValueChange={(value) =>
                setSelectedSessionType(
                  sessionTypes.find((type) => type.id === value) ||
                    sessionTypes[0]
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select session type" />
              </SelectTrigger>
              <SelectContent>
                {sessionTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name} ({type.duration} min)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {availableSlots.map((slot, index) => (
                <Button
                  key={index}
                  variant={selectedSlot === slot ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setSelectedSlot(slot)}
                >
                  {format(slot.start, "HH:mm")}
                </Button>
              ))}
            </div>
            {selectedSlot && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Selected Time Slot</h3>
                <p>
                  <ClockIcon className="inline-block mr-2" />
                  {format(selectedSlot.start, "HH:mm")} -{" "}
                  {format(selectedSlot.end, "HH:mm")}
                </p>
                <Button className="w-full mt-4" onClick={handleBookSession}>
                  Book Session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
