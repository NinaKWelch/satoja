const EventSellerPageDescription = ({ description }) => {
  // separate text to paragraphs
  const textByParagraph = (text) => {
    const textArray = text.split(/\r?\n/g)
    const paragraphArray = textArray.filter((text) => text !== "")

    return paragraphArray
  }

  return (
    <div>
      <h3 className="fs-4">Esittely</h3>
      {textByParagraph(description).map((paragraph, index) => (
        <p key={index} className="fs-6 text-capitalize-first-letter">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

export default EventSellerPageDescription
