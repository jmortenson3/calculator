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
    const solution = calculationService.solve(message);

    if (solution === null) {
      const errorMessage = {
        error: 'Invalid calculation: must be in the form of: 4 + 3',
        createdAt: Date.now(),
      };

      // let only this user know about the error
      webSocket.send(JSON.stringify(errorMessage));
    } else {
      const calculations = calculationService.appendCalculation({
        value: `${message} = ${solution}`,
      });

      webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(calculations));
        }
      });
    }
  });
});
