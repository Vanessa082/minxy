import { paramsProps } from "@/app/(api)/[shortId]/page";
import URLGateWayFormPage from "@/features/pages/ url-gateway-form";

export default async function Page(props: paramsProps) {
  const { shortId } = await props.params;
  return <URLGateWayFormPage shortId={shortId} />;
}
