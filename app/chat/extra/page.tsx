import type { NextComponentType, NextPageContext } from "next";
import ExtraPageClient from "./extraPageClient";
import { Suspense } from 'react'

interface Props { }

const Page: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
    return (
        <Suspense>
            <ExtraPageClient />
        </Suspense>
    );
};

export default Page;
