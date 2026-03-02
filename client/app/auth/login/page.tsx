import { Form } from "./_components/form";

export default function LoginPage() {
  return (
    <main className="flex-1 bg-[url('/lbg.png')] bg-contain bg-top-left">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-145">
          {/* Form */}
          <div className="max-w-115 mx-auto lg:mx-0">
            <h1 className="font-manrope font-extrabold text-[40px] text-[#171717] mb-2">Welcome back</h1>
            <p className="font-inter text-[15px] text-[#595959] mb-8">
              Join us on the journey towards a sustainable web.
            </p>

            <Form />
          </div>

          <div className="hidden lg:flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/login.png" alt="Login" />
          </div>
        </div>
      </div>
    </main>
  );
}
