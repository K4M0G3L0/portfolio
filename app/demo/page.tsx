import { Metadata } from "next";
import { LumaDemo } from "@/components/demo/LumaDemo";

export const metadata: Metadata = {
  title: "LUMA AIOS — Live Interface Demo",
  description: "Interactive prototype of the LUMA AIOS Command Center. See BloomOS, Flowlink, MoneyOS, and BuildOS in action.",
};

export default function DemoPage() {
  return <LumaDemo />;
}
