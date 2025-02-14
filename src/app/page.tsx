"use client";
import { Button, Card, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid username or password.");
        return;
      }

      console.log("Received Token:", data.token);
      localStorage.setItem("token", data.token);
      router.push("/overview");
    } catch (err) {
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center absolute z-20">
      <Card.Root maxW="sm" className="border-2 border-[#e3e3e3] rounded-[8px] px-6">
        <Card.Header>
          <Card.Title className="font-bold text-black text-3xl text-center py-4">SwiftCart</Card.Title>
          <Card.Description>
            Fill in the admin credentials to login
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleLogin}>
            <Stack gap="4" w="full">
              <Field label="Username">
                <Input
                  className="px-2 border-2 border-[#e3e3e3] rounded-[8px]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field>
              <Field label="Password">
                <Input
                  type="password"
                  className="px-2 border-2 border-[#e3e3e3] rounded-[8px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
            </Stack>
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
            <Card.Footer justifyContent="flex-end" className="px-0 py-4">
              <Button type="submit" variant="solid" className="bg-black text-white font-semibold px-4 py-2 rounded-[4px]">Login</Button>
            </Card.Footer>
          </form>
        </Card.Body>
      </Card.Root>
    </div>
  );
}
