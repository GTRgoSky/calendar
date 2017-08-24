// /*!datatimepicker 表单递交组件  2017-08-10 皓月系统 范翔*/
;
(function (win) {
    var _limit = null;

    function CustomDateTimePicker(obj) {
        var defaultSetting = {
            _el: $(".J_dateTimePicker"), //el
            _format: 'Y-m-d H:i', //显示格式
            _type: null, //时间日期选择器类型(1为时间日期全可选，2为日期选择器，3为时间选择器)
            _step: 0, //时间选择器的间隔时间
            use:false
        };
        this.option = $.extend(true, {}, defaultSetting, obj || {});

        this.option._typeJudge = function (self) {
            var _type = self._type;
            var $self = $(self._el);
            if (_type == 1) { //选择器的类型(1为时间日期全可选，2为日期选择器，3为时间选择器)
                self._datepicker = true;
                self._timepicker = true;
                self._format = 'Y-m-d H:i';
            } else if (_type == 2) {
                self._datepicker = true;
                self._timepicker = false;
                self._closeOnDateSelect = true;
                self._format = 'Y-m-d';
                if(use){
                    if ($self.data("type") == 'startDay') {
                        self.onClose = function (selectedDate) {
                            $('#endDay').datetimepicker({"minDate":selectedDate});
                        }
                    } else {
                        self.onClose = function (selectedDate) {
                            $('#startDay').datetimepicker({"maxDate": selectedDate});
                        }
                    }
                }
            } else if (_type == 3) {
                self._datepicker = false;
                self._timepicker = true;
                self._format = 'H:i';
            }
        }
        this.option._typeJudge(this.option);

        this.init();
    }
    CustomDateTimePicker.prototype = {
        init: _init
    }

    function _init() {
        var self = this;
        var _obj = null;
        if (Vue.version.substr(0, 1) > 1) {
            _obj = $(self.option._el);
        } else {
            _obj = self.option._el;
        }
        _obj.datetimepicker({
            lang: 'zh', //显示语言
            format: self.option._format,
            datepicker: self.option._datepicker,
            timepicker: self.option._timepicker,
            closeOnDateSelect: self.option._closeOnDateSelect,
            step: self.option._step - 0,
            onShow: _limit,
            yearStart: 1910,
            scrollInput: false,
            onClose:self.option.onClose
        });
    }
    win.CustomDateTimePicker = CustomDateTimePicker;
}(window));





(function () {

    if (!Vue) return;

    if (Vue.version.substr(0, 1) > 1) {
        Vue.directive('datetimepicker', function (el, binding) {
            var _obj = {
                type: binding.value.type || 1,
                mod: binding.value.mod || '',
                step: binding.value.step
            };

            if (_obj.needWrite != 1) {
                $(el).attr('readonly', true);
            }

            setTimeout(function () {
                new CustomDateTimePicker({
                    _el: el, //el
                    _step: _obj.step || 60,
                    _type: _obj.type || 1,
                });

                $(el).change(function () {
                    if (_obj.mod) console.log(1)
                })

            }, 200);
        });
    }
})();