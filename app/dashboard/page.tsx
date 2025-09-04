// app/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { clearSession, getUser, isAuthenticated } from "@/lib/storage";
import type { StorageUser } from "@/lib/storage";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<StorageUser | null>(null);

    useEffect(() => {
        // guard: if not authenticated -> redirect to login
        if (!isAuthenticated()) {
            router.replace("/login");
            return;
        }

        const u = getUser();
        if (!u) {
            router.replace("/login");
            return;
        }

        setUser(u);
    }, [router]);

    
    if (!user) {
        return <p className="mx-auto p-5 text-center text-gray-600">Loading…</p>;
    }

    return (
        <div className="p-3">
            <div className="mx-auto w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <img
                        src={user.picture.medium}
                        alt={`Avatar of ${user.name.first} ${user.name.last}`}
                        className="h-16 w-16 rounded-full border border-gray-200 object-cover"
                    />
                    <div>
                        <h1 className="text-xl text-gray-600 font-semibold">Welcome, {user.name.first}</h1>
                        <p className="text-gray-600">{user.email}</p>
                        {user.phone && <p className="text-sm text-gray-500">Phone: {user.phone}</p>}
                    </div>
                </div>

                <Button
                    className="mt-6 border-red-600 text-red-600 hover:bg-red-50"
                    variant="outline"
                    onClick={() => {
                        clearSession();
                        router.replace("/login");
                    }}
                    aria-label="Log out"
                >
                    Logout
                </Button>

            </div>
        </div>
    );
}
