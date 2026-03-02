"use client";

import { Form } from "./_components/form";

export default function RegisterPage() {
  return (
    <main className="flex-1 max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-manrope font-extrabold text-[42px] text-[#171717] mb-2">Create account</h1>
      <p className="text-[#595959] text-[16px] mb-10">
        Join the green web movement. Measure and improve your digital impact.
      </p>

      <Form />
    </main>
  );
}
