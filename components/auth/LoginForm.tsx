// components/auth/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { isValidIranMobile, normalizeIranMobile } from "@/lib/phone";
import { setLoggedIn } from "@/lib/storage";
import type { RandomUserResponse } from "@/types/user";

export function LoginForm() {
  const router = useRouter();

  const [mobile, setMobile] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const errorId = "mobile-error";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // client-side validation
    if (!isValidIranMobile(mobile)) {
      setError(
        "Invalid mobile. Examples: 09123456789, +989123456789, 00989123456789"
      );
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://randomuser.me/api/?results=1&nat=us",
        {
          method: "GET",
          headers: { Accept: "application/json" },
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(`RandomUser API returned ${res.status}`);
      }

      const data = (await res.json()) as RandomUserResponse;
      const user = data.results?.[0];
      if (!user) {
        throw new Error("No user returned from API");
      }

      // persist user in localStorage (client-only session)
      setLoggedIn({
        name: { first: user.name.first, last: user.name.last },
        email: user.email,
        picture: user.picture,
        phone: normalizeIranMobile(mobile),
      });

      // navigate to dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(`Login failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      noValidate
    >
      <div className="mb-4">
        <Label htmlFor="mobile">Mobile number</Label>
        <Input
          id="mobile"
          name="mobile"
          inputMode="tel"
          autoComplete="tel"
          placeholder="09123456789"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : undefined}
          required
        />
        {error && (
          <p id={errorId} className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
        aria-disabled={loading}
        aria-busy={loading || undefined}
      >
        {loading ? (
          <span className="inline-flex items-center">
            Logging in
            <Spinner />
          </span>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}
