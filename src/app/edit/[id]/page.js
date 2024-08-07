"use client";

import { useParams } from "next/navigation";
import EditProcurementForm from "../../../components/EditProcurementForm";

export default function EditProcurement() {
  const { id } = useParams();

  return (
    <main>
      <h1>Edit Procurement</h1>
      <EditProcurementForm id={id} />
    </main>
  );
}
