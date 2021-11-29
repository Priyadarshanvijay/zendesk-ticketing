import Express from 'express';

const { Router } = Express;

const route = Router();


export default ({ app, ticketService }) => {
  app.use('/tickets', route);

  // catcher function executes input function in a try catch block,
  // and returns function output if execution is successful, else handles
  // exceptions for all functions in the same way.
  const catcher = (func) => async (req, res) => {
    try {
      await func(req, res);
    } catch (e) {
      // Since all of our functions which can end up in this catch block will have the same format for errors,
      // and will have predefined error status and reasons, we'll handle them like this. Passing their status 
      // and response received from zendesk back to our frontend, else send 500 Internal Server Error status code
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
