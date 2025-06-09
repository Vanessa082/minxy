import URLGateWayFormPage from "@/features/pages/ url-gateway-form";

export default function Page({ params }: { params: { shortId: string } }) {
  const { shortId } = params;
  return <URLGateWayFormPage shortId={shortId} />;
}