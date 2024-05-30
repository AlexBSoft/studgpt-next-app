import type { NextComponentType, NextPageContext } from "next";
import ExtraPageClient from "./extraPageClient";
import { Suspense } from 'react'
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props { }

const Page: NextComponentType<NextPageContext, {}, Props> = async (props: Props) => {
    const session = await auth();

    console.log(session)

    // Redirect to login if not authenticated
    if (!session || !session?.user || !session.user.id) {
        return redirect("/auth/login");
    }

    return (
        <Suspense>
            <ExtraPageClient />
        </Suspense>
    );
};

export default Page;
