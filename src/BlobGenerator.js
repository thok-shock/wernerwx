import React from "react";

const generateRandomPosition = (max) => Math.floor(Math.random() * max);

const BlobGenerator = () => {
  const containerSize = 500; // Set the size of the container (in pixels)

  const blobs = Array.from({ length: 50 }, (_, index) => {
    const x = generateRandomPosition(containerSize);
    const y = generateRandomPosition(containerSize);

    return (
      <div
        key={index}
        className="blob"
        style={{
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
        }}
      ></div>
    );
  });

  return (
    <div
      className="blob-container"
      style={{ position: "relative", width: '100%', height: `${containerSize}px` }}
    >
      {blobs}
    </div>
  );
};

export default BlobGenerator;
