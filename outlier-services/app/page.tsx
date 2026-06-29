import CountryVACSelector from "@/components/selectors/CountryVACSelector";
import ServicesList from "@/components/services/ServicesList";
import CartSummary from "@/components/cart/CartSummary";

export default function Home() {
  return (
    <div className="space-y-4">
      <CountryVACSelector />

      {/* Main POS Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Services - bigger area */}
        <div className="col-span-2">
          <ServicesList />
        </div>

        {/* Cart - sticky */}
        <div className="sticky top-4 h-fit">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
