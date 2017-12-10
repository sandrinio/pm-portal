$(document).ready(function () {

   $('#preStudyFile').on('click', function () {
      $('#preStudyFormDiv').toggle('fast')
   });

   $("#preStudyForm").on('submit',( function (event) {
      event.preventDefault();
      $.ajax({
         url: "/docs/preStudy-file",
         type: "POST",
         data:  new FormData(this),
         contentType: false,
         cache: false,
         processData: false,
         success: successHandler,
         error: function(error){
            console.log(error);
            $("#message").html(`<span class="label label-danger" style="margin-bottom: 20px"> Something went Wrong </span>`)
         }
      });

   }));

   function successHandler(data) {
      let html1 =
          `<span class="label label-info" style="margin-bottom: 20px">Uploaded</span>`
      $("#message").html(html1);
      let html2 =
          `<tr><td><a href="`+ data.path +`" download>`+ data.filename.slice(14) +`</a></td></tr>`
      $('#uploaded-file-list').append(html2)
   }



   let count = 1;
   $('#addMember').on('click', function () {
      count += 1;
      let td1 = $(
          "<tr>" +
          "<td><input class='form-control' type='text' name='proposalTeam[department]' placeholder='Department'></td>" +
          "<td><input class='form-control' type='text' name='proposalTeam[name]' placeholder='Enter Full Name'></td>" +
          "<td><input class='form-control' type='text' name='proposalTeam[role]' placeholder='Role'></td>" +
          "</tr>");
      $('#member-list').append(td1)

      $('#count').append().text(count)
   });
});
