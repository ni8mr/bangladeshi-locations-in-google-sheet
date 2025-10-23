// Counts: divisions=8, districts=64, upazilas(including city corporations)=517

// Divisions (unique)
const divisions = ["Barishal", "Chattogram", "Dhaka", "Khulna", "Rajshahi", "Rangpur", "Sylhet", "Mymensingh"];

// Mapping Division → District
const divisionDistrictMap = {
  "Barishal": ["Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  "Chattogram": ["Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Cumilla", "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati"],
  "Dhaka": ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
  "Khulna": ["Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
  "Rajshahi": ["Bogura", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna", "Rajshahi", "Sirajgonj"],
  "Rangpur": ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
  "Sylhet": ["Habiganj", "Maulvibazar", "Sunamganj", "Sylhet"],
  "Mymensingh": ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"]
};


// Mapping District → Upazila
const districtUpazilaMap = {
  "Barguna": ["Amtali","Bamna","Barguna Sadar","Betagi","Patharghata","Taltali"],
  "Barishal": ["Muladi","Babuganj","Agailjhara","Barisal Sadar","Bakerganj","Banaripara","Gaurnadi","Hizla","Mehendiganj","Wazirpur"],
  "Bhola": ["Bhola Sadar","Burhanuddin","Char Fasson","Daulatkhan","Lalmohan","Manpura","Tazumuddin"],
  "Jhalokati": ["Jhalokati Sadar","Kathalia","Nalchity","Rajapur"],
  "Patuakhali": ["Bauphal","Dashmina","Galachipa","Kalapara","Mirzaganj","Patuakhali Sadar","Dumki","Rangabali"],
  "Pirojpur": ["Bhandaria","Kaukhali","Mathbaria","Nazirpur","Nesarabad","Pirojpur Sadar","Zianagar"],
  "Bandarban": ["Bandarban Sadar","Thanchi","Lama","Naikhongchhari","Ali kadam","Rowangchhari","Ruma"],
  "Brahmanbaria": ["Brahmanbaria Sadar","Ashuganj","Nasirnagar","Nabinagar","Sarail","Shahbazpur Town","Kasba","Akhaura","Bancharampur","Bijoynagar"],
  "Chandpur": ["Chandpur Sadar","Faridganj","Haimchar","Haziganj","Kachua","Matlab Uttar","Matlab Dakkhin","Shahrasti"],
  "Chattogram": ["Anwara","Banshkhali","Boalkhali","Chandanaish","Fatikchhari","Hathazari","Lohagara","Mirsharai","Patiya","Rangunia","Raozan","Sandwip","Satkania","Sitakunda","Chattogram City Corporation"],
  "Cumilla": ["Barura","Brahmanpara","Burichong","Chandina","Chauddagram","Daudkandi","Debidwar","Homna","Comilla Sadar","Laksam","Monohorgonj","Meghna","Muradnagar","Nangalkot","Comilla Sadar South","Titas","Cumilla City Corporation"],
  "Cox's Bazar": ["Chakaria","Kutubdia","Maheshkhali","Ramu","Teknaf","Ukhia","Pekua","Eidgaon","Dasar"],
  "Feni": ["Feni Sadar","Chagalnaiya","Daganbhyan","Parshuram","Fhulgazi","Sonagazi"],
  "Khagrachari": ["Dighinala","Khagrachhari","Lakshmichhari","Mahalchhari","Manikchhari","Matiranga","Panchhari","Ramgarh"],
  "Lakshmipur": ["Lakshmipur Sadar","Raipur","Ramganj","Ramgati","Komol Nagar"],
  "Noakhali": ["Noakhali Sadar","Begumganj","Chatkhil","Companyganj","Shenbag","Hatia","Kobirhat","Sonaimuri","Suborno Char"],
  "Rangamati": ["Rangamati Sadar","Belaichhari","Bagaichhari","Barkal","Juraichhari","Rajasthali","Kaptai","Langadu","Nannerchar","Kaukhali"],
  "Dhaka": ["Dhamrai","Dohar","Keraniganj","Nawabganj (Dhaka)","Savar","Dhaka North City Corporation","Dhaka South City Corporation"],
  "Faridpur": ["Faridpur Sadar","Boalmari","Alfadanga","Madhukhali","Bhanga","Nagarkanda","Charbhadrasan","Sadarpur","Shaltha"],
  "Gazipur": ["Gazipur Sadar-Joydebpur","Kaliakior","Kapasia","Sripur","Kaliganj (Gazipur)","Tongi","Gazipur City Corporation"],
  "Gopalganj": ["Gopalganj Sadar","Kashiani","Kotalipara","Muksudpur","Tungipara"],
  "Jamalpur": ["Dewanganj","Baksiganj","Islampur","Jamalpur Sadar","Madarganj","Melandaha","Sarishabari","Narundi Police I.C"],
  "Kishoreganj": ["Astagram","Bajitpur","Bhairab","Hossainpur","Itna","Karimganj","Katiadi","Kishoreganj Sadar","Kuliarchar","Mithamain","Nikli","Pakundia","Tarail"],
  "Madaripur": ["Madaripur Sadar","Kalkini","Rajoir","Shibchar"],
  "Manikganj": ["Manikganj Sadar","Singair","Shibalaya","Saturia","Harirampur","Ghior"],
  "Munshiganj": ["Lohajang","Sreenagar","Munshiganj Sadar","Sirajdikhan","Tongibari","Gazaria"],
  "Mymensingh": ["Bhaluka","Trishal","Haluaghat","Muktagachha","Dhobaura","Fulbaria","Gaffargaon","Gauripur","Ishwarganj","Mymensingh Sadar","Nandail","Phulpur","Mymensingh City Corporation"],
  "Narayanganj": ["Araihazar","Sonargaon","Bandar","Naryanganj Sadar","Rupganj","Siddirgonj","Narayanganj City Corporation"],
  "Narsingdi": ["Belabo","Monohardi","Narsingdi Sadar","Palash","Raipura, Narsingdi","Shibpur"],
  "Netrokona": ["Kendua Upazilla","Atpara Upazilla","Barhatta Upazilla","Durgapur Upazilla","Kalmakanda Upazilla","Madan Upazilla","Mohanganj Upazilla","Netrakona-S Upazilla","Purbadhala Upazilla","Khaliajuri Upazilla"],
  "Rajbari": ["Baliakandi","Goalandaghat","Pangsha","Kalukhali","Rajbari Sadar"],
  "Shariatpur": ["Shariatpur Sadar -Palong","Damudya","Naria","Jajira","Bhedarganj","Gosairhat"],
  "Sherpur": ["Jhenaigati","Nakla","Nalitabari","Sherpur Sadar","Sreebardi"],
  "Tangail": ["Tangail Sadar","Sakhipur","Basail","Madhupur","Ghatail","Kalihati","Nagarpur","Mirzapur","Gopalpur","Delduar","Bhuapur","Dhanbari"],
  "Bagerhat": ["Bagerhat Sadar","Chitalmari","Fakirhat","Kachua","Mollahat","Mongla","Morrelganj","Rampal","Sarankhola"],
  "Chuadanga": ["Damurhuda","Chuadanga-S","Jibannagar","Alamdanga"],
  "Jashore": ["Abhaynagar","Keshabpur","Bagherpara","Jessore Sadar","Chaugachha","Manirampur","Jhikargachha","Sharsha"],
  "Jhenaidah": ["Jhenaidah Sadar","Maheshpur","Kaliganj (Jhenaidah)","Kotchandpur","Shailkupa","Harinakunda"],
  "Khulna": ["Terokhada","Batiaghata","Dacope","Dumuria","Dighalia","Koyra","Paikgachha","Phultala","Rupsa","Khulna City Corporation"],
  "Kushtia": ["Kushtia Sadar","Kumarkhali","Daulatpur","Mirpur","Bheramara","Khoksa"],
  "Magura": ["Magura Sadar","Mohammadpur","Shalikha","Sreepur (Magura)"],
  "Meherpur": ["angni","Mujib Nagar","Meherpur-S"],
  "Narail": ["Narail-S Upazilla","Lohagara Upazilla","Kalia Upazilla"],
  "Satkhira": ["Satkhira Sadar","Assasuni","Debhata","Tala","Kalaroa","Kaliganj (Satkhira)","Shyamnagar"],
  "Bogra": ["Adamdighi","Bogra Sadar","Sherpur (Bogra)","Dhunat","Dhupchanchia","Gabtali","Kahaloo","Nandigram","Sahajanpur","Sariakandi","Shibganj (Bogra)","Sonatala"],
  "Joypurhat": ["Joypurhat S","Akkelpur","Kalai","Khetlal","Panchbibi"],
  "Naogaon": ["Naogaon Sadar","Mohadevpur","Manda","Niamatpur","Atrai","Raninagar","Patnitala","Dhamoirhat","Sapahar","Porsha","Badalgachhi"],
  "Natore": ["Natore Sadar","Baraigram","Bagatipara","Lalpur"],
  "Bholahat": ["Bholahat","Gomastapur","Nachole","Nawabganj Sadar","Shibganj (Nawabganj)"],
  "Pabna": ["Atgharia","Bera","Bhangura","Chatmohar","Faridpur (Pabna)","Ishwardi","Pabna Sadar","Santhia","Sujanagar"],
  "Rajshahi": ["Bagha","Bagmara","Charghat","Durgapur (Rajshahi)","Godagari","Mohanpur","Paba","Puthia","Tanore"],
  "Sirajgonj": ["Sirajganj Sadar","Belkuchi","Chauhali","Kamarkhanda","Kazipur","Raiganj","Shahjadpur","Tarash","Ullahpara"],
  "Dinajpur": ["Birampur","Birganj","Biral","Bochaganj","Chirirbandar","Phulbari (Dinajpur)","Ghoraghat","Hakimpur","Kaharole","Khansama","Dinajpur Sadar","Nawabganj (Dinajpur)","Parbatipur"],
  "Gaibandha": ["Fulchhari","Gaibandha sadar","Gobindaganj","Palashbari","Sadullapur","Saghata","Sundarganj"],
  "Kurigram": ["Kurigram Sadar","Nageshwari","Bhurungamari","Phulbari (Kurigram)","Rajarhat","Ulipur","Chilmari","Rowmari","Char Rajibpur"],
  "Lalmonirhat": ["Lalmanirhat Sadar","Aditmari","Kaliganj (Lalmonirhat)","Hatibandha","Patgram"],
  "Nilphamari": ["Nilphamari Sadar","Saidpur","Jaldhaka","Kishoreganj (Nilphamari)","Domar","Dimla"],
  "Panchagarh": ["Panchagarh Sadar","Debiganj","Boda","Atwari","Tetulia"],
  "Rangpur": ["Badarganj","Mithapukur","Gangachara","Kaunia","Rangpur Sadar","Pirgachha","Pirganj (Rangpur)","Taraganj"],
  "Thakurgaon": ["Thakurgaon Sadar","Pirganj (Thakurgaon)","Baliadangi","Haripur","Ranisankail"],
  "Habiganj": ["Ajmiriganj","Baniachang","Bahubal","Chunarughat","Habiganj Sadar","Lakhai","Madhabpur","Nabiganj","Shaistagonj"],
  "Maulvibazar": ["Moulvibazar Sadar","Barlekha","Juri","Kamalganj","Kulaura","Rajnagar","Sreemangal"],
  "Sunamganj": ["Bishwamvarpur","Chhatak","Derai","Dharampasha","Dowarabazar","Jagannathpur","Jamalganj (Sunamganj)","Sulla","Sunamganj Sadar","Shanthiganj","Tahirpur","Modhyanagar"],
  "Sylhet": ["Sylhet Sadar","Beanibazar","Bishwanath","Dakshin Surma","Balaganj","Companiganj (Sylhet)","Fenchuganj","Golapganj","Gowainghat","Jointapur","Kanaighat","Zakiganj","Nobigonj"]
};

const sheetIndex = 0; // first sheet
const startRow = 2; // assuming row 1 is header

const divisionColumn = 1; // Column A for division
const districtColumn = 2; // Column B for district
const upazilaColumn = 3; // Column C for upazila

// ---------- onEdit handler (cascading dropdowns) ----------
function onEdit(e) {
  try {
    const sheet = e.range.getSheet();
    const row = e.range.getRow();
    const col = e.range.getColumn();

    // Only target the specific sheet
    const targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[sheetIndex];
    if (sheet.getName() !== targetSheet.getName()) return;

    // Column Division => Division chosen => filter Column District
    if (col === divisionColumn) {
      const division = e.value;
      const districtCell = sheet.getRange(row, districtColumn);
      const upazilaCell = sheet.getRange(row, upazilaColumn);

      // clear dependent cells
      districtCell.clearContent().clearDataValidations();
      upazilaCell.clearContent().clearDataValidations();

      // Only populate districts if division selected
      if (division && divisionDistrictMap[division]) {
        const districtOptions = divisionDistrictMap[division].slice();
        const rule = SpreadsheetApp.newDataValidation()
          .requireValueInList(districtOptions, true)
          .setAllowInvalid(false)
          .build();
        districtCell.setDataValidation(rule);
      }
    }

    // Column District => District chosen => filter Column Upazila
    if (col === districtColumn) {
      const district = e.value;
      const upazilaCell = sheet.getRange(row, upazilaColumn);
      upazilaCell.clearContent().clearDataValidations();

      if (district && districtUpazilaMap[district]) {
        const upazilaOptions = districtUpazilaMap[district].slice();
        const rule = SpreadsheetApp.newDataValidation()
          .requireValueInList(upazilaOptions, true)
          .setAllowInvalid(false)
          .build();
        upazilaCell.setDataValidation(rule);
      }
    }

    SpreadsheetApp.flush();
  } catch (err) {
    console.error('onEdit error:', err);
  }
}

// ---------- setup function ----------
function setupDivisionAndDistrictAndUpazilaDropdowns() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  // const lastRow = sheet.getLastRow(); // For setting up dropdowns till the last active row (row )
  const lastRow = 10;
  if (lastRow < startRow) return;

  // Only Division column gets a default dropdown
  const divisionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(divisions, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(startRow, divisionColumn, lastRow - startRow + 1, 1).setDataValidation(divisionRule);

  // Columns District and Upazila start empty
  sheet.getRange(startRow, districtColumn, lastRow - startRow + 1, 2)
    .clearContent()
    .clearDataValidations();

  Logger.log(`Division dropdowns applied from row ${startRow} to ${lastRow} at column ${divisionColumn}. Columns ${districtColumn} & ${upazilaColumn} are empty until selection.`);
}
