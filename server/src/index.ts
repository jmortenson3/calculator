import * as WebSocket from 'ws';
import { CalculatorService } from './calculator/calculator.service';

const port = 8080;
const webSocketServer = new WebSocket.Server({ port });

const calculationService = new CalculatorService();

console.log(`Listening on port ${port}`);

webSocketServer.on('connection', (webSocket: WebSocket) => {
  if (webSocket.readyState == WebSocket.OPEN) {
    console.log('👩 User has entered the chat.');
    let latestCalculations = calculationService.getLatestCalculations(10);
    webSocket.send(JSON.stringify(latestCalculations));
  }

  webSocket.on('message', (message: string) => {
    try {
      const allowedCharacters = /^[\s\d()+\-*/.]*$/;

      if (!allowedCharacters.test(message)) {
        throw new Error('Invalid calculation: must be in the form of: 4 + 3');
      }

      const solution = calculationService.solve(message);

      if (solution === null) {
        throw new Error('Invalid calculation: must be in the form of: 4 + 3');
      }

      calculationService.addCalculation({
        value: `${message} = ${solution}`,
      });

      const calculations = calculationService.getLatestCalculations(10);

      webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(calculations));
        }
      });
    } catch (err) {
      const errorMessage = {
        error: err.message,
        createdAt: Date.now(),
      };

      // let only this user know about the error
      webSocket.send(JSON.stringify(errorMessage));
    }
  });
});
