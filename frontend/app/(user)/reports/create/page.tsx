"use client";

import { useState } from "react";

import Input from "../../../../components/ui/Input";
import Textarea from "../../../../components/ui/Textarea";
import Button from "../../../../components/ui/Button";

import Container from "../../../../components/shared/Container";
import Card from "../../../../components/shared/Card";
import PageHeader from "../../../../components/shared/PageHeader";

import toast from "react-hot-toast";

export default function CreateReportPage() {

  const [name, setName] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [description, setDescription] =
    useState("");

  function handleSubmit() {

    if (
      !name ||
      !location ||
      !description
    ) {
      toast.error(
        "Semua field wajib diisi!"
      );

      return;
    }

    toast.success(
      "Report berhasil dibuat!"
    );

    console.log({
      name,
      location,
      description,
    });

    setName("");
    setLocation("");
    setDescription("");
  }

  return (
    <Container>
      <div className="py-10">

        <PageHeader
          title="Buat Report"
          description="Laporkan barang hilang Anda"
        />

        <div className="mt-8">
          <Card>

            <div className="space-y-5">

              <Input
                placeholder="Nama Barang"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <Input
                placeholder="Lokasi Hilang"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />

              <Textarea
                placeholder="Deskripsi barang..."
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

              <Button
                onClick={handleSubmit}
              >
                Submit Report
              </Button>

            </div>

          </Card>
        </div>
      </div>
    </Container>
  );
}