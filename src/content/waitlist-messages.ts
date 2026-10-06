/** Frontend validation and fallback copy; successful API acknowledgements stay server-owned. */
export const waitlistApiMessages = {
  contact: "Enter an email address or a Nigerian mobile number so we can reach you.",
  name: "Please keep your name to 100 characters or fewer.",
  email: "Enter a valid email address.",
  phone: "Enter a Nigerian mobile number, such as 0803 123 4567 or +234 803 123 4567.",
  consent: "Please agree to receive your QuickBite launch update before joining.",
  configuration: "The waitlist is temporarily unavailable. Please try again later.",
  rateLimited: "Too many attempts. Please wait a minute before trying again.",
  invalidResponse: "We could not confirm your submission. Please try again.",
  validationFailed: "Please check your contact details and consent, then try again.",
  requestFailed: "We could not submit your request. Please try again later.",
  timeout: "Your request took too long. Please try again.",
  network: "We could not connect to the waitlist. Check your connection and try again.",
} as const;
