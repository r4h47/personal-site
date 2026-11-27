"use client";

import { btn } from "@/lib/ui";
import { Icon } from "@/components/Icons";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className={btn.primary}>
      <Icon name="printer" size={16} />
      Print / Save as PDF
    </button>
  );
}
