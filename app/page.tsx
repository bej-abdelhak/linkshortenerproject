import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Link Shortener</h1>
      <p className="text-muted-foreground">Sign in or sign up to get started.</p>
      <div className="flex gap-4">
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button variant="outline">Sign Up</Button>
        </SignUpButton>
      </div>
    </main>
  );
}
