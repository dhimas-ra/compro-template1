const SPREADSHEET_ID = "1RhJyqtW7WsxdRsf5b3EWUAYZEJPrZuczpZrALb6KpCE";

const PORTFOLIO_MAP = {
  image: "Image URL",
  judul: "Judul",
  description: "Description",
  link: "Link"
};

function doGet(e) {

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  const type = (e.parameter.type || "all").toLowerCase();

  switch (type) {

    case "setting":
      return output(getSetting(ss));

    case "services":
      return output(getTable(ss, "Services"));

    case "portfolio":
      return output(getTable(ss, "Portfolio"));

    case "clients":
      return output(getTable(ss, "Clients"));

    case "testimonials":
      return output(getTable(ss, "Testimonials"));

    case "all":
      return output({
        setting: getSetting(ss),
        services: getTable(ss, "Services"),
        portfolio: getTable(ss, "Portfolio"),
        clients: getTable(ss, "Clients"),
        testimonials: getTable(ss, "Testimonials")
      });

    default:
      return output({
        success: false,
        message: "Endpoint tidak ditemukan."
      });
  }

}

function doPost(e) {

  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    const sheet = ss.getSheetByName("Contact");

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([

      sheet.getLastRow(),

      new Date(),

      data.name,

      data.email,

      data.title,

      data.message

    ]);

    return ContentService
      .createTextOutput(JSON.stringify({

        success: true,

        message: "Pesan berhasil dikirim"

      }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (err) {

    return ContentService
      .createTextOutput(JSON.stringify({

        success: false,

        message: err.toString()

      }))
      .setMimeType(ContentService.MimeType.JSON);

  }

}

function output(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// function getSetting(ss) {

//   const sheet = ss.getSheetByName("Setting");
//   const values = sheet.getDataRange().getValues();

//   let result = {};

//   for (let i = 1; i < values.length; i++) {

//     const key = values[i][0];
//     const value = values[i][1];

//     if (key !== "") {
//       result[key] = value;
//     }

//   }

//   return result;

// }

function getSetting(ss) {

  const sheet = ss.getSheetByName("Setting");

  const values = sheet.getDataRange().getValues();

  const headers = values[0];
  const data = values[1];

  let result = {};

  headers.forEach((header, index) => {
    result[header] = data[index];
  });

  return result;

}

function getTable(ss, sheetName) {

  const sheet = ss.getSheetByName(sheetName);

  const values = sheet.getDataRange().getValues();

  const header = values[0];

  let result = [];

  for (let i = 1; i < values.length; i++) {

    if (values[i].join("") === "") continue;

    let row = {};

    for (let j = 0; j < header.length; j++) {

      row[header[j]] = values[i][j];

    }

    result.push(row);

  }

  return result;

}

// GForm //

function onFormSubmit(e){

  Logger.log(JSON.stringify(e.namedValues));
  
  const row = e.namedValues;

  const section = getValue(row,"Jenis Data");

  switch(section){

    case "Services":
      saveServices(row);
      break;

    case "Portfolio":
      savePortfolio(row);
      break;

    case "Clients":
      saveClients(row);
      break;

    case "Testimonials":
      saveTestimonials(row);
      break;

    case "Setting":
      saveSetting(row);
      break;

  }

}

function getValue(row,name){

    return row[name] ? row[name][0] : "";

}

function saveServices(row){

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  const sheet = ss.getSheetByName("Services");

  sheet.appendRow([

      Utilities.getUuid(),

      getValue(row,"URL Gambar"),

      getValue(row,"Pelayanan"),

      getValue(row,"description"),

  ]);

}

function savePortfolio(row){

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("Portfolio");

  sheet.appendRow([

    sheet.getLastRow(),

    getValue(row, PORTFOLIO_MAP.image),

    getValue(row, PORTFOLIO_MAP.judul),

    getValue(row, PORTFOLIO_MAP.description),

    getValue(row, PORTFOLIO_MAP.link)

  ]);

}

function saveClients(row){

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  const sheet = ss.getSheetByName("Clients");

  sheet.appendRow([

      Utilities.getUuid(),

      getValue(row,"Logo URL"),

      getValue(row,"Nama Client")

  ]);

}

function saveTestimonials(row){

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  const sheet = ss.getSheetByName("Testimonials");

  sheet.appendRow([

      Utilities.getUuid(),

      getValue(row,"Rating"),

      getValue(row,"Review"),

      getValue(row,"Nama")

  ]);

}

function saveSetting(row) {

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("Setting");

  // Ambil header sheet
  const headers = sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0];

  // Mapping header spreadsheet -> field Google Form
  const fieldMap = {
    company_name: "Nama Perusahaan",
    deskripsi_singkat: "Deskripsi Singkat",
    slider_img1: "URL Gambar 1",
    slider_img2: "URL Gambar 2",
    about_desc: "Tentang Kami",
    services_desc: "Deskripsi Pelayanan",
    portfolio_desc: "Deskripsi Portfolio",
    clients_desc: "Deskripsi Klien",
    testimonial_desc: "Deskripsi Testimonial",
    contact_desc: "Deskripsi Kontak",
    phone: "Nomor Telepon",
    email: "Email",
    address: "Alamat"
  };

  // Susun data sesuai urutan header spreadsheet
  const data = headers.map(header => {
    const formField = fieldMap[header];
    return formField ? getValue(row, formField) : "";
  });

  // Kalau belum ada baris data, buat dulu
  if (sheet.getLastRow() < 2) {
    sheet.appendRow(new Array(headers.length).fill(""));
  }

  // Update baris ke-2
  sheet.getRange(2, 1, 1, data.length).setValues([data]);

}

