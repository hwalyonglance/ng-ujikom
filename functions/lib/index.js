'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const path_1 = require("path");
const functions = require("firebase-functions");
const puppeteer = require("puppeteer");
const app = functions.https.onRequest((req, res) => {
    console.log(req.url);
    res.send('Hello from Firebase!\n\n');
});
exports.app = app;
const cetak = functions.https.onRequest((req, res) => {
    (() => __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer.launch();
        const page = yield browser.newPage();
        const filename = path_1.join(os_1.tmpdir(), Date.now() + '.pdf');
        const url = 'https://ujikom-ng.firebaseapp.com/cetak/' + req.url;
        yield page.goto(url, { waitUntil: 'networkidle2' });
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield page.pdf({
                path: filename,
                format: 'letter'
            });
            yield browser.close();
            res.sendFile(filename);
        }), 2000);
    }))();
});
exports.cetak = cetak;
//# sourceMappingURL=index.js.map