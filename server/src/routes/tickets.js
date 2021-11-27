import Express from 'express';

const { Router } = Express;

const route = Router();


export default ({ app, ticketService }) => {
  app.use('/tickets', route);

  route.get('/', async (req, res) => {
    try {
      const { before, after } = req.query;
      const tickets = await ticketService.getTickets({ before, after });
      return res.json(tickets).status(200);
    } catch (e) {
      return res.status(e?.response?.status || 500).json(e?.response?.data);
    }
  });

  route.get('/users', async (req, res) => {
    try {
      const { ids } = req.query;
      const tickets = await ticketService.getUsers({ ids });
      return res.json(tickets).status(200);
    } catch (e) {
      return res.status(e?.response?.status || 500).json(e?.response?.data);
    }
  });

  route.get('/count', async (req, res) => {
    try {
      const ticketCount = await ticketService.getTicketCount();
      return res.json({ ticketCount });
    } catch (e) {
      return res.status(e?.response?.status || 500).json(e?.response?.data);
    }
  });
};