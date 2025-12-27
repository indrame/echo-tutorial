"use client";

import { WidgetViews } from "@/modules/widget/ui/views/widget-views";
import { use } from "react";

interface Props {
  searchParams: Promise<{ organizationId: string }>;
}

const Page = ({ searchParams }: Props) => {
  const { organizationId } = use(searchParams);
  return <WidgetViews organizationId={organizationId} />;
};

export default Page;
