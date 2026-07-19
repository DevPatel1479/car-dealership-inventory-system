import VehicleForm from "../components/VehicleForm";
import VehicleList from "../components/VehicleList";
import VehicleSearch from "../components/VehicleSearch";

import Navbar from "../../../../src/components/layout/Navbar";
import PageContainer from "../../../components/layout/PageContainer";
import DashboardHeader from "../../../components/layout/DashboardHeader";
import Sidebar from "../../../components/layout/Sidebar";

export default function VehiclesPage() {
    return (

        <>
            <Navbar />

            <div className="flex min-h-screen">
                <Sidebar />

                <PageContainer>
                    <DashboardHeader
                        title="Vehicle Inventory"
                        subtitle="Manage your dealership inventory."
                    />

                    <div className="mt-8 space-y-8">
                        <VehicleSearch />

                        <VehicleForm />

                        <VehicleList />
                    </div>
                </PageContainer>
            </div>

        </>
    );
}