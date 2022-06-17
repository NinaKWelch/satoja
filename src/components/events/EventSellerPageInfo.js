import { ReactComponent as PhoneIcon } from "../../media/telephone-fill.svg"

const EventSellerPageInfo = ({ seller }) => {
  // remove url protocol from visible url
  // and add missing protocol to the link
  const handleUrl = (url, isLink) => {
    const splitUrlByProtocol = (str) => str.split("//")
    const linkArray = splitUrlByProtocol(url)

    if (url.includes("http://") || url.includes("https://")) {
      // check that protocol has been added only once
      if (isLink && linkArray.length === 2) {
        return url
      } else if (isLink && linkArray.length > 2) {
        return `https://${linkArray[linkArray.length - 1]}`
      } else {
        return linkArray[linkArray.length - 1]
      }
    } else {
      // add missing protocol for the link
      if (isLink) {
        return `https://${url}`
      } else {
        return url
      }
    }
  }

  return (
    <div>
      <h3 className="fs-4">Yhteystiedot</h3>
      <p className="mb-0 fs-6 text-capitalize">
        {seller.firstname} {seller.lastname}
      </p>
      <address className="mb-0 text-capitalize-first-letter">
        {seller.address && <span className="d-block">{seller.address}</span>}
        {seller.zipcode && seller.city && (
          <span className="d-block">
            {seller.zipcode} {seller.city}
          </span>
        )}
        {!seller.zipcode && seller.city && (
          <span className="d-block text-capitalize">{seller.city}</span>
        )}
      </address>
      {seller.phonenumber && (
        <p className="mb-0 fs-6">
          <PhoneIcon />{" "}
          <a href={`tel:${seller.phonenumber}`} rel="nofollow">
            {seller.phonenumber}
          </a>
        </p>
      )}
      {seller.business_id && <p className="mb-0 fs-6">Y-tunnus: {seller.business_id}</p>}
      {seller.homepage && (
        <p className="mb-0 fs-6">
          <a href={handleUrl(seller.homepage, true)} target="_blank" rel="noreferrer">
            {handleUrl(seller.homepage, false)}
          </a>
        </p>
      )}
    </div>
  )
}

export default EventSellerPageInfo
