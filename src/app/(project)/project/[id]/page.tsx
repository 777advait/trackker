import Container from "@/components/Container";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Container className="py-4">
      <div>{params.id}</div>
    </Container>
  );
}
