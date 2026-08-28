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

export default function WaitlistPage() {
  return <Waitlist />;
}
