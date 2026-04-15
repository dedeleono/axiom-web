import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8 font-geist-mono">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString("en-US")}
        </p>

        <div className="prose prose-gray max-w-none space-y-6 font-geist">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-gray-700">
              Axiom Renovation (&quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;) is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700">
              We may collect information that you provide directly to us,
              including name, email address, phone number, and any other
              information you choose to provide when contacting us through our
              contact form.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700">
              We use the information we collect to respond to your inquiries,
              provide our services, and improve our website and customer
              experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about this Privacy Policy, please contact us
              at{" "}
              <a
                href="mailto:info@axiom-renovation.com"
                className="text-sky-600 hover:underline"
              >
                info@axiom-renovation.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="text-sm font-geist-mono text-gray-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </main>

      <section className="mt-16">
        <Footer />
      </section>
    </div>
  );
}
