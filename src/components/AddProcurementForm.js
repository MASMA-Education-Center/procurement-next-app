"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { addProcurement } from "../api/procurements";

function AddProcurementForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("amount", amount);
    if (file) {
      formData.append("pdf", file);
    }

    try {
      await addProcurement(formData);
      router.push("/");
    } catch (error) {
      console.error("Error adding procurement:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Add New Procurement</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Amount:</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>PDF File:</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf"
          />
        </Form.Group>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Add Procurement"
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default AddProcurementForm;
