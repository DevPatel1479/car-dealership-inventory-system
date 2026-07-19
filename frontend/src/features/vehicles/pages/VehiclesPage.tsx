import VehicleForm from "../components/VehicleForm";
import VehicleList from "../components/VehicleList";
import VehicleSearch from "../components/VehicleSearch";

import Navbar from "../../../../src/components/layout/Navbar";
import PageContainer from "../../../components/layout/PageContainer";
import DashboardHeader from "../../../components/layout/DashboardHeader";
import Sidebar from "../../../components/layout/Sidebar";

export default function VehiclesPage() {
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <div className="flex">
                <Sidebar />

                <PageContainer>
                    <DashboardHeader
                        title="Vehicle Inventory"
                        subtitle="Manage your dealership inventory"
                    />

                    <div className="mt-8 grid gap-8 xl:grid-cols-12">
                        <aside className="space-y-8 xl:col-span-4">
                            <VehicleSearch />

                            <VehicleForm />
                        </aside>

                        <section className="xl:col-span-8">
                            <VehicleList />
                        </section>
                    </div>
                </PageContainer>
            </div>
        </div>
    );
}