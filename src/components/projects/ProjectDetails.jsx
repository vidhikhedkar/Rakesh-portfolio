import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjectDetailService } from "../service/projecttab.service";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const location = useLocation();

  const [project, setProject] = useState(location.state?.project || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProjectDetailService(projectId);

        const data =
          response?.data?.project ||
          response?.data ||
          response?.project ||
          response;

        if (active && data) {
          setProject((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch (err) {
        console.error("Project details error:", err);

        if (active && !location.state?.project) {
          setError("Unable to load project details.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    if (projectId) fetchDetails();

    return () => {
      active = false;
    };
  }, [projectId]);

  const details = project?.details || project;

  const imageValue =
    details?.caseStudyImage ||
    details?.fullImage ||
    details?.heroImage ||
    project?.image ||
    "";

  const imageUrl =
    typeof imageValue === "string"
      ? imageValue
      : imageValue?.url || imageValue?.imageUrl || imageValue?.src || "";

  return (
    <main className="min-h-screen container bg-[#f5f5f5]">
      <div className="mx-auto w-full max-w-[1200px] bg-white min-h-screen">
        {loading && !project && (
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-gray-500">Loading project...</p>
          </div>
        )}

        {error && !project && (
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: imageLoaded ? 1 : 0,
              y: imageLoaded ? 0 : 15,
            }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <img
              src={imageUrl}
              alt={project?.title || "Project Case Study"}
              onLoad={() => setImageLoaded(true)}
              onError={() => setError("Unable to load project image.")}
              className="block w-full h-auto"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </motion.div>
        )}

        {!loading && !imageUrl && !error && (
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-gray-500">No case study image available.</p>
          </div>
        )}

        {error && project && (
          <p className="py-8 text-center text-red-500">{error}</p>
        )}
      </div>
    </main>
  );
};

export default ProjectDetails;
