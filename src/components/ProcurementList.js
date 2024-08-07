"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Table, Form, Button, Container, Spinner } from "react-bootstrap";
import {
  fetchProcurements,
  searchProcurements,
  deleteProcurement,
} from "../api/procurements";

function ProcurementList() {
  const [procurements, setProcurements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchAllProcurements();
  }, []);

  const fetchAllProcurements = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProcurements();
      setProcurements(data);
    } catch (error) {
      console.error("Error fetching procurements:", error);
    }
    setIsLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const data = await searchProcurements(searchQuery);
      setProcurements(data);
    } catch (error) {
      console.error("Error searching procurements:", error);
    }
    setIsSearching(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProcurement(id);
      fetchAllProcurements();
    } catch (error) {
      console.error("Error deleting procurement:", error);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Procurements</h1>
      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Group className="d-flex">
          <Form.Control
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search procurements"
          />
          <Button
            type="submit"
            variant="primary"
            className="ml-2"
            disabled={isSearching}
          >
            {isSearching ? <Spinner animation="border" size="sm" /> : "Search"}
          </Button>
        </Form.Group>
      </Form>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : procurements.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {procurements.map((procurement) => (
              <tr key={procurement.id}>
                <td>{procurement.title}</td>
                <td>{procurement.description}</td>
                <td>${procurement.amount}</td>
                <td>
                  {procurement.pdfPath && (
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_URL}/${procurement.pdfPath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-info btn-sm me-2"
                    >
                      View PDF
                    </a>
                  )}
                  <Link
                    href={`/edit/${procurement.id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(procurement.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No procurements found.</p>
      )}
      <Link href="/add" className="btn btn-success mt-3">
        Add New Procurement
      </Link>
    </Container>
  );
}

export default ProcurementList;
