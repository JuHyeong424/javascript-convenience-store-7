import {Console} from "@woowacourse/mission-utils";

export async function inputBuy() {
  Console.print('');
  return Console.readLineAsync('구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n');
}

export async function inputHasPromotion(buyProductList, value) {
  Console.print('');
  return Console.readLineAsync(`현재 ${buyProductList.name}은(는) ${value.get}개를 무료로 더 받을 수 있습니다. 추가하시겠습니다? (Y/N)\n`);
}

export async function inputMembership() {
  Console.print('');
  return Console.readLineAsync('멤버십 할인을 받으시겠습니까? (Y/N)\n');
}

export async function inputIsFinish() {
  Console.print('');
  return Console.readLineAsync('감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n');
}