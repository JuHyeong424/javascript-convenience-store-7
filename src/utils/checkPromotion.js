import {BUYPROUDCTLIST} from "../data/receipt.js";
import {inputHasPromotion} from "../view/inputView.js";
import {getPromotion} from "./getReceipt.js";

export async function hasPromotion(filterPromotion) {
  for (let i = 0; i < BUYPROUDCTLIST.length; i++) {
    for (const value of filterPromotion) {
      if (value.buy === Number(BUYPROUDCTLIST[i].quantity) + 1) {
        const answer = await inputHasPromotion(BUYPROUDCTLIST[i], value);

        if (answer === 'Y') {
          BUYPROUDCTLIST[i].quantity = Number(BUYPROUDCTLIST[i].quantity) + 1;
          BUYPROUDCTLIST[i].price = Number(BUYPROUDCTLIST[i].price) + (Number(BUYPROUDCTLIST[i].price) / (Number(BUYPROUDCTLIST[i].quantity) - 1));
          getPromotion();
        }
      }
    }
  }
}
