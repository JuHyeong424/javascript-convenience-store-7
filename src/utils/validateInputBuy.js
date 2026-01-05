import {BUYPROUDCTLIST} from "../data/receipt.js";
import {PRODUCTS} from "../data/products.js";

export async function validateInputBuy() {
  let filter;
  for (let i = 0; i < BUYPROUDCTLIST.length; i++) {
    filter = PRODUCTS.filter(value => value.name === BUYPROUDCTLIST[i].name)
    let sum = filter.reduce((sum, prev) => sum + prev.quantity, 0);
    if (sum < BUYPROUDCTLIST[i].quantity) {
      BUYPROUDCTLIST.length = 0;
      throw new Error('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.');
    }
  }
}
