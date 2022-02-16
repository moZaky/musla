import { Router } from 'express';
import * as gateway from './gateway/gateway.routes';
import * as peripheral from './peripheral/peripheral.routes';
 ;

// Define router.. 
var router = Router();


// controllers
router.use('/gateway' , gateway.default);
router.use('/peripheral' , peripheral.default);
 


export default router;

