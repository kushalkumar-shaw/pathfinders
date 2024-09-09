import MenteeDashboard from "@/components/custom/dashboard/MenteeDashboard";
import MenteeProfilePage from "@/components/mentee/Profile";
import React from "react";

export default function page() {
  return (
    <div>
      <MenteeProfilePage />
      <MenteeDashboard />
    </div>
  );
}
