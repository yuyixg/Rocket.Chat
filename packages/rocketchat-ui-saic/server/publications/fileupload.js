Meteor.methods({
  'saicfile-upload': function (fileinfo) {
    var result = HTTP.call('POST', 'http://10.64.20.165:8080/mmt-web/f/file/upload/knowledge',
      {
        data: fileinfo,
        params: GetUser()
      });
    // console.log("received file " + fileInfo.name + " data: " + fileData);
    console.log(result);
    return result.data;
  }
});