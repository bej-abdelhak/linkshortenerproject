import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Link2, BarChart3, Shield, Zap, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Zap,
    title: "Instant Shortening",
    description:
      "Paste any long URL and get a clean, shareable short link in seconds. No friction, no waiting.",
  },
  {
    icon: BarChart3,
    title: "Click Analytics",
    description:
      "Track how many times your links are clicked. Understand your audience and optimize your sharing.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Your links are stored safely and resolve instantly. Built on a modern, scalable infrastructure.",
  },
  {
    icon: Globe,
    title: "Share Anywhere",
    description:
      "Short links work across every platform — social media, email, SMS, or anywhere else you share.",
  },
  {
    icon: Clock,
    title: "Link History",
    description:
      "Access all the links you've ever created from your personal dashboard, anytime.",
  },
  {
    icon: Link2,
    title: "Custom Management",
    description:
      "Organize, view and manage every short link you create from one simple dashboard.",
  },
];

const steps = [
  {
    step: "1",
    title: "Paste your long URL",
    description: "Copy your lengthy link and paste it into the shortener input on your dashboard.",
  },
  {
    step: "2",
    title: "Get your short link",
    description: "We instantly generate a compact, memorable link that's ready to share.",
  },
  {
    step: "3",
    title: "Share & track",
    description: "Share your link anywhere and watch the click count grow in real time.",
  },
];

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <Badge variant="secondary" className="text-sm">
          Free to use · No credit card required
        </Badge>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          Shorten Links.{" "}
          <span className="text-primary">Amplify Reach.</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Create clean, shareable short links in seconds and track every click —
          all from one simple dashboard.
        </p>
        <div className="flex gap-4">
          <SignUpButton mode="modal">
            <Button size="lg" className="px-8">
              Get Started Free
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button variant="outline" size="lg" className="px-8">
              Learn More
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything you need to share smarter
            </h2>
            <p className="mt-3 text-muted-foreground">
              Powerful features packed into a simple, intuitive interface.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            <p className="mt-3 text-muted-foreground">
              Three steps and your link is ready to go.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map(({ step, title, description }) => (
              <Card key={step} className="items-center text-center">
                <CardHeader className="items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {step}
                  </div>
                  <CardTitle className="mt-2">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t px-6 py-24">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to shorten your first link?
          </h2>
          <p className="text-muted-foreground">
            Join today and start sharing smarter in under a minute.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" className="px-10">
              Create Your Free Account
            </Button>
          </SignUpButton>
        </div>
      </section>
    </main>
  );
}
