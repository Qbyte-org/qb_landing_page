import { pageMetadata } from "@/content/pages";
import Waitlist from "@/components/waitlist/Waitlist";
import "./waitlist.css";

export const metadata = pageMetadata["waitlist"];

type WaitlistPageProps = {
  searchParams: Promise<{ email?: string | string[] }>;
};

export default async function WaitlistPage({ searchParams }: WaitlistPageProps) {
  const params = await searchParams;
  const email =
    typeof params.email === "string" ? params.email.slice(0, 254) : "";

  return <Waitlist initialEmail={email} />;
}
