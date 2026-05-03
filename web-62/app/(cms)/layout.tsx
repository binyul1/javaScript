import React, { type ReactNode } from "react";
import "../globals.css";

export default function CMSlayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <body>
        <header>Dashboard Header</header>
        {children}
      </body>
    </html>
  );
}
