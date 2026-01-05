import {Console} from "@woowacourse/mission-utils";
import {PRODUCTS} from "../data/products.js";
import {
  BUYPROUDCTLIST,
  MEMBERSHIPDISCOUNT,
  PROMOTIONDISCOUNT,
  PROMOTIONLIST,
  TOTALAMOUNTSPENT,
  TOTALPRICE
} from "../data/receipt.js";

export async function printInformationOfProduct() {
  Console.print('');
  Console.print('안녕하세요. w편의점입니다.\n현재 보유하고 있는 상품입니다.\n');
  for (let i = 0; i < PRODUCTS.length; i++) {
    let product = PRODUCTS[i];
    Console.print(`- ${product.name} ${product.price}원 ${product.quantity ? product.quantity : '재고 없음'}${product.quantity ? '개' : ''} ${product.promotion ? product.promotion : ''}`);
  }
}

export async function printReceipt() {
  Console.print('');
  Console.print('==============W 편의점==============');
  Console.print(`${'상품명'.padEnd(6, " ")}  ${'수량'.padStart(6, " ")}  ${'금액'.padStart(6, " ")}`);
  for (let i = 0; i < BUYPROUDCTLIST.length; i++) {
    const list = BUYPROUDCTLIST[i];
    Console.print(`${list.name.padEnd(6, " ")} ${list.quantity.padStart(7, " ")} ${String(list.price).padStart(14, " ")}`);
  }
  Console.print('==============증    정==============');
  for (let i = 0; i < PROMOTIONLIST.length; i++) {
    const list = PROMOTIONLIST[i];
    Console.print(`${list.promotionProductName.padEnd(6, " ")} ${String(list.promotionProductQuantity).padStart(7, " ")}`);
  }
  Console.print('==================================');
  Console.print(`${TOTALPRICE.name.padEnd(6, " ")} ${String(TOTALPRICE.quantity).padStart(7, " ")} -${String(TOTALPRICE.price).padStart(14, " ")}`);
  Console.print(`${PROMOTIONDISCOUNT.name.padEnd(12, " ")} -${String(PROMOTIONDISCOUNT.price).padStart(14, " ")}`);
  Console.print(`${MEMBERSHIPDISCOUNT.name.padEnd(12, " ")} -${String(MEMBERSHIPDISCOUNT.price).padStart(14, " ")}`);
  Console.print(`${TOTALAMOUNTSPENT.name.padEnd(12, " ")} -${String(TOTALAMOUNTSPENT.price).padStart(14, " ")}`);
}
