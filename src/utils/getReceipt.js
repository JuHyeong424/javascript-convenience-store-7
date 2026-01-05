import {BUYPROUDCTLIST, PROMOTIONLIST,} from "../data/receipt.js";
import {PRODUCTS} from "../data/products.js";
import {PROMOTIONS} from "../data/promotions.js";
import {Console} from "@woowacourse/mission-utils";
import {printError} from "../view/outputView.js";

function getBoughtGoods(purchaseGoods) {
  // 입력 각 상품 구분하기
  let boughtGoods;
  boughtGoods = purchaseGoods.replace(/\[/g, '').replace(/]/g, '').split(',');

  // 각 상품 이름, 수량 구분하기
  let splitBoughtGoods = [];
  splitBoughtGoods = boughtGoods.map(value => value.split('-'));

  // 해당 상품 가격 가져오기
  for (let i = 0; i < splitBoughtGoods.length; i++) {
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

export function getPromotion() {
  let promotion = PRODUCTS.filter(value => value.promotion);
  let filterPromotion = [];

  // 구매 상품에 해당하는 프로모션 상품 리스트 구하기
  for (let i = 0; i < BUYPROUDCTLIST.length; i++) {
    if (promotion.some(value => value.name === BUYPROUDCTLIST[i].name)) {
      promotion = promotion.filter(value => value.name === BUYPROUDCTLIST[i].name)
      filterPromotion = [];
      for (let j = 0; j < promotion.length; j++) {
        filterPromotion = PROMOTIONS.filter(value => value.name === promotion[j].promotion);
      }

      filterPromotion.every(async (value) => {
        if (value.buy <= Number(BUYPROUDCTLIST[i].quantity)) {
          let object = {};
          object['promotionProductName'] = BUYPROUDCTLIST[i].name;
          object['promotionProductQuantity'] = value.get;
          PROMOTIONLIST.push(object);
        }
      })
    }
  }
  return filterPromotion;
}

export async function getReceipt(purchaseGoods) {
  getBoughtGoods(purchaseGoods);
  return getPromotion();
}
