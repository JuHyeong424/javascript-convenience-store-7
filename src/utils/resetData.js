import {
  BUYPROUDCTLIST,
  MEMBERSHIPDISCOUNT,
  PROMOTIONDISCOUNT,
  PROMOTIONLIST,
  TOTALAMOUNTSPENT,
  TOTALPRICE
} from "../data/receipt.js";

export function resetData() {
  BUYPROUDCTLIST.length = 0;
  PROMOTIONLIST.length = 0;

  Object.keys(TOTALPRICE).forEach(key => delete TOTALPRICE[key]);
  Object.keys(PROMOTIONDISCOUNT).forEach(key => delete PROMOTIONDISCOUNT[key]);
  Object.keys(MEMBERSHIPDISCOUNT).forEach(key => delete MEMBERSHIPDISCOUNT[key]);
  Object.keys(TOTALAMOUNTSPENT).forEach(key => delete TOTALAMOUNTSPENT[key]);
}