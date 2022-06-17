import imgFruitNBerries from "../media/img-defaults/hedelmat-marjat_2x_zfyftv.png"
import imgDrinks from "../media/img-defaults/juomat2x_hkkudb.png"
import imgBakery from "../media/img-defaults/leivat-leivonta_2x_ozueux.png"
import imgMeatNFish from "../media/img-defaults/liha-kala_2x_ja6fny.png"
import imgDairy from "../media/img-defaults/maitotuotteet_zfrkwu.png"
import imgEggs from "../media/img-defaults/munat_2x_zo3xnq.png"
import imgDefault from "../media/img-defaults/muut_2x_cxusjk.png"
import imgFood from "../media/img-defaults/ruokaa_2x_nzvn3e.png"
import imgVeg from "../media/img-defaults/vihannekset_2x_o482nl.png"
import imgHerbNSpice from "../media/img-defaults/yrtit-mausteet_yvekbb.png"

// set default product image from local folder
// in cases where image link is missing or broken
// includes cases where Cloudinary is down
export const handleMissingImage = (category) => {
  switch (category) {
    case "Vihannekset":
      return imgVeg
    case "Liha & kala":
      return imgMeatNFish
    case "Munat":
      return imgEggs
    case "Hedelmät & marjat":
      return imgFruitNBerries
    case "Maitotuotteet":
      return imgDairy
    case "Leivät & leivonta":
      return imgBakery
    case "Yrtit & mausteet":
      return imgHerbNSpice
    case "Ruokaa":
      return imgFood
    case "Juomat":
      return imgDrinks
    default:
      return imgDefault
  }
}
