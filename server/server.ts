import * as express from 'express';
import {Application} from 'express';
import * as cors from 'cors';
import {initRestApi} from "./api/api";
import {apiErrorHandler} from "./api/apiErrorHandler";

const app: Application = express();

initRestApi(app);

app.use(apiErrorHandler)
    .use(cors()) ;

app.listen(8090, () => {
    console.log('Server is running');
});
