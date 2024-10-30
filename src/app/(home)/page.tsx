import Container from "@/components/Container";
import SignInForm from "@/components/Home/SignInForm";
import { GalleryHorizontalEnd, CornerDownRight } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <main className="relative">
      <div
        className="absolute -left-[578px] -top-[822px] -z-10 h-[1500px] w-[1500px] rounded-full opacity-75 blur-3xl"
        style={{
          backgroundImage: "radial-gradient(circle, #576EFF 0%, #0D0D0D 100%)",
        }}
      />
      <header className="flex items-center justify-center py-10">
        <div className="flex gap-2.5">
          <span>
            <GalleryHorizontalEnd className="h-12 w-12 text-accent" />
          </span>
          <h1 className="font-labil text-4xl">trackker</h1>
        </div>
      </header>
      <Container>
        <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-foreground to-background/0 bg-clip-text py-16 text-center font-labil text-transparent">
          <h1 className="text-7xl">Track, Solve & Progress</h1>
          <div className="flex items-center gap-2.5">
            <span>
              <CornerDownRight className="h-14 w-14 text-accent" />
            </span>
            <h2 className="pt-2.5 text-5xl">
              Faster with{" "}
              <span className="underline decoration-accent decoration-wavy">
                Precision
              </span>
            </h2>
          </div>
          <SignInForm />
        </div>
      </Container>
    </main>
  );
}
