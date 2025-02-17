import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const ImageGeneratorApp = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      setError(null);

      const options = {
        method: "POST",
        url: "https://ai-image-generator14.p.rapidapi.com/",
        headers: {
          "x-rapidapi-key":
            "0d70a0c560mshfe7ab9a55626f9dp1c3c3ejsne12b33929896",
          "x-rapidapi-host": "ai-image-generator14.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          jsonBody: {
            function_name: "image_generator",
            type: "image_generation",
            query: "A Cat Eating Noodles With Chop Sticks.",
            output_type: "png",
          },
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setImage(response.data); // Assuming the response has the image data
      } catch (err) {
        setError("Failed to generate image.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []); // Empty dependency array to only run once on mount

  return (
    <div>
      <h1>Image Generator</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {image ? (
        <Image src={image.url} width={10} height={10} alt="Generated" /> // Adjust based on response structure
      ) : (
        <p>No image available.</p>
      )}
    </div>
  );
};

export default ImageGeneratorApp;
