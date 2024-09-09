"use client";

import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Right side with image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/auth-image.png?height=1080&width=1920"
          alt="Mentorship"
          layout="fill"
          objectFit="cover"
          className="rounded-l-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-75 rounded-l-2xl"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Join Path Finders</h1>
            <p className="text-xl mb-8">
              Start your journey of growth and mentorship
            </p>
          </div>
        </div>
      </div>

      {/* Left side with sign-up form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up for Path Finders</CardTitle>
            <CardDescription>
              Create a new account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="mentee" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mentee">Mentee</TabsTrigger>
                <TabsTrigger value="mentor">Mentor</TabsTrigger>
              </TabsList>
              <TabsContent value="mentee">
                <SignUpForm userType="mentee" />
              </TabsContent>
              <TabsContent value="mentor">
                <SignUpForm userType="mentor" />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Button variant="link" asChild>
              <Link href="/login">Already have an account? Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function SignUpForm({ userType }: { userType: "mentor" | "mentee" }) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle sign-up form submission
    console.log(`${userType} sign-up submitted`);
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign-up
    console.log(`Google sign-up clicked for ${userType}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={handleGoogleSignUp}
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
          />
        </svg>
        Sign up with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or sign up with
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="John Doe" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" type="password" required />
      </div>
      {userType === "mentor" && (
        <div className="space-y-2">
          <Label>Areas of Expertise</Label>
          <RadioGroup defaultValue="frontend">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="frontend" id="frontend" />
              <Label htmlFor="frontend">Frontend Development</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="backend" id="backend" />
              <Label htmlFor="backend">Backend Development</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fullstack" id="fullstack" />
              <Label htmlFor="fullstack">Full Stack Development</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mobile" id="mobile" />
              <Label htmlFor="mobile">Mobile Development</Label>
            </div>
          </RadioGroup>
        </div>
      )}
      {userType === "mentee" && (
        <div className="space-y-2">
          <Label>Learning Goals</Label>
          <RadioGroup defaultValue="career">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="career" id="career" />
              <Label htmlFor="career">Career Advancement</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="skills" id="skills" />
              <Label htmlFor="skills">Skill Development</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="networking" id="networking" />
              <Label htmlFor="networking">Networking</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="project" id="project" />
              <Label htmlFor="project">Project Guidance</Label>
            </div>
          </RadioGroup>
        </div>
      )}
      <Button type="submit" className="w-full">
        Sign Up as {userType.charAt(0).toUpperCase() + userType.slice(1)}
      </Button>
    </form>
  );
}
