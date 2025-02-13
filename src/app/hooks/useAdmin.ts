import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAdmin() {
  const [admin, setAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/admin/login"); // Redirect to login if no token
        return;
      }

      try {
        const res = await fetch("/api/admin/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          router.push("/");
          return;
        }

        const data = await res.json();
        setAdmin(data.admin);
      } catch {
        localStorage.removeItem("token");
        router.push("/admin/login");
      }
    };

    checkAdmin();
  }, [router]);

  return admin;
}
