import { pageMetadata } from "@/content/pages";
import InvitePage from "@/components/invite/InvitePage";
import { normalizeReferralCode } from "@/lib/referral";

export const metadata = pageMetadata["invite"];

type InviteRouteProps = {
  searchParams: Promise<{ ref?: string | string[] }>;
};

export default async function InviteRoute({ searchParams }: InviteRouteProps) {
  const { ref } = await searchParams;
  // An invalid or missing code shows the general "Get QuickBite" page, never an error.
  const code = normalizeReferralCode(Array.isArray(ref) ? ref[0] : ref);
  return <InvitePage code={code} />;
}
