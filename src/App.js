import {printInformationOfProduct, printReceipt} from "./view/outputView.js";
import {inputBuy, inputIsFinish, inputMembership} from "./view/inputView.js";
import {getReceipt} from "./utils/getReceipt.js";
import {resetData} from "./utils/resetData.js";
import {hasPromotion} from "./utils/checkPromotion.js";
import {getTotalPrice} from "./utils/getTotalPrice.js";

class App {
  async run() {
    let isFinish = 'Y';
    while (isFinish !== 'N') {
      resetData();
      await printInformationOfProduct();
      const purchaseGoods =  await inputBuy();
      const filterPromotion = await getReceipt(purchaseGoods);
      await hasPromotion(filterPromotion);
      const membership = await inputMembership();
      getTotalPrice(membership);
      await printReceipt();
      isFinish = await inputIsFinish();
    }
  }
}

export default App;
