To update a user's primary email address in Clerk, you need to first add the new email address to their account, verify it, and then set it as primary.

The process involves:

1. **Add the new email address** using `user.createEmailAddress()` [(1)](https://clerk.com/docs/guides/development/custom-flows/authentication/email-links)
2. **Verify the email address** using email link verification
3. **Set it as primary** once verified

Here's how to implement this flow:

**Add and verify the new email:**

```tsx
"use client";
import * as React from "react";
import { useUser, useReverification } from "@clerk/nextjs";

export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [email, setEmail] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [error, setError] = React.useState("");

  const createEmailAddress = useReverification((email: string) =>
    user?.createEmailAddress({ email }),
  );

  if (!isLoaded) {
    // Handle loading state
    return null;
  }

  if (!isSignedIn) {
    // Handle signed out state
    return <p>You must be signed in to access this page</p>;
  }

  // Handle addition of the email address
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setVerifying(true);
      // Add an unverified email address to user
      const res = await createEmailAddress(email);
      // Reload user to get updated User object
      await user.reload();
      // Find the email address that was just added
      const emailAddress = user.emailAddresses.find((a) => a.id === res.id);
      if (!emailAddress) {
        setError("Email address not found");
        return;
      }
      const { startEmailLinkFlow } = emailAddress.createEmailLinkFlow();

      // Dynamically set the host domain for dev and prod
      // You could instead use an environment variable or other source for the host domain
      const protocol = window.location.protocol;
      const host = window.location.host;
      // Send the user an email with the verification link
      startEmailLinkFlow({
        redirectUrl: `${protocol}//${host}/account/add-email/verify`,
      });
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      setError("An error occurred.");
    }
  };

  async function reset(e: React.FormEvent) {
    e.preventDefault();
    setVerifying(false);
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => setError("")}>Try again</button>
      </div>
    );
  }

  if (verifying) {
    return (
      <div>
        <p>Check your email and visit the link that was sent to you.</p>
        <form onSubmit={reset}>
          <button type="submit">Restart</button>
        </form>
      </div>
    );
  }

  // Display the initial form to capture the email address
  return (
    <>
      <h1>Add email</h1>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder="Enter email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
}
```

**Verification page:**

```tsx
"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const { handleEmailLinkVerification } = useClerk();
  const [verificationStatus, setVerificationStatus] = useState("loading");

  useEffect(() => {
    async function verify() {
      try {
        await handleEmailLinkVerification({
          redirectUrl: `${window.location.protocol}//${window.location.host}/account/add-email`,
          redirectUrlComplete: `${window.location.protocol}//${window.location.host}/account`,
        });
        setVerificationStatus("verified");
      } catch (err: any) {
        let status = "failed";
        if (err?.errors?.[0]?.code === "form_identifier_not_found") {
          status = "client_mismatch";
        } else if (err?.errors?.[0]?.code === "verification_expired") {
          status = "expired";
        }
        setVerificationStatus(status);
      }
    }
    verify();
  }, [handleEmailLinkVerification]);

  if (verificationStatus === "loading") {
    return <div>Verifying...</div>;
  }

  if (verificationStatus === "failed") {
    return <div>Verification failed. Please try again.</div>;
  }

  if (verificationStatus === "expired") {
    return <div>Verification link expired. Please request a new one.</div>;
  }

  return <div>Successfully verified!</div>;
}
```

After verification completes, you can set the email as primary by calling `emailAddress.setAsPrimary()` on the verified email address object.
