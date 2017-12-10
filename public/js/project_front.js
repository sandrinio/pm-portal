$(document).ready(function () {
//add member collapse
   $('#addMemberForm-collapse').on('click', function () {
         $('#addMemberForm').toggle('fast');
   });

   // $('#member-del-icon').on('click', function () {
      // let hiddenId = $('#hiddenId').val()
      // $.ajax({
      //    url: '/project/deleteTeamMember/' +hiddenId,
      //    type: 'POST',
      //    contentType: 'json',
      //    data: {msg: 'hello'},
      //    success: function (data) {
      //       alert(data.msg)
      //    },
      //    error: function (err) {
      //       console.log(err)
      //    }
      // })
   //    alert('btn clicked')
   // });

   $('.member-del-icon').each(function (i) {
      $(this).click(function () {

         let team = []
         $('.member-del-tr').each(function () {
            team.push($(this).text());
         });

         $('.tb tr td').each(function () {
            console.log($(this).text())
         });

         console.log(team[i])
         let hiddenId = $('#hiddenId').text();
         $.ajax({
            url: '/project/deleteTeamMember?_method="PUT"',
            type: 'PUT',
            dataType: 'json',
            data: {id: hiddenId, tm: team[i], memberIndex: i},
            success: function (data) {

            },
            error: function (err) {
               console.log(err);
            }
         })
      })
   })


});