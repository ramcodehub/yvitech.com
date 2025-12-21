import "./ImageTextSection.css";

export default function ImageTextSection({
  image,
  heading,
  description,
  points = [],
  imageLeft = false,
}) {
  return (
    <div className={`section ${imageLeft ? "" : "reverse"}`}>
      <div className="content-box">
        <h2>{heading}</h2>
        <p>{description}</p>

        <ul>
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="image-box">
        <img src={image} alt={heading} />
      </div>
    </div>
  );
}