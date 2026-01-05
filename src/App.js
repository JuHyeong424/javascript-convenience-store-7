import {printError, printInformationOfProduct, printReceipt} from "./view/outputView.js";
import {inputBuy, inputIsFinish, inputMembership} from "./view/inputView.js";
import {getReceipt} from "./utils/getReceipt.js";
import {resetData} from "./utils/resetData.js";
import {hasPromotion} from "./utils/checkPromotion.js";
import {getTotalPrice} from "./utils/getTotalPrice.js";
import {validateInputBuy} from "./utils/validateInputBuy.js";

class App {
  async run() {
    let isFinish = 'Y';
    let purchaseGoods, filterPromotion;
    while (isFinish !== 'N') {
      resetData();
      await printInformationOfProduct();

      while (true) {
        try {
          purchaseGoods =  await inputBuy();
          filterPromotion = await getReceipt(purchaseGoods);
          await validateInputBuy();
          break;
        } catch (e) {
          await printError(e.message);
        }
      }

      await hasPromotion(filterPromotion);
      const membership = await inputMembership();
      getTotalPrice(membership);
      await printReceipt();
      isFinish = await inputIsFinish();
    }
  }
}

export default App;
