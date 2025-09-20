"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";

const address = process.env.NEXT_PUBLIC_CONVEX_URL!;
export const convex = new ConvexReactClient(address);
export { ConvexProvider };