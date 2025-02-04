"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Button,
  Input,
  Modal,
  Image,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import { addBanner, deleteBanner } from "./action";
import { uploadFileToS3 } from "@/lib/s3";

interface Banner {
  id: string;
  image: string;
  title: string;
  description: string;
  type: string;
}

const Banners = ({ bannersList }: { bannersList: Banner[] }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBanner, setNewBanner] = useState({
    image: "",
    title: "",
    description: "",
    type: "IMAGE", // Default type
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false); // Loading state for UI feedback

  const handleAddBanner = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission

    if (!selectedFile || !newBanner.title || !newBanner.description) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadFileToS3(selectedFile, "banners");

      const bannerData = {
        image: imageUrl,
        title: newBanner.title,
        description: newBanner.description,
        type: selectedFile.type.includes("video") ? "VIDEO" : "IMAGE",
      };

      const formData = new FormData();
      formData.append("image", imageUrl);
      formData.append("title", newBanner.title);
      formData.append("description", newBanner.description);
      formData.append(
        "type",
        selectedFile.type.includes("video") ? "VIDEO" : "IMAGE"
      );

      const result = await addBanner(formData);

      if (result?.success) {
        setIsModalOpen(false);
        setNewBanner({ image: "", title: "", description: "", type: "IMAGE" });
        setSelectedFile(null);
        router.refresh();
      } else {
        console.error(result?.error);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    const result = await deleteBanner(id);
    if (result?.success) {
      router.refresh();
    } else {
      console.error(result?.error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setNewBanner({
        ...newBanner,
        type: file.type.includes("video") ? "VIDEO" : "IMAGE",
      });
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-end items-center mb-6 gap-4">
        <Button
          color="primary"
          endContent={<span className="material-symbols-rounded">add</span>}
          onPress={() => setIsModalOpen(true)}
          className="w-full sm:w-auto"
        >
          Add Banner
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {bannersList.length > 0 ? (
          bannersList.map((banner) => (
            <Card key={banner.id} className="sm:p-4 max-h-96">
              <div className="relative">
                <div className="flex items-center justify-center">
                  {banner.type === "IMAGE" ? (
                    <Image
                      className="w-full h-48 object-cover rounded-lg"
                      src={banner.image}
                      alt={banner.title}
                    />
                  ) : (
                    <video
                      className="w-full h-48 object-cover rounded-lg"
                      autoPlay
                      muted
                      loop
                    >
                      <source src={banner.image} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <Button
                  isIconOnly
                  color="danger"
                  size="sm"
                  className="absolute top-2 right-2 z-10"
                  onPress={() => handleDeleteBanner(banner.id)}
                >
                  <span className="material-symbols-rounded">delete</span>
                </Button>
              </div>
              <div className="mt-4 overflow-y-auto scrollbar-hide">
                <h3 className="text-lg font-semibold">{banner.title}</h3>
                <p className="text-gray-600 mt-2">{banner.description}</p>
              </div>
            </Card>
          ))
        ) : (
          <p>No banners found</p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h3 className="text-lg font-semibold">Add New Banner</h3>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleAddBanner}>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm">Banner Media</label>
                      <Spacer y={1} />
                      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition">
                        <input
                          type="file"
                          accept="image/*, video/*"
                          onChange={handleFileSelect}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          required
                        />
                        <div className="flex items-center justify-center gap-2">
                          <span className="material-symbols-rounded text-gray-400">
                            {selectedFile?.type.includes("image")
                              ? "image"
                              : "videocam"}
                          </span>
                          <span className="text-gray-600">
                            {selectedFile
                              ? selectedFile.name
                              : "Click to upload or drag and drop"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Input
                      label="Title"
                      placeholder="Enter banner title"
                      value={newBanner.title}
                      onChange={(e) =>
                        setNewBanner({ ...newBanner, title: e.target.value })
                      }
                      required
                    />
                    <Textarea
                      label="Description"
                      rows={3}
                      placeholder="Enter banner description"
                      value={newBanner.description}
                      onChange={(e) =>
                        setNewBanner({
                          ...newBanner,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={handleAddBanner}
                  isDisabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Add Banner"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Banners;
