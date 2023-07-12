import ManageSection from "@/components/ManageSection";
import MainGraph from "@/components/PerformanceSection";
export default function OpeningSection() {
  return (
    <div className="grid grid-cols-4 lg:gap-[55px]">
      <div className="col-span-4 lg:col-span-3">
        <MainGraph />
      </div>
      <div className="col-span-4 mx-auto lg:col-span-1 max-w-[450px] lg:max-w-[100%] ">
        <ManageSection />
      </div>
    </div>
  );
}
