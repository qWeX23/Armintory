//TODO
function tableRowClick(id) {
    $.ajax({
        type: "GET",
        url: "/ammo/" + id,
        success: function(returnData) {
            $('#_id').val(returnData._id)
            $('#name').val(returnData.name);
            $('#numRounds').val(returnData.numRounds);
            $('#cpr').val(returnData.cpr);
            //-------
            var caliberSelect;
            //good enough string cleaning
            if (returnData.caliber.includes('.')) {
                caliberSelect = $('#\\' + returnData.caliber);
            } else {
                caliberSelect = $('#' + returnData.caliber);
            }
            caliberSelect.prop('selected', true);
            $('#' + returnData.case).prop('selected', true);
            $("[id=\'" + returnData.round + "\']").prop('selected', true);
            $('select').material_select();
            Materialize.updateTextFields();
            $('#editmodal').modal('open');
        }
    })
}