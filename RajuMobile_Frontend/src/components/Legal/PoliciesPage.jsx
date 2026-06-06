function PoliciesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-10 pb-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        Policies & Terms
      </h1>

      {/* Privacy Policy */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">
          Privacy Policy
        </h2>

        <p className="text-gray-700 leading-7">
          At Raju Mobile Store, we value your privacy and are committed
          to protecting your personal information. We may collect your
          name, email address, phone number, shipping address, and order
          information to process purchases and provide customer support.
        </p>

        <p className="text-gray-700 leading-7 mt-4">
          We do not sell or share your personal information with third
          parties except where necessary for payment processing, delivery
          services, or legal compliance.
        </p>
      </section>

      {/* Terms & Conditions */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">
          Terms & Conditions
        </h2>

        <p className="text-gray-700 leading-7">
          By using Raju Mobile Store, you agree to comply with these
          terms and conditions. Product prices, descriptions, and
          availability may change without prior notice.
        </p>

        <p className="text-gray-700 leading-7 mt-4">
          We reserve the right to cancel or refuse any order due to
          pricing errors, stock availability issues, or suspected
          fraudulent activity.
        </p>
      </section>

      {/* Refund Policy */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">
          Refund & Return Policy
        </h2>

        <p className="text-gray-700 leading-7">
          Products may be returned within 7 days of delivery if they are
          defective, damaged, or incorrectly shipped.
        </p>

        <p className="text-gray-700 leading-7 mt-4">
          Approved refunds will be processed within 5–7 business days
          after inspection of the returned product. Refunds will be
          credited to the original payment method.
        </p>
      </section>
    </div>
  );
}

export default PoliciesPage;