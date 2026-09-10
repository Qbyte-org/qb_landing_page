import type { Metadata } from "next";
import Waitlist from "@/components/waitlist/Waitlist";
import "./waitlist.css";

export const metadata: Metadata = {
  title: "Join the Waitlist | QuickBite",
  description:
    "Join the QuickBite waitlist for launch updates, priority access, and the first look at restaurants delivering across Ile-Ife.",
  alternates: {
    canonical: "/waitlist",
  },
};

type WaitlistPageProps = {
  searchParams: Promise<{ email?: string | string[] }>;
};

export default async function WaitlistPage({ searchParams }: WaitlistPageProps) {
  const params = await searchParams;
  const email =
    typeof params.email === "string" ? params.email.slice(0, 254) : "";

  return <Waitlist initialEmail={email} />;
}
