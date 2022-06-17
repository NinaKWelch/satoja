import { Helmet } from "react-helmet"
import SEOImage from "../../media/satoja-home.png"

const SEO = ({ title, description, keywords, image }) => {
  // url to current location
  const currentUrl = document.location.href
  const defaultKeywors = "Lähiruokaa, Osta, Myy, Tilaa"

  // general meta tags
  const metaTags = [
    {
      name: "description",
      content: description
        ? description
        : "SATOJA.fi on kotimainen palvelu jossa voit ostaa ja myydä lähiruokaa ja muita paikallisesti valmistettuja tuotteita.",
    },
    {
      name: "keywords",
      content: keywords ? keywords + ", " + defaultKeywors : defaultKeywors,
    },
    {
      property: "image",
      content: image ? image : SEOImage,
    },
    {
      property: "url",
      content: currentUrl,
    },
  ]

  const twitterMetaTags = [
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:title",
      content: title ? title : "Satoja",
    },
    {
      property: "twitter:site",
      content: currentUrl,
    },
    {
      property: "twitter:description",
      content: description
        ? description
        : "SATOJA.fi on kotimainen palvelu jossa voit ostaa ja myydä lähiruokaa ja muita paikallisesti valmistettuja tuotteita.",
    },
    {
      property: "twitter:image",
      content: image ? image : SEOImage,
    },
  ]

  // default OpenGrap meta tags for sharing a link through Messenger/Facebook
  const openGraphMetaTags = [
    {
      property: "og:url",
      content: currentUrl,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:site_name",
      content: "Satoja",
    },
    {
      property: "og:locale",
      content: "fi",
    },
    {
      property: "og:title",
      content: title ? title : "Satoja",
    },
    {
      property: "og:description",
      content: description
        ? description
        : "SATOJA.fi on kotimainen palvelu jossa voit ostaa ja myydä lähiruokaa ja muita paikallisesti valmistettuja tuotteita.",
    },
    {
      property: "og:image",
      content: image ? image : SEOImage,
    },
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
  ]

  return (
    <Helmet
      // htmlAttributes={{ lang: "fi" }}
      title={title ? "Satoja - " + title : "Satoja"}
      meta={[...metaTags, ...twitterMetaTags, ...openGraphMetaTags]}
      // link={}
    />
  )
}

export default SEO
