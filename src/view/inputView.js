import {Console} from "@woowacourse/mission-utils";

export async function inputBuy() {
  Console.print('');
  return Console.readLineAsync('구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n');
}

export async function inputMembership() {
  Console.print('');
  return Console.readLineAsync('멤버십 할인을 받으시겠습니까? (Y/N)\n');
}