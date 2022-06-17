const ProductPageInfo = ({ product }) => {
  // separate text to paragraphs
  const handleTextByParagraph = (text) => {
    const textArray = text.split(/\r?\n/g)
    const paragraphArray = textArray.filter((text) => text !== "")

    return paragraphArray
  }

  return (
    <div className="m-3">
      {handleTextByParagraph(product.description).map((paragraph, index) => (
        <p key={index} className="fs-6 lh-2 text-capitalize-first-letter">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

export default ProductPageInfo
