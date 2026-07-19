import { createElement, type ReactElement } from "react";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import { ResumeDocument } from "@/pdf/ResumeDocument";

export const dynamic = "force-dynamic";

/**
 * Generates the resume PDF on demand from src/data/resume.ts — the same
 * data source that renders the site — and streams it back as a download.
 */
export async function GET() {
  const generatedOn = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const element = createElement(ResumeDocument, { generatedOn }) as ReactElement<DocumentProps>;
  const buffer = await renderToBuffer(element);

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Chris_Van_Emmerik_Resume.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
