import {Console} from "@woowacourse/mission-utils";
import {PRODUCTS} from "../data/products.js";

export async function printInformationOfProduct() {
  Console.print('안녕하세요. w편의점입니다.\n현재 보유하고 있는 상품입니다.\n');
  for (let i = 0; i < PRODUCTS.length; i++) {
    let product = PRODUCTS[i];
    Console.print(`- ${product.name} ${product.price}원 ${product.quantity ? product.quantity : '재고 없음'}${product.quantity ? '개' : ''} ${product.promotion ? product.promotion : ''}`);
  }
}