import { userStorageVerification } from "@/hooks/users";
import { SignInButton, SignOutButton } from "@clerk/nextjs";

export default async function HomePage() {
  await userStorageVerification();

  return (
    <main className="max-w-7xl mx-auto p-4">
      <SignInButton mode="modal" />
      <SignOutButton />
    </main>
  );
}
