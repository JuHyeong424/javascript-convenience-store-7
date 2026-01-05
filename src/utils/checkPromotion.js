import {PROMOTIONLIST} from "../data/receipt.js";
import {inputHasPromotion} from "../view/inputView.js";

export async function hasPromotion() {
  for (let i = 0; i < PROMOTIONLIST.length; i++) {
    const answer = await inputHasPromotion(PROMOTIONLIST[i]);
    if (answer === 'N') {
      PROMOTIONLIST.splice(i, 1);
      i--;
    }
  }
}
