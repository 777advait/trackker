import Navbar from "@/components/Project/Navbar";
import { getProject, getUser } from "@/server/db/queries/select";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import React from "react";
import RenameCard from "@/components/Project/RenameCard";
import DeleteCard from "@/components/Project/DeleteCard";

export default async function Page({ params }: { params: { id: string } }) {
  const { data: projectData, error } = await getProject(params.id);

  if (error || !projectData) {
    notFound();
  }

  const { data: userData, error: userError } = await getUser(
    projectData.created_by,
  );

  if (userError || !userData) {
    notFound();
  }

  return (
    <>
      <Navbar projectName={projectData.name} />
      <Container className="max-w-[90%] py-8">
        <div className="space-y-8">
          <h1 className="font-labil text-4xl">Manage Settings</h1>
          <div className="max-w-[45%] space-y-6">
            <RenameCard projectName={projectData.name} projectId={params.id} />
            <DeleteCard projectName={projectData.name} projectId={params.id} />
          </div>
        </div>
      </Container>
    </>
  );
}
