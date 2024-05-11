"use client";
import { Navigation } from "../components/nav";
import {
  Download,
  ClipboardCheck,
  Copy,
  Check,
  View,
  Loader,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Card } from "../components/card";

export default function ResumeViewer() {
  const [resumeLoading, setResumeLoading] = useState(true);
  const [copyTimeout, setCopyTimeout] = useState(false);
  const [downloadTimeout, setDownloadTimeout] = useState(false);
  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="container flex flex-col items-center justify-center py-20 mx-auto h-screen gap-2">
        <div
          className="group rounded-lg overflow-hidden relative bg-blue-500"
          onClick={() => {
            window.open("/resume.pdf", "_blank");
          }}
        >
          {resumeLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader className="animate-spin text-sea-green" />
            </div>
          )}
          <Image
            src="/resume_image.png"
            alt="Resume"
            width={500}
            height={500}
            onLoad={() => setResumeLoading(false)}
            layout="responsive"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-70">
            <View className="text-white opacity-0 group-hover:opacity-100" />
          </div>
        </div>
        <div className="flex flex-row gap-2 mt-3 w-1/2 items-center grid grid-cols-3">
          <Card>
            <div
              onClick={() => {
                window.open("/resume.pdf", "_blank");
              }}
              className="text-zinc-100 p-2 rounded-lg flex flex-row items-center justify-center hover:text-sea-green"
            >
              View
              <View size={18} className="ml-2 text-sea-green" />
            </div>
          </Card>
          <Card>
            <div
              onClick={() => {
                setDownloadTimeout(true);
                setTimeout(() => setDownloadTimeout(false), 3000);
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'SatwikBhasin-Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="text-zinc-100 p-2 rounded-lg flex flex-row items-center justify-center hover:text-sea-green"
            >
              {downloadTimeout ? (
                <>
                  Download
                  <Check size={18} className="ml-2 text-sea-green" />
                </>
              ) : (
                <>
                  Download
                  <Download size={18} className="ml-2 text-sea-green" />
                </>
              )}
            </div>
          </Card>
          <Card>
          <div
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopyTimeout(true);
              setTimeout(() => setCopyTimeout(false), 3000);
            }}
            className="text-zinc-100 p-2 rounded-lg flex flex-row items-center justify-center hover:text-sea-green"
          >
            {copyTimeout ? (
              <>
                Copy
                <ClipboardCheck size={18} className="ml-2 text-sea-green" />
              </>
            ) : (
              <>
                Copy
                <Copy size={18} className="ml-2 text-sea-green" />
              </>
            )}
          </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
