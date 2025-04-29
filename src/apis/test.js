import { addKeyword, utils } from "@builderbot/bot";

const testFlow = addKeyword(utils.setEvent("test")).addAnswer(
  "This is a test message from the flow!"
);

export default testFlow;
