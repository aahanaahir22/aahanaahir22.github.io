import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="section-code">ERROR / UNMAPPED SIGNAL</p>
      <h1>404</h1>
      <p>This coordinate does not exist inside Aahana’s systems universe.</p>
      <Link className="signal-button" href="/"><ArrowLeft size={16} /> Return to orbit</Link>
    </main>
  );
}
