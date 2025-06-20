import URLGateWayFormPage from "@/features/pages/ url-gateway-form";

export default function Page({ params }: { params: { shortId: string } }) {
  return <URLGateWayFormPage shortId={params.shortId} />;
}
