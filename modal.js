'use strict';

// 거의 완벽한 유니크 아이디 값
$.uuid = function () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
		    v = c == 'x' ? r : r & 0x3 | 0x8;
		return v.toString(16);
	});
};
// modal 생성 함수
$.modal = function (obj) {
	var $body = $('body');
	var uuid = $.uuid();
	var eventObj = obj.eventObj || {};
	var click = eventObj.click || null;

	// 미리 정의된 모달 스타일
	var styles = { width: '100%' };
	var type = '';
	switch (obj.type) {
		case 'alert':
			styles = { width: '260px' };
			type = 'type-alert';
			break;
		default:
			styles = _.extend(styles, obj.styles || {});
			break;
	}

	var html = '\n\t\t<div class="modal ' + type + '" id="modal-' + uuid + '">\n\t\t\t<div class="overlay"></div>\n\t\t\t<div class="modal-contents" style="width: ' + styles.width + '">\n\t\t\t\t' + obj.template + '\n\t\t\t</div>\n\t\t</div>\n\t';

	// 공통으로 사용할 close 이벤트 자동 등록 ( .btn-close-modal )
	$(document).on('click.close-' + uuid, '#modal-' + uuid + ' .btn-close-modal', function (e) {
		var $this = $(e.currentTarget);

		$this.parents('.modal').remove();
		$(document).off('click.close-' + uuid);

		// modal 닫히면 custom click 이벤트 모두 해제
		if (click) {
			_.forEach(click, function (v, i) {
				$(document).off('click.' + i + '-' + uuid);
			});
		}
	});

	// eventObj에 등록된 이벤트들 등록
	if (eventObj) {
		// 클릭 관련 이벤트 배열 분해 후 등록
		if (click) {
			_.forEach(click, function (v, i) {
				$(document).on('click.' + i + '-' + uuid, '#modal-' + uuid + ' ' + v.target, function () {
					v.handler();
				});
			});
		}
	}

	$body.append(html);
	// modal 오픈 후 callback ( append 후 동기적으로 실행되어야해서 이 콜백만 이곳에 위치 )
	if (eventObj.afterOpen) {
		eventObj.afterOpen();
	}
};

// modal 컨트롤러 (실행 바인드)
// n개의 페이지에서 사용되는 경우만 여기다 넣자. 나머지는 페이지로 빼자.
(function () {
	$(document).on('click', '#withDrawModal', function () {

		$.modal({
			template: '\n\t\t\t\t<div class="modal-body">\n\t\t    \t\t<div class="withdraw-modal-top">\n\t\t    \t\t\t<span class="">\uCD9C\uAE08\uC2E0\uCCAD</span>\n\t\t        \t\t<ul class="">\n\t\t        \t\t\t<li>\n\t\t        \t\t\t\t\uC5B4\uCA4C\uAD6C \uC5B4\uCA4C\uAD6C\uC6B0\n\t\t        \t\t\t</li>\n\t\t        \t\t\t<li>\n\t\t        \t\t\t\tmodal modal\n\t\t        \t\t\t</li>\n\t\t        \t\t\t<li>\n\t\t        \t\t\t\t\uB41C\uB2E4 \uB41C\uB2E4 \uAE38\uAC8C \uC4F0\uBA74 \uB41C\uB2E4 \uB41C\uB2E4? \uC548\uB41C\uB2E4... \uC870\uAE08 \uB354 \uAE38 \uAC8C\uC5D0\uC5D0\uC5D0\uC5D0\n\t\t        \t\t\t</li>\n\t\t        \t\t\t<li>\n\t\t        \t\t\t\t\uADF8 \uC544\uB798\uC758 \uC904\n\t\t        \t\t\t</li>\n\t\t        \t\t</ul>\n\t\t    \t\t</div>\n\t\t    \t\t<div class="withdraw-modal-bottom">\n\t\t    \t\t\t<table class="form-data-table">\n\t\t    \t\t\t\t<tbody>\n\t\t    \t\t\t\t\t<tr>\n\t\t    \t\t\t\t\t\t<th>\uCD9C\uAE08\uD3EC\uC778\uD2B8</th>\n\t\t    \t\t\t\t\t\t<td>\n\t\t    \t\t\t\t\t\t\t<input type="text" class="input-text input-full" />\n\t\t    \t\t\t\t\t\t</td>\n\t\t    \t\t\t\t\t</tr>\n\t\t    \t\t\t\t\t<tr>\n\t\t    \t\t\t\t\t\t<th>\uACC4\uC88C\uBC88\uD638</th>\n\t\t    \t\t\t\t\t\t<td>\n\t\t    \t\t\t\t\t\t\t<select name="" id="selectBank" class="select select-full has-placeholder">\n\t\t    \t\t\t\t\t\t\t\t<option value="-1">\uC740\uD589\uC120\uD0DD</option>\n\t\t    \t\t\t\t\t\t\t\t<option value="">\uBB34\uC2A8\uC740\uD589</option>\n\t\t    \t\t\t\t\t\t\t\t<option value="">\uBB34\uC2A8\uC740\uD589</option>\n\t\t    \t\t\t\t\t\t\t\t<option value="">\uBB34\uC2A8\uC740\uD589</option>\n\t\t    \t\t\t\t\t\t\t\t<option value="">\uBB34\uC2A8\uC740\uD589</option>\n\t\t    \t\t\t\t\t\t\t</select>\n\t\t    \t\t\t\t\t\t</td>\n\t\t    \t\t\t\t\t</tr>\n\t\t    \t\t\t\t\t<tr>\n\t\t    \t\t\t\t\t\t<th>\n\t\t    \t\t\t\t\t\t\t\uC608\uAE08\uC8FC\n\t\t    \t\t\t\t\t\t</th>\n\t\t    \t\t\t\t\t\t<td>\n\t\t    \t\t\t\t\t\t\t<input type="text" class="input-text input-full" />\n\t\t    \t\t\t\t\t\t</td>\n\t\t    \t\t\t\t\t</tr>\n\t\t    \t\t\t\t</tbody>\n\t\t    \t\t\t</table>\n\t\t    \t\t</div>\n\t\t    \t</div>\n\t\t        <div class="modal-footer">\n\t\t            <button type="button" class="btn btn-gray btn-narrow btn-close-modal">\uCDE8\uC18C</button>\n\t\t        \t<button type="button" class="btn btn-colored btn-narrow btn-apply-withdraw">\uC2E0\uCCAD\uD558\uAE30</button>\n\t\t        </div>\n\t\t\t',
			eventObj: {
				afterOpen: function afterOpen() {
					console.log(1);
					var selectBank = new CustomSelect($('#selectBank'));
				},
				click: [{
					target: '.btn-apply-withdraw',
					handler: function handler() {
						alert(2);
					}
				}]
			}
		});
	});
})();