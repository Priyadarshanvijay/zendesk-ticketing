import Express from 'express';

const { Router } = Express;

const route = Router();


export default ({ app, ticketService }) => {
  app.use('/tickets', route);

  const catcher = (func) => async (req, res) => {
    try {
      await func(req, res);
    } catch (e) {
      return res.status(e?.response?.status || 500).json(e?.response?.data || { error: 'Unexpected Error Occured' });
    }
  }

  route.get('/', catcher(async (req, res) => {
    const { before, after } = req.query;
    const tickets = await ticketService.getTickets({ before, after });
    return res.status(200).json(tickets);
  }));

  route.get('/count', catcher(async (req, res) => {
      const ticketCount = await ticketService.getTicketCount();
      return res.status(200).json({ ticketCount });
  }));
};
