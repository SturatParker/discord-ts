import { Main } from './main';
import { CLIENTSERVICE, DATABASE_SERVICE, ENV } from './services';

// const main = new Main(DATABASE_SERVICE, CLIENTSERVICE, ENV);

// main.run();

Main.launch(DATABASE_SERVICE, CLIENTSERVICE, ENV);
