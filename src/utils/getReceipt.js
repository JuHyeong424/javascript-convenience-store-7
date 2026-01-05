import {
  BUYPROUDCTLIST,
  MEMBERSHIPDISCOUNT,
  PROMOTIONDISCOUNT,
  PROMOTIONLIST,
  TOTALAMOUNTSPENT,
  TOTALPRICE
} from "../data/receipt.js";
import {PRODUCTS} from "../data/products.js";
import {PROMOTIONS} from "../data/promotions.js";

function getBoughtGoods(purchaseGoods) {
  // 입력 각 상품 구분하기
  const boughtGoods = purchaseGoods.replace(/\[/g, '').replace(/]/g, '').split(',');

  // 각 상품 이름, 수량 구분하기
  const splitBoughtGoods = boughtGoods.map(value => value.split('-'));

  // 해당 상품 가격 가져오기
  for (let i = 0; i <splitBoughtGoods.length; i++) {
    PRODUCTS.find(value => {
      if (value.name === splitBoughtGoods[i][0]) {
        splitBoughtGoods[i].push(value.price);
      }
    })
  }

  // 구매 리스트에 구매 상품 이름, 수, 총 가격 저장하기
  for (let i = 0; i < splitBoughtGoods.length; i++) {
    let object = {};
    object['name'] = splitBoughtGoods[i][0];
    object['quantity'] = splitBoughtGoods[i][1];
    object['price'] = splitBoughtGoods[i][2] * Number(splitBoughtGoods[i][1]);
    BUYPROUDCTLIST.push(object);
  }
}

function getPromotion() {
  let promotion = PRODUCTS.filter(value => value.promotion);

  // 구매 상품에 해당하는 프로모션 상품 리스트 구하기
  for (let i = 0; i < BUYPROUDCTLIST.length; i++) {
    if (promotion.some(value => value.name === BUYPROUDCTLIST[i].name)) {
      promotion = promotion.filter(value => value.name === BUYPROUDCTLIST[i].name)
      let filterPromotion = [];
      for (let j = 0; j < promotion.length; j++) {
        filterPromotion = PROMOTIONS.filter(value => value.name === promotion[j].promotion);
      }

      filterPromotion.every(value => {
        if (value.buy <= Number(BUYPROUDCTLIST[i].quantity)) {
          let object = {};
          object['promotionProductName'] = BUYPROUDCTLIST[i].name;
          object['promotionProductQuantity'] = value.get;
          PROMOTIONLIST.push(object);
        }
      })
    }
  }
}

function getTotalPrice(membership) {
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
    MEMBERSHIPDISCOUNT['price'] = 3000;
  }
  if (membership === 'N') {
    MEMBERSHIPDISCOUNT['price'] = 0;
  }

  TOTALAMOUNTSPENT['name'] = '내살돈';
  TOTALAMOUNTSPENT['price'] = TOTALPRICE.price - PROMOTIONDISCOUNT.price - MEMBERSHIPDISCOUNT.price;
}

export function getReceipt(purchaseGoods, memberShip) {
  getBoughtGoods(purchaseGoods);
  getPromotion();
  getTotalPrice(memberShip);


}
