"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { fetchProcurements, updateProcurement } from "../api/procurements";

function EditProcurementForm({ id }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProcurement = async () => {
      try {
        const procurements = await fetchProcurements();
        const procurement = procurements.find((p) => p.id === id);
        if (procurement) {
          setTitle(procurement.title);
          setDescription(procurement.description);
          setAmount(procurement.amount.toString());
        }
      } catch (error) {
        console.error("Error fetching procurement:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProcurement();
  }, [id]);

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
      await updateProcurement(id, formData);
      router.push("/");
    } catch (error) {
      console.error("Error updating procurement:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="my-4">Edit Procurement</h2>
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
          <Form.Label>PDF File (leave blank to keep current file):</Form.Label>
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
            "Update Procurement"
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default EditProcurementForm;
