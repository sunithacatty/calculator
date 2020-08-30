
function convertObToCSV(args) {
  var result, ctr, keys, columnD, lineD, data;

  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnD = args.columnD || ',';
  lineD = args.lineD || '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnD);
  result += lineD;

  data.forEach(function(item) {
    ctr = 0;
    keys.foreach(function (key) {
      if (ctr>0) result += columnD;
      result += item[key];
      ctr++
    });
    result += lineD;
  });
  return result;
}

function downloadCSV(args) {
  var data, filename, link;
  var csv = convertObToCSV ({
    data: history
  });

  if (csv == null) return;
  filename = args.filename || 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}
