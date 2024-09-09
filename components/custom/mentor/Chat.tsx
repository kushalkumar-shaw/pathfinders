"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SendIcon,
  PaperclipIcon,
  PhoneIcon,
  VideoIcon,
  MoreVerticalIcon,
} from "lucide-react";

// Mock data for mentors
const mentors = [
  {
    id: "1",
    name: "Dr. Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Great! Let me know if you have any more questions.",
  },
  {
    id: "2",
    name: "Prof. Mike Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastMessage: "We'll discuss this in our next session.",
  },
  {
    id: "3",
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Don't forget to submit your assignment by Friday.",
  },
];

// Mock data for chat messages
const initialMessages = [
  {
    id: 1,
    sender: "mentor",
    content: "Hello! How can I help you today?",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    sender: "mentee",
    content: "Hi Dr. Smith! I have a question about React hooks.",
    timestamp: "10:02 AM",
  },
  {
    id: 3,
    sender: "mentor",
    content:
      "Sure, I'd be happy to help. What specific aspect of React hooks are you struggling with?",
    timestamp: "10:05 AM",
  },
  {
    id: 4,
    sender: "mentee",
    content:
      "I'm having trouble understanding the useEffect hook. Could you explain when to use it and how it differs from componentDidMount?",
    timestamp: "10:07 AM",
  },
  {
    id: 5,
    sender: "mentor",
    content:
      "The useEffect hook is used for side effects in functional components. Unlike componentDidMount, which only runs once after the initial render, useEffect can run after every render or only when certain dependencies change.",
    timestamp: "10:10 AM",
  },
  {
    id: 6,
    sender: "mentor",
    content:
      "Here's a simple example:\n\nuseEffect(() => {\n  // This runs after every render\n  console.log('Component updated');\n\n  return () => {\n    // This runs before the component is unmounted\n    console.log('Component will unmount');\n  };\n}, []); // Empty dependency array means it only runs once, like componentDidMount",
    timestamp: "10:12 AM",
  },
  {
    id: 7,
    sender: "mentee",
    content:
      "Thank you, that helps a lot! So if I want to fetch data when the component mounts, I would use useEffect with an empty dependency array?",
    timestamp: "10:15 AM",
  },
  {
    id: 8,
    sender: "mentor",
    content:
      "Exactly! You've got it. Is there anything else you'd like to know about useEffect or other hooks?",
    timestamp: "10:17 AM",
  },
];

export default function ChatPage() {
  const [selectedMentor, setSelectedMentor] = useState(mentors[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      sender: "mentee",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="container mx-auto p-4 ">
      <Card className="h-full">
        <CardContent className="p-0 flex h-full">
          {/* Sidebar */}
          <div className="w-1/4 border-r">
            <CardHeader>
              <CardTitle>Chats</CardTitle>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className={`flex items-center space-x-4 p-4 hover:bg-accent cursor-pointer ${
                    selectedMentor.id === mentor.id ? "bg-accent" : ""
                  }`}
                  onClick={() => setSelectedMentor(mentor)}
                >
                  <Avatar>
                    <AvatarImage src={mentor.avatar} alt={mentor.name} />
                    <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{mentor.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {mentor.lastMessage}
                    </p>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      mentor.status === "online"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={selectedMentor.avatar}
                    alt={selectedMentor.name}
                  />
                  <AvatarFallback>
                    {selectedMentor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedMentor.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {selectedMentor.status}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="icon" variant="ghost">
                  <PhoneIcon className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <VideoIcon className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <Tabs defaultValue="chat" className="flex-1 flex flex-col">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "mentee"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === "mentee"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs text-right mt-1 opacity-70">
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-grow"
                    />
                    <Button type="submit" size="icon">
                      <SendIcon className="h-4 w-4" />
                    </Button>
                    <Button type="button" size="icon" variant="outline">
                      <PaperclipIcon className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </TabsContent>
              <TabsContent value="files">
                <div className="p-4">
                  <p>Files shared in this chat will appear here.</p>
                </div>
              </TabsContent>
              <TabsContent value="tasks">
                <div className="p-4">
                  <p>Tasks assigned in this chat will appear here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
