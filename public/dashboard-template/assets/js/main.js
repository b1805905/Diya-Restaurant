const defaultImage = 'http://127.0.0.1:8000/dashboard-template/assets/images/blank.jpg'
var csrf = $('meta[name="csrf-field"').attr('content')
$('input.price').on('input', function (e) {
    $(this).val(formatCurrency(this.value.replace(/[,VNĐ]/g, '')));
}).on('keypress', function (e) {
    if (!$.isNumeric(String.fromCharCode(e.which))) e.preventDefault();
}).on('paste', function (e) {
    var cb = e.originalEvent.clipboardData || window.clipboardData;
    if (!$.isNumeric(cb.getData('text'))) e.preventDefault();
});
function formatCurrency(number) {
    var n = number.split('').reverse().join("");
    var n2 = n.replace(/\d\d\d(?!$)/g, "$&,");
    return n2.split('').reverse().join('') + 'VNĐ';
}
function formatNumber(nStr, decSeperate, groupSeperate) {
    nStr += '';
    x = nStr.split(decSeperate);
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + groupSeperate + '$2');
    }
    return x1 + x2;
}

$('.price').text(formatNumber(700000, '.', ','))
$(document).ready(function () {

    var csrf = $('meta[name="csrf-field"]').attr('content')

    $("button[data-dismiss='modal']").on('click', function () {
        $('.modal').modal('hide')
    })


    //    $('.nav-item').each(function(){
    //     $(this).addClass('active');
    //    })


    var $mySelect = $('select').selectize({
        sortField: 'text'
    });

    $('.table thead tr')
        .clone(true)
        .addClass('filters')
        .appendTo('.table thead');

    var table = $('.table').DataTable({
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.12.1/i18n/vi.json'
        },
        orderCellsTop: true,
        fixedHeader: true,
        initComplete: function () {
            var api = this.api();

            // For each column
            api
                .columns()
                .eq(0)
                .each(function (colIdx) {
                    // Set the header cell to contain the input element
                    var cell = $('.filters th').eq(
                        $(api.column(colIdx).header()).index()
                    );
                    var title = $(cell).text();
                    $(cell).html(`<input type="text" style="width: 100% !important;" class="form-control" placeholder="${title}" aria-label="${title}" aria-describedby="basic-addon2">`);

                    // On every keypress in this input
                    $(
                        'input',
                        $('.filters th').eq($(api.column(colIdx).header()).index())
                    )
                        .off('keyup change')
                        .on('change', function (e) {
                            // Get the search value
                            $(this).attr('title', $(this).val());
                            var regexr = '({search})'; //$(this).parents('th').find('select').val();

                            var cursorPosition = this.selectionStart;
                            // Search the column for that value
                            api
                                .column(colIdx)
                                .search(
                                    this.value != ''
                                        ? regexr.replace('{search}', '(((' + this.value + ')))')
                                        : '',
                                    this.value != '',
                                    this.value == ''
                                )
                                .draw();
                        })
                        .on('keyup', function (e) {
                            e.stopPropagation();

                            $(this).trigger('change');
                            $(this)
                                .focus()[0]
                                .setSelectionRange(cursorPosition, cursorPosition);
                        });
                });
        },
    });


    //add user selector
    $('#role-selector').children('.dropdown-item').on('click', function () {
        $('#user-role').val($(this).html().toString())
        $('#user-role-selected').val($(this).attr('idRole'))
    })



    // Order functions
    var idTable
    var Status
    $('.my-table').on('click', function () {
        idTable = $(this).attr('idTable');
        Status = $(this).attr('Status');
        $('#OrderModal').modal('toggle')
    })

    $('#OrderModal').on('hidden.bs.modal', function (e) {
        resetOrder()

    })
    $('#selectTypeMenu').on('change', function (e) {

        let idType = $(this).val()
        $.ajax({
            url: "fetchData",
            type: "POST",
            headers: {
                'X-CSRF-TOKEN': csrf
            },
            data: {
                'idType': idType
            },
            success: function (data) {
                $.each(data, function (i, val) {
                    let $select = $('#selectOrder').selectize();
                    let selectize = $select[0].selectize;
                    selectize.addOption({ value: val.id, text: val.name });
                    selectize.refreshOptions();
                });
                $('#selectOrder').on('change', function () {
                    let idMenu = $(this).val();
                    $.each(data, function (i, val) {
                        if (val.id == idMenu) {
                            $('#previewOrder').attr('src', val.img)
                            return false
                        }
                    })
                    $('#orderQuant').on('change', function () {
                        let quant = $(this).val()
                        if (quant < 1) {
                            return false
                        }
                        $('#confirmOrder').off('click').on('click', function(e) {
                            e.preventDefault();
                            $.ajax({
                                url: "addOrder",
                                type: "POST",
                                headers: {
                                    'X-CSRF-TOKEN': csrf
                                },
                                data: {
                                    'idMenu': idMenu,
                                    'quant': quant
                                },
                                success: function (data){

                                }
                            })

                        })
                    });


                })
            },
            error: function () {
                console.log('fail')
            }
        })

    });

    function resetOrder(){
        let $select = $('#selectOrder').selectize();
        let selectize = $select[0].selectize;
        selectize.clear()

         $select = $('#selectTypeMenu').selectize();
         selectize = $select[0].selectize;
        selectize.clear()
        $('#previewOrder').attr('src', defaultImage)
        $('#orderQuant').val('')
        $('#confirmOrder').click(notEnoughData)
    }

    $('#confirmOrder').click(notEnoughData)

    function notEnoughData  () {
        $.toast({
            text: "Chọn đủ thông tin!", // Text that is to be shown in the toast
            heading: 'Lỗi!', // Optional heading to be shown on the toast
            icon: 'error', // Type of toast icon
            showHideTransition: 'fade', // fade, slide or plain
            allowToastClose: true, // Boolean value true or false
            hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
            stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
            position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values



            textAlign: 'left',  // Text alignment i.e. left, right or center
            loader: true,  // Whether to show loader or not. True by default
            loaderBg: '#9EC600',  // Background color of the toast loader
            beforeShow: function () { }, // will be triggered before the toast is shown
            afterShown: function () { }, // will be triggered after the toat has been shown
            beforeHide: function () { }, // will be triggered before the toast gets hidden
            afterHidden: function () { }  // will be triggered after the toast has been hidden
        });
    }

});

