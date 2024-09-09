"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, Calendar, Award } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Junior Developer",
    company: "TechStart Inc.",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Mentor Connect helped me bridge the gap between my coding bootcamp and my first tech job. My mentor's guidance was invaluable!",
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "UX Designer",
    company: "DesignHub",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The personalized mentorship I received through Mentor Connect accelerated my career growth. I'm now leading my own design team!",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Data Scientist",
    company: "AI Innovations",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "My mentor's industry insights and practical advice helped me navigate the complex field of AI and land my dream job.",
  },
];

function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden h-[300px]">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {testimonials.concat(testimonials).map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="w-full flex-shrink-0"
          >
            <Card className="h-full">
              <CardContent className="flex flex-col items-center text-center p-6">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={100}
                  height={100}
                  className="rounded-full mb-4"
                />
                <p className="text-lg italic mb-4">
                  &quot{testimonial.quote}&quot
                </p>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">
                  {testimonial.role} at {testimonial.company}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Mentor Connect Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login" className="text-black">
                Log In
              </Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                  Connect, Learn, Grow
                </h1>
                <p className="mt-3 text-xl sm:text-2xl md:mt-5">
                  Find your perfect mentor and accelerate your career in tech
                </p>
                <div className="mt-10">
                  <Button size="lg" asChild className="rounded-full">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0">
                <Image
                  src="/hero-image.jpg?height=400&width=600"
                  alt="Mentorship Illustration"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Why Choose Path Finders?
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Empower your journey with personalized guidance from industry
                experts
              </p>
            </div>

            <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<Users className="h-10 w-10 text-indigo-600" />}
                title="Expert Mentors"
                description="Connect with experienced professionals from top tech companies"
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10 text-indigo-600" />}
                title="Flexible Scheduling"
                description="Book sessions that fit your schedule with our easy-to-use platform"
              />
              <FeatureCard
                icon={<BookOpen className="h-10 w-10 text-indigo-600" />}
                title="Tailored Learning"
                description="Get personalized advice and resources to accelerate your growth"
              />
              <FeatureCard
                icon={<Award className="h-10 w-10 text-indigo-600" />}
                title="Skill Development"
                description="Enhance your technical and soft skills to stand out in the industry"
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Success Stories
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Hear from our mentees who have transformed their careers
              </p>
            </div>
            <TestimonialCarousel />
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Ready to Take the Next Step?
              </h2>
              <p className="mt-4 text-xl">
                Join Path Finders today and start your journey towards success
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  asChild
                  className="rounded-full bg-white text-indigo-600 hover:bg-gray-100"
                >
                  <Link href="/signup">Sign Up Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="mt-2 text-sm">
                © 2024 Mentor Connect. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <Link href="/about" className="hover:text-gray-300">
                About
              </Link>
              <Link href="/contact" className="hover:text-gray-300">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center">{icon}</div>
        <CardTitle className="text-center mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
