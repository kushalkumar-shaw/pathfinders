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

export default function LoginPage() {
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
            <h1 className="text-4xl font-bold mb-6">Welcome to Path Finders</h1>
            <p className="text-xl mb-8">Empowering growth through mentorship</p>
          </div>
        </div>
      </div>

      {/* Left side with login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Login to Path Finders</CardTitle>
            <CardDescription>
              Welcome back! Please login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="mentee" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mentee">Mentee</TabsTrigger>
                <TabsTrigger value="mentor">Mentor</TabsTrigger>
              </TabsList>
              <TabsContent value="mentee">
                <LoginForm userType="mentee" />
              </TabsContent>
              <TabsContent value="mentor">
                <LoginForm userType="mentor" />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Button variant="link" asChild>
              <Link href="/signup">{"Don't have an account? Sign Up"}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function LoginForm({ userType }: { userType: "mentor" | "mentee" }) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle login form submission
    console.log(`${userType} login submitted`);
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log(`Google login clicked for ${userType}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center"
        onClick={handleGoogleLogin}
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
          />
        </svg>
        Continue with Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
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
      <div className="space-y-2 pb-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required />
      </div>
      <Link
        href={
          (userType.charAt(0).toUpperCase() + userType.slice(1)).toLowerCase() +
          "/dashboard"
        }
        className="w-full"
      >
        <Button type="submit" className="w-full">
          Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </Button>
      </Link>
      <Button variant="link" className="w-full" asChild>
        <Link href="/forgot-password">Forgot password?</Link>
      </Button>
    </form>
  );
}
