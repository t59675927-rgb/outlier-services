"use client";

import SectionCard from "@/components/SectionCard";
import LocationSelector from "@/components/LocationSelector";
import ServicesPanel from "@/components/ServicesPanel";
import CartSummary from "@/components/CartSummary";
import PaymentModeSelector from "@/components/PaymentModeSelector";
import CheckoutPanel from "@/components/CheckoutPanel";

export default function NewTransactionPage() {
  return (
    <div className="p-5 max-w-screen-xl mx-auto">
      <div className="mb-5">
        <h1 className="text-lg font-semibold text-gray-900">New Transaction</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Log value-added services for a visa applicant
        </p>
      </div>

      <div className="flex gap-5 items-start flex-wrap lg:flex-nowrap">
        {/* Left — location + services */}
        <div className="flex-1 min-w-0 w-full">
          <SectionCard title="Location">
            <LocationSelector />
          </SectionCard>

          <SectionCard title="Available Services" noPadding>
            <ServicesPanel />
          </SectionCard>
        </div>

        {/* Right — cart, payment, checkout */}
        <div className="w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-[76px]">
          <SectionCard title="Cart Summary">
            <CartSummary />
          </SectionCard>

          <SectionCard title="Payment Mode">
            <PaymentModeSelector />
          </SectionCard>

          <SectionCard title="Checkout">
            <CheckoutPanel />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
