"use client";
import { Navigation } from "../components/nav";
import { Download, ClipboardCheck, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function ResumeViewer() {
  const [copyTimeout, setCopyTimeout] = useState(false);
  const [downloadTimeout, setDownloadTimeout] = useState(false);
  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="container flex flex-col items-center justify-center py-20 mx-auto h-screen gap-2">
        <iframe
          src="/resume.pdf"
          type="application/pdf"
          style={{
            width: "50%",
            height: "100%",
          }}
          className="border-2 border-sea-green"
        />
        <div className="flex flex-row gap-2 mt-3">
          <a href="/resume.pdf" download="SatwikBhasin-Resume.pdf">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setDownloadTimeout(true);
                setTimeout(() => setDownloadTimeout(false), 3000);
              }}
              className="bg-zinc-800 text-zinc-100 p-2 rounded-lg flex items-center hover:text-sea-green"
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
            </button>
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopyTimeout(true);
              setTimeout(() => setCopyTimeout(false), 3000);
            }}
            className="bg-zinc-800 text-zinc-100 p-2 rounded-lg flex items-center hover:text-sea-green"
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
          </button>
        </div>
      </div>
    </div>
  );
}
