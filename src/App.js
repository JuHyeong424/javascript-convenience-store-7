import {printInformationOfProduct} from "./view/outputView.js";
import {inputBuy, inputMembership} from "./view/inputView.js";
import {getReceipt} from "./utils/getReceipt.js";

class App {
  async run() {
    await printInformationOfProduct();
    const purchaseGoods =  await inputBuy();
    const memberShip = await inputMembership();
    getReceipt(purchaseGoods, memberShip);
  }
}

export default App;
