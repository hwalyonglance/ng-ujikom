const express = require('express');
const puppeteer = require('puppeteer');
const { join } = require('path')
const { tmpdir } = require('os')
const { execSync } = require('child_process');

function cetak(){
	let htmlPath = join(tmpdir(), Date.now() + '.html')
	let pdfPath = join(tmpdir(), Date.now() + '.pdf')
	let execPath = join(__dirname, '..', '..', '..', '..', '..', 'node_modules', '.bin', 'html-pdf');
	writeFileSync(htmlPath, template)
	try{
		execSync(execPath + ' ' + htmlPath + ' ' + pdfPath)
	}catch(e){}
	return pdfPath;
}

function cetak_header(judul){
	return `
		<html>
			<body>
				<h2>
					PT KELUAR MASUK AMPLOP
					<br>
					LAPORAN ${judul}
					<br>
					Jalan Percobaan No. 666, Telp 0127-654321
				</h2>
				<br>
				<hr>
				<br>
				<br>
	`
}

function cetak_disposisi_tabel(disposisi_array){
	let html = cetak_header('DISPOSISI') + `
				<table border='1' style='clear: both; width: 100%; border-collapse: collapse;' cellpadding='16px'>
					<colgroup style='width: 24px'></colgroup>
					<colgroup style='width: 180px'></colgroup>
					<thead style=''>
						<tr>
							<th>Tgl. Terima</th>
							<th>No. Surat</th>
							<th>Pengirim</th>
							<th>Perihal</th>
							<th>Kepada</th>
						</tr>
					</thead>
					<tbody>
	`
	for ( let disposisi of disposisi_array ) {
		html += `
			<tr>
				<td>${disposisi.$surat.tglTerima}</td>
				<td>${disposisi.$surat.noSurat}</td>
				<td>${disposisi.$surat.pengirim}</td>
				<td>${disposisi.$surat.perihal}</td>
				<td>${disposisi.$surat.kepada}</td>
			</tr>
		`
	}
	html+=`
					</tbody>
				</table>
			</body>
		</html>
	`
	// execComannd();
}

function cetak_disposisi(disposisi){
	let html = cetak_header('DISPOSISI') + `
		<table *ngIf='disposisi' style='clear: both; width: 100%; border-collapse: collapse;' cellpadding='16px'>
			<colgroup style='width: 200px'></colgroup>
			<tbody>
				<tr>
					<td>Tanggal Terima</td>
					<td>:</td>
					<td>${disposisi.$surat.tglTerima}</td>
				</tr>
				<tr>
					<td>No. Surat</td>
					<td>:</td>
					<td>${disposisi.$surat.noSurat}</td>
				</tr>
				<tr>
					<td>Pengirim</td>
					<td>:</td>
					<td>${disposisi.$surat.pengirim}</td>
				</tr>
				<tr>
					<td>Perihal</td>
					<td>:</td>
					<td>${disposisi.$surat.perihal}</td>
				</tr>
				<tr>
					<td>Kepada</td>
					<td>:</td>
					<td>${disposisi.$surat.kepada}</td>
				</tr>
				<tr>
					<td colspan='3' style='text-align: center;'>
						<img [src]='disposisi.$surat.photo.base64' style='margin: 0 auto'>
					</td>
				</tr>
			</tbody>
		</table>
	`
	// execComannd()
}

function cetak_surat_tabel(surat_array){
	let html = cetak_header('SURAT KELUAR') + `
		<table border='1' style='clear: both; width: 100%; border-collapse: collapse;' cellpadding='16px'>
			<colgroup style='width: 24px'></colgroup>
			<colgroup style='width: 180px'></colgroup>
			<thead style=''>
				<tr>
					<th>Tgl. Kirim</th>
					<th>No. Surat</th>
					<th>Pengirim</th>
					<th>Perihal</th>
					<th>Kepada</th>
				</tr>
			</thead>
			<tbody>
	`
	for ( let surat of surat_array ) {
		html += `
			<tr>
				<td>${surat.tglKirim}</td>
				<td>${surat.noSurat}K</td>
				<td>${surat.pengirim}</td>
				<td>${surat.perihal}</td>
				<td>${surat.kepada}</td>
			<tr>
		`
	}
	// execComannd()
}

function cetak_surat(surat){
	html = cetak_header() + `
		<table style='clear: both; width: 100%; border-collapse: collapse;' cellpadding='16px'>
			<colgroup style='width: 200px'></colgroup>
			<tbody>
				<tr>
					<td>Tanggal Kirim</td>
					<td>:</td>
					<td>${surat.tglKirim}</td>
				</tr>
				<tr>
					<td>No. Surat</td>
					<td>:</td>
					<td>${surat.noSurat}</td>
				</tr>
				<tr>
					<td>Pengirim</td>
					<td>:</td>
					<td>${surat.pengirim}</td>
				</tr>
				<tr>
					<td>Perihal</td>
					<td>:</td>
					<td>${surat.perihal}</td>
				</tr>
				<tr>
					<td>Kepada</td>
					<td>:</td>
					<td>${surat.kepada}</td>
				</tr>
				<tr>
					<td colspan='3' style='text-align: center;'>
						<img src='${surat.photo.base64}' style='margin: 0 auto'>
					</td>
				</tr>
			</tbody>
		</table>
	`
}

const app = express()
app.get('*', (req, res) => {
	(async() => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		const filename = join(tmpdir(), Date.now() + '.pdf');
		// const url = 'https://ujikom-ng.firebaseapp.com/cetak/' + req.url;
		const url = 'http://localhost:4200' + req.url;
		// res.send(url)
		await page.goto(url, {waitUntil: 'networkidle2'});
		await page.pdf({
			path: filename,
			format: 'letter'
		});
		await browser.close();
		res.sendFile(filename);
	})();
	/*
	res.sendFile(cetak(req.body.data))


	*/
})
app.listen(3000, () => {
	console.log('3000')
})
