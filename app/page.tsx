// app/page.tsx
/*import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Hotel Management System
      </h1>
      <p className="text-gray-600 mb-6">
        Manage hotels, customers, and bookings seamlessly.
      </p>
      <Link
        href="/auth/login"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Login
      </Link>
    </main>
  );
}
*/

// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to the combined Auth page
  redirect("/auth");
}
