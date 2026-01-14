"use client";

import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { toast } from "sonner";

interface QrCodeModalProps {
  url: string;
  shortId: string;
  onClose: () => void;
}

export function QrCodeModal({ url, shortId, onClose }: QrCodeModalProps) {
  const qrRef = useRef<SVGSVGElement>(null);

  const downloadQRCode = () => {
    const svg = qrRef.current;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = `minxy-${shortId}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      toast.success("QR Code downloaded!");
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md flex flex-col items-center">
        <DialogHeader>
          <DialogTitle>QR Code for your Link</DialogTitle>
        </DialogHeader>

        <div className="bg-white p-4 rounded-xl shadow-inner mt-4">
          <QRCodeSVG
            value={url}
            size={256}
            level="H"
            includeMargin={true}
            ref={qrRef}
            imageSettings={{
              src: "/logo.png",
              x: undefined,
              y: undefined,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>

        <p className="text-sm text-muted-foreground mt-2 truncate w-full text-center">
          {url}
        </p>

        <div className="flex gap-4 mt-6 w-full">
          <Button variant="outline" className="flex-1 gap-2" onClick={() => {
            navigator.share?.({ title: 'My Short Link', url });
            toast.info("Opening share menu...");
          }}>
            <Share2 size={16} /> Share
          </Button>
          <Button className="flex-1 gap-2 bg-app-blue-500" onClick={downloadQRCode}>
            <Download size={16} /> Download PNG
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}