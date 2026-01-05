import {
  BUYPROUDCTLIST,
  MEMBERSHIPDISCOUNT,
  PROMOTIONDISCOUNT,
  PROMOTIONLIST,
  TOTALAMOUNTSPENT,
  TOTALPRICE
} from "../data/receipt.js";

export function getTotalPrice(membership) {
  // 할인 전 총 금액
  const totalQuantity = BUYPROUDCTLIST.reduce((sum, value) => sum + Number(value.quantity), 0);
  const totalPrice = BUYPROUDCTLIST.reduce((sum, value) => sum + value.price, 0);

  TOTALPRICE['name'] = '총구매액';
  TOTALPRICE['quantity'] = totalQuantity;
  TOTALPRICE['price'] = totalPrice;

  // 증정 상품 할인 가격
  let sum = 0;
  for (let i = 0; i < BUYPROUDCTLIST.length; i++) {
    for (let j = 0; j < PROMOTIONLIST.length; j++) {
      if (BUYPROUDCTLIST[i].name === PROMOTIONLIST[j].promotionProductName) {
        sum += BUYPROUDCTLIST[i].price / Number(BUYPROUDCTLIST[i].quantity) * PROMOTIONLIST[j].promotionProductQuantity;
      }
    }
  }
  PROMOTIONDISCOUNT['name'] = "행사할인";
  PROMOTIONDISCOUNT['price'] = sum;

  // 멤버십할인
  MEMBERSHIPDISCOUNT['name'] = "멤버십할인";
  if (membership === 'Y') {
    let result = TOTALPRICE.price;
    for (let i = 0; i < PROMOTIONLIST.length; i++) {
      for (let j = 0; j < BUYPROUDCTLIST.length; j++) {
        if (PROMOTIONLIST[i].promotionProductName === BUYPROUDCTLIST[j].name) {
          result -= BUYPROUDCTLIST[j].price;
        }
      }
    }
    MEMBERSHIPDISCOUNT['price'] = Math.min(8000, result * 0.3);
  }
  if (membership === 'N') {
    MEMBERSHIPDISCOUNT['price'] = 0;
  }

  TOTALAMOUNTSPENT['name'] = '내실돈';
  TOTALAMOUNTSPENT['price'] = TOTALPRICE.price - PROMOTIONDISCOUNT.price - MEMBERSHIPDISCOUNT.price;
}
