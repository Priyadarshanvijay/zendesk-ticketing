import Express from 'express';
import axios from 'axios';
import tickets from './tickets.js';
import TicketService from '../services/tickets.js';
import ZendeskService from '../services/zendesk.js';
import HTTPService from '../services/httpService.js';

const { Router } = Express;

export default () => {
	const app = Router();
  const zendeskURL = process.env.ZENDESK_URL;
  const zendeskUsername = process.env.ZENDESK_USERNAME;
  const zendeskPassword = process.env.ZENDESK_PASSWORD;
  const httpService = new HTTPService(axios);
  const zendeskService = new ZendeskService({
    zendeskURL, zendeskUsername, zendeskPassword, httpService
  });
  const ticketService = new TicketService({ zendeskService });
	tickets({ app, ticketService });
	return app;
}